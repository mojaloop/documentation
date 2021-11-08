provider "aws" {
  alias  = "custom"
  region = var.region
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