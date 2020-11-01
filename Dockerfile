ARG APP_HOME=/node/app

# build stage
FROM node:latest as build
ARG APP_HOME
WORKDIR ${APP_HOME}
COPY package.json ${APP_HOME}
COPY package-lock.json ${APP_HOME}
COPY tsconfig.json ${APP_HOME}
COPY webpack.config.js ${APP_HOME}
COPY webpack.config.prod.js ${APP_HOME}

CMD touch ${APP_HOME}/.env
CMD echo REACT_APP_TRAVIS="false" > ${APP_HOME}/.env
CMD echo REACT_APP_ALFHEIM_MODE="deploy" >> ${APP_HOME}/.env

RUN npm install --production
COPY src ${APP_HOME}/src/
COPY types ${APP_HOME}/types/
RUN npm run build


# upload stage 
FROM nginx:latest
ARG APP_HOME
ADD docker/nginx/default.conf /etc/nginx/conf.d
COPY --from=build ${APP_HOME}/dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
