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
# http://mojaloop-docs-preview.s3-website.eu-west-2.amazonaws.com
# or http://docs-preview.moja-lab.live/

# Required tools:
# - aws-cli
# - aws-mfa (if running as user, not CI)

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
NVM_DIR=$HOME/.nvm
export AWS_REGION="${AWS_REGION:-eu-west-2}"
export BUCKET_NAME="${BUCKET_NAME:-mojaloop-docs-preview}"
export DOMAIN="${DOMAIN:-docs-preview.moja-lab.live}"

set -e
set -u

# make sure we can actually list the s3 buckets
aws s3 ls s3://${BUCKET_NAME}

# build new vuepress site
rm -rf ${DIR}/../build
cd ${DIR}/../vuepress
yarn
yarn build || echo 'WARNING: yarn build failed! Please fix this - just a temporary workaround'
mv ${DIR}/../vuepress/docs/.vuepress/dist ${DIR}/../build


# build legacy docs - will be removed once all docs are migrated to v2.0
# Removing from here! multiple node versions in CI/CD are really hard!
# cd ${DIR}/../gitbooks
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# nvm install 10.15.1
# nvm use 10.15.1
# npm i
# npm run gitbook:build
# copy to a legacy subfolder
mv ${DIR}/../gitbooks/_book ${DIR}/../build/legacy



# TODO: can we be smart about docs versions here? maybe every minor version we can keep...

# upload built files to s3 
aws s3 sync ${DIR}/../build s3://${BUCKET_NAME} \
  --acl public-read

echo "go to: "
echo "http://${BUCKET_NAME}.s3-website.${AWS_REGION}.amazonaws.com"
echo "or http://${DOMAIN}/ to see the live site!"