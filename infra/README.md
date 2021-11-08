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

## TODO:
- load in custom code to redirects
- automatically deploy the docs with a simple script
- do all of this in CI/CD? Or is it ok to just do it manually... we're not going to be changing this often
  - apart from website redirect rules... so 
- figure out where to keep TF state? In this repo? Or elsewhere?
