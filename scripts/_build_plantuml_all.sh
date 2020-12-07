#!/usr/bin/env bash 

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

##
# searches through repo for plantuml sources
# and exports them using `node-plantuml`
##
# note: this `find` is not optimal, but both BSD and GNU compatible
for i in $(find ${DIR}/.. -name '*.p*uml' | grep -v node_modules); do
  echo "rendering .puml -> .svg for diagram diagram: $i"
  npx puml generate -s $i -o $(echo $i | sed 's/puml/svg/g' | sed 's/plantuml/svg/g' ) -i $(echo $i | sed -e 's;[^/]*$;;');
done

find . -name '*.p*uml'