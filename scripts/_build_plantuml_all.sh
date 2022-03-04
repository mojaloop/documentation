#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PUML_PORT=9999
export PUML_BASE_URL=http://localhost:${PUML_PORT}

##
# searches through repo for plantuml sources
# and exports them using `node-plantuml`
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

# Wait for docker to be up
sleep 2

for i in $(find ${DIR}/../docs -name '*.puml'); do
  echo "rendering .puml -> .svg for diagram diagram: $i"
  # make the destination directory if not exists
  mkdir -p $(dirname $i | sed 's#docs#docs/out#g')
  ${DIR}/_render_svg.js $i $(echo $i | sed 's/puml/svg/g' | sed 's#docs#docs/out#g')
done

docker stop puml-local
