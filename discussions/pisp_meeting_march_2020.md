# PISP Meeting Notes | 16 March 2020

## Session 1: Arch Overview


- don’t want a new special tx, try and support native mojaloop
- Goal: identical tx 
- talked very little in Joburg about linking
- payment apps: want to enable users to trigger a tx
- need app to configure a link between PISP app and User, and Payee DFSP
- PISP kicks off the transfer flow
    - DFSP needs to know that the user is the one kicking off the transfer
- going through the fido stages
    - seems pretty straightforward
- FIDO has many advantages
    - what are the fraud vectors we are opening up here?
- Should the Quotation (condition?) be the thing that is signed?
- this is all dependent on the security of the first login
    - this is the role of the Identity provider
- How do we know the quote signed by the user _is_ the same quote that was executed

**Oauth**

- user provides access grants
- server gets access token and refresh, refresh is needed to get a new access token etc.
    - What happens if the token expires and service doesn’t get a refresh ‘in time’? Is the refresh token still valid?
- balance: Access tokens that are short lived, don’t want to rely on revocation
    - configurable, but guidelines
    - more checks for revocation when doing the refresh
    - access token can be more optimized, e.g. verifiable offline
- Matt: OAuth is powerful
    - standardizes the interaction between app and auth server
    - need to make sure we are standardization interface
    - Does FIDO have standardization between Client and auth server? [todo: follow up]
    - comes back to linking stage: how do you register your FIDO? Yes, it is standardized. [todo: let’s look at this]
    

**Linking**

- don’t want to store the password
- how to prove trust: FIDO
- *Follow up: Rules for a PISP? This is probably more scheme specific…*
- need updated metadata
    - both during linking and during sending a transfer
- 3 services:
    - IDP (also handles OAuth2)
    - Account Information Provider
    - FIDO Server
- talking through the logical flows (not necessarily technical)
- rolls grant server and resource server into one…
- Q: can we recycle the login if we want to link a different account?
- *separate public/private keypairs per account - at least for now, this may be up for debate [assumptions, followup]*


> Adrian: 
>   - user needs to pick an account when they need to make a transaction?
>   - could get an access token for all accounts, use _something_ to have all accounts
>   - set a default account
>     - the question is the scope of access tokens for different things (e.g. listing accounts, getting metadata, linking accounts) - this is a security nuance


- Linking auth with user is a mistake?? [10:00 am, maybe come back for reference]
    - e.g. if user gets new accounts etc., so good to scope per account
    - right way to do this: during the Oauth flow, allows you to list accounts with given token
    - when user logs in, and gets list of accounts: what are the permissions/consent given here?
        - initial consent can be: “I allow PISP to list my accounts”
        - once we have the list, need to go through another consent flow
    - balance between good UI and security implications of one or many tokens
- Suggestion: during the fido registration, rather than linking to account: have ability for one keypair to a list of accounts: user selects which
- *2 channels for revocation: via PISP app, and via DFSP*
- Worth remembering: it’s the DFSP who is the record holder of what keys can be used for which account, not the PISP
- Need to distinguish between: things that need to happen for relationship between DFSP and PISP and things that the PISP App will do

**Account Balances**

- read only access token, pisp server keep on refreshing every few minutes
    - 2 drawbacks:
        - worry about independently maintained balances, across different PISP servers, at different refresh windows
        - what is the liability on their part, for a user making a transfer request on false information
        - well, we could do it live (need more time to load, UI maybe a little average)
        - holding stateful information around dfsps and accounts is very hard to get across the line (from a business perspective more than anything)
    - PSDT guidelines have a lot to say about this, perhaps is good to look into
        - scheme rules will dictate this
        - these things may be regulated, and will need to be respected and designed for toa  certain extent
- other option: do this in FIDO
    - 

**Agreements:**

- Polling for account balance updates isn’t so good, but we don’t need to be too prescriptive at this stage. 
    - Changes do do here



## Session 2 - Role + Scope of PISP

**Alternative IDPs**

- What if your login with the bank isn’t with your bank?
- Who determines the scopes of the Auth tokens here? The IDP? The DFSP?
- *What is the token you get back? An access token? Or a grant*
- 3 options: Govt, DFSP, Or 3rd party
- MVP: Let’s focus on DFSP owned IDP

**Centralized FIDO vs DFSP Owned**

- structure/type of OAuth tokens here matter
- a few options here with trust between Central FIDO and DFSP
    - best option? Perhaps pre-signed jwt relationship between the two
- JWT token
- every participant has access to public keys of every other participant
- our goal here is defining new APIs 
- have to make a decision: whether or not this aspect is ‘inside’ mojaloop, or not
    - if so, then we need to be very strict about the definitions for all future implementations
    - needs approval from CCB
