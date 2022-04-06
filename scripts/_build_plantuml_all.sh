#!/usr/bin/env bash


##
# _build_plantuml_all.sh
#
# searches through repo for plantuml sources matching $PUML_MATCH
# and exports them using `node-plantuml`.
#
# In order to build deterministic .svgs, we use a puml docker image that is
# pegged to a specific version
##

set -eu

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PUML_PORT=9999
export PUML_BASE_URL=http://localhost:${PUML_PORT}

# Match filenames ending with .puml or .plantuml by default
PUML_MATCH=${PUML_MATCH:=*.p*uml}

trap ctrl_c INT
function ctrl_c() {
  echo "exit early - stopping docker"
  docker stop puml-local
  exit 1
}

# run the docker puml server
docker run -d --rm \
  --name puml-local \
  -p ${PUML_PORT}:8080 \
  plantuml/plantuml-server:jetty-v1.2020.21

# Wait for docker to be up
sleep 2

echo "Searching for files matching pattern: ${PUML_MATCH}"
for i in $(find ${DIR}/../docs -name ${PUML_MATCH}); do
  echo "rendering .puml -> .svg for diagram diagram: $i"
  
  # add the .svg file alongside the original
  ${DIR}/_render_svg.js $i
done

docker stop puml-local
