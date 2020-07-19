FROM node:12.16-alpine

# Set working directory
WORKDIR /usr/src/app

COPY ./package*.json .
COPY ./yarn.lock .

RUN npm install

COPY . .

# Build assets
RUN yarn build-assets
