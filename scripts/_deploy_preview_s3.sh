#!/usr/bin/env bash


# deploys the preview docs to an s3 bucket
# I manually created the bucket: `mojaloop-docs-preview`
# in the eu-west-2 region
# and followed the guide: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EnableWebsiteHosting.html
# to manually configure the bucket for website hosting
# And this guide: https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/
# to set up Cloudfront and Route53
# "Using a REST API endpoint as the origin, with access restricted by an OAI"

# The website should be available at:
# https://docs.mojaloop.io/pr/<number>

# Required tools:
# - aws-cli
# - aws-mfa (if running as user, not CI)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
NVM_DIR=$HOME/.nvm
export AWS_REGION="${AWS_REGION:-eu-west-2}"
export BUCKET_NAME="${BUCKET_NAME:-docs.mojaloop.io-root}"
export DOMAIN="${DOMAIN:-docs.mojaloop.io}"
export IS_PR="${IS_PR:-false}"
export PR_NUMBER="${PR_NUMBER:-}"

set -e
set -u

# make sure we can actually list the s3 buckets
aws s3 ls s3://${BUCKET_NAME}

# build new vuepress site
rm -rf ${DIR}/../build
cd ${DIR}/../
npm ci
npm run build
mv ${DIR}/../docs/.vuepress/dist ${DIR}/../build


# build legacy docs - will be removed once all docs are migrated to v2.0
# Removing from here! multiple node versions in CI/CD are really hard!
# cd ${DIR}/../legacy
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# nvm install 10.15.1
# nvm use 10.15.1
# npm i
# npm run gitbook:build
# copy to a legacy subfolder
mv ${DIR}/../legacy/_book ${DIR}/../build/legacy


# TODO: can we be smart about docs versions here? maybe every minor version we can keep...

# Determine the target path based on whether this is a PR or not
if [ "$IS_PR" = "true" ] && [ -n "$PR_NUMBER" ]; then
  TARGET_PATH="pr/${PR_NUMBER}"
else
  TARGET_PATH=""
fi

# upload built files to s3 
if [ -n "$TARGET_PATH" ]; then
  aws s3 sync ${DIR}/../build s3://${BUCKET_NAME}/${TARGET_PATH} \
    --acl public-read
else
  aws s3 sync ${DIR}/../build s3://${BUCKET_NAME} \
    --acl public-read
fi

if [ "$IS_PR" = "true" ] && [ -n "$PR_NUMBER" ]; then
  echo "Preview deployment is available at: https://${DOMAIN}/pr/${PR_NUMBER}"
else
  echo "Deployment is available at: https://${DOMAIN}"
fi