ARG PORT=8989

########################
#### gitbook-builder ###
########################

FROM node:10.15-alpine as gitbook-builder

ENV PORT $PORT

WORKDIR /opt/gitbook
COPY . /opt/gitbook

RUN apk add --no-cache -t build-dependencies openjdk8-jre git make gcc g++ python libtool autoconf automake graphviz ttf-droid ttf-droid-nonlatin curl

ENV PLANTUML_VERSION 1.2019.3
ENV LANG en_US.UTF-8
RUN curl -L https://sourceforge.net/projects/plantuml/files/plantuml.${PLANTUML_VERSION}.jar/download -o plantuml.jar

RUN npm install

RUN npm run gitbook:build

########################
#### gitbook-server ####
########################

FROM node:10.15-alpine as gitbook-server

ENV PORT $PORT

WORKDIR /opt/gitbook
COPY --from=gitbook-builder /opt/gitbook .
COPY . /opt/gitbook

EXPOSE $PORT

CMD npm run express:run
