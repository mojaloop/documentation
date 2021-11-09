## Providers definition
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.64.2"
    }
  }
  backend "s3" {
    key            = "global/s3/terraform.tfstate"
    encrypt        = true
  }
}

provider "aws" {
  alias  = "global"
  region = "us-east-1"
}
provider "aws" {
  alias  = "custom"
  region = var.region
}