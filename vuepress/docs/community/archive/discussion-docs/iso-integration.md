Mojaloop ISO Integration discussions

# Mojaloop-ISO integration
 
The proposed solution would be able to handle ISO to Open API translation and vice versa, by making use of an ISO-OPEN API converter/connecter plug-in or interface, similar to the Scheme Adapter in the Mojaloop system. As the Scheme adapter performs Mojaloop API to FSP API conversion, the custom plug-in/interface would function as a protocol and message translator between the ISO interface and the ML API or the Scheme Adapter.

## Scope

Define message flows in both and ISO and Open API networks and mappings between messages.
 -  Document failure scenarios and message flows for these.
 -  Define a mechanism for routing that is MSISDN-based .
 -  Mojaloop Transactions could be sent through existing payment rails conforming to their standards(such as ISO)
 -  Develop a scheme adapter/plug-ins that could perform ISO-Open API and vice versa.
 -  To be able to send Mojaloop transactions originating from ATM and POS over ISO networks, across Mojaloop systems
 
 ## ISO 8583 - Mojaloop - An Inter-network case study
 
Africa is a great continent with a multitude of Financial Service providers who focuses on region based financial inclusion and services provision. The continent boasts of a vast network of Payment service providers and financial institutions. Some of the most prominent networks are listed below:

-   InterSwitch ( Nigeria)
-   eProcess ( Ghana)
-   Umoja Switch ( Tanzania)
-   KenSwitch ( Kenya)
-   ZimSwitch ( ZImbabwe)
-   RSwitch ( Rwanda)

Almost all of these networks make use of an ISO 8583 based Payments processing platform ( Postilion Switch) to drive ATM’s, POS & Mobile channels, process card based and non card based transactions for both acquiring and issuing verticals.

As such, the proposition is to create a solution, where by the existing Payment networks could integrate with a Mojaloop based system like Mowali, without having to make any development or design changes to their existing infrastructure.

In this case study, we are considering the case of Umoja Switch in Tanzania and provide them with a solution whereby, Umoja could provide Mojaloop transactions through their existing ATM deployments.

### Umoja Switch

UmojaSwitch was established in the year 2006 by six banks in Tanzania with the main purpose being able to establish a joint shared infrastructure for financial services and enjoying the economies of scale.

The aim of establishment was to create a shared platform where financial institutions can integrate and interpolate through a shared switch. 

Eventually, the number of members joining the UmojaSwitch network continued to increase and as of now there are around 27 banks who has joined the Umoja Switch consortium.

## ISO Networks to Open API

The goal of the PoC would be to showcase how a Mojaloop transaction would be sent over a standard ISO switch/Network through to a Mojaloop system such as Mowali.

As a part of this an ISO-Open API Adapter would be implemented which would process ISO messages originating from an ISO network like InterSwitch and send it through to an Open API network like Mowali.

## Proposed Solution

The proposed solution will consist of an interface or adapter/plugin that could process transactions between ISO networks and Mojaloop systems. 

The ISO payments platform makes use of an ISO interface which uses standard TCP/IP connection to send and respond to ISO messages to and from the various channels. In order to accept and process connections from the interface, our solution would have a TCP/IP listener, which would receive and process transactions from ISO network and then map it to Open API , after which the transactions will be sent over to a Mojaloop system like Mowali on a URL.

In this case the payment networks are largely dependent on their respective (i.e. Visa/ MasterCard/Verve/etc) card or account number, which is used to define the BIN look up table for routing purposes . One of the options would be to predefine a Bin range (eg: 757575) that would identify a Mojaloop transaction and then let the payment network implement a routing logic that would send all Moja transactions through to the Open API network.

The ISO-Open API adapter would process the ISO message received from the ISO switch and send it through to the Mojaloop system in Open API format.

However, such changes would imply configurational changes to download applications on ATM and other terminal devices, but this could be handled as a standard operational change similar to the existing configurational changes performed as per the business requirements.




