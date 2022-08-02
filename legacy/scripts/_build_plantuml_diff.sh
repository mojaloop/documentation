#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PUML_PORT=9999
export PUML_BASE_URL=http://localhost:${PUML_PORT}

##
# searches through staged files for .puml/.plantuml sources
# and updates svgs them using `node-plantuml`
##

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

for i in $(git diff --staged --name-only `find ${DIR}/.. -name '*.p*uml'`); do 
  echo "rendering .puml -> .svg for diagram diagram: $i"
  ${DIR}/_render_svg.mjs $1
done

docker stop puml-local

git add ./**/*.svg