- follow up: If we are doing this with PISPs, should we revisit security for other aspects of Mojaloop?
- dont’ build in the FIDO stuff into the FSPIOP API, make it a separate part of the Mojaloop API Suite
- *consider the licensing, IP implications etc. Follow up*
- We need to accommodate both in any given deployment
- *we will likely want special functions in the FIDO server, so we might have issues where DFSPs want to BYO FIDO [follow up the spec]*

**Decisions**

- FIDO should be a part of mojaloop.
- JWT signed tokens to talk between FIDOs and DFSPs
- Define API First, get approval, make reference implementation


**Transfers**

- consent model?
    - make sure
1. every tx needs consent
2. ?? [11:45]
- need a clear audit trail of who initiated the payment and why
- Does the fido need auditing? To say, yes, you authorized this transfer…

**Walking Through Michael’s Flows**

- why the /parties lookup for the sender?
    - Because for Mojaloop, we need a valid DFSP identifier
    - PISP server can save this information, this is an implementation decision perhaps
        - that said, there might be more metadata that the PISP doesn’t know, that is required in scheme rules
- most of the work here: in the Mojaloop SDK Scheme adapter


## Session 3

More flows discussion:

- in pre-agreement phase, Payer FSP needs to make an internal check, to know that a PISP talks on Ayesha’s behalf
    - can we get away with this? It means a rogue PISP could execute this request
- DFSP A needs to verify transfer from PISP
    - not currently in the flows
    - Michael agrees
        - sig on message should be sig from PISP, so DFPS A can recognize its from the right place
        - Also independent check, no need to trust the Switch here
- What is the challenge that is being signed?
- need to specify that the FIDO service, not the App is doing the validation in the flows
- Add verification of sig phase
- *Need to follow up the sign up phase and rules dictating a PISP, they should likely be as strict as a DFSP’s rules*
- Dynamic Linking: built into the PSD2 Rules
- Gap between scheme rules and regulations around this…
- Authorization, signing the quote and not anything else: tracing mechanism

Architecture


## Session 4: API Changes

Michael going over his document about the responsibilities and interfaces

- Account balance, implement as part `GET /parties`
    - scheme rules will determine Scope and what is returned
    - Can a PISP respond to `GET /parties`
    - Isn’t this too much overhead?
    - Account balance, tx history
- Auth headers? Implementation detail or 
- Are we allowing access per account? Or are we giving PISPs access to all accounts once?
- we should not just trust PISPs willy nilly.
- *decision:* `*GET /parties*` *will do fine for account linking, and get list of accounts*
- later on, if a PISP wants info about tx for specific account, we need the OAuth association
    - splitting linking process from balance check process
    - *need a new resource*

new header field? Probably not

- debate about implicit vs explicit

`**PUT /transactionRequests/<ID>**`

`**initiatorId**`

- do we need this? Depends on above debate.
- And if we do, this should be a fspID and *not* a Party
- *decision: remove for now, but maybe put it back if we need*

`**payerKeyHandle**`

- this can’t be here, this should be from public key infra, not in the request?
- Adrian: maybe we do want this, can allow for easy lookup to ensure we can go ahead with the transfer (not a security measure)
- optimize for the successful case? 
    - Michael says yes
- *decision: follow up in more detail*

new U2F enum, yep go ahead

`**GET & PUT Authorizations**`

- bigger debate here about changes to this endpoint
- Coil guys have insights into this…
- TODO: watch video around 9:45

A few options:

- does Authorizations generalie well
- *Decision: Follow this up with Coil + Co*




## Action Items
[ ] Follow up Authorizations concerns with team Coil + DA
[ ] `PUT /transactionRequests/<ID>` model changes: need more clarity and discussion
[ ] Need to follow up the sign up phase and rules dictating a PISP, they should likely be as strict as a DFSP’s rules
[ ] AML and auditing requrements in event logging: This is a bigger conversation with Sybrin that will be brought up in the upcoming Fraud/AML meeting
[ ] we will likely want special functions in the FIDO server, so we might have issues where DFSPs want to BYO FIDO
[ ] JJ to merge 2 different PISP design docs into one
[ ] Investigate more into FIDO: are there standards that govern this stuff like OAuth? 


## Decisions
- FIDO Should be a part of the Mojaloop Switch, but we should be able to support DFSPs bring-your-own FIDO
- Use JWT signed tokens to talk between FIDOs and DFSPs
- Create a new Endpoint for getting party metadata from a DFSP, instead of adding metadata into the `GET /parties` endpoint
- After coming up with updated sequence diagrams, resources / Swagger, definitions (of PISP, etc); start with a PoC so that we can then make a concrete proposal to the CCB
- Polling for account balance updates isn’t a good idea, work on the assumption that a user can request account balances and get an update from the DFSP via the PISP

