#!/usr/bin/env bash

REGISTRY="$CI_REGISTRY\/$CI_PROJECT_NAMESPACE\/$CI_PROJECT_NAME"

sed -i "s/\${CI_PROJECT_NAME}/$CI_PROJECT_NAME/g" ./helm-chart/Chart.yaml
sed -i "s/\${NEXT_VERSION}/$NEXT_VERSION/g" ./helm-chart/Chart.yaml

sed -i "s/\${ENVIRONMENT}/$CI_ENVIRONMENT_NAME/g" ./helm-chart/values.yaml
sed -i "s/\${DOPPLER_TOKEN}/$DOPPLER_TOKEN/g" ./helm-chart/values.yaml
sed -i "s/\${NAMESPACE}/$NAMESPACE/g" ./helm-chart/values.yaml
sed -i "s/\${CI_PROJECT_NAME}/$CI_PROJECT_NAME/g" ./helm-chart/values.yaml
sed -i "s/\${HOST}/$CI_ENVIRONMENT_URL/g" ./helm-chart/values.yaml
sed -i "s/\${PORT}/$PORT/g" ./helm-chart/values.yaml
sed -i "s/\${REGISTRY}/$REGISTRY/g" ./helm-chart/values.yaml
sed -i "s/\${NEXT_VERSION}/$NEXT_VERSION/g" ./helm-chart/values.yaml
sed -i "s/\${REGISTRY_AUTH}/$REGISTRY_AUTH/g" ./helm-chart/values.yaml
sed -i "s/\${CLUSTER_ISSUER_EMAIL}/$CLUSTER_ISSUER_EMAIL/g" ./helm-chart/values.yaml
