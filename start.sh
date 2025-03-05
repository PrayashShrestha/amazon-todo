#!/bin/zsh

checkNodeVersion(){
  node_version=$(node -v | sed 's/[^0-9.]//g')
  echo $node_version

  if [[ $(printf "%s\n" "$node_version" "22" | sort -n | head -n 1) != "22" ]]; then
    echo "Error: Node.js version 22 or higher is required. Current version is $node_version."
    exit 1
  fi
  echo "Node.js version check passed. Current version is $node_version."
}


start(){
  checkNodeVersion
  docker compose -f ./backend/docker-compose.yaml up --build
  cd frontend
  npm install
  cp cat .env.sample > .env
  npm run dev
}


start