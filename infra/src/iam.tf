
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
      "Principal": "*",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "${aws_s3_bucket.website_root.arn}/*",
        "${aws_s3_bucket.website_root.arn}",
        "TODO"
      ]
    },
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:DeleteItem"
          ],
          # TODO
          "Resource": "arn:aws:dynamodb:*:*:table/mytable"
        }
      ]
    }
  ]
}
POLICY

  tags = merge(var.tags, {
    ManagedBy = "mojaloop/documentation"
    Changed   = formatdate("YYYY-MM-DD hh:mm ZZZ", timestamp())
  })

  lifecycle {
    ignore_changes = [tags["Changed"]]
  }
}

resource "aws_iam_group" "infra_group" {
  provider = aws.custom
  name = "${var.website-domain-main}-infra-group"
}