FROM nginx AS release

EXPOSE 8080

COPY dist /usr/share/nginx/html
