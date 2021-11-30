# CloudFront
# Creates the CloudFront distribution to serve the static website
resource "aws_cloudfront_distribution" "website_cdn_root" {
  provider = aws.custom
  enabled     = true
  price_class = "PriceClass_All"
  # Select the correct PriceClass depending on who the CDN is supposed to serve (https://docs.aws.amazon.com/AmazonCloudFront/ladev/DeveloperGuide/PriceClass.html)
  # TODO: enable this - or do it manually? need to figure out how to BYO domain
  aliases = [var.website-domain-main]


  // base docs.mojaloop.io origin
  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.website_root.id}"
    domain_name = aws_s3_bucket.website_root.website_endpoint

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port            = 80
      https_port           = 443
      origin_ssl_protocols = ["TLSv1.2", "TLSv1.1", "TLSv1"]
    }
  }

  // other origins for sites hosted at docs.mojaloop.io/<PATH>
  origin {
    origin_id = "mojaloop.github.io"
    domain_name = "mojaloop.github.io"
    custom_origin_config {
      origin_protocol_policy = "match-viewer"
      http_port            = 80
      https_port           = 443
      origin_ssl_protocols = ["TLSv1.2", "TLSv1.1", "TLSv1"]
    }
  }

  default_root_object = "index.html"

  logging_config {
    bucket = aws_s3_bucket.website_logs.bucket_domain_name
    prefix = "${var.website-domain-main}/"
  }

  // List of cache behaviours - path redirects must be first, wildcard last
  ordered_cache_behavior {
    path_pattern = "/business-operations-framework-docs/*"
    target_origin_id = "mojaloop.github.io"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    viewer_protocol_policy = "allow-all"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  ordered_cache_behavior {
    path_pattern = "/business-operations-framework-docs"
    target_origin_id = "mojaloop.github.io"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    viewer_protocol_policy = "allow-all"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  ordered_cache_behavior {
    path_pattern = "/mojaloop-business-docs/*"
    target_origin_id = "mojaloop.github.io"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    viewer_protocol_policy = "allow-all"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  ordered_cache_behavior {
    path_pattern = "/mojaloop-business-docs"
    target_origin_id = "mojaloop.github.io"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    viewer_protocol_policy = "allow-all"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  ordered_cache_behavior {
    path_pattern = "/reference-architecture-doc/*"
    target_origin_id = "mojaloop.github.io"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    viewer_protocol_policy = "allow-all"
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  ordered_cache_behavior {
    path_pattern = "/reference-architecture-doc"
    target_origin_id = "mojaloop.github.io"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    viewer_protocol_policy = "allow-all"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }
  ordered_cache_behavior {
    path_pattern = "/charts/*"
    target_origin_id = "mojaloop.github.io"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    viewer_protocol_policy = "allow-all"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "origin-bucket-${aws_s3_bucket.website_root.id}"
    min_ttl          = "0"
    default_ttl      = "300"
    max_ttl          = "1200"

    # TODO: change this once we have https supported
    # viewer_protocol_policy = "redirect-to-https" # Redirects any HTTP request to HTTPS
    viewer_protocol_policy = "allow-all"
    compress               = true
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    # A custom cloudfront function that lets us dynamically
    # configure redirects
    function_association {
      event_type = "viewer-request"
      function_arn = aws_cloudfront_function.docs-redirects.arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn = var.cloudfront-certificate-arn
    ssl_support_method  = "sni-only"
  }
  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_page_path    = "/404.html"
    response_code         = 404
  }

  tags = merge(var.tags, {
    ManagedBy = "terraform"
    Changed   = formatdate("YYYY-MM-DD hh:mm ZZZ", timestamp())
  })

  lifecycle {
    ignore_changes = [
      tags["Changed"],
      viewer_certificate,
    ]
  }
}

resource "aws_cloudfront_function" "docs-redirects" {
  provider = aws.custom
  name    = "${replace(var.website-domain-main, ".", "-")}-docs-redirects"
  runtime = "cloudfront-js-1.0"
  comment = "main"
  publish = true
  code    = file("${path.module}/redirect/index.js")
}