# Pragmatic REST

## Pragmatic REST For the Mojaloop Project

With the emergence of API strategy as a scaling tool for Internet service businesses, the focus on interconnect technology has shifted. Building on the principles that enabled the Web to form and scale, REST \(Representational State Transfer\) has become a design preference for Internet service APIs. But while the REST principles, proposed in Roy Fielding's dissertation that defined them, have academic value as a basis for research, a pure REST design is not at present practical for most applications. We are advocating a kind of Pragmatic REST-a design pattern that adopts the beneficial components of RESTful design without requiring strict adherence to academic purity.

### The Richardson Maturity Model

Martin Fowler has referenced1 a structured model of RESTful adoption developed by Leonard Richardson and [explained](http://www.crummy.com/writing/speaking/2008-QCon/act3.html) at a QCon talk. Fowler refers to this as the Richardson Maturity Model of RESTful design.

![](../../.gitbook/assets/glory-of-rest.png)

Martin Fowler, referencing [Rest in Practice](https://www.amazon.com/gp/product/0596805829?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596805829),2 summarizes the genesis of RESTful design:

> use Restful web services to handle many of the integration problems that enterprises face. At its heart . . . is the notion that the web is an existence proof of a massively scalable distributed system that works really well, and we can take ideas from that to build integrated systems more easily.

A pragmatic approach to RESTful design uses the best parts of Fielding's conceptual framework to allow developers and integrators to understand what they can do with the API as rapidly as possible and without writing extraneous code.

At its most fundamental, a RESTful design is resource-centric and uses HTTP verbs. At its most advanced, a design that follows pure academic REST utilizes the HATEOAS principle by implementing Hypermedia Controls. We are advocating a Level 2 RESTful design for Mojaloop.

### Why not Hypermedia Controls?

Although HATEOAS is a fascinating principle-it advocates that a server should respond to each client action with a list of all possible actions that can lead the client to its next application state. And further, clients _must not_ rely on out of band information \(like a written API spec\) for what actions can be performed on which resources or on the format of URIs.

It is this final proscription that fails the test of Pragmatic REST: While HATEOAS is an interesting theoretical approach to limit coupling, it does not easily apply to Mojaloop \(or any other contract API design\). When we take into account our audience for the interconnect APIs, we find a group of commercial entities that will be operating under a set of highly specific scheme rules. Interactions between the participants, and between participant and central service hub, will be highly specified to assign acceptable commercial risk that can be priced at very low cost to end-users. This requires _ex-ante_ predictability of the API which is anathema to the HATEOAS principle defined by Fielding.

### Pragmatic RESTful Principles

#### URIs Define Resources

A well-designed URI pattern makes an API easy to consume, discover, and extend, just as a carefully designed API does in a traditional programming language. Pure REST disdains this principle in favor of HATEOAS. But pragmatic REST follows a normal pattern for URI definitions to improve human understanding, even if HATEOAS principles are employed for discovery.

URI paths that refer to a collection of objects should consist of a plural noun, e.g. /customers, to refer to a set of customers. When a collection can have only one instance, the singular noun should be used to avoid confusion. E.g. GET /transfers/:id/fulfillment is correct, since there is only one fulfillment object per identified transfer.

URI paths that refer to a single object should consist of a plural noun \(representing the collection\), followed by a predefined unique identifier. E.g., /customers/123456 to refer to the specific customer with number 123456. The identifier must be unique within the containing collection and persist for the life of the object within that collection. IDs must not be ordinal values-ordinal retrieval of objects from a collection is possible using query parameters on the collection URI.

URI paths may have a prefix to identify the environment, version, or other context of the resource. Nothing should follow the identifying path but collections and object references.

URI path and query segment identifiers should be chosen from the Roman character set, \[0-9A-Za-z\]. Use _camelCase_ to define the elements of the URI path. Do not use snake\_case.

For the avoidance of doubt, "\_" \(underscore\) and "-" \(hyphen\) should not be used in URI path or query segment identifiers.

This probably seems a bit parochial. The purpose is to find a well-defined URI format that is consistent with wide-spread practice, easy to define, predictable, and that maps to native environments and conventions. It isn't going to satisfy everyone. Here is reasoning behind this constraint:

CapitalCase and camelCase are the defacto standard for NodeJS and JavaScript and are a common constraint in URI definition: URI path segments are often mapped to JS internal resources and so conforming to JS naming conventions makes sense.

Field names in JSON and SQL should also follow this convention since they are often automatically mapped into variable name space and can be referenced in URIs as path or query segment identifiers.

We should also avoid the use of "$" unless it is required by a library \(e.g. JQuery\). IBM JCL has passed away; let it rest in peace. There are better scope control tools to separate name spaces than introducing non-roman symbols.

We should avoid "-" \(hyphen\) in path segment and query parameter names as it does not map into variable names, SQL, or JSON field name identifiers.

Underscore characters must be escaped in markdown source by prefixing each with a "\" character.

Snake\_case has been reported to be slightly easier to read than camelCase in variable names, but it actually does not improve readability of URIs, as it visually interferes with path and query segment delimiters making it difficult to visually parse them. And when URIs are underlined in presentation, the underscores become illegible.

#### URI Parameters

Use a standard and predictable set of optional parameters in a consistent way.

A set of standard query parameters should be used for collections to enable caller control over how much of the collection they see. E.g. "count" to determine how many objects to return, "start" to determine where to start counting in the result set, and "q" as a generic free-form search query. We will define the standard set of parameters as we go and will apply them consistently.

#### Verbs

Singular objects should support GET for read, PUT for complete replacement \(or creation when the primary key is specified by the client and is persistent, e.g. a payment card PAN\), and DELETE for delete.

Collections should support GET to read back the whole or part of a collection, and POST to add a new object to the collection.

Singular objects may support POST as a way to change their state in specified ways. Posting a JSON document to a singular object URI may allow selected field values to be updated or trigger a state change or action without replacing the whole object.

GET must be implemented in a _nullipotent_ manner-that is, GET never causes side effects and never modifies client-visible system state \(other than logging events or updating instrumentation, e.g.\).

PUT and DELETE must be implemented in an _idempotent_ manner-that is, changes are applied consistently to the system data in a way that is dependent only on the state of the resource and inputs but on nothing else. The action has no additional effect if it is executed more than once with the same input parameters and does not depend on the order of other operations on a containing collection or other resources held in the collection. For example, removing a resource from a collection can be considered an idempotent operation on the collection. Using PUT to fully replace \(or create\) a uniquely identified resource when the URI is fully known to the client is also idempotent. This implies that the system may reorder operations to improve efficiency, and the client does not need to know whether a resource exists before attempting to replace it.

POST and PATCH3 are not idempotent operations. POST is used to create new resources where the resource identifier is assigned by the server or where a single identified internal resource is implied by the target URI \(e.g. POST /transfers, but PUT /transfers/:id/fulfillment\).

#### Data Format

We favor [JSON](http://json.org/)4 related data formats over XML. In some cases, data formats will be binary or XML, as defined by pre-existing standards, and these will be precisely specified. Binary formats should have a formal syntax to avoid ambiguous representational translations \(e.g. character set translations, big- or little-endian representations of numeric values, etc\).

Date and time values used in APIs should comply to the ISO 8601 standard, and further profiled by the w3c Note on Date and Time Formats.5 This w3c note should lead to the reduction in complexity and error scope of communicating components that must exchange tangible dates and times. There will be cases where we use non-ISO format date or time as required by an external standard, e.g. ISO 7813 expiry dates.

Existing standard XML formats should have an XSD schema for the acceptable subset profile used within the project. For particularly complex data formats, we may use a common format profile translator to map between our project subset of the standard format and the wire format used by a standardized protocol \(e.g.\). This will limit coupling to complex formats in a more maintainable way.

When specifying the PATCH action for a resource, we will use a consistent patch document format \(e.g. [JSON Patch](http://jsonpatch.com/)6\).

#### Return Codes

Use HTTP return codes in a consistent way and according to their standard definitions. The standard codes are defined in RFC 2616.7

#### Machine Readable Error Format

The API should provide a machine readable error result in a well-defined JSON format. {TBD whether to use a response envelope and how to format errors, faults, and success envelopes. RESTful design relies on headers to carry protocol-defined errors, debug info can also be carried in headers. We should be clear on why we are using an envelope and how this supports normal production communication between client and server.

#### Versioning

API URIs should include a version identifier in the format v_M_ as a leading path element \(where _"M"_ is the Major component of the multi-part version number\). The API and its version identifier element must conform to the [semantic versioning](http://semver.org/)8 2.0 specification for API versioning.

A client must specify the Major version number in each request. It is not possible for a client to express a requirement for a specific minor version.

The full API version number is specified in the response header \(TBD\) for all successful and error responses.

While an API version contract will be influenced by Major, minor, _and_ patch levels, only the Major version number is a production API binding element-that is, a production client cannot request a particular minor version or patch level and a production server will not accept a URI request that specifies these extra elements.

However, in pre-production environments, it is anticipated that some combination of minor, patch, pre-release, and metadata suffixes would be supported in client requests \(as defined in _semver_ \[3\]\) and _may_ be expressed in _pre-production_ URIs to assist with development and integration scenarios.

### We May Need to Give REST a Rest

As we design the interconnection APIs between components and between participating systems, we may find API requirements that don't precisely match the Pragmatic REST pattern defined here. We will evaluate these case-by-case and make the best choice to support the project goals.

### Non-Functional Requirements

As we develop the APIs, we will make consistent choices about non-functional requirements to reinforce the project goals.

1: [http://martinfowler.com/articles/richardsonMaturityModel.html](Richardson%20Maturity%20Model), retrieved August 18, 2016.

2: [https://www.amazon.com/gp/product/0596805829](https://www.amazon.com/gp/product/0596805829?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0596805829), retrieved August 18, 2016.

3: RFC 5789, _PATCH Method for HTTP_, [https://tools.ietf.org/html/rfc5789](https://tools.ietf.org/html/rfc5789), retrieved August 18, 2016.

4: _Introducing JSON_, [http://json.org/](http://json.org/), retrieved August 18, 2016.

5: [http://www.w3.org/TR/1998/NOTE-datetime-19980827](http://www.w3.org/TR/1998/NOTE-datetime-19980827), retrieved August 22, 2016.

6: _JSON Patch_, [http://jsonpatch.com/](http://jsonpatch.com/), retrieved August 18, 2016.

7: [https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

8: _Semantic Versioning 2.0.0_, [http://semver.org/](http://semver.org/), retrieved August 18, 2016.

