#!/usr/bin/env bash

docker rm -f `docker ps -qa`
docker rmi `docker images -qa`
docker build -t dan1elhughes/pr-dashboard .
