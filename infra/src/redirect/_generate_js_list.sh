#!/usr/bin/env bash

set -eu

# Easily generate a `redirectMapping` js array
# from the link_list.txt file
# 
# usage:
# cat link_list.txt | _generate_js_list.sh

# format:
# from;to


echo "["
while IFS='$\n' read -r line; do
    # do whatever with line
    echo $line | awk 'BEGIN { FS=";"} {print "{ from: \"" $1 "\", to: \"" $2 "\"}," }'
done

echo "]"