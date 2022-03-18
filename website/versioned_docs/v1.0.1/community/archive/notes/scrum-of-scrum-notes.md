# Meeting Notes from Weekly Scrum-of-scrum meetings

## OSS Scrum or scrum calls Thu **May 7th** 2020

1. Coil - Don:
  a Performance: 'Big Gap' problem; changes to cs-stream; changed results; putting together a doc with changes for review; Joran's work on concurrent message processing on Kafka topics -> try to test it; seeing 40-50% throughput;
  b LPS adapter: Working with Renjith (Applied Payments); putting together a lab / envt for partner teams to use it; Exploring collaboration with GSMA lab
2. Crosslake - Lewis:
  a. Performance: Had report out with Confluent with Nakul, engagement wrapping up; Disseminating docs Nakul produced
  b. PISP: Design discussions going on along with Implementation
  c. Versioning: Figuring scope for ZDD deployments
  d. Official launch related issues: DNS issues - worked on and were resolved
3. ModusBox - Sam:
  a. Performance: Moving / standardizing Perf changes from PI-9 into master (not all PoCs); Working on goals, strategy for PI10
  b. Core-team: Bulk transfers - getting started by providing support in sdk-scheme-adapter
  c. Maintenance (Bug Fixes):
    i) Accents in names - Ongoing
    ii) Mojaloop simulator on AWS deployments - almost done, working on QA scripts (on 'dev2' - second environment)
  d. Testing toolkit: Currently available for testing - all resources in ML FSPIOP API Supported. Reports can be generated. Working on providing Command line options and more portability
  e. CCB: Publishing v1.1 Spec this week - API Definition and corresponding Swagger (Open API)
4. Virtual / Mojaloop Foundation - Megan:
  a. Launch of Mojaloop Foundation
  b. Paula H - Executive Director of the Mojaloop Foundation.
5. Mojaloop Foundation - Simeon:
  a. Provide feedback on the Community Survey 
  b. Hackathon possible in early June time-frame in collaboration with Google
  c. Mojaloop Newsletter with interesting items such as ML FSPIOP v1.1 Spec, Helm v10.1.0 release, etc. to be launched next week.

## OSS Scrum or scrum calls Thu **April 16th** 2020

1. Coil:
  a. Don C: Perf - preliminary results - got some numbers - got individual handler numbers, to compare with individual handlers - focusing on DB - a thrid of time for one leg spent on perf
  b. Don C: HSM: Renjit's team demo'ed the demo for next week - event prep
2. Crosslake:
  a. Lewis D: PISP - Sprint planning - iterating designs
  b. Lewis D: Hackathons - Discussed a few concepts with Innocent K (HiPiPo)
  c. Lewis D: Has access to GSMA lab - will play around
  d. Lewis D: Versioning: working on deck for PI10
  e. Kim W: Performance stream overall update - workshop with Confluent
  f. Kim W: Performance stream update - Pedro putting together a proposal, presentation
3. Mifos:
  a. Ed C: Demo Prep for PI10 meetings
4. Virtual:
  a. Megan : Getting ready for the PI10 event and Logistics
5. DA:
  a. Nico: Discussing PISP issue which Michael will be the owner of
6. Core team:
  a. Sam K: Performance: Preparing Metrics; Doing performance runs to baseline master branches after moving some enhancements to master
  b. Sam K: Accents in names issue - implementation ongoing
  f. Sam K: Settlements V2 implementation being done by OSS-TIPS team ongoing - QA done for current iteration
  g. Sam K: Testing toolkit: Improving unit test coverage. Assertions added for various endpoints
  i. Sam K: CCB: V1.1 of the ML FSPIOP API Definition - First draft done, Reviews in progress
7. Mojaloop Community:
  a. Community update by Simeon

## OSS Scrum or scrum calls Thu **April 9th** 2020

1. Coil:
  a. Don C: perf testing - Under utilization of resources - more tweaking to be done
  b. Don C: HSM integration - demo prep
  c. Don C: Legacy adapter - docs update - looking for feedback
2. Crosslake:
  a. Kim W: FRMS meeting earlier today - proposals made
  b. Kim W: PI10 meetings update, registrations - questions
  c. Lewis D: PISP: more planning - working on stories, items, but discussing designs on Oauth, Fido
  d. Lewis D: Performance: discussion with Pedro about PoC for arch changes, for Event Sourcing, CQRS, etc
  e. Lewis D: Code standards - updated
  f. Lewis D: Code quality & Security stream: HSM usage, demo, Security in the OSS community
  g. Lewis D: Container scans working - will work with Victor, early benchmarks
  h. Lewis D: Finally - versioning update
3. Mifos:
  a. Ed C: Work on Payment Hub, integrating with Kafka, ML transactions going through, usiing Elastic Search, for backoffice ops moniring
  b. Ed C: Demo Prep for PI10 meetings
4. Core team:
  a. Sam K: Performance: Drafting reports, Moving metrics, other enhancements to master branches
  b. Sam K: Performance: Wrapping-up final set of tests; Phase4 roadmap and kickoff planning
  c. Sam K: Community Support: Fixing bugs (few major discussion items fixed), providing clarifications regarding implementation decisions, etc.
  d. Sam K: Merchant Payment Support - Provide tests and validate Merchant "Request to Pay" use case, standardization on-going
  e. Sam K: Accents in names issue - implementation ongoing
  f. Sam K: Settlements V2 implementation being done by OSS-TIPS team ongoing
  g. Sam K: Testing toolkit: Assertions being added for API resources, JWS done, mTLS being added
  h. Sam K: Testing toolkit: Usage guide in progress along with adding Golden path related tests
  i. Sam K: CCB: V1.1 of the ML FSPIOP API Definition - First draft done, waiting for review

