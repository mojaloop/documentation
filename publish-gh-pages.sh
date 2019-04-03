#!/usr/bin/env bash

# install the plugins and build the static site
echo "Install npm dependencies..."
npm install

echo "Build gitbook"
npm run gitbook:build

echo "Checking out gh-pages"
git checkout gh-pages

echo "Copying..."
git pull mojaloop gh-pages --rebase

echo "Copying contents of _book to root..."
cp -R _book/* .

echo "Cleaning up **/*.md files..."
find . -name "*.md" -type f -delete

echo "Cleaning up node_modules directory..."
git clean -fx node_modules
echo "Cleaning up _book directory..."
git clean -fx _book

echo "Staging changes..."
git add .

# commit
git commit -a -m "Update gh-pages on github..."

# push to the origin
git push mojaloop gh-pages

# checkout to the master branch
#git checkout master
