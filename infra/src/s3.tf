# Creates bucket to store logs
resource "aws_s3_bucket" "website_logs" {
  provider = aws.custom
  bucket = "${var.website-domain-main}-logs"
  acl    = "log-delivery-write"

  # Comment the following line if you are uncomfortable with Terraform destroying the bucket even if this one is not empty
  force_destroy = true


  tags = merge(var.tags, {
    ManagedBy = "terraform"
    Changed   = formatdate("YYYY-MM-DD hh:mm ZZZ", timestamp())
  })

  lifecycle {
    ignore_changes = [tags["Changed"]]
  }
}

# Creates bucket to store the static website
resource "aws_s3_bucket" "website_root" {
  provider = aws.custom
  bucket = "${var.website-domain-main}-root"
  acl    = "public-read"

  # Comment the following line if you are uncomfortable with Terraform destroying the bucket even if not empty
  force_destroy = true

  logging {
    target_bucket = aws_s3_bucket.website_logs.bucket
    target_prefix = "${var.website-domain-main}/"
  }

  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  tags = merge(var.tags, {
    ManagedBy = "mojaloop/documentation"
    Changed   = formatdate("YYYY-MM-DD hh:mm ZZZ", timestamp())
  })

  lifecycle {
    ignore_changes = [tags["Changed"]]
  }
}

# Creates policy to allow public access to the S3 bucket
resource "aws_s3_bucket_policy" "update_website_root_bucket_policy" {
  provider = aws.custom
  bucket = aws_s3_bucket.website_root.id
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "PolicyForWebsiteEndpointsPublicContent",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "${aws_s3_bucket.website_root.arn}/*",
        "${aws_s3_bucket.website_root.arn}"
      ]
    }
  ]
}
POLICY
}

# Creates bucket to store PR preview websites
resource "aws_s3_bucket" "website_preview" {
  provider = aws.custom
  bucket = "${var.website-domain-main}-preview"
  
  force_destroy = true

  logging {
    target_bucket = aws_s3_bucket.website_logs.bucket
    target_prefix = "${var.website-domain-main}-preview/"
  }

  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  tags = merge(var.tags, {
    ManagedBy = "mojaloop/documentation"
    Changed   = formatdate("YYYY-MM-DD hh:mm ZZZ", timestamp())
  })

  lifecycle {
    ignore_changes = [tags["Changed"]]
  }
}

# Creates policy to allow public access to the preview S3 bucket
resource "aws_s3_bucket_policy" "update_website_preview_bucket_policy" {
  provider = aws.custom
  bucket = aws_s3_bucket.website_preview.id
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "PolicyForWebsiteEndpointsPublicContent",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "${aws_s3_bucket.website_preview.arn}/*",
        "${aws_s3_bucket.website_preview.arn}"
      ]
    }
  ]
}
POLICY
}

