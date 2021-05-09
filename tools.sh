#!/bin/bash
    
# Nuke all Docker containers, newtworks, volumes and images
nuke () {
  echo "Nuking Docker!"
  docker system prune --all --volumes
}

# Execute docker-compose up
up () {
  echo "Building network, containers, images, and volumes..."
  docker-compose up
}

# Execute docker-compose up --build
build () {
  echo "Building network, containers, images, and volumes..."
  docker-compose up --build
}

"$@"
