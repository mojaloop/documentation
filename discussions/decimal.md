# Moajoop Decimal Type; Based on XML Schema Decimal Type

## Decimal value type

 Definition: decimal represents a subset of the real numbers, which can be represented by decimal numerals. The value space of decimal is the set of numbers that can be obtained by multiplying an integer by a non-positive power of ten, i.e., expressible as i × 10-n where i and n are integers and n ≥ 0. Precision is not reflected in this value space; the number 2.0 is not distinct from the number 2.00. The order relation on decimal is the order relation on real numbers, restricted to this subset.
 Req: All Level One processors must support decimal numbers with a minimum of 18 decimal digits. However, Level One processors may conform to a scheme-defined limit on the maximum number of decimal digits they are prepared to support, which must be 18 or more digits, in which case that scheme-defined maximum number must be clearly documented.

## Lexical representation

decimal has a lexical representation consisting of a finite-length sequence of decimal digits (#x30 – #x39) separated by a period as a decimal indicator. An optional leading sign is allowed. If the sign is omitted, "+" is assumed. Leading and trailing zeroes are optional. If the fractional part is zero, the period and following zero(es) can be omitted. For example: -1.23, 12678967.543233, +100000.00, 210., 452

## Canonical representation

 The canonical representation for decimal is defined by prohibiting certain options from the Lexical representation (§3.2.3.1). Specifically, the preceding optional "+" sign is prohibited. The decimal point is required. Leading and trailing zeroes are prohibited subject to the following: there must be at least one digit, which may be a zero, to the right and to the left of the decimal point.

 This canonical form conforms to XML Decimal lexical representation, so it would be accepted by any XML schema conforming system.

 What others write in canonical form, we can read as a lexical representation; what we write in canonical form, others can read as a lexical representation. But we reject exponential formats on reading and we won’t write exponential form. We can directly compare the canonical string representations of two values for equality.

 When exchanging messages, a lexical form that shows implied precision using trailing zeros is preferred to pure canonical form if it improves clarity. E.g. We might write “5.00” instead of “5.0” where the unit of exchange is commonly specified precise to two decimal places, as in USD, EUR, or GBP. This lexical representation option is permitted within valid lexical forms of both XML decimal and Mojaloop decimal.

## Validators

 Decimal Lexical Validator (what our message receivers accept):

^[-+]?(([0-9]+[.]?[0-9]*)|([.]?[0-9]+))$

Decimal Canonical Validator (the form we store and compare; this pattern could be used to assert canonical form in generated messages):

^([0]|([-]?[1-9][0-9]*))[.]([0]|([0-9]*[1-9]))$

## Translating Between External and Internal Forms

 When converting from lexical or canonical form to a binary internal representation, the value space of the internal representation must be large enough to hold the scheme-specific range of decimal values, with a significand defined as the signed integer range –(10m–1)..(10m–1), and a non-positive integer exponent in the range –m..0, where m is the maximum number of decimal digits, at least 18, and as defined by the specific Level One scheme.

An implementation must not translate between decimal external representations and any floating-point binary internal representation. And all calculations on internal representations of decimal values must produce results as if they were performed in decimal long hand on the external representation.

It should be noted that the value space of a signed 64-bit binary integer is sufficiently large to encode a signed 18-digit decimal significand and the value space of a signed 6-bit binary integer is sufficiently large to encode its required non-positive base-ten exponent.
