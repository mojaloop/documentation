#!/usr/bin/env bash

export GIT_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
echo "Publishing current branch: $GIT_BRANCH..."

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

# echo "Cleaning up **/*.md files..."
# find . -name "*.md" -type f -delete

# echo "Cleaning up node_modules directory..."
# git clean -fx node_modules
# echo "Cleaning up _book directory..."
# git clean -fx _book

echo "Staging general changes..."
git add .

echo "Staging generated UML..."
git add -f assets/images/uml/*.*

# commit
git commit -a -m "Update gh-pages on github..."

# push to the origin
git push mojaloop gh-pages

# checkout to the master branch
git checkout $GIT_BRANCH
