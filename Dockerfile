FROM nginx AS release

COPY dist /usr/share/nginx/html
