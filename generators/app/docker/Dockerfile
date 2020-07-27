FROM node:12-alpine

# Set working directory
WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

# Build assets
RUN yarn build-assets
