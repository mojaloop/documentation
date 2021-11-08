## Providers definition

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.34.0"
    }
  }
  backend "s3" {
    bucket         = "${var.website-domain-main}-state"
    key            = "global/s3/terraform.tfstate"
    region         = var.region
    dynamodb_table = "${var.website-domain-main}-lock"
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

## Route 53
# Provides details about the zone
# data "aws_route53_zone" "main" {
#   name         = var.website-domain-main
#   private_zone = false
# }

## ACM (AWS Certificate Manager)
# Creates the wildcard certificate *.<yourdomain.com>
# resource "aws_acm_certificate" "wildcard_website" {
#   provider                  = aws.us-east-1
#   domain_name               = var.website-domain-main
#   subject_alternative_names = ["*.${var.website-domain-main}"]
#   validation_method         = "DNS"

#   tags = merge(var.tags, {
#     ManagedBy = "terraform"
#     Changed   = formatdate("YYYY-MM-DD hh:mm ZZZ", timestamp())
#   })

#   lifecycle {
#     ignore_changes = [tags["Changed"]]
#   }

# }

# Validates the ACM wildcard by creating a Route53 record (as `validation_method` is set to `DNS` in the aws_acm_certificate resource)
# resource "aws_route53_record" "wildcard_validation" {
#   for_each = {
#     for dvo in aws_acm_certificate.wildcard_website.domain_validation_options : dvo.domain_name => {
#       name   = dvo.resource_record_name
#       record = dvo.resource_record_value
#       type   = dvo.resource_record_type
#     }
#   }
#   name            = each.value.name
#   type            = each.value.type
#   zone_id         = data.aws_route53_zone.main.zone_id
#   records         = [each.value.record]
#   allow_overwrite = true
#   ttl             = "60"
# }

# Triggers the ACM wildcard certificate validation event
# resource "aws_acm_certificate_validation" "wildcard_cert" {
#   provider                = aws.us-east-1
#   certificate_arn         = aws_acm_certificate.wildcard_website.arn
#   validation_record_fqdns = [for k, v in aws_route53_record.wildcard_validation : v.fqdn]
# }


# Get the ARN of the issued certificate
# data "aws_acm_certificate" "wildcard_website" {
#   provider = aws.us-east-1

#   depends_on = [
#     aws_acm_certificate.wildcard_website,
#     aws_route53_record.wildcard_validation,
#     aws_acm_certificate_validation.wildcard_cert,
#   ]

#   domain      = var.website-domain-main
#   statuses    = ["ISSUED"]
#   most_recent = true
# }




# Creates the DNS record to point on the main CloudFront distribution ID
# resource "aws_route53_record" "website_cdn_root_record" {
#   zone_id = data.aws_route53_zone.main.zone_id
#   name    = var.website-domain-main
#   type    = "A"

#   alias {
#     name                   = aws_cloudfront_distribution.website_cdn_root.domain_name
#     zone_id                = aws_cloudfront_distribution.website_cdn_root.hosted_zone_id
#     evaluate_target_health = false
#   }
# }
