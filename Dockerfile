ARG APP_HOME=/node/app

# build stage
FROM node:latest as build
ARG APP_HOME
WORKDIR ${APP_HOME}
COPY package.json ${APP_HOME}
COPY package-lock.json ${APP_HOME}
COPY tsconfig.json ${APP_HOME}
RUN echo -n 'node '; node -v; \
    echo -n 'npm '; npm -v ; \
    npm install --production
COPY src ${APP_HOME}/src/
COPY public ${APP_HOME}/public/
RUN npm run build

# upload stage 
FROM nginx:latest
ARG APP_HOME
COPY --from=build ${APP_HOME}/build /usr/share/nginx/html
ADD docker/nginx/default.conf /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]