#!/bin/sh

IID=$(curl --location --request POST "$CI_API_V4_URL/projects/$CI_PROJECT_ID/merge_requests" \
  --header "PRIVATE-TOKEN: $GL_API_ACCESS_TOKEN" \
  --header "Content-Type: application/json" \
  --data-raw '{
  "source_branch": "'"$CI_COMMIT_REF_NAME"'",
   "target_branch": "develop",
   "title": "'"$CI_COMMIT_TITLE"'",
   "description": "'"$CI_COMMIT_DESCRIPTION"'",
   "squash": "yes"
}' | grep -iEo \"iid\":[0-9]+ | grep -iEo [0-9]+)

curl --location --request PUT "$CI_API_V4_URL/projects/$CI_PROJECT_ID/merge_requests/$IID/merge" \
  --header "PRIVATE-TOKEN: $GL_API_ACCESS_TOKEN" \
  --data-raw '{
  "squash": "yes"
}'
