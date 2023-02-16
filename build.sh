# #!/bin/bash

# This script compiles nestjs and Angular application and puts them into a single NodeJS prject
echo "-- Started build script for Angular & NodeJS --"
echo "Removing dist directory..."
rm -rf dist

echo "Build nest app..."
nest build

# echo "Copying configurations..."
# mkdir dist/config
# cp -Rf src/config/* dist/config

echo "Building Angular app for distribution..."
cd client
./node_modules/.bin/ng build --aot=true --prod

echo "Copying angular dist into dist directory..."
mkdir ../dist/dist
mkdir ../dist/logs
cp -rf dist ../dist

echo "Removing client dist directory..."
rm -rf dist

# Go back to the current directory
cd ..

echo "-- Finished building Angular & NodeJS, check dist directory --"

echo "commit && push"
git add .
git commit -m "build.sh"
git push
