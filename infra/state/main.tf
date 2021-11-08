
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.64.2"
    }
  }
}
provider "aws" {
  alias  = "custom"
  region = var.region
  # shared_credentials_file = "~/.aws/credentials"
  # profile                 = "mojaloop"
}

resource "aws_s3_bucket" "terraform_state" {
  provider = aws.custom
  bucket = "${var.website-domain-main}-state"
  versioning {
    enabled = true
  }  # Enable server-side encryption by default
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = merge(var.tags, {
    ManagedBy = "mojaloop/documentation"
    Changed   = formatdate("YYYY-MM-DD hh:mm ZZZ", timestamp())
  })

  lifecycle {
    ignore_changes = [tags["Changed"]]
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  provider = aws.custom
  name         = "${var.website-domain-main}-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"  
  attribute {
    name = "LockID"
    type = "S"
  }

  tags = merge(var.tags, {
    ManagedBy = "mojaloop/documentation"
    Changed   = formatdate("YYYY-MM-DD hh:mm ZZZ", timestamp())
  })

  lifecycle {
    ignore_changes = [tags["Changed"]]
  }
}


resource "aws_iam_group_policy" "infa_group_policy" {
  provider = aws.custom
  name = "${var.website-domain-main}-state"
  group = aws_iam_group.infra_group.name
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "PolicyForWebsiteEndpointsPublicContent",
  "Statement": [
    {
      "Sid": "RelevantBucketAccess",
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "${aws_s3_bucket.terraform_state.arn}/*",
        "${aws_s3_bucket.terraform_state.arn}"
      ]
    },
    {
      "Sid": "RelevantDynamoDBAccess",
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:DeleteItem"
      ],
      "Resource": "${aws_dynamodb_table.terraform_locks.arn}"
    }
  ]
}
POLICY
}

resource "aws_iam_group" "infra_group" {
  provider = aws.custom
  name = "${var.website-domain-main}-state"
}