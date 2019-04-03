#!/usr/bin/env bash

# install the plugins and build the static site
npm install
npm run gitbook:build

# checkout to the gh-pages branch
git checkout gh-pages

# pull the latest updates
git pull mojaloop gh-pages --rebase

# copy the static site files into the current directory.
cp -R _book/* .

# remove 'node_modules' and '_book' directory
git clean -fx node_modules
git clean -fx _book

# add all files
git add .

# commit
git commit -a -m "Update gh-pages on github"

# push to the origin
git push mojaloop gh-pages

# checkout to the master branch
#git checkout master
