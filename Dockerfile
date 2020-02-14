# Build
FROM node:13.8.0-alpine3.11 AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Run
FROM nginx:1.17.8-alpine
LABEL Name=bug-free-spork Version=1.0.0
COPY --from=build /usr/src/app/dist/bug-free-spork /usr/share/nginx/html
