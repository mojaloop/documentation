Cross-border Workstream Meeting 
March 10th & 11th (London/remote)

Next Steps for PI:
•  Proposal for how the CNP query and host oracle services and global goals  - Adrian, Michael 
•  Compound identifiers, ways in which this is captured in the system or expressed in apis - open
•  What information is captured in the data model or the extension list - Michael
•  Follow-up w/ SWIFT to discuss requirements - Matt 

Open Items:
•  Finalize CNP Requirements
•  Has to aggregate information and put them together into a single request & they will need to sign separately
•  Finalize FXP has to manage FX rates, the settlements and what expires when
•  CNPs can extend this and determine additional scheme rules
•  FXP handles rounding errors
•  FXP Guarantee a given rate
•  How do you get non-Mojaloop folks in the schema?
•  How do we integrate Mojaloop and some Mojaloop scheme to provide a full PVT payments - working group with Michael, Adrian, Sybrin, others as needed
•  How do we manage requests for regulatory reasons
•  Investigate identifier mappings (Map pathfinder accounts/mobile accounts to DFSP unique IDs)
•  Investigate Certification (Hash and PKKI)

Detailed Meeting Notes:
Day #1:
	- Quote response
		○ How do we code the SLA into the response
		○ Ask a 2nd CNP to route
		○ In the API - need to package up how to get it there
		○ As a CMP in Mowali if I return a quote response the scheme has implications 
		○ Follow the whole route from payer to payee 
		○ Limiting the participation of CNP - they need to be the last hop
			§ How to define the requirements of a CNP?
	- Message format
		○ Http syntax
		○ Started from the mojaloop scheme 
			§ Move towards the CNP should manage the conversion
		○ SWIFT version
		○ Security - TLS
		○ Header/content encrypted in JWS
	- Retail system
		○ Off network - remit to someone hub
	- Data Model
		○ Structure: Ways in which we added new information, different routes, etc.
		○ Privacy: Visibility and Security  - only accessible to the people that can see it
		○ Content of the data model 
	- Transfer is done through the switch (movement of money)
	- Question
		○ In mowali - the amounts are expressed but the rate is important because it impacts settlements 
			§ Data flow - we add the rate when we send the quote back
			§ Added in the extension list - should it be part of the standard?
			§ Send and receive amount (differ currency) 
	- Data element
		○ Fee for each participant
		○ Payer DFSP adds it up 
		○ Fee element for the transaction 
	- Original DFSP (a) 
		○ From DFSP A to FXP1
			§ From FXP 1 to CNP
				□ CNP to DFSP B
					® Each participant will resign
	- Proposal
		○ Account lookup service
			§ List of local FSP
		○ Switch - need to maintain state and lookup requests
			§ Should look like a domestic transfer to the sender
			§ Collect the information and send it back -
		○ CNP - making assumptions to meet requirements
			§ Do you need to see the route
			§ Collecting different information downstream
			§ Sending FSPs needs to know who is the receiver
				□ If they are not in the scheme
				□ If the CNP
		○ CNP has to aggregate information and put them together into a single request & they will need to sign separately 
			§ Condition and fulfillment is part of a PKI structure
				□ If I trust the condition from the Payee - I can trust the fulfillment 
			§ If there is more than one CNP - there needs to ensure the DFSP payee has to be certain the DFSP payer - connections
				□ Need to contact you directly w/ shared secret (condition and fulfillment) 
				□ Secure channel 
				□ Hash - 
			§ CNP needs to know everything, regulatory reporting - 
				□ HOW do you guarantee it gets there?
			§ Need to know who not to send money for final routing (not always best hop routing) 
			§ Condition and fulfillment - guarantee transfer
			§ Payer knows - private channel between payer and payee -- 
			§ Enables all the participants 
		○ Do we need to duplicate the structure in a Cross-network transfer?
			§ Trying to prevent a rouge partner from joining
			§ Trust the CNP to meet their SLAs
		○ Mojaloop to another scheme - we don’t have control
			§ Require they confirm receipt 
			§ How can I tell 
			§ How can I tell the person at the end got the money 
		○ External signing authority to confirm the money was received
			§ If your scheme wants to participate in x-border then all the participants need to get signed
			§ Public key -  need to join a mojaloop network have to issue public keys
			§ Central certificate issuing authority 
			§ Need a PKI structure in place 
		○ How do you get non-Mojaloop folks in the schema?
			§ How do we integrate Mojaloop and some Mojaloop scheme to provide a full PVT payments - working group with Michael, Adrian, Sybrin, others as needed
			§ Identify the participants  -  FSP, DFSP - all have signed
			§ Parties - end users (Bob/Alice)
			§ Single transaction (with multiple transfers)
			§ No one commits their funds to everyone is satisfied 
			§ How to extend mojaloop and non-mojaloop scheme 
		○ Certification 
			§ Hash and PKKI
			§ Gold and silver network
			§ New partner - live on the network 
			§ Scheme decides requirement on the network 
			§ Self-signing cert 
		○ Liquidity 
			§ FXP does position mgmt
			§ What requirements do we put on a FXP
			§ Mobile money has less flexibility 
			§ Rules that happened across schemes 
		○ FXP has to manage the settlements, what expires when, etc..
			§ FXP has to manage the shortage of quote validity 
			§ Allow FXP to reject the requests
		○ How do we manage requests for regulatory reasons
			§ There is a dictionary 
				□ Is the a requirement to share KYC?
				□ You can ask for many things - up to the participant 
				□ Need to agree on the baseline scheme

