#!/usr/bin/env bash


# deploys the preview docs to an s3 bucket
# I manually created the bucket: `mojaloop-docs-preview`
# in the eu-west-2 region
# and followed the guide: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EnableWebsiteHosting.html
# to manually configure the bucket for website hosting

# The website should be available at:
# http://mojaloop-docs-preview.s3-website.eu-west-2.amazonaws.com

# Required tools:
# - aws-cli
# - aws-mfa (if running as user, not CI)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
export AWS_REGION=eu-west-2
export BUCKET_NAME=mojaloop-docs-preview

set -e
set -u

# make sure we can actually list the s3 buckets
aws s3 ls

# build
cd ${DIR}/../vuepress
yarn
yarn build

exit 0

# TODO: can we be smart about docs versions here? maybe every minor version we can keep...

# upload built files to s3 
aws s3 sync ${DIR}/../build s3://${BUCKET_NAME} \
  --acl public-read

echo "go to: http://${BUCKET_NAME}.s3-website.${AWS_REGION}.amazonaws.com to see the live site!"