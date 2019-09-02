# Mojaloop Lab/Workbench Discussion

___Goal:__ This discussion document aims to lay out the case and align the community around the development of an educational Mojaloop Lab environment._


## Goals for the PI8 Convening:

1. Define terms and outline assumptions
2. Outline existing efforts and how the OSS Community aligns with them (GSMA, MIFOS, ModusBox)
3. Define users and usecases, and exclude the users we won't worry about
4. Recommendations for a few different solutions to the "Lab Problem"
	- Documentation around business cases and personas Dan developed
  - Simple Mojaloop-over-spreadsheets demo, to get people using mojaloop without Postman
	- Basic implementation of Lab Configurer, help people build labs with different features
5. Basic implementation and demo
6. Pose important questions and discuss next steps


## Nomenclature

<<<<<<< HEAD


**Tools:**
- A device or implement used to carry out a function
- Different tools for different functions: You wouldn't use a screwdriver to drive a nail.
- In Mojaloop-land, a Bank Oracle [todo: finish]
=======
**Tools:**
- A device or implement used to carry out a function
- Different tools for different functions: You wouldn't use a screwdriver to drive a nail.
- In a Mojaloop context, one example of a tool is the Bank Oracle
  - The Bank Oracle is a tool that plugs into the Account Lookup Service, can be used to allow Mojaloop to connect to existing bank accounts with an IBAN
>>>>>>> 947cac151a5fd90f9fddd3b8493021591d545a22

**Workbench:**
- Combines different tools together in one place
- For example, a hand plane, table saw and chisel can make up a woodworking workbench, while a hacksaw, file and angle grinder can make up a metalworking workbench
- In the mojaloop parlance, tools to test my DFSP's JWS keys are in a different workbench than tools that demonstrate to a fintech how wholesale api's can work on top of Mojaloop

**Lab:**
- A lab is a place you go to run experiments
- We run experiments in order to learn, and test our assumptions
<<<<<<< HEAD
  - For example, a DFSP can set up and run an _experiment_ where they send and receive Quotes
=======
  - For example, a DFSP can set up and run an _experiment_ where they send and receive Quotes using an in-development API
>>>>>>> 947cac151a5fd90f9fddd3b8493021591d545a22
- A single lab combines multiple workbenches together in one place

**Simulator:**
- A tool that simplifies or abstracts away some function so you can test one thing at a time
- Pilots train with simulators _before_ flying a real life, dangerous and expensive plane.
<<<<<<< HEAD
- In the Mojaloop parlance: a simulator can simulate interacting with some component of the system
=======
- Within Mojaloop: a simulator can simulate interacting with some component of the system
>>>>>>> 947cac151a5fd90f9fddd3b8493021591d545a22
  - Replace an entire switch to test a DFSP implementation
  - Simulate 2 dfsps to test a switch deployment
  - A simulator also reduces the need for someone to be with the person testing. So a DFSP can send and receive via the switch, without interaction with the Hub Operator.


## Assumptions

>_Some of these may go without saying, but I'm going to go ahead and say them anyway._

- Gates/The Entity wants to encourage adoption for Mojaloop at all levels (not just switches)
- We don't need a lab environment to serve the needs of a Switch deployment or implementing DFSP - these needs will be met elsewhere
- The Mojaloop OSS Community wants to make itself attractive 
  - This doesn't mean removing all barriers to entry; but assessing which barriers we should be removing
<!-- - [todo: more>] -->


## Users

We divide users in 2 camps: Primary users and Secondary users.

### Primary Users
1. DFSPs needing to integrate with Mojaloop: (shorthand: Implementing DFSP)
2. Organisations/Individuals wishing to learn about Mojaloop and wanting to build and test functionality or use cases as a DFSP (shorthand: Evaluating DFSP)
3. Organisations/Individuals wishing to learn about Mojaloop and wanting to build and test functionality or use cases as a Hub Operator (shorthand: Evaluating Hub Operators)
4. Regulators, Organisations or Individuals wishing to understand and evaluate Mojaloop and how it might impact their existing service (shorthand: General Evaluators)

