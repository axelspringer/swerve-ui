# ---- Base Node ----
FROM node:10-alpine AS dependencies

LABEL NAME="red-swerve-ui"

WORKDIR /app
COPY . /app

ARG NODE_ENV
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install -g @vue/cli && \
    npm install
RUN vue-cli-service build --mode NODE_ENV

# ---- Release ----å
FROM nginx AS release

COPY --from=dependencies /app/dist /usr/share/nginx/html