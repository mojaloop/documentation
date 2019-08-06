# Mojaloop Workbench Discussion

>___NOTE:__ This is a working document. Expect it to change dramatically before an official release._


## What is a Workbench?

Nobody really knows yet. We are as yet defining the term as we go along, but roughly without making too many assumptions:
- An environment for users to get to know Mojaloop
- A place for implementers to validate and test their assumptions about Mojaloop
- 

## Users

We divide users in 2 camps: Primary users and Secondary users. These classifications are up for debate.

### Primary Users
1. DFSPs needing to integrate with Mojaloop: (shorthand: Implementing DFSP)
2. Organisations/Individuals wishing to learn about Mojaloop and wanting to build and test functionality or use cases as a DFSP (shorthand: Evaluating DFSP)
3. Organisations/Individuals wishing to learn about Mojaloop and wanting to build and test functionality or use cases as a Hub Operator (shorthand: Evaluating Hub Operators)
4. Regulators, Organisations or Individuals wishing to understand and evaluate Mojaloop and how it might impact their existing service (shorthand: General Evaluators)


### Secondary Users
5. Systems Integrators wishing to offer Mojaloop as a Service or pieces of Mojaloop integration as a Service (Systems integrator)
6. Individual Contributors (including bug bounty hunters?) (Individual Contributor)
7. Fintechs operating on top of or who will operate on top of a mojaloop-enabled switch (Mojaloop-powered fintech)

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





