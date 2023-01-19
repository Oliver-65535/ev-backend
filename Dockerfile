FROM node:16.3.0-alpine as build

WORKDIR /app

# COPY package.json .
# COPY yarn.lock .
# COPY ormconfig.js .

RUN yarn

COPY . .

# RUN yarn build

ENTRYPOINT [ "yarn", "start" ]

#---

# FROM node:16.3.0-alpine

# WORKDIR /app

# ENV NODE_ENV=production

# COPY package.json .
# COPY yarn.lock .
# COPY ormconfig.js .

# RUN yarn install --production --ignore-engines

# COPY --from=build /app/dist ./dist

# EXPOSE 5000

# ENTRYPOINT [ "yarn", "start:prod" ]