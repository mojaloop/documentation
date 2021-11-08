
resource "aws_iam_group_policy" "infa_group_policy" {
  provider = aws.custom
  name = "${var.website-domain-main}-infra"
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
        "${aws_s3_bucket.website_root.arn}/*",
        "${aws_s3_bucket.website_root.arn}",
        "${aws_s3_bucket.website_logs.arn}/*",
        "${aws_s3_bucket.website_logs.arn}"
      ]
    },
    {
      "Sid": "VisualEditor1",
      "Effect": "Allow",
      "Action": "cloudfront:*",
      "Resource": [
        "${aws_cloudfront_distribution.website_cdn_root.arn}",
        "${aws_cloudfront_function.docs-redirects.arn}"

      ]
    },
    {
      "Sid": "VisualEditor2",
      "Effect": "Allow",
      "Action": [
        "iam:GetGroupPolicy",
        "iam:GetGroup"
      ],
      "Resource": "*"
    }
  ]
}
POLICY

}

resource "aws_iam_group" "infra_group" {
  provider = aws.custom
  name = "${var.website-domain-main}-infra-group"
}