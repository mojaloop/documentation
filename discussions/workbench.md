# Mojaloop Workbench Discussion
### It's time to get Mojaloopy

>___NOTE:__ This is a working document. Expect it to change dramatically before an official release._

## Goals for the PI8 Convening:

1. Define a what a lab/workbench is
2. Define users and users we won't worry about
3. Recommendations for a few different solutions to the "Lab Problem"
	- documentation around business cases and personas Dan developed
	- Basic implementation of Lab Configurer, help people build labs with different features
4. How does this align with GSMA? MIFOS?
5. Basic implementation and demo
6. Pose important questions and discuss next steps


## Let's talk about names

<!-- Nobody really knows yet. We are as yet defining the term as we go along, but roughly without making too many assumptions:
- An environment for users to get to know Mojaloop
- A place for implementers to validate and test their assumptions about Mojaloop -->

[TODO: tidy nomenclature section with notes from Rob]

**Tools:**
- A workbench contains tools

**Workbench:**
- different tools from different places make up a workbench
- mojaloop only workbench + simulator workbench

**Lab:**
- lab requires multiple workbenches put together!
- you go to different labs to do different things
	- what are you testing? Do you want to activate TLS and JWS?: different tools

**Simulator:**
- a stub that you can send stuff in and out
- dfsp interfacing with hub or simulator
	- 2 simulators (show hub operator)
	- 1 dfsp, 1 simulator (for DFSP)


## Assumptions

>_Some of these may go without saying, but I'm going to go ahead and say them anyway._

- Gates/The Entity wants to encourage adoption for Mojaloop at all levels (not just switches)
- We don't need a lab environment to serve the needs of a Switch deployment or implementing DFSP - these needs will be met elsewhere
- The Mojaloop OSS Community wants to make itself attractive 
  - This doesn't mean removing all barriers to entry; but assessing which barriers we should be removing
- [todo: more]


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

![the 3 levels of mojaloopyness](./images/mojaloop_spokes.png)
>_The 3 levels of Mojaloopyness, https://medium.com/dfs-lab/what-the-fintech-a-primer-on-mojaloop-50ae1c0ccafb_


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


## User/Use Case Matrix:

As suggested by Rob Reeve, we can plot the users and potential use cases in a matrix:


|  __Usecase:__                   | a. Test DFSP Impl | b. Validate Assumptions | c. Reference Impl | d. Learn Internals | e. Learn about Tech | f. Evaluate Business Cases  |
| :------------------------------- | :---: | :---: | :---: | :---: | :---: | :---: |
| __User:__                        |       |       |       |       |       |       |    
| __1. Implementing DFSP__         |   X   |       |   X   |       |       |       |
| __2. Evalutating DFSP__          |       |   X   |   X   |       |   X   |   X   |
| __3. Evaluating Hub Operator__   |       |       |   X   |       |   X   |   X   |
| __4. General Evaluator__         |       |       |       |       |   X   |   X   |
| __5. Systems Integrator__        |   X   |   X   |   X   |   X   |       |       |
| __6. Individual Contributor__    |       |   X   |   X   |   X   |       |       |
| __7. Mojaloop-powered fintech__  |       |   X   |       |       |   X   |   X   |


## Usecase Inputs and outputs:

>_Pick 2 or 3 different users/usecases and drill down into the inputs and outputs for what meeting their needs may look like_
>>_Note: As with anything of this nature, a lot of the users/usecases and associated conclusions are somewhat squishy, and can likely be put into different or altogether new boxes. Nonetheless, we will try to define these as well as possible._

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
- Carbon [todo: why]
- Ssnapp
- Oneload
- Juvo

**Outputs: (How can the Mojaloop OSS Community better serve these players?)**
- help to onboard to the mojaloop ecosystem
- help to understand the technology, where it works well, and the potential pitfalls/drawbacks
- minimize investment in getting things working so they can focus on building out use case prototypes
- take them from little to no understanding of Mojaloop -> demonstrating real world prototypes

**Inputs: (what are the things that we need to do to meet these goals)**
1. Improved documentation around specific for this role (e.g. Mojaloop for x). Documentation should be approachable by product manager etc. with little techincal knowledge
2. Technical deep dive on the technology behind mojaloop, why, how it works (perhaps we can repurpose the js demonstrator) [todo: finish]
3. Improved guides for up and running on 2-3 major kubernetes providers, self service and install scripts (e.g. expand on moja-box)
4. Helm charts for 3-4 simulators that can be spun alongside a switch, with opinionated pre-configured settings


## Mojaloop Powered Fintech

>_A Mojaloop Powered fintech is a fintech operating or wishing to operate on top of a mojaloop switch. There will definitely be crossover between Fintechs and DFSPs in this classification, but we will focus here on fintechs who are at the third level on the above "Mojaloop Spokes"_

**Use cases:**
- Validate assumptions about Mojaloop (how it works, what it does, what it _doesn't_ do)
- Learn about mojaloop-enabled hubs and associated use cases (technology perspective)
- Assess how Mojaloop will affect their business in the future


**Examples from our user personas:**
- EastPay - compare and shop around for banks/payment providers based on Mojaloop's open fee structure
- Juvo - [todo: finish]
- Jumo - 

**Outputs: (How can the Mojaloop OSS Community better serve these players?)**
- Understand how Mojaloop and Wholesale APIs fit together (or don't)
- take them from little to no understanding of Mojaloop -> demonstrating real world prototypes

**Inputs: (what are the things that we need to do to meet these goals)**


## OSS Lab/Workbench efforts alongside others

There's other people in the community working on some of these needs we outlined above. How can we align ourselves together to: (1) Not duplicate efforts (nor step on each other's toes) and (2) Provide the most impact for end users and the Mojaloop community as a whole

In general, we reached a consensus around the following:
- any OSS Lab effort should be focused with a specific end user in mind
- focus further out on the mojaloop spokes (DFSPs, Fintechs)


### MIFOS
- Already extensive work done here with Finteract system, which provides out-of-the-box solution for Mojaloop enabled DFSPs
- working on open api implementations

### GSMA
- Have mobile money api, would like to see end to end solution with fintechs/DFSPs talking over a mojaloop switch
- The GSMA Lab has a very wide scope, Mojaloop is just one piece of this
- One main goal is the mobile money API- pushing for default standard for 3rd party integration into mobile money
- where does Mojaloop sit?
	- could be one of the branches that the lab will be working on
	- Where can GSMA add the most value to Mojaloop?
		- serve a need from the market to get the most impact
    - see a end-to-end prototype of the MM API talking over a Mojaloop switch


### ModusBox
- More on the systems integrator perspective. Building a bunch of tools already to ease the development and onboarding process for switches and DFSPs
- Have open sourced the Mojaloop JS SDK
- Interested in showing how the engine works to build confidence in business parters/customers


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
  - [insert diagram here]


## Recommendations

- Find a target user that we can build a lab for/with
  - perhaps one of the more serious hackathon teams?
- Address and improve documentation gaps: driving from a role-specific (i.e. DFSP, fintech) perspective
- Build a self-service lab prototype
  - Opinionated set of helm charts that can be deployed alongside general switch
  - Gather feedback from the community