Day #2:
	- Switch data
		○ Account numbers
		○ Blacklist, white list (oversight and blocking)
		○ Keeping it simple
		○ Hub 
		○ Side service for folks that can do this
			§ Mobile data capture
			§ Side car
			§ Digital process 
			§ Value added services for the hub (managed service)
	- Switch - need to maintain state and lookup requests
	- CNP can be an ordinary DFSP
		○ All DFSP supports all the use cases
		○ Full participants (might just provide a CNP or FXP service)
	- FXP definition and requirements
		○ FXP - require rates/fees as part of the Quoting service - need standard industry rate
			§ CNPs can extend this and determine additional scheme rules
		○ FXP handles rounding errors 
		○ Guarantee a given rate
		○ Manage settlement across schemas
		○ FX rates
		○ Should allow people that just do FX
		○ Edge cases for failure
			§ Details in the error messages to find the errors
		○ FXP needs to point back the right information 
			§ How messages passed work
			§ Edge cases - share what is done too date
			§ Jo owns got a working API - identified 
			§ Changed the quote (intercepted the quote) -- 
			§ KYC extension list - extended the quote for this
			§ Rates are in the extended list (are the list)
			§ Where the FXP is applied ?
			§ What do we do with fees downstream
				□  (payee DFSP takes place of the aggregation)
	- How to manage identifier resolution 
		○ 2 types of Identifiers
			§ Global ones (pass to CNP) - to get a response
			§ Local ones - expect the user to provide
		○ Mojaloop we use identifiers as proxy 
		○ Merchant numbers might be specific to a scheme 
			§ Till value - 
		○ Multiple identifiers for a single account
		○ How do we uniquely identify the account?
		○ Rely on CNP (restrict each identifiers in this scheme)
		○ What sort of structures in place
		○ Passport identification - place holders
		○ Map pathfinder accounts/mobile accounts to DFSP unique IDs
			§ Service - primary account is X
			§ Each country has a service they provide
			§ Each CNP understands the address scheme
			§ Global one - need to know which ways to use 
		○ Sends a get parties to the switch 
			§ ALS never heard of them
			§ 2 ways 
				□ Global way (path finder and conversion to BIC)
	- CNP
		○ Not hosting anything
		○ Route through the CNP - ask others
		○ Constructing the alternative routes 
	- Global registry does not exist
		○ Ultimate beneficiary 
		○ Established communication
		○ Challenge will we able to have 2 DFSPs share direct communication and will be a stretch? 
	- Switch has schemes
		○ A Hub operator following Scheme Rules may allow names of FSPs as decided by those Rules
		○ The technology or the Admin API itself doesn’t restrict the names (apart from restrictions on length, type or characters, etc)
		○ BGP: Border Gateway Protocol 
	- Query each CNP and then come up with optimizations, matrix that provides global route - goal would be not to query the CNP directly
• How to connect with Mojaloop?
	- Any financial service can connect to Mowali
	- Scheme rules, technical
	- Regulatory 
	- How do I assign stuff? - no one knows the steps
	- Mojaloop API - understand this.  
	- 2 instances Mojaloop instances - TIPs and Mowali 
		○ WOCCU, Asia, US - applied for instance
		○ Still pushing the boundries 
	- What dos an integration look like
		○ Need sandbox, simulators 
		○ Standard approach
• Instance payment service
	- Get the flows flowing in a timely manner
	- Need real-time ledgers; what happens if they are offline?
	- Exception for off network (banks take advantage of float) 
• Mowali 
	- Need to get a quote
• Discovery process (sending FSP)
	- Switch determines if they need to contact a FXP
	- What currency the receiving account can receive in 
	- Multiple lookups
	- Data model - set of accounts, w/ one currency at a DFSP


Attendees:
	- Mike, Patricia - Thume
	- Michael R, Rob R, Sam - Modusbox
	- Kim, Lewis - Crosslake
	- Rolland, Greg, Phillip - Sybrin
	- Vanburn -- Terrapay
	- Megan, Simeon - Virtual
