#!/usr/bin/env bash

username=$(docker info | sed '/Username:/!d;s/.* //')

echo "Building $username/pr-dashboard"

docker build -t $username/pr-dashboard .
