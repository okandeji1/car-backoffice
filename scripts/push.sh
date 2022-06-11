#!/usr/bin/env bash


branch=${1}

git checkout develop
git pull origin develop
git merge local/develop
git push origin develop
git checkout beta
git pull origin beta
git merge develop
git push origin beta
if [[ "$branch" == "master" ]]
then
  git checkout master
  git pull origin master
  git merge beta
  git push origin master
fi
git checkout local/develop
