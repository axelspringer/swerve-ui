# ---- Base Node ----
FROM node:10-alpine AS dependencies

LABEL NAME="red-swerve-ui"

WORKDIR /app
COPY . /app

ARG NODE_ENV
ENV PATH /app/node_modules/.bin:$PATH
RUN npm config set unsafe-perm true
RUN npm install -g @vue/cli && \
    npm install
RUN vue-cli-service build --mode NODE_ENV

# ---- Release ----å
FROM nginx AS release

EXPOSE 8080

COPY --from=dependencies /app/dist /usr/share/nginx/html