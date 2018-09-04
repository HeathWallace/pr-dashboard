#!/usr/bin/env bash

FOLDER="hw-internal-tools"
IMAGE="pr-dashboard"
REGISTRY="proget.heathwallace.com:443"

# Log into the image registry
docker login "$REGISTRY" -u "$PROGET_USERNAME" -p "$PROGET_PASSWORD"

# Tag the built image as the latest one on Proget.
docker tag "$IMAGE:latest" "$REGISTRY/$FOLDER/$IMAGE"

# Push the image up.
docker push "$REGISTRY/$FOLDER/$IMAGE"
