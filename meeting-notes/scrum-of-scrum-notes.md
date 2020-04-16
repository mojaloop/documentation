# Meeting Notes from Weekly Scrum-of-scrum meetings

## OSS Scrum or scrum calls Thu **April 9th** 2020

1. Coil:
  a. Don: perf testing - Under utilization of resources - more tweaking to be done
  b. Don: HSM integration - demo prep
  c. Don: Legacy adapter - docs update - looking for feedback
2. Crosslake:
  a. Kim: FRMS meeting earlier today - proposals made
  b. Kim: PI10 meetings update, registrations - questions
  c. Lewis: PISP: more planning - working on stories, items, but discussing designs on Oauth, Fido
  d. Lewis: Performance: discussion with Pedro about PoC for arch changes, for Event Sourcing, CQRS, etc
  e. Lewis: Code standards - updated
  f. Lewis: Code quality & Security stream: HSM usage, demo, Security in the OSS community
  g. Lewis: Container scans working - will work with Victor, early benchmarks
  h. Lewis: Finally - versioning update
3. Mifos:
  a. Ed: Work on Payment Hub, integrating with Kafka, ML transactions going through, using Elastic Search, for backoffice ops monitoring
  b. Ed: Demo Prep for PI10 meetings
4. Core team:
  a. Sam: Performance: Drafting reports, Moving metrics, other enhancements to master branches
  b. Sam: Performance: Wrapping-up final set of tests; Phase4 roadmap and kickoff planning
  c. Sam: Community Support: Fixing bugs (few major discussion items fixed), providing clarifications regarding implementation decisions, etc.
  d. Sam: Merchant Payment Support - Provide tests and validate Merchant "Request to Pay" use case, standardization on-going
  e. Sam: Accents in names issue - implementation ongoing
  f. Sam: Settlements V2 implementation being done by OSS-TIPS team ongoing
  g. Sam: Testing toolkit: Assertions being added for API resources, JWS done, mTLS being added
  h. Sam: Testing toolkit: Usage guide in progress along with adding Golden path related tests
  i. Sam: CCB: V1.1 of the ML FSPIOP API Definition - First draft done, waiting for review

## OSS Scrum or scrum calls Thu **April 2nd** 2020

1. Mifos:
  a. Ed Cable: Team continuing work on Payment Hub EE, Focus on Operational UI , capabilities for DFSP backends, Error event handling framework
2. Coil:
  a. Don. C: Performance - setup done and got started - on GCP - getting high latency times - need to troubleshoot and will probably get support from other contributors
  b. Don. C: ATM - OTP - Encryption
3. Crosslake:
  a. Kim W: Agenda for PI10 drafted - email should good out soon
  b. Kim W: Schedule for PI10: Tue - Fri; 11am - 4pm GMT - Remote / Virtual event
  c. Lewis: Perf meeting later today - architecture deep dive
  d. Lewis: Versioning - In progress
  e. Lewis: Code quality & Security - Overall Security architecture, HSM covered by Coil
  f. Lewis: Mojaloop in a Vagrant box - in progress
4. Core team:
  a. Miguel: Performance: Wrapping up Perf work - nearing 900 TPS end-to-end; Currently attempting to identify / understand a single unit that needs this perf
  b. Sam: Performance: Wrapping-up final set of tests; Phase4 roadmap and kickoff planning
  c. Sam: Community Support: Fixing bugs (few major discussion items fixed), providing clarifications regarding implementation decisions, etc.
  d. Sam: Merchant Payment Support - Standardization on-going - Fixing issues in /authorizations
  e. Sam: Accents in names issue - implementation ongoing
  f. Sam: Settlements V2 implementation being done by OSS-TIPS team ongoing
  g. Sam: Testing toolkit: Assertions being added for API resources, JWS in progress
  h. Sam: CCB: V1.1 of the ML FSPIOP API Definition - drafting in progress

## OSS Scrum of scrum call Thu **March 26th** 2020

1. DA: Nico - Versioning topic discussed by Lewis, Matt, Sam
2. Crosslake:
  a. Kim: Finalizing Agenda - Monday to Friday
  b. Kim: Reach out if you want to present / speak
  c. Kim: Preparing pre-reads
  d. Kim: Fraud & AML workshop: Justus to post summary and notes to GitHub after the workshops
  e. Lewis: Performance workshop / deep-dive possibly Monday
  f. Lewis: PISP Design discussions ongoing
  g: Lewis: Code quality and security stream: i. Docker container security recommendations. ii. GDPR Scope for Mojaloop
3. Mifos:
  a. Ed / Istvan: Continue creating Lab
  b. Ed / Istvan: Fineract , new instance of Payment Hub - good progress
  c. Ed / Istvan: Working on operational monitoring of backend part (back-office debugging, monitoring, etc)
4. Simeon - Community Manager in attendance
5. Core team:
  a. Sam: Performance: Finalized phase-3 work. Get to immediate goals for logical conclusion - still ongoing - Phase4 roadmap and kickoff
  b. Sam: Community Support: Fixing bugs, providing clarifications regarding implementation decisions, etc.
  d. Sam: Merchant Payment Support - Standardization on-going - Metrics being added, event framework added
  e. Sam: Accents in names issue - Discussing issue, designing solution
  f. Sam: Settlements V2 implementation being done by OSS-TIPS team ongoing
  g. Sam: Testing toolkit: Assertions being added for API resources, JWS in progress. Usage guide in progress
  h. Sam: CCB: V1.1 of the ML FSPIOP API Definition - drafting in progress

## OSS Scrum or scrum call Thu **March 19th** 2020

1. Coil:
  a. Don: Looking at performance, network hops (avoid dup checks etc)
  b. Adrian: Renjith & Matt working on translation ISO20022, (to JWEs, etc) - demo by the time we meet on how to use HSM
2. Crosslake:
  a. Kim: Finishing action items from the Mid-PI Workshop, follow-up items
  b. Kim: April Community event is happening but will be a Virtual event. Kim has a planning event and will confirm details: Suggestions welcome
  c. Lewis: Performance - to include Don in other discussions
  d. Lewis: Code quality - GDPR requirements proposal
  e: Lewis: Versioning - iinitial draft made as PR - will be presented to DA next week
3. Mifos:
  a. Ed, Istvan: Payment Hub, envt in Azure, 
  b. Ed, Istvan: Transactions now going through
  c. Ed, Istvan: Next phase: to implement back office screens to see screens for business users
  d. Ed, Istvan: Workshop with Google on PISP
4. Core team:
  a. Sam: Perf - Combining prepare+position handler and fulfil+position handlers, characterization work ongoing
  b. Sam: Perf - Working on gaining an understanding of how 1 unit of Infrastructure looks like for a Mojaloop deployment
  c. Sam: Transaction requests service standardization: Added event framework, Adding metrics now
  d. Sam: Community Support: Fixing issues, upgrade issues, issue for allowing accents in names, etc,.
