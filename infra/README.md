# infra

The Documentation Site is hosted on AWS CloudFront, with Terraform to automate the creation and management
of the site.

## Requirements

## Deploy

```bash
# first time only 
terraform init

# sign in with MFA
aws-mfa

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
