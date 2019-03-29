FROM mhart/alpine-node:10.15.1 as gitbook-builder

WORKDIR /opt/gitbook
COPY . /opt/gitbook

RUN apk add --no-cache -t build-dependencies openjdk8-jre git make gcc g++ python libtool autoconf automake graphviz ttf-droid ttf-droid-nonlatin curl

ENV PLANTUML_VERSION 1.2019.3
ENV LANG en_US.UTF-8
RUN curl -L https://sourceforge.net/projects/plantuml/files/plantuml.${PLANTUML_VERSION}.jar/download -o plantuml.jar

RUN npm install

RUN npm run gitbook:install

FROM mhart/alpine-node:10.15.1 as gitbook-server

WORKDIR /opt/gitbook
COPY --from=gitbook-builder /opt/gitbook .

RUN apk add --no-cache -t build-dependencies git make gcc g++ python libtool autoconf automake

#RUN npm run gitbook:build

EXPOSE 8989

CMD npm run gitbook:serveNoReload