## OSS Scrum or scrum calls Thu **April 2nd** 2020

1. Mifos:
  a. Ed C: Team continuing work on Payment Hub EE, Focus on Operational UI , capabilities for DFSP backends, Error event handling framework
2. Coil:
  a. Don C: Performance - setup done and got started - on GCP - getting high latency times - need to troubleshoot and will probably get support from other contributors
  b. Don C: ATM - OTP - Encryption
3. Crosslake:
  a. Kim W: Agenda for PI10 drafted - email should good out soon
  b. Kim W: Schedule for PI10: Tue - Fri; 11am - 4pm GMT - Remote / Virtual event
  c. Lewis D: Perf meeting later today - architecture deep dive
  d. Lewis D: Versioning - In progress
  e. Lewis D: Code quality & Security - Overall Security architecture, HSM covered by Coil
  f. Lewis D: Mojaloop in a Vagrant box - in progress
4. Core team:
  a. Miguel dB: Performance: Wrapping up Perf work - nearing 900 TPS end-to-end; Currently attempting to identify / understand a single unit that needs this perf
  b. Sam K: Performance: Wrapping-up final set of tests; Phase4 roadmap and kickoff planning
  c. Sam K: Community Support: Fixing bugs (few major discussion items fixed), providing clarifications regarding implementation decisions, etc.
  d. Sam K: Merchant Payment Support - Standardization on-going - Fixing issues in /authorizations
  e. Sam K: Accents in names issue - implementation ongoing
  f. Sam K: Settlements V2 implementation being done by OSS-TIPS team ongoing
  g. Sam K: Testing toolkit: Assertions being added for API resources, JWS in progress
  h. Sam K: CCB: V1.1 of the ML FSPIOP API Definition - drafting in progress

## OSS Scrum of scrum call Thu **March 26th** 2020

1. DA: Nico - Versioning topic discussed by Lewis, Matt, Sam
2. Crosslake:
  a. Kim W: Finalizing Agenda - Monday to Friday
  b. Kim W: Reach out if you want to present / speak
  c. Kim W: Preparing pre-reads
  d. Kim W: Fraud & AML workshop: Justus to post summary and notes to GitHub after the workshops
  e. Lewis D: Performance workshop / deep-dive possibly Monday
  f. Lewis D: PISP Design discussions ongoing
  g: Lewis D: Code quality and security stream: i. Docker container security recommendations. ii. GDPR Scope for Mojaloop
3. Mifos:
  a. Ed C / Istvan M: Continue creating Lab
  b. Ed C / Istvan M: Fineract , new instance of Payment Hub - good progress
  c. Ed C / Istvan M: Working on operational monitoring of backend part (back-office debugging, monitoring, etc)
4. Simeon O - Community Manager in attendance
5. Core team:
  a. Sam K: Performance: Finalized phase-3 work. Get to immediate goals for logical conclusion - still ongoing - Phase4 roadmap and kickoff
  b. Sam K: Community Support: Fixing bugs, providing clarifications regarding implementation decisions, etc.
  d. Sam K: Merchant Payment Support - Standardization on-going - Metrics being added, event framework added
  e. Sam K: Accents in names issue - Discussing issue, designing solution
  f. Sam K: Settlements V2 implementation being done by OSS-TIPS team ongoing
  g. Sam K: Testing toolkit: Assertions being added for API resources, JWS in progress. Usage guide in progress
  h. Sam K: CCB: V1.1 of the ML FSPIOP API Definition - drafting in progress

## OSS Scrum or scrum call Thu **March 19th** 2020

1. Coil:
  a. Don C: Looking at performance, network hops (avoid dup checks etc)
  b. Adrian hB: Renjith & Matt working on translation ISO20022, (to JWEs, etc) - demo by the time we meet on how to use HSM
2. Crosslake:
  a. Kim W: Finishing action items from the Mid-PI Workshop, follow-up items
  b. Kim W: April Community event is happening but will be a Virtual event. Kim has a planning event and will confirm details: Suggestions welcome
  c. Lewis D: Performance - to include Don in other discussions
  d. Lewis D: Code quality - GDPR requirements proposal
  e: Lewis D: Versioning - iinitial draft made as PR - will be presented to DA next week
3. Mifos:
  a. Ed C, Istvan M: Payment Hub, envt in Azure, 
  b. Ed C, Istvan M: Transactions now going through
  c. Ed C, Istvan M: Next phase: to implement back office screens to see screens for business users
  d. Ed C, Istvan M: Workshop with Google on PISP
4. Core team:
  a. Sam K: Perf - Combining prepare+position handler and fulfil+position handlers, characterization work ongoing
  b. Sam K: Perf - Working on gaining an understanding of how 1 unit of Infrastructure looks like for a Mojaloop deployment
  c. Sam K: Transaction requests service standardization: Added event framework, Adding metrics now
  d. Sam K: Community Support: Fixing issues, upgrade issues, issue for allowing accents in names, etc,.
