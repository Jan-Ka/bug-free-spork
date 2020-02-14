FROM nginx:1.17.8-alpine
LABEL Name=bug-free-spork Version=1.0.0
COPY /dist/bug-free-spork /usr/share/nginx/html
