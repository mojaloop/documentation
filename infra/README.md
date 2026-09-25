# infra

Mojaloop Documentation Site is hosted on AWS CloudFront, with Terraform to automate the creation and management
of the site.

This document is for maintainers of Mojaloop's documentation site, but this repo can also serve as a good template
 for automating the deployment of static hosting with cloudfront functions.

## Requirements

- `terraform`
- AWS credentials and necessary IAM permissions to create, update destroy s3 buckets, dynamodb tables, CloudFront CDNs

## Deploy

```bash
# sign in with MFA
aws-mfa

# initialize the shared terraform state (if not done already)
cd ./state

terraform init

# for some reason I need to set this env var for tf 0.14+
AWS_SHARED_CREDENTIALS_FILE=$HOME/.aws/credentials     
terraform plan
terraform apply



cd ../src
# first time only 
terraform init \
  -backend-config="bucket=docs.mojaloop.io-state" \
  -backend-config="region=eu-west-2" \
  -backend-config="dynamodb_table=docs.mojaloop.io-lock"


# see what changes are needed
terraform plan

# apply the terraform
terraform apply
```

## Manual Steps:

It's up to you to configure the DNS and SSL Certificates. I didn't want to add this here 
because the `docs.mojaloop.io` domain is not configured by us, so there is no point in 
automating it.

Additionally, domains are slow moving and tend to often need manual intervention at some point.

### Configure the DNS:

1. Log in to Route53 > Hosted Zones > select your domain (for example `moja-lab.live`)
2. "Create Record" with the following details:
- Record Name: `docs-preview2`
- Type: `CNAME`
- Value: `d1n6mdji42j0gb.cloudfront.net` - value from terraform output: `website_cdn_root_domain_name`
3. "Create Records"

### Attach the CI user to the IAM groups

In order to use this tooling in CI/CD, you need to manually attach a CI user to the groups
created by terraform, in this case `docs-preview2.moja-lab.live-infra-group` and
`docs-preview2.moja-lab.live-infra-infra`

### Upload your site!

Build and upload the site to your terraform-managed s3 bucket:

```bash
AWS_REGION=us-east-2 BUCKET_NAME=docs-preview.moja-lab.live-root DOMAIN=docs-preview.moja-lab.live ../scripts/_deploy_preview_s3.sh
```


## Configure Redirects

In order to support the gradual migration to docs 2.0, we need to be able to configure the CDN 
to fall back to legacy docs that haven't yet been migrated, also be able to redirect legacy
links to updated pages in order to avoid broken links once we switch over to docs 2.0.


For this, we use cloudfront functions, which are lightweight Javascript functions that allow you 
to control the behaviour of requests and responses of the CDN.

The redirect behaviour can be configured in `./src/redirect/index.js`. **That file is the source
of truth — edit it directly.** It used to be generated from a `link_list.txt` via a shell script;
those files drifted years out of date and were removed, so do not reintroduce a generator.

Two rule tables:

- `X` — exact path matches, checked first, first match wins.
- `P` — prefix matches, longest match wins, with the rest of the path carried across. A prefix
  rule never fires on a path already under its own target, which keeps self-nesting rules
  (`Iso20022/` → `Iso20022/v1.0/`) loop-safe.

Paths are matched with any `/pr/<n>` preview prefix stripped and re-applied to the `Location`,
so redirects behave the same on the site and in PR previews.

### Before you push

Run the test suite:

```bash
node scripts/_test_redirects.js
```

This is not optional. The CircleCI `infra` job has no branch filter, so it runs
`terraform apply --auto-approve` on **every branch** — pushing a redirect change deploys it
straight to production CloudFront with no staging step. The suite checks the 10 KB function size
limit, duplicate keys, redirect loops, that every rule lands on a page that exists, and that no
live page is redirected away.

### Moving or deleting a page

Add a rule to `index.js`, or, if the page genuinely has no successor and should 404, add its URL
to `./src/redirect/no-redirect.txt`. The test suite fails the build if a branch removes or renames
a page without doing one of the two — this is what stops a restructure from silently orphaning
URLs, as happened in 2024.

### Rolling out a batch of new rules

`index.js` has a single `var S` at the top holding the status code. Land new rules with `S = 302`,
verify them in production, then flip to `S = 301` in a follow-up. There is no CloudFront
invalidation in this repo and browsers cache 301s near-permanently, so a wrong 301 is very hard
to take back.