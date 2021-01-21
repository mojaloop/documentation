# Audit Logging Standard

|   |   |
|---|---|
|version| `v1.0`|


In order for audit logs to be useful, they must record sufficient information to serve the operational needs, preserve accountability, and detect malicious activity. This standard defines these events and content recommended to be captured in a Mojaloop implementation. Running applications and infrastructure components will produce audit records for at least the following events:
1.	System start-up and shutdown
2.	User logon and logoff
3.	Privilege escalation
4.	Account creation
5.	Password changes

Information systems should produce audit records for the following event types, depending on system capabilities:
1.	Starting and stopping of processes and services / applications or APIs
2.	Addition of modules / libraries to an application
3.	Installation of patches and updates
4.	Compiling of code within the environment
5.	Initialization of a new pod or container within a cluster
6.	Installation and removal of software
7.	System alerts and error messages
8.	System administration activities across applications and infrastructure
9.	Access (as well as attempts to access) to and modification of Restricted Data


Audit logs create records that help you track access to the Mojaloop environment. Therefore, a complete audit log needs to include, at a minimum all or a combination of:
●	Capture CRUD actions in systems and databases and operational use cases. This will ensure all actions that result in Creation, Read, Update and Delete actions are captured with relevant details as below.
●	Record / Artifact ID
●	Audit log ID and sequence number (tracking sequence of Audit logs ensures we can detect audit log deletion)
●	Event type, status, and/or error codes
●	Service/command/application name
●	User or system account associated with an event
●	Device used (e.g. source and destination IPs, terminal session ID, web browser, etc.)
●	User IDs
●	Date and time records for when Users log on and off the system
●	Terminal ID
●	Access to systems, applications, and data – whether successful or not
●	Files accessed
●	Networks access
●	System configuration changes
●	System utility usage
●	Exceptions
●	Security-related events such as triggered alarms
●	Protection system notifications (i.e. intrusion detection or anti-malware notifications)
●	Source and destination IP addresses


## Importance of Audit Logs

Audit logging provides a historical account of all activities done by actors within a Mojaloop ecosystem. It will help Mojaloop implementations in the following ways:

1. **Threat Detection Analytics** – Through audit logs it is possible for Mojaloop switch operators to track changes and detect possible anomalies and identify malicious actions and trigger appropriate responses. This will go a long way in mitigating against possible fraud at DFSP and switch level.
2. **Customer Forensics** – In cases of queries from DFSPs, audit logs can assist give a forensic breakdown of transaction details as well as actions by authorized switch actors.
3. **Compliance** – Compliance standards such as GDPR have requirements to extract “all” customer data and also “delete” all customer data. For this to be possible, the audit data may also need to be extracted and preserved/deleted as appropriate. Audit logs are a critical requirement in most global best practice standards and regulatory frameworks such as PCI-DSS and GDPR.


## Recommended logging standards

| Item | Description |
| ---- | ----------- |
| **Ensure audit logs are in a format that is useful for human interrogation as well as machine analysis.** | In order to get the most out of your logs, you need to make your logs both readable for humans and structured for machines. Use a standard structured format like JSON where applicable. |
| **Have uniform log structure across all applications and infrastructure** | A prerequisite for good logging is to have a standard structure of your log file, which would be consistent across all log files. </br> Each log line should represent one single event and contain at least the timestamp, the hostname, the service and the logger name. |
| **Develop metrics for your logs** | The common metric types are:</br></br> Meter – measures the rate of events (e.g. rate of visitors to your website) </br> Timer – measures the time some procedure takes (e.g. your webserver response time) </br> Counter – increment and decrement an integer value (e.g. number of signed-in users) </br> Gauge – measure an arbitrary value (e.g. CPU) </br> </br> track and log metrics, or alternatively store metrics separately from your logs. |
| **Provide adequate context in log entries** | Each log line should contain enough information to make it easy to understand exactly what was going on, and what the state of the application was during that time. |
| **Use an appropriate logging framework** | Logging frameworks enable you to set up different appenders, each with its output formats and its custom log pattern. Popular logging frameworks are log4j and log4net among others. |
Log security audit logs as well as application uptime event logs	Application Event Log – This logging most often has to do with program level events, such as administrative actions and abnormal related events that technical staff use for debugging software problems. This identifies system problems before they are big enough to cause harm, such as system outages or failures, which can hinder productivity. 
Application Audit Log – Audit logs capture events which can show “who” did “what” activity and “how” the system behaved. These logs most often refers to user level transactions, such as a change to a financial record that was made by ‘Allan Smith’ at ‘21:00HRS’ on ‘May 12, 2019.’ 
Do not log sensitive information	Ensure application logs do not contain sensitive information such as passwords, PII data and any information that may aid an attacker to gain further access to a network / application as much as possible. 

Lower exposure by not logging sensitive data or by scrubbing it before it is transmitted.
Use fault tolerant protocols to transmit audit logs	TCP or RELP (Reliable Event Logging Protocol) can be used to transmit logs instead of UDP, which can lose packets. Automatically retry if sending fails.
Set up audit log access controls	Set up adequate controls to restrict who can access, query, and administer audit log servers. This can be handled by third party tools that integrate with the logging server.

NIST recommends that organizations create and maintain a secure log management infrastructure.

