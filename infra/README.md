# infra

The Documentation Site is hosted on AWS CloudFront, with Terraform to automate the creation and management
of the site.

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
  -backend-config="bucket=docs-preview2.moja-lab.live-state" \
  -backend-config="region=eu-west-1" \
  -backend-config="dynamodb_table=docs-preview2.moja-lab.live-lock"


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

### Attach the CI user to the IAM group

In order to use this tooling in CI/CD, you need to manually attach a CI user to the group
created by terraform, in this case `docs-preview2.moja-lab.live-infra-group`

### Upload your site!

Build and upload the site to your terraform-managed s3 bucket:

```bash
AWS_REGION=us-east-1 BUCKET_NAME=docs-preview2.moja-lab.live-root DOMAIN=docs-preview2.moja-lab.live ../scripts/_deploy_preview_s3.sh
```


## Configure Redirects

In order to support the gradual migration to docs 2.0, we need to be able to configure the CDN 
to fall back to legacy docs that haven't yet been migrated, also be able to redirect legacy
links to updated pages in order to avoid broken links once we switch over to docs 2.0.


For this, we use cloudfront functions, which are lightweight Javascript functions that allow you 
to control the behaviour of requests and responses of the CDN.

The redirect behaviour can be configured in `./src/redirect/index.js`