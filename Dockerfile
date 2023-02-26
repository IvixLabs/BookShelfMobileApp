FROM alpine:3.17

RUN apk update
RUN apk upgrade


RUN apk add bash
RUN apk add curl
RUN apk add nginx
RUN apk add nodejs
RUN apk add npm

RUN npm install -g @ionic/cli

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY src src
COPY angular.json .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.spec.json .
COPY ionic.config.json .
COPY ngsw-config.json .

RUN ionic build --prod

COPY docker/default.conf /etc/nginx/http.d/default.conf

CMD nginx -g 'daemon off;'
