#!/usr/bin/env bash


##
# _build_plantuml.sh
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

# if MODE=STAGED_GIT, then search staged git files
# if MODE=ALL, then search the whole repo
MODE=${MODE:=ALL}

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

echo "Searching for ${MODE} files matching pattern: ${PUML_MATCH}"

case ${MODE} in
  # search only for the staged files - much faster to run as a git hook
  STAGED_GIT)
    for i in $(git diff --staged --name-only `find ${DIR}/../docs -name ${PUML_MATCH}`); do
      echo "rendering .puml -> .svg for diagram diagram: $i"
      
      # add the .svg file alongside the original
      ${DIR}/_render_svg.js $i
    done
  ;;

  # search all files
  ALL)
    for i in $(find ${DIR}/../docs -name ${PUML_MATCH}); do
      echo "rendering .puml -> .svg for diagram diagram: $i"
      
      # add the .svg file alongside the original
      ${DIR}/_render_svg.js $i
    done
  ;;

  *)
    echo "unsupported search MODE:${MODE}"
    exit 1
  ;;
esac

docker stop puml-local
