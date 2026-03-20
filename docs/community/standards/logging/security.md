# Security and Sensitive Information

This document defines the requirements for handling sensitive data in logs to insure compliance and security.

## Sensitive Information (PII)

**Requirement:** Strictly avoid logging sensitive information.

**Never Log:**
- Passwords / Secrets / Keys
- Bank Account Numbers (Mask: `****1234`)
- MSISDNs (Mask: `****5678`)
- Personally Identifiable Information (PII) like Names, Phone Numbers, Addresses (unless authorized and necessary for debugging in secure envs)
- Authentication Tokens (Bearer tokens)

## Compliance Exceptions

Exceptions to these redaction rules for emergency debugging (e.g., "Break Glass" scenarios) must be handled via **Configuration** (e.g., temporary environment variable changes), never by code changes. 

*   These exceptions must follow the organization's Incident Management process. 
*   There should be no permanent code paths that bypass PII masking.
