########################
#### gitbook-builder ###
########################

FROM node:10.15-alpine as gitbook-builder

WORKDIR /opt/gitbook
COPY . /opt/gitbook

RUN apk add --no-cache -t build-dependencies openjdk8-jre git make gcc g++ python libtool autoconf automake graphviz ttf-droid ttf-droid-nonlatin curl

ENV PLANTUML_VERSION 1.2019.3
ENV LANG en_US.UTF-8
RUN curl -L https://sourceforge.net/projects/plantuml/files/plantuml.${PLANTUML_VERSION}.jar/download -o plantuml.jar

RUN npm install

########################
#### gitbook-server ####
########################

FROM node:10.15-alpine as gitbook-server

WORKDIR /opt/gitbook
COPY --from=gitbook-builder /opt/gitbook .

RUN apk add --no-cache -t build-dependencies git make gcc g++ python libtool autoconf automake

EXPOSE 8989

CMD npm run gitbook:serveNoReload