### Secondary Users
5. Systems Integrators wishing to offer Mojaloop as a Service or pieces of Mojaloop integration as a Service (Systems integrator)
6. Individual Contributors (including bug bounty hunters?) (Individual Contributor)
7. Fintechs operating on top of or who will operate on top of a mojaloop-enabled switch (Mojaloop-powered fintech)
8. 3rd Party App Provider interacting with wholesale mobile money APIs, selling integrations to fintechs and the like (3rd party app provider)

In addition to thinking of each of the above users, it's important to understand at what level these users exist at in relationship to a mojaloop deployment. For that we will borrow from Dan Kleinbaum's [_Fintech primer on Mojaloop_](https://medium.com/dfs-lab/what-the-fintech-a-primer-on-mojaloop-50ae1c0ccafb_)

![the 3 levels of mojaloopyness](./images/mojaloop_spokes.png)
>_The 3 levels of Mojaloopyness, https://medium.com/dfs-lab/what-the-fintech-a-primer-on-mojaloop-50ae1c0ccafb_ by Dan Kleinbaum

**Level 1:** Running a Mojaloop switch (e.g. Hub Operators)
**Level 2:** Interacting with a Mojaloop Switch directly (e.g. DFSPs, Systems Integrators)
**Level 3:** Interacting with a DFSP over a Mojaloop Switch (e.g. Fintechs)


## Use Cases

<!-- * As an Implementing DFSP, I need a workbench in order to test my implementation and validate my assuptions about Mojaloop
* As an Implementing DFSP, I need a workbench to view and use a reference implementation of Mojaloop
* As an Evaluating DFSP, I need a to view and use a reference implementation of Mojaloop
* As an OSS Developer, I need a workbench to learn about how Mojaloop works
* As an Evaluating Hub Operator, I need a workbench to view and use a reference implementation of Mojaloop
* As a General Evaluator, I need a workbench to evaluate an example implementation of Mojaloop end to end
* As a General Evaluator, I need a workbench to see how Mojaloop works to start making code contributions
* As a General Evaluator, I need a workbench to see how Mojaloop may affect my business in the future -->

__a.__ Test a Mojaloop compatible DFSP implementation  
__b.__ Validate assumptions about Mojaloop  
__c.__ View and use a reference implementation  
__d.__ Learn about Mojaloop internals  
__e.__ Learn about Mojaloop-enabled switches and associated use cases (technology)
__f.__ Assess how Mojaloop will change fintech business landscape  
__g.__ Be able to demonstrate a value proposition for DFSPs/Fintechs/etc. to use mojaloop (instead of technology _x_)


## User/Use Case Matrix:

We can plot the users and use cases in a matrix:


|  __Usecase:__                    | a. Test DFSP Impl | b. Validate Assumptions | c. Reference Impl | d. Learn Internals | e. Learn about Tech | f. Evaluate Business Cases  | g. Demonstrate ML Value |
| :------------------------------- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| __User:__                        |       |       |       |       |       |       |       |
| __1. Implementing DFSP__         |   X   |       |   X   |       |       |       |       | 
| __2. Evalutating DFSP__          |       |   X   |   X   |       |   X   |   X   |       |
| __3. Evaluating Hub Operator__   |       |       |   X   |       |   X   |   X   |       |
| __4. General Evaluator__         |       |       |       |       |   X   |   X   |       |
| __5. Systems Integrator__        |   X   |   X   |   X   |   X   |       |       |   X   |
| __6. Individual Contributor__    |       |   X   |   X   |   X   |       |       |       |
| __7. Mojaloop-powered fintech__  |       |   X   |       |       |   X   |   X   |   X   |
| __8. 3rd Party App Provider__    |       |       |       |   X   |       |       |   X   |


## Usecase Inputs and outputs:

>_Pick 2 or 3 different users/usecases and drill down into the inputs and outputs for what meeting their needs may look like_
>>_Note: As with anything of this nature, a lot of the users/usecases and associated conclusions are somewhat squishy, and can likely be put into different or altogether new boxes. Nonetheless, we will try to define these as well as possible._

<!-- 
It's worth "double clicking" some of these.
What are the inputs and outputs.
e.g. if this is a learning environment, the inputs would be "It's an understudied problem", and outputs are "more study for that problem" so that problem can be explained better

Or: system doesn't tolerate some type of user action or function, but after evaluation a way forward is found so it can be documented for implementation.

Understanding how to use the system, and how that can change, OR understanding the important functions etc. -->

### Evaluating Hub Operator + Implementing DFSP
As stated in our above assumptions, we aren't going to worry about Hub operators and Implementing DFSPs here.

### Evaluating DFSP

>_We think of an evaluating DFSP as one who is not necessarily part of a current switch implementation, but a party who is mojaloop-curious, and a potential candidate to evangelize mojaloop to - without the tangible goal of a switch implementation in sight._

**Use cases:**
- Validate assumptions about Mojaloop (how it works, what it does, what it _doesn't_ do)
- View and play with a reference implementation
- Learn about mojaloop-enabled hubs and associated use cases (technology perspective)
- Assess how Mojaloop will affect their business in the future

**Examples from our user personas:**
- Carbon - Enable cash-outs and OTC remittances over their agent network
- Ssnapp - Enable multi payer/payee payments and rewards points over mojaloop
- Oneload - Simplify onboarding for other DFSPs to utilize OneLoad's agent network
- Juvo - Plug in to a Mojaloop switch for a credit scoring and lending marketplace

**Outputs: (How can the Mojaloop OSS Community better serve these players?)**
- help to onboard to the mojaloop ecosystem
- help to understand the technology, where it works well, and the potential pitfalls/drawbacks
- minimize investment in getting things working so they can focus on building out use case prototypes
- take them from little to no understanding of Mojaloop -> demonstrating real prototypes

**Inputs: (what are the things that we need to do to meet these goals)**
1. Improved mojaloop documentation specific for this role.
  - Think about and design the documentation and onboarding flow specifically for *Evaluating DFSPs*
  - Documentation should be approachable by product manager etc. with little technical knowledge
2. Technical deep dive on the technology behind mojaloop, why, how it works (perhaps we can repurpose the js demonstrator in an interactive walkthrough an end to end transaction)
3. Improved guides for up and running on 2-3 major kubernetes providers, self service and install scripts 
4. Helm charts for 1-2 simulators/labs that can be spun up alongside a switch, with opinionated pre-configured settings


## Mojaloop Powered Fintech

>_A Mojaloop Powered fintech is a fintech operating or wishing to operate on top of a mojaloop switch. There will definitely be crossover between Fintechs and DFSPs in this classification, but we will focus here on fintechs who are at the third level on the above "Mojaloop Spokes"_

**Use cases:**
- Validate assumptions about Mojaloop (how it works, what it does, what it _doesn't_ do)
- Learn how mojaloop is aligned with wholesale APIs, and what it would take to get a DFSP using these APIs over a Mojaloop switch
- Learn about mojaloop-enabled hubs and associated use cases (technology perspective)
- Assess how Mojaloop will affect their business in the future

**Examples from our user personas:**
- EastPay - compare and shop around for banks/payment providers based on Mojaloop's open fee structure
- Jumo - Open up transparent and fairer lending markets on top of a Mojaloop enabled switch?

**Outputs: (How can the Mojaloop OSS Community better serve these players?)**
- Understand how Mojaloop and Wholesale APIs fit together (or don't)
- Enable fintechs to interact with Mojaloop over 1 or 2 wholesale banking APIs (e.g. GSMA MM api)
- take them from little to no understanding of Mojaloop -> demonstrating real prototypes

**Inputs: (what are the things that we need to do to meet these goals)**
1. Improved mojaloop documentation specific for this role.
2. Documentation or working document on how Mojaloop will work with wholesale apis
3. Self-deployed lab environment with DFSP that expose some wholesale apis with basic functionality for fintechs to test against


## OSS Lab/Workbench efforts alongside others

There are others in the community working on some of these needs we outlined above. How can we align ourselves together to: (1) Not duplicate efforts (nor step on each other's toes) and (2) Provide the most impact for end users and the Mojaloop community as a whole

In general, we reached a consensus around the following:
- any OSS Lab effort should be focused with a specific end user in mind
- Our focus should be further out on the mojaloop spokes (DFSPs, Fintechs, 3rd Party app providers)


### MIFOS
- Already extensive work done here with Finteract system, which provides out-of-the-box solution for Mojaloop enabled DFSPs
- working on open api implementations
- Working on lowering the barriers to entry for DFSPs and Fintechs
- Mifos Innovation Lab: "The Locomotion on top of Mojaloop's Rails"
  - Demonstrate end to end Mojaloop systems with DFSP integration
  - Build and contribute OS tools
- Working on real world deployments already 
- See a need for a "Single Point of Entry to the Mojaloop Ecosystem"
- Have an existing Lab deployment with Mojaloop that is currently being upgraded to work with the latest Helm chart deployments


### GSMA
- Have mobile money api, would like to see end to end solution with fintechs/DFSPs talking over a mojaloop switch
- The GSMA Lab has a very wide scope, Mojaloop is just one piece of this
- One main goal is the mobile money API- pushing for default standard for 3rd party integration into mobile money
- where does Mojaloop sit?
	- Is one of the branches that the GSMA Lab will be working on
	- Where can GSMA add the most value to Mojaloop?
		- Serve a need from the market to get the most impact
    - See a end-to-end prototype of the MM API talking over a Mojaloop switch


### ModusBox
- More on the systems integrator perspective. Building a bunch of tools already to ease the development and onboarding process for switches and DFSPs
- Have open sourced the Mojaloop JS SDK
- Interested in showing 'how the engine works' to build confidence in business parters/customers
- Also interested (especially in WOCCU case) as a Mojaloop lab as a place for Fintechs to learn and test concepts on top of Mojaloop Switches
  - Once this is connected, the interesting use cases will start to develop beyond tranfers from A to B
  - MFIs (especially small-medium) don't have much capacity for experimentation or developing new business cases, but these cases can be driven from fintechs first
- How can we assist orgs. who have little-to-no technical capability to become confident with Mojaloop?
  - A technical lab environment won't do much in this case
  - Can we demonstrate Mojaloop over a spreadsheet? Everyone can undertand spreadsheets.

## Questions

- So much of this comes back to Gates'/The Entity's proposed sales cycle for growing mojaloop adoption
  - Looking at the technical briefs from the hackathon alone, there are some __big__ players (Famoco, Ethiopay, GrameenPhone) that could really take mojaloop and run with it
  - How can the initial hurdle be overcome to drive adoption and help these orgs adopt mojaloop and contribute back to the ecosystem?
  - What does the entrypoint to the industry look like for Hub operators?

- For evaluating DFSPs, what is their resource/risk allocation like?
  - If they think Mojaloop is a viable option for a future product, what type of time and resource investment will they put into it?
  - What are their alternatives? (This will be a case-by-case thing)

- Is a certain amount of technical gatekeeping a good or bad thing? (This is a more philisophical question)
  - If we don't make it too easy to get up and running, we make sure that only interested and determined parties are using mojaloop, which self-selects for a better community (kinda)
  - But this locks out a lot of people who aren't up to scratch with kubernetes, docker etc. but may still have a good deal of experience with financial services etc.

- Chicken and egg problem(?) between DFSPs and Hub operators. Does it go DFSPs -> Hub Operators or the other way around?


## Recommendations

- Find a target user that we can build a lab for/with
  - perhaps one of the more serious hackathon teams?
- Address and improve documentation gaps: driving from a role-specific (i.e. DFSP, fintech, hub operator) perspective
- Mojaloop over Spreadsheet demo
- Build a self-service lab prototype
  - Opinionated set of helm charts that can be deployed alongside general switch
  - Gather feedback from the community, and see where and how people are using it