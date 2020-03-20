3.11.20 -- Performance Workstream

Wednesday, March 11, 2020

**Performance Goals:**

Current HW system achieving stable 1k TPS, peak 5k and proven horizontal scalability (more instances = more performance in almost linear fashion)

**POCs:**

Test the impact or a direct replace of the mysql DB with an shared memory network service like redis (using redlock alg if locks are required)

Test a different method of sharing state, using a light version of event-drive with some CQRS

**Resources:**

Slack Channel: perf-engineering

Mid-PI performance presentation:
https://github.com/mojaloop/documentation-artifacts/tree/master/presentations/March2020-PI9-MidPI-Review

Setting up the monitoring components
https://github.com/mojaloop/helm/tree/master/monitoring
 
**Action/Follow-up Items**

•       What Kafka metrics (client & server side) should we be reviewing? - Confluent to assist

•       Explore Locking and position settlement - Sybrin to assist
        
 1. Review RedLock - pessimistic locking vs automatic locking
        
 2. Remove the shared DB in the middle (automatic locking on Reddis)

•       Combine prepare/position handler w/ distributed DB

•       Review node.js client and how it impact kafka, configuration of Node and ultimate Kafka client - Nakul

•       Turn back on tracing to see how latency and applications are behaving

•       Ensure the call counts have been rationalized (at a deeper level)

•       Validate the processing times on the handlers and we are hitting the cache  

•       Async patterns in Node

•       Missing someone who is excellent on mysql and percona

1. Are we leveraging this correctly
        
2. What cache layer are we using (in memory)

•       Review the event modeling implementation - identify the domain events

•       Node.js/kubernetes - 

•       Focus on application issues not as much as arch issues

•       How we are doing async technology - review this (Node.JS - larger issue) threaded models need to be optimize - Nakul
 
**Meeting Notes/Details**

•       History

1. Technology has been put in place, hoped the design solves an enterprise problem
        
2. Community effort did not prioritize on making the slices of the system enterprise grade or cheap to run
        
3. OSS technology choices

•       Goals

1. Optimize current system

2. Make it cheaper to run
        
3. Make it scalable to 5K TPS
        
4. Ensure value added services can effectively and securely access transaction data 

•       Testing Constraints

1. Only done the golden transfer - transfer leg
        
2. Flow of transfer
        
3. Simulators (legacy and advance) - using the legacy one for continuity 
        
4. Disabled the timeout handler
        
5. 8 DFSP (participant organizations) w/ more DFSPs we would be able to scale

•       Process

1. Jmeter initiates payer request
        
2. Legacy simulator Receives fulfill notify callback
        
3. Legacy simulator Handles Payee processing, initiatives Fulfillment Callback
        
4. Record in the positions table for each DFSP

•       Partial algorithm where the locking is done to reserve the funds, do calculations and do the final commits 

•       Position handler is Processing one record at a time

1. Future algorithm would do a bulk 
        
2. One transfer is handler by one position handler

•       Transfers are all pre-funded

1. Reduced settlement costs
        
2. Can control how fast DFSPs respond to the fulfill request (complete the transfers committed first before handling new requests)
        
3. System need to timeout transfers that go longer then 30 seconds

•       Any redesign of the DBs 

•       Test Cases

1. Financial transaction

•       End-to-end

•       Prepare-only

•       Fulfil only

1. Individual Mojaloop Characterization

•       Services & Handlers

•       Streaming Arch & Libraries

•       Database

•       What changed: 150 to 300 TPS 

1. How we process the messages

2. Position handler (run in mixed mode, random 

•       Latency Measurement

1. 5 sec for DB to process, X sec for Kafka to process
        
2. How to measure this?

•       Targets 

1. High enough the system has to function well
        
2. Crank the system up to add scale (x DFSPs addition) 
        
3. Suspicious cases for investigations
        
4. Observing contentions around the DB
        
5. Shared DB, 600MS w/ out any errors

•       Contention is fully on the DB

•       Bottleneck is the DB (distribute systems so they run independently)

1. 16 databases run end to end 
        
2. GSMA - 500 TPS
        
3. What is the optimal design?

•       Contentions 

1. System handler contention 

•       Where the system can be scaled

1. If there are arch changes that we need to make we can explore this

•       Consistency for each DFSP

•       Threading of info flows - open question

1. Sku'ed results of single DB for all DFSPs
        
2. Challenge is where get to with additional HW 

•       What are the limits of the application design

1. Financial transfers (in and out of the system)

•       Audit systems

•       Settlement activity 

•       Grouped into DB solves some issues

•       Confluent feedback

1. Shared DB issues, multiple DBs
        
2. Application design level issues
        
3. Seen situations where we ran a bunch of simulators/sandboxes

•       Need to rely on tracers and scans once this gets in productions

•       Miguel states we disable tracing for now
 
•       Known Issues

1. Load CPU resources on boxes (node waiting around) - reoptimize code

2. Processing times increase over time

•       Optimization

 1. Distributed monolithic - PRISM - getting rid of redundant reads

 2. Combine the handlers - Prepare+Position & Fulfil+Position

•       What are we trying to fix?

  1. Can we scale the system?
        
  2. What does this cost to do this? (scale unit cost) 
        
  3. Need to understand  - how to do this from a small and large scale
        
  3. Optimized the resources
        
  4. 2.5 sprints
        
  5. Need to scale horizontal 
        
  6. Add audit and repeatability - 

Attendees:

•       Don, Jordon (newly hired perf expert) - Coil

•       Sam, Miguel, Roman, Valentine, Warren, Bryan, Rajiv - ModusBox

•       Pedro - Crosslake

•       Rhys, Nakul Mishra - Confluent

•       Miller - BGMF

•       In-person: Lewis (CL), Rob (MB), Roland (Sybrin), Greg (Sybrin), Megan (V), Simeon (V), Kim (CL)
