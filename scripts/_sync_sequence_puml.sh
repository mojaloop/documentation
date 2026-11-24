#!/usr/bin/env bash

##
# The images and puml diagrams for the Mojaloop API come from
# the mojaloop/mojaloop-specification repo
# 
# This script copies the latest diagrams from that repo
# into this one.
##


set -eu pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SOURCE_REPO_URL=git@github.com:mojaloop/mojaloop-specification.git
SOURCE_PATH_TO_COPY=/tmp/mojaloop-specification/assets/diagrams/
DESTINATION_PATH=${DIR}/../docs/api/assets

git clone ${SOURCE_REPO_URL} /tmp/mojaloop-specification || echo 'already cloned'

ls ${SOURCE_PATH_TO_COPY}

cp -R ${SOURCE_PATH_TO_COPY} ${DESTINATION_PATH}

# cleanup
rm -rf /tmp/mojaloop-specification