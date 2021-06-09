# SDK Scheme Adapter
A scheme adapter is a service that interfaces between a Mojaloop API compliant switch and a DFSP backend platform that does not natively implement the Mojaloop API.

The API between the scheme adapter and the DFSP backend is synchronous HTTP while the interface between the scheme adapter and the switch is native Mojaloop API.

* [Usage](./usage/README.md)
  * [Scheme Adapter to Scheme Adapter](./usage/scheme-adapter-to-scheme-adapter/README.md)
  * [Scheme Adapter to Local K8S cluster](./usage/scheme-adapter-and-local-k8s/README.md)
  * [Scheme Adapter to WSO2 API Gateway](./usage/scheme-adapter-and-wso2-api-gateway/README.md)
