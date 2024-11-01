#!/usr/bin/env bash

##
# Synchronises the definition docs from their disparate locations into one place.
#
# The API Spec for the Third Party API is managed by the api-snippets project
##

set -eu

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
GIT_URL="https://github.com/mojaloop/api-snippets.git"
BRANCH='master'
CLONE_DIR='/tmp/api-snippets'

rm -rf ${CLONE_DIR}

git clone -b ${BRANCH} ${GIT_URL} ${CLONE_DIR}

# API definition, grab from mojaloop/pisp-project
cp ${CLONE_DIR}/thirdparty/openapi3/thirdparty-dfsp-api.yaml ${DIR}/thirdparty-dfsp-v1.0.yaml
cp ${CLONE_DIR}/thirdparty/openapi3/thirdparty-pisp-api.yaml ${DIR}/thirdparty-pisp-v1.0.yaml
