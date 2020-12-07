

# hmm... maybe we need to dig more into plantuml for this shit
java -Dplantuml.include.path=./ -Djava.awt.headless=true -jar ./node_modules/node-plantuml/vendor/plantuml.jar


BASE=mojaloop-technical-overview/transaction-requests-service/assets/diagrams/sequence/seq-trx-req-authorizations-3.0.0
./node_modules/.bin/puml generate -s ${BASE}.plantuml -o ${BASE}.svg -i ${BASE}.plantuml
cat ${BASE}.svg
ls ${BASE}.svg