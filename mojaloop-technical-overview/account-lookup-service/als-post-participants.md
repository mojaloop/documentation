# Sequence Diagram for POST Participants

## Notes
- Operation only supports requests which contain:
    - All Participant's FSPs match the FSPIOP-Source
    - All Participant's TYPEs are the same
    - All Participant's will be of the same Currency as per the [Mojaloop {{ book.importedVars.mojaloop.spec.version }} Specification]({{ book.importedVars.mojaloop.spec.uri.doc }})
- Duplicate POST Requests with matching TYPE and CURRENCY will be considered an __update__ operation. The existing record must be completely **replaced** in its entirety. 

## Sequence Diagram

```puml { src="./mojaloop-technical-overview/account-lookup-service/assets/diagrams/sequence/seq-acct-lookup-post-participants-7.2.1.plantuml" }
```
