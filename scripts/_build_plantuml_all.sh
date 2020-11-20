#!/usr/bin/env bash 

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PATH="${PATH}:${DIR}/../node_modules/.bin"

##
# searches through repo for plantuml sources
# and exports them using `node-plantuml`
##

for i in $(find ${DIR}/.. -name '*.p*uml'); do
  echo "rendering .puml -> .svg for diagram diagram: $i"
  puml generate -s $i -o $(echo $i | sed 's/puml/svg/g' | sed 's/plantuml/svg/g' ) -i $(echo $i | sed -e 's;[^/]*$;;');
done
