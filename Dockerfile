FROM mhart/alpine-node:10.15.1

WORKDIR /opt/gitbook
COPY . /opt/gitbook

RUN apk add --no-cache -t build-dependencies openjdk8-jre git make gcc g++ python libtool autoconf automake

WORKDIR /opt/gitbook/repo

RUN npm ci

RUN apk del build-dependencies

EXPOSE 8989

CMD npm run gitbook:serve
