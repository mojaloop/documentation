# API Documentation

## Overview

Mojaloop provides a set of APIs that enable interoperable financial transactions. Proper API documentation is crucial for developers to understand and integrate with Mojaloop effectively.

All Mojaloop APIs must be documented using either:
- **RAML** (RESTful API Modeling Language)
- **OpenAPI/Swagger** (preferred for new APIs)

## API Documentation Standards

### Format Requirements

1. All API endpoints must include:
   - Complete endpoint URL pattern
   - HTTP method (GET, POST, PUT, DELETE, etc.)
   - Request parameters and their data types
   - Request body schema (when applicable)
   - Response schema for each status code
   - Error codes and descriptions
   - Authentication requirements

2. Include practical examples for both requests and responses

3. Document all API versions with clear change logs between versions

## Documentation Style

### Section Headings

* Do not number headings - for example, "Prepare and Fulfill", not "C - Prepare and Fulfill"
* Make sure section headings match the heading to which they correspond in the comprehensive documentation
* Do not include the word "documentation" in headings

### Organization and Accessibility

* For sections that contain many subsections of endpoints or methods, provide a table of contents at the beginning of the section
* Group related endpoints together logically
* Use consistent terminology throughout the documentation
* Instead of the word "project," use a specific noun such as component, microservice, or interface

### Procedures

* Introduce procedures with H3 (`###`) or H4 (`####`) headers (not H2 (`##`))
* Do not use numbers in procedure section headings
* Use ordered-list formatting for procedure steps, for example:
  1. Step 1
  2. Step 2
  3. Step 3

## API Documentation Tools

The Mojaloop community recommends these tools for API documentation:

- **Swagger UI**: For interactive OpenAPI documentation
- **ReDoc**: For more readable static documentation
- **Postman Collections**: For shareable API examples and testing

## Integration with Core Documentation

API documentation should be:
1. Version-controlled alongside the code
2. Published to the main documentation site
3. Kept up-to-date as the API evolves

## Resources

- [Architecture Documentation Guidelines](https://docs.mojaloop.io/technical/architecture/architecture-documentation-guidelines.html)
- [OpenAPI Specification](https://swagger.io/specification/)
- [RAML Specification](https://raml.org/)
