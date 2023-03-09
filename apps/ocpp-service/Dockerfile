FROM node:18-alpine

COPY package.json .

RUN yarn

COPY . .

# RUN yarn build

EXPOSE 3017

ENTRYPOINT [ "yarn", "start"]
