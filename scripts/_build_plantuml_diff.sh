#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PATH="${PATH}:${DIR}/../node_modules/.bin"

##
# searches through staged files for .puml/.plantuml sources
# and updates svgs them using `node-plantuml`
##
for i in $(git diff --staged --name-only `find ${DIR}/.. -name '*.p*uml'`); do
  echo "rendering .puml -> .svg for diagram diagram: $i"
  # make the destination directory if not exists
  puml generate -s $i -o $(echo $i | sed 's/puml/svg/g' | sed 's/plantuml/svg/g') -i $(echo $i | sed -e 's;[^/]*$;;');
done

git add ./**/*.svg
