3.11.20 -- Performance Workstream
Wednesday, March 11, 2020

Performance Goals:
Current HW system achieving stable 1k TPS, peak 5k and proven horizontal scalability (more instances = more performance in almost linear fashion) - Kim/Sam w/ Miller`
Get volunteers for two immediate Proof of Concepts:

POCs:
Test the impact or a direct replace of the mysql DB with an shared memory network service like redis (using redlock alg if locks are required)
Test a different method of sharing state, using a light version of event-drive with some CQRS

Resources:
Slack Channel: perf-engineering
Mid-PI performance presentation:
https://github.com/mojaloop/documentation-artifacts/tree/master/presentations/March2020-PI9-MidPI-Review
Setting up the monitoring components
https://github.com/mojaloop/helm/tree/master/monitoring
 
Action/Follow-up Items
•       What Kafka metrics (client & server side) should we be reviewing? - Confluent to assist
•       Explore Locking and position settlement - Sybrin to assist
        o   Review RedLock - pessimistic locking vs automatic locking
        o   Remove the shared DB in the middle (automatic locking on Reddis)
•       Combine prepare/position handler w/ distributed DB
•       Review node.js client and how it impact kafka, configuration of Node and ultimate Kafka client - Nakul
•       Turn back on tracing to see how latency and applications are behaving
•       Ensure the call counts have been rationalized (at a deeper level)
•       Validate the processing times on the handlers and we are hitting the cache  
•       Async patterns in Node
•       Missing someone who is excellent on mysql and percona
        o   Are we leveraging this correctly
        o   What cache layer are we using (in memory)
•       Review the event modeling implementation - identify the domain events
•       Node.js/kubernetes - 
•       Focus on application issues not as much as arch issues
•       How we are doing async technology - review this (Node.JS - larger issue) threaded models need to be optimize - Nakul
 
Meeting Notes/Deatils
•       History
        o   Technology has been put in place, hoped the design solves an enterprise problem
        o   Community effort did not prioritize on making the slices of the system enterprise grade or cheap to run
        o   OSS technology choices
•       Goals
        o   Optimize current system
        o   Make it cheaper to run
        o   Make it scalable to 5K TPS
        o   Ensure value added services can effectively and securely access transaction data 
•       Testing Constraints
        o   Only done the golden transfer - transfer leg
        o   Flow of transfer
        o   Simulators (legacy and advance) - using the legacy one for continuity 
        o   Disabled the timeout handler
        o   8 DFSP (participant organizations) w/ more DFSPs we would be able to scale
•       Process
        o   Jmeter initiates payer request
        o   Legacy simulator Receives fulfill notify callback
        o   Legacy simulator Handles Payee processing, initiatives Fulfillment Callback
        o   Record in the positions table for each DFSP
•       Partial algorithm where the locking is done to reserve the funds, do calculations and do the final commits 
•       Position handler is Processing one record at a time
          Future algorithm would do a bulk 
          One transfer is handler by one position handler
•       Transfers are all pre-funded
          Reduced settlement costs
          Can control how fast DFSPs respond to the fulfill request (complete the transfers committed first before handling new requests)
        o   System need to timeout transfers that go longer then 30 seconds
•       Any redesign of the DBs 
•       Test Cases
        o   Financial transaction
•       End-to-end
•       Prepare-only
•       Fulfil only
        o   Individual Mojaloop Characterization
•       Services & Handlers
•       Streaming Arch & Libraries
•       Database
•       What changed: 150 to 300 TPS 
        o   How we process the messages
        o   Position handler (run in mixed mode, random 
•       Latency Measurement
        o   5 sec for DB to process, X sec for Kafka to process
        o   How to measure this?
•       Targets 
        o   High enough the system has to function well
        o   Crank the system up to add scale (x DFSPs addition) 
        o   Suspicious cases for investigations
        o   Observing contentions around the DB
        o   Shared DB, 600MS w/ out any errors
•       Contention is fully on the DB
•       Bottleneck is the DB (distribute systems so they run independently 
          16 databases run end to end 
        o   GSMA - 500 TPS
        o   What is the optimal design?
•       Contentions 
        o   System handler contention 
•       Where the system can be scaled
        o   If there are arch changes that we need to make we can explore this
•       Consistency for each DFSP
•       Threading of info flows - open question
        o   Sku'ed results of single DB for all DFSPs
        o   Challenge is where get to with additional HW 
•       What are the limits of the application design
        o   Financial transfers (in and out of the system)
•       Audit systems
•       Settlement activity 
•       Grouped into DB solves some issues
•       Confluent feedback
        o   Shared DB issues, multiple DBs
        o   Application design level issues
        o   Seen situations where we ran a bunch of simulators/sandboxes
•       Need to rely on tracers and scans once this gets in productions
•       Miguel states we disable tracing for now
 
•       Known Issues
        o   Load CPU resources on boxes (node waiting around) - reoptimize code
        o   Processing times increase over time
•       Optimization
        o   Distributed monolithic - PRISM - getting rid of redundant reads
        o   Combine the handlers - Prepare+Position & Fulfil+Position
•       What are we trying to fix?
        o   Can we scale the system?
        o   What does this cost to do this? (scale unit cost) 
        o   Need to understand  - how to do this from a small and large scale
        o   Optimized the resources 
        o   2.5 sprints 
        o   Need to scale horizontal 
        o   Add audit and repeatability - 

Attendees:
•       Don, Jordon (newly hired perf expert) - Coil
•       Miguel, Roman, Valentine, Warren, Bryan, Rajiv - ModusBox
•       Pedro - Crosslake
•       Rhys, Nakul Mishra - Confluent
•       Miller - BGMF
•       In-person: Lewis (CL), Rob (MB), Roland (Sybrin), Greg (Sybrin), Megan (V), Simeon (V), Kim (CL)
