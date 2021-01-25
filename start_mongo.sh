#! /bin/sh
docker rm mongo && docker run --name mongo -v d:/Docker/Volumes/mongo/amazon:/data/db -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=secret mongo
