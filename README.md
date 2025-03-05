## SETUP

> Run npm install in Backend to make sure no red squiggly bars in the source code

## Manual Setup

- Install Node version 22
- checkout [nvm](https://github.com/nvm-sh/nvm) for managing multiple node versions

### Backend
- make sure docker in installed
- go to backend folder
- run docker-compose -f docker-compose.yaml up --build

### Frontend 
- go to frontend folder
- run npm install
- create new .env file and copy contents of .env.sample
- run npm run dev

## \*nix based system setup
```bash
 $ bash start.sh 
```


#### click [here](http://localhost:5173/todos) to go to browser