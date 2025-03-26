# Interconnecting Payment Schemes

Mojaloop, as a single deployment, is intended to be used to operate one (or more) payment schemes, operating on a single platform. Of course, it is quite common for a country to host multiple payment schemes, built around differing requirements for different sectors. 

Ultimately, though, as a payment scheme grows, then the need to be interconnected  or interoperable with other payment schemes in a country grows. Mojaloop accommodates this, through a mechanism we call "Interscheme".

Mojaloop's Interscheme approach uses a specialised type of DFSP Participant, which we call a Proxy. A Proxy is a lightweight DFSP that exists in both interconnecting schemes, and has the following characteristics:
- The Proxy does no message processing; all it does is pass messages (transactions) between the connected schemes;
- Ensuring non-repudiation across schemes means that the proxy is not involved in the agreement of terms, which helps reduce costs;
- It plays no part in the clearing of transactions.

The consequence of this is that a Proxy preserves the three phases of a Mojaloop transfer, as well as ensuring end-to-end non-repudiation. Consequently, the agreement reached during a transfer remains between the originating and receiving DFSPs, whichever scheme they are connected to.

![Simple Interscheme Connection](./SimpleInterscheme.svg)

Further, the Mojaloop scheme interconnection model supports cross-scheme discovery; in other words, an alias used in one scheme can be used to route a payment from another.

The current version of Mojaloop only supports the interconnection of Mojaloop-based schemes. Work continues to extend this to support other payment schemes, connected to a Mojaloop-based scheme.

Further details of the implementation of this scheme interconnection capability can be found in the [**interscheme documentation**](./interscheme.md).

The following pages will be of interest to those who wish to review how interscheme capabilities relate to [**foreign exchange**](./ForeignExchange.md) and [**cross border transactions**](./CrossBorder.md).
