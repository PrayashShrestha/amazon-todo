FROM node:22 as builderStage

WORKDIR /usr/app
ENV NODE_ENV=production
COPY ["package.json","package-lock.json", "./"]
RUN npm ci
COPY . .

FROM node:22-alpine3.20

COPY --from=builderStage /usr/app/package.json /usr/app/package.json
COPY --from=builderStage /usr/app/node_modules /usr/app/node_modules
WORKDIR /usr/app
COPY nodemon.json nodemon.json
COPY tsconfig.json tsconfig.json
COPY ./src /usr/app/src

CMD ["npm" , "run" , "dev"]
