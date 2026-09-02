# Spanish Locale Guide

> **Status:** Draft
>
> **Applies to:** Everyone translating, reviewing, or merging Spanish (`es-419`) content under `docs/es/` in the `mojaloop/documentation` repository.
>
> **Companion documents:** [Translation rules and guidelines](../../../documentation/translationguidelines.md), [PR guidance](../../pr-guidance.md), [AI usage policy](../../../standards/ai_policy.md).

**AI Disclosure** This document includes content generated with assistance from Claude Opus 5. All content has been reviewed and validated by the author.

---

## A.1 Register and voice

**Address the reader as `usted`.** Never `tú`, never `vos`. Use the `usted` verb form throughout, including in imperatives: *Ejecute el comando*, not *Ejecuta el comando*. Where the English drops the subject entirely ("Run the following command"), Spanish does the same rather than inserting *usted* on every sentence.

**Match the directness of the source.** Mojaloop documentation is terse and instructional. Do not soften an instruction into a suggestion, and do not add courtesy the English does not have. "You must register the participant" is *Debe registrar al participante*, not *Le recomendamos registrar al participante*.

**Prefer the active voice**, as the English does. Spanish tolerates the passive more readily than English, and machine translation reaches for *se* constructions and *ser + participio* far more often than a human writer would. Where the English is active, keep it active.

**Keep sentence boundaries.** Spanish sentences run longer than English ones naturally, but do not split one English sentence into three or merge a paragraph into one.

**Normative language keeps its force.** This is the rule most easily lost in translation, and weakening it changes what the specification requires:

| English | Spanish | Force |
| --- | --- | --- |
| MUST / must | DEBE / debe | strict requirement |
| MUST NOT / must not | NO DEBE | strict prohibition |
| SHOULD / should | DEBERÍA / debería | strong recommendation |
| SHOULD NOT / should not | NO DEBERÍA | strong discouragement |
| MAY / may | PUEDE / puede | permitted option |
| SHALL / shall | DEBE / debe | strict requirement, synonym of MUST |
| SHALL NOT | NO DEBE | strict prohibition |
| REQUIRED | REQUERIDO | strict requirement |
| RECOMMENDED | RECOMENDADO | strong recommendation |
| OPTIONAL | OPCIONAL | permitted option |

`REQUIRED` and `OPTIONAL` stay in English where they mark API field cardinality rather than appearing in prose.

`should` is never `debe`. `may` is never `debe` or `debería`. Where the English capitalises the keyword, the Spanish capitalises it too.

---

## A.2 Typography

**Variety.** Neutral international Latin American Spanish. Avoid country-specific regionalisms in either direction: no `vosotros`, no `voseo`, and no vocabulary that only reads naturally in one national market.

**Quotation marks.** House convention is angular quotes `« »` for quoted terms and glosses, as in *el «Switch» de Mojaloop*, with straight double quotes inside them where a quotation nests: `«… "…" …»`. This follows RAE rather than the straight quotes more common in Latin American publishing, and it is a repository convention rather than a fact about Spanish.

This governs quotes the translator introduces. Quotation characters inherited from the English source, including curly ones, are carried over unchanged.

No space inside `« »`: write `«Switch»`, not `« Switch »`. The French locale writes its guillemets with inner spaces, so this is easy to carry over when working from a French page.

**Apostrophes.** Spanish has no Saxon genitive, so *Mojaloop's documentation* becomes *la documentación de Mojaloop*. Otherwise the apostrophe appears only inside preserved English terms, file names, or quoted output, where it is left exactly as the source has it.

**Inverted punctuation is required.** Every question opens with `¿` and every exclamation with `¡`. This is the single most common defect in machine-translated Spanish and it appears in headings as often as in prose: `## 3. ¿Qué es un participante?`

**Accents are not optional**, including on capitals: *Última actualización*, *Adopción*, *Técnico*. A missing accent is an error, not a style choice.

**Numbers.** Follow the source. Where the English writes `24 GB` or `2.4GHz`, the Spanish writes the same. Keep the source's decimal point everywhere, including in running prose. Do not introduce a decimal comma: the separator is regionally split across Latin America, so using it would vary from page to page.

**Dates.** Written out, a date is `22 de agosto de 2026`. Month and weekday names are always lowercase in Spanish, which is the most common defect carried over from English. Where the source uses a numeric date, keep the source's form rather than reordering it.

**Capitalisation.** Spanish sentence case for headings, not English title case: *Preguntas frecuentes técnicas*, not *Preguntas Frecuentes Técnicas*. Product, component, and service names keep their English capitalisation.

**Gender of preserved English nouns.** Terms kept in English still need an article in Spanish prose. Fix these once so they do not vary: *el Switch*, *el Hub*, *el FSP*, *el DFSP*, *la API*, *el endpoint*, *el commit*, *el pull request*, *la rama*.

**Spacing.** No space before `:`, `;`, `?` or `!`. This differs from French and is a common carry-over when working from the French locale.

---

## A.3 Terms kept in English

These are identifiers, not vocabulary. They are never translated, and they are never pluralised or inflected in Spanish.

**Mojaloop components and services** `Switch`, `Hub`, `Account Lookup Service (ALS)`, `central-ledger`, `ml-api-adapter`, `sdk-scheme-adapter`, `account-lookup-service`, `quoting-service`, `mock-pathfinder`, `Mojaloop Testing Toolkit`

**Roles and API artefacts** `FSP`, `DFSP`, `PISP`, and every endpoint path, field name, HTTP method, header and error code. `Party` and `Participant` stay in English where they name the API resource; in running prose they take the glossary terms *parte* and *participante*.

**Products, organisations and standards** `Mojaloop`, `Mojaloop Foundation`, `Gates Foundation`, `FSPIOP`, `ISO 20022`, `ISO 4217`, `Interledger Protocol`, `Open API Specification`, `Kubernetes`, `Helm`, `Docker`, `Terraform`, `Ansible`, `Azure`, `AWS`

**Git and GitHub interface labels** `pull request`, `merge`, `rebase`, `fork`, `commit` when it names the Git operation, and the literal labels of GitHub controls. These stay in English because a reader following an instruction has to find the same word on screen. Build the surrounding sentence in Spanish around the literal: *abra un pull request*, *haga merge de la rama*.

This does not extend to words that simply describe the thing rather than label a control. *repository*, *branch*, *issue*, *tag* and *release* are translated in prose as *repositorio*, *rama*, *problema*, *etiqueta* and *versión*. Note that the Git `commit` and the ledger commit in the glossary are different terms.

**License text.** The Apache-2.0 notice and any license header block are reproduced in English, unmodified. The Markdown page heading above the notice may be translated.

**Frontmatter.** Keys are never translated.

Where a preserved term genuinely needs explaining on its first appearance in a page, gloss it once in parentheses and use the English alone thereafter: *el esquema de pagos (scheme)*, matching the shape the translation guidelines use.

Note that `FSP` stays `FSP` and is never rendered `PSF`.

---

## A.4 Normative glossary

One English term maps to exactly one Spanish term across the whole locale. A reviewer may block a pull request for glossary drift alone, without any other finding.

New or contested terms are proposed in the pull request that first needs them, agreed by the reviewers, and added to this table in that same pull request. Changing an agreed term is a repo-wide change: do it in a dedicated pull request that updates every occurrence and the table row together.

The three highest-risk pairs, because getting them backwards inverts the meaning of a settlement page:

- **clearing** is *compensación*. It is never *liquidación*.
- **settlement** is *liquidación*. It is never *compensación*.
- **scheme** is *esquema de pagos*. *esquema* alone reads as a diagram or an outline. The one
exception is the compound *Interoperability Scheme*, where the qualifier replaces «de pagos».

| English term | Approved translation | Do not use | Notes |
| --- | --- | --- | --- |
| 'x'-initiated | Iniciado por «x» | | |
| Access Channel | Canal de acceso | | |
| Account ID | ID de cuenta | | |
| Account Lookup | Búsqueda de cuenta | | |
| Account Lookup Service | Account Lookup Service (ALS) | Servicio de Consulta de Cuentas | The Mojaloop component, `account-lookup-service`. Kept in English and owns the acronym ALS. |
| Account Lookup System | Account Lookup System | Sistema de Consulta de Cuentas | The abstract entity named in both source glossaries. Kept in English. The acronym ALS belongs to Account Lookup Service, not to this entry. |
| Account Validation | Validación de cuenta | | |
| Active User | Usuario activo | | |
| Addressing | Direccionamiento | | |
| Adjacencies | Servicios adyacentes | | |
| Agent | Agente | | |
| Agent Outlet | Punto de atención del agente | | «punto de agente» is non-standard in LatAm agent-banking literature. |
| Agent Till | Línea del agente | | The source covers a registered SIM line or a POS machine, so the term has to cover both. |
| Agent-Initiated Cash-In | Depósito de efectivo iniciado por el agente | | |
| Agent-Initiated Cash-Out | Retiro de efectivo iniciado por el agente | | |
| Aggregator | Agregador | | |
| Alias | Alias | | |
| Anti-Money Laundering | Prevención del lavado de dinero | | Uses «lavado de dinero». «lavado de activos» is the GAFILAT regional wording and is acceptable in country-specific material. |
| Anti-Money Laundering (AML) | Prevención del lavado de dinero (PLD) | | Same choice as the entry above; the abbreviation PLD follows it. |
| API | API | | Universal, not translated. |
| Applicable Law | Ley aplicable | | Broader than «legislación»; the definition spans treaties, directives and guidance. |
| Applicant | Solicitante | | |
| Application Program Interface (API) | Interfaz de programación de aplicaciones (API) | | |
| Arbitration | Arbitraje | | |
| Associated Documents | Documentos asociados | | |
| ATM-Initiated Cash-Out via OTP | Retiro de efectivo iniciado por el cajero automático mediante OTP | | |
| Attribute | Atributo | | |
| Authentication | Autenticación | | |
| Authorization | Autorización | | |
| Authorized /institution entity | Entidad o institución autorizada | | |
| Automated Clearing House | Cámara de compensación automatizada (ACH) | | ACH circulates untranslated in LatAm. |
| B2P | B2P | | |
| Bank | Banco | | |
| Bank Account | Cuenta bancaria | | |
| Bank Account Identifier | Identificador de cuenta bancaria | | |
| Bank Accounts and Transaction Services | Cuentas bancarias y servicios transaccionales | | |
| Bank to Bank | Banco a banco | | |
| Bank to Wallet | Banco a billetera | | |
| Bank-Led Model | Modelo liderado por bancos | | |
| Basic Phone | Teléfono básico | | |
| Bill Payment | Pago de facturas | | «pago de servicios» narrows to utilities; Biller appears in adjacent definitions. |
| Biometric Authentication | Autenticación biométrica | | |
| Blacklist | Lista negra | | Established AML term of art, and pairs with «lista blanca». |
| Blockchain | Blockchain | | |
| Borrowing | Obtención de crédito | | The source is the borrower's act of taking on debt, not the lender granting it. «Otorgamiento de crédito» would invert the definition. |
| Brand | Marca | | |
| Bulk Disbursement | Desembolso masivo | | |
| Bulk Payment | Pago masivo | | |
| Bulk Payment Services | Servicios de pagos masivos | | |
| Bulk Payments | Pagos masivos | | |
| Bulk upload service | Servicio de carga masiva | | |
| Bundling | Empaquetamiento de servicios | | |
| Business | Empresa | compañía | |
| Cash Management | Gestión de efectivo | | |
| Cash-In | Depósito de efectivo | | |
| Cash-Out | Retiro de efectivo | | |
| Certificate Signing Request | Solicitud de firma de certificado (CSR) | | CSR is the acronym practitioners use. |
| Chip Card | Tarjeta con chip | | |
| Clearing | Compensación | liquidación | Careful with settlement. These two are a false-friend pair: clearing is compensación, settlement is liquidación. Swapping them changes the meaning. |
| Clearing House | Cámara de compensación | | |
| Client Authentication | Autenticación de cliente | | This is TLS client auth, not the Customer. |
| Closed-Loop | Circuito cerrado | | |
| Combatting Financing of Terrorism (CFT) | Combate al financiamiento del terrorismo (CFT) | | |
| Combatting Terrorist Financing | Combate al financiamiento del terrorismo | | Same term as Combatting Financing of Terrorism (CFT); both source glossaries define them identically. |
| Commission | Comisión | | |
| Commit | Confirmación (commit) | | |
| Condition | Condición (condition) | | Interledger API field name; matches how Commit is glossed. |
| Corridor | Corredor | | |
| Counterparty | Contraparte | | |
| Coupon | Cupón | | |
| Credit History | Historial crediticio | | |
| Credit Risk Management | Gestión del riesgo crediticio | | |
| Credit Scoring | Evaluación crediticia | puntaje crediticio | The source definition describes the process, not the resulting score. |
| Credit Transfer | Transferencia de crédito | | |
| Cross Border Trade Finance Services | Servicios de financiamiento del comercio transfronterizo | | |
| Cross-Border | Transfronterizo | | |
| Cross-FX Transfer | Transferencia con conversión de divisas (cross-FX) | | «cambio de divisa» suggests a bureau de change. |
| Current Position | Posición actual | | |
| Customer | Cliente | | |
| Customer Database Management | Gestión de la base de datos de clientes | | |
| Customer Financial Data | Datos financieros del cliente | | |
| Customer-Initiated Cash-Out | Retiro de efectivo iniciado por el cliente | | Reuses the defined term «retiro de efectivo» verbatim. |
| Customer-Initiated Purchase | Compra iniciada por el cliente | | |
| Customer-Initiated Purchase via QR | Compra iniciada por el cliente mediante QR | | |
| Data Controller | Responsable del tratamiento de datos | | |
| Data Portability | Portabilidad de datos | | |
| Data Protection | Protección de datos | | |
| Deposit Guarantee System | Sistema de garantía de depósitos | | |
| DFSP (Digital Financial Services Provider) | DFSP (Proveedor de servicios financieros digitales) | | |
| Diffie-Hellman solution | Solución Diffie-Hellman | | |
| Digital | Digital | | |
| Digital Financial Services | Servicios financieros digitales | | |
| Digital Liquidity | Liquidez digital | | |
| Digital Payment | Pago digital | | |
| Direct Debit | Débito directo | | |
| Directory | Directorio | | |
| Dispute Resolution | Resolución de disputa | | |
| Domestic | Nacional | doméstica | «doméstico» is a false friend in payments; it reads as household. |
| Electronic consent | Consentimiento electrónico | | |
| eMoney | Dinero electrónico | | |
| eMoney Accounts and Transaction Services | Cuentas de dinero electrónico y servicios transaccionales | | |
| eMoney Issuer | Emisor de dinero electrónico | | |
| Encryption | Cifrado | | |
| End User | Usuario final | | |
| End-User Fees | Tarifas al usuario final | | Follows Fees; GSMA/CGAP Spanish splits agente=comisión, cliente=tarifa. |
| Enterprise | Persona jurídica | | The source is any non-individual customer of a DFSP, which is what «persona jurídica» names. Keeps «empresa» free for Business. |
| Escrow or Trust Account | Cuenta de depósito en garantía (escrow) o cuenta fiduciaria | | |
| Exceptions | Excepciones | | |
| External Account | Cuenta externa | | |
| FATF | GAFI (Grupo de Acción Financiera Internacional) | | GAFI is the established Spanish acronym used by LatAm regulators. |
| Feature Phone | Teléfono no inteligente (feature phone) | | Was too close to Basic Phone «teléfono básico», a separate entry. |
| Fees | Tarifas | | Was «comisiones», colliding with Commission, which is a different concept. Separates cleanly from Commission («comisión»), which is the agent incentive. |
| Fiat Currencies | Monedas fiduciarias | | |
| Financial Inclusion | Inclusión financiera | | |
| Financial Literacy | Alfabetización financiera | | The definition is about consumers *having* skills, not being taught. |
| Fintech | Fintech | | |
| Float | Flotante | | |
| Fraud | Fraude | | |
| Fraud Risk Management | Gestión del riesgo de fraude | | |
| FSP | FSP | PSF | Acronym stays in English. Gloss it on first use in a page as «FSP (proveedor de servicios financieros)», then use FSP alone. |
| FSP On-boarding | Incorporación de FSP | | |
| Fulfilled Transfer | Transferencia completada | | The source says recorded as complete by the Scheme, so «completada». «cumplida» was considered and rejected. |
| Fulfillment | Fulfilment | cumplimiento | Interledger term of art (the SHA-256 preimage) so it stays in English, spelled «fulfilment» as the API does. |
| FX | FX (divisas) | | |
| G2P | G2P | | |
| Governance | Gobernanza | | |
| Government Agency | Organismo público | | |
| Government Payments Acceptance Services | Servicios de aceptación de pagos para organismos públicos | | «pagos gubernamentales» reads as payments made by government, not collected by it. Consistent with Government Agency, «organismo público». |
| Gross Settlement | Liquidación bruta | | |
| HCE | HCE | | |
| Hub | Hub | concentrador | Kept in English, as the Mojaloop component name. |
| Identifier Service | Servicio de identificadores | | |
| Identity | Identidad | | |
| Immediate Funds Transfer | Transferencia inmediata de fondos | | |
| Insurance Products | Productos de seguros | | |
| Insuring Lives or assets | Aseguramiento de vidas o bienes | | |
| Interchange | Tasa de intercambio | | The definition describes a fee; bare «intercambio» is generic. |
| Interledger | Interledger | | |
| International Remittance | Remesa internacional | | |
| Interoperability | Interoperabilidad | | |
| Interoperability Scheme | Esquema de interoperabilidad | | A named compound in the FSPIOP API text, so the qualifier replaces «de pagos» rather than stacking on it. Bare «Esquema» is still not permitted. |
| Interoperability Service for Transfers (IST) | Servicio de interoperabilidad para transferencias | | |
| Interoperability settlement bank | Banco liquidador de interoperabilidad | | «banco liquidador» is the standard CPMI/CEMLA rendering. Parentheses made the qualifier look optional, colliding with Settlement Bank. |
| Investment Products | Productos de inversión | | |
| Irrevocable | Irrevocable | | |
| JSON | JSON | | |
| Know Your Customer | Conocimiento del cliente | | |
| Know Your Customer (KYC) | Conocimiento del cliente (KYC) | | |
| Ledger | Libro mayor | | «Libro mayor» is the standard accounting term and pairs with Libro mayor de posiciones. |
| Level One Project | Level One Project | | |
| Liability | Responsabilidad | | |
| License | Licencia | | |
| Liquidity | Liquidez | | |
| Loans | Préstamos | | |
| M2C | M2C | | |
| mCommerce | Comercio móvil | | |
| Merchant | Comercio | | |
| Merchant Acquisition | Afiliación de comercios | | Standard LatAm term; «adquirencia» names the business, not the process. |
| Merchant Category Codes | Códigos de categoría de comercio | | |
| Merchant ID | ID del comercio | | |
| Merchant payment - POS | Pago presencial a comercio en punto de venta | | |
| Merchant payment - Remote | Pago remoto a comercio | | «en comercio» implies in-person and contradicts the remote definition. |
| Merchant Payments Acceptance Services | Servicios de aceptación de pagos para comercios | | |
| Merchant Service Provider | Proveedor de servicios para comercios | | |
| Merchant-Initiated Purchase | Compra iniciada por el comercio | | |
| Merchant-Initiated Purchase via POS/OTP | Compra iniciada por el comercio mediante POS/OTP | | |
| Merchant-Initiated Purchase via QR | Compra iniciada por el comercio mediante QR | | |
| Microfinance Institution (MFI) | Institución microfinanciera (MFI) | | Kept the English acronym. «IMF» is the LatAm one but could be read as Fondo Monetario Internacional. |
| Mobile Network Operator | Operador de red móvil | | |
| Mobile Network Operator (MNO) | Operador de red móvil (MNO) | | |
| Money Transfer Operator | Operador de transferencia de dinero | | |
| MSISDN | MSISDN | | |
| Multilateral Net Settlement | Liquidación neta multilateral | | |
| Mutual Authentication | Autenticación mutua | | |
| National Identity Document | Documento nacional de identidad | | Avoids reading as the country-specific DNI. «identidad nacional» reads as nationhood; the credential is «documento nacional de identidad». |
| Near Field Communication | Comunicación de campo cercano (NFC) | | |
| Net Debit Cap | Límite de débito neto | | |
| Net Debit Cap Margin | Margen del límite de débito neto | | |
| Net Position | Posición neta | | |
| Net Settlement | Liquidación neta | | |
| Netting | Neteo | | «compensación» is clearing, so it collided with the Clearing entry. |
| Non-Bank | Entidad no bancaria | | |
| Non-Bank-Led Model | Modelo liderado por entidades no bancarias | | |
| Non-repudiation | No repudio | | |
| Nostro Account | Cuenta nostro | | Spanish banking keeps the Latin pair untranslated, pairing with Cuenta vostro. |
| Not-for-Loss | Sin pérdidas (modelo de recuperación de costos) | | A cost-recovery model. «A fondo perdido» means non-repayable grant funding, so a negated form of it would read as the opposite. |
| Notification | Notificación | | |
| Off-Us Payments | Pagos off-us | | |
| On-Us Payments | Pagos on-us | | |
| Online Purchase | Compra en línea | | |
| Open API Specification | Open API Specification | | |
| Open-Loop | Circuito abierto | | |
| Operating Rules | Reglas operativas | | |
| Operations Risk Management | Gestión del riesgo operativo | | |
| Operator | Operador | | |
| Organization | Organización | | |
| OTP | OTP | | |
| Over The Counter Services | Servicios en ventanilla (OTC) | | «ventanilla» evokes a bank teller; the definition is agent-assisted. To a bank audience bare OTC means extrabursátil. |
| Overview | Descripción general | Visión general, Resumen, Panorama general | Appears 76 times in the corpus. *Resumen* is a summary, which is a different thing. One rendering repo-wide, so the section heading and the page title match. |
| P2P | P2P | | |
| Participant | Participante | | |
| Participant Discretionary Net Debit Cap Margin | Margen discrecional del participante sobre el límite de débito neto | | |
| Participation Agreement | Acuerdo de participación | | |
| Participation Fees | Cuotas de participación | | |
| Parties Query | Consulta de partes | | |
| Parties Query Response | Respuesta a la consulta de partes | | |
| Partner Bank | Banco socio | | |
| Party | Parte | | In prose only. Where Party is an API field name it stays in English untouched. |
| Party Identifier | Identificador de parte | | |
| Party Identifier Type | Tipo de identificador de parte | | |
| Payee | Beneficiario | receptor | |
| Payee DFSP | DFSP beneficiario | | |
| Payee FSP | FSP beneficiario | | |
| Payer | Pagador | ordenante | «ordenante» is the ISO 20022 term but «pagador» pairs readably with Beneficiario and is what the translated pages use. |
| Payer DFSP | DFSP pagador | | |
| Payer FSP | FSP pagador | | |
| Paying for Purchases | Pago por compras | | |
| Payment | Pago | | |
| Payment Device | Dispositivo de pago | | |
| Payment Instruction | Instrucción de pago | | |
| Payment System | Sistema de pagos | | |
| Payment System Operator | Operador del sistema de pagos | | |
| Payments Service Provider (PSP) | Proveedor de servicios de pago (PSP) | | |
| Peer FSP | FSP contraparte | | |
| PEP | PEP (persona expuesta políticamente) | | |
| Personal Information | Datos personales | | «datos personales» is the established term in LatAm data-protection law. |
| Platform | Plataforma | | |
| Pooled Settlement Account | Cuenta de liquidación común | | «común» rather than «mancomunada», which implies joint-signature authority rather than pooled funds. |
| Position Ledger | Libro mayor de posiciones | | |
| Posting | Contabilización | | «posting» is the act of recording; «registro contable» names the record. |
| Pre-approval | Preaprobación | | |
| Prefunding | Prefondeo | | «prefinanciamiento» implies extending credit; this is depositing funds in advance. |
| Prepaid Cards | Tarjetas prepagadas | | |
| Processing Fees | Tarifas de procesamiento | | |
| Processing of Personal/Consumer Data | Tratamiento de datos personales o del consumidor | | |
| Processor | Procesador | | |
| Promotion | Promoción | | |
| Provisional Debit | Débito provisional | | |
| PSP | PSP | | |
| Pull Payment | Pago tipo pull | | |
| Pull Payments | Pagos tipo pull | | |
| Push Payment | Pago tipo push | | |
| Push Payments | Pagos tipo push | | |
| QR Code Purchase | Compra con código QR | | |
| Quick-Response (QR) Code | Código QR | | |
| Quote | Cotización | presupuesto, presupuestar | In Mojaloop a quote is a price for a proposed transfer. presupuesto means budget or estimate and would be wrong. |
| Quote Request | Solicitud de cotización | | Both source glossaries define this and Request for Quote identically, so both map to the same term. |
| Quote Response | Respuesta a la solicitud de cotización | | Parallel with Transfer Response. |
| Real Time Gross Settlement (RTGS) | Liquidación bruta en tiempo real (LBTR/RTGS) | | LBTR is the acronym LatAm central banks use. |
| Real Time Retail Payments (RTRP) | Pagos minoristas en tiempo real (RTRP) | | |
| Receive Amount | Monto a recibir | | «monto» is the neutral LatAm term; «importe» reads Peninsular. |
| Reconciliation | Conciliación | | |
| Recourse | Derecho de reclamación | | Bare «recurso» reads as resource or legal appeal. Dropped the «(recurso)» gloss, which reintroduced an ambiguous false friend. |
| Refund | Reembolso | | |
| Registration | Registro | | |
| Regulator | Regulador | | |
| Request for Quote | Solicitud de cotización | | Both source glossaries define this and Quote Request identically, so both map to the same term. |
| Request for Transfer | Solicitud de transferencia | | Both source glossaries define this and Transfer Request identically, so both map to the same term. |
| Request to Pay | Solicitud de pago | | |
| Reserve | Reserva | | |
| Retail Payment | Pago minorista | | |
| Reversal | Reversión | | |
| Risk Management | Gestión de riesgos | | |
| Risk-based Approach | Enfoque basado en riesgo (EBR) | | GAFI/GAFILAT official Spanish uses the singular. |
| Roll back | Deshacer la reserva | | Per the source this undoes a reservation, so it stays distinct from Reversal. |
| Rules | Reglas | | |
| Rules Modification | Modificación de las reglas | | |
| Saving and Investing | Ahorro e inversión | | |
| Savings Products | Productos de ahorro | | |
| Scheme | Esquema de pagos | esquema (solo), plan, régimen | The highest-frequency term in the corpus. Bare «esquema» is a false friend, reading as a diagram. The one exception is the compound Interoperability Scheme. |
| Secondary Use Case | Caso de uso secundario | | |
| Secure Element | Elemento seguro | | |
| Security Access Code | Código de acceso de seguridad | | |
| Security Incident | Incidente de seguridad | | |
| Security Level | Nivel de seguridad | | |
| Send Amount | Monto a enviar | | |
| Sensitive Consumer Data | Datos sensibles del consumidor | | |
| Services | Servicios | | |
| Settlement | Liquidación | asentamiento, acuerdo, compensación | asentamiento and acuerdo are literal false friends and wrong. compensación is clearing, not settlement. |
| Settlement Bank | Banco liquidador | | |
| Settlement Bank Account | Cuenta en el banco liquidador | | |
| Settlement Instruction | Instrucción de liquidación | | |
| Settlement Obligation | Obligación de liquidación | | |
| Settlement System | Sistema de liquidación | | |
| Settlement Window | Ventana de liquidación | | |
| Shared Service | Servicio compartido | | |
| Short Message Service | Servicio de mensajes cortos (SMS) | | |
| SIM Card | Tarjeta SIM | | |
| Smart Phone | Teléfono inteligente | | |
| Special Charter Banks | Bancos con licencia especial | | |
| Sponsor | Acuerdo de patrocinio | | The definition describes an arrangement, not the entity. Previous gloss just restated the headword. |
| Standards Body | Organismo de normalización | | |
| Stored Value Account | Cuenta de valor almacenado | | |
| Storing Funds | Almacenamiento de fondos | | |
| Super-Agent | Superagente | | |
| Supplier Payment | Pago a proveedores | | |
| Suspicious Transaction Report | Reporte de operación sospechosa (ROS) | | ROS is the established GAFILAT acronym. |
| Switch | Switch | interruptor | Kept in English as the component name. «conmutador» is reserved for the switchboard metaphor; see section A.5. |
| System | Sistema | | |
| Systemic Risk | Riesgo sistémico | | |
| Tax Payment | Pago de impuestos | | |
| Tiered Acess | Acceso escalonado | | The English headword is misspelled in the source glossary. Kept as-is so the mapping still matches. |
| Til Number Purchase | Compra con número de caja | | A till number identifies the merchant's till. |
| Tokenization | Tokenización | | |
| Trading | Comercio internacional | | Was «comercio», colliding with Merchant. The definition is the cross-border exchange of capital, goods and services. |
| Transaction | Transacción | | |
| Transaction Account | Cuenta transaccional | | |
| Transaction Account Holder | Titular de la cuenta transaccional | | |
| Transaction Account Holder Type | Tipo de titular de cuenta transaccional | | |
| Transaction Account Type | Tipo de cuenta transaccional | | |
| Transaction Accounts | Cuentas transaccionales | | |
| Transaction Cost | Costo de transacción | | Concept-level term; the article made it read as one specific transaction. |
| Transaction Fees | Tarifas por transacción | | |
| Transaction Request | Solicitud de transacción | | |
| Transfer | Transferencia | | |
| Transfer Amount | Monto de la transferencia | | |
| Transfer Funds | Transferencia de fondos | | |
| Transfer Request | Solicitud de transferencia | | Both source glossaries define this and Request for Transfer identically, so both map to the same term. |
| Transfer Response | Respuesta a la solicitud de transferencia | | |
| Transport Layer Security | Transport Layer Security (TLS) | | |
| Trust Account | Cuenta fiduciaria | | |
| Trusted Execution Environment | Entorno de ejecución confiable (TEE) | | |
| Ubiquity | Ubicuidad | | The source is bidirectional: the ability to pay anyone and be paid by anyone. |
| Unbanked | No bancarizado | | |
| Uncovered Losses | Pérdidas no cubiertas | | |
| Use Case | Caso de uso | | |
| User ID | ID de usuario | | |
| USSD | USSD | | |
| Value-Added Services | Servicios de valor agregado | | «valor añadido» is Peninsular; LatAm uses «valor agregado». |
| Vostro Account | Cuenta vostro | | |
| Voucher | Vale | | |
| Wallet | Billetera | | |
| Wallet to Bank | Billetera a banco | | |
| Wallet to Wallet | Billetera a billetera | | |
| Whitelist | Lista blanca | | Pairs with «lista negra» as the definition contrasts them. |
| Women's Economic Empowerment (WEE) | Empoderamiento económico de las mujeres (WEE) | | |

---

## A.5 Language-specific pitfalls

**False friends that machine translation gets wrong every time.**

| English | Wrong | Right | Why |
| --- | --- | --- | --- |
| clearing | liquidación | compensación | *liquidación* is settlement, the next stage |
| settlement | compensación | liquidación | same pair, inverted |
| scheme | esquema | esquema de pagos | *esquema* alone means diagram or outline |
| quote | presupuesto | cotización | *presupuesto* is a budget |
| switch | conmutador | Switch | the component name, kept in English |
| hub | concentrador | Hub | the component name, kept in English |
| payee | receptor | beneficiario | *receptor* is unspecific |
| library | librería | biblioteca | *librería* is a bookshop |
| eventually | eventualmente | finalmente | *eventualmente* means occasionally |
| actually | actualmente | en realidad | *actualmente* means currently |

**Switchboard is not Switch.** The English documentation uses *switchboard* as a metaphor ("Mojaloop functions like a universal switchboard") and `Switch` as the component name. These are different words in the source and stay different in Spanish: the metaphor is *conmutador universal*, the component is `Switch`. This is the only context in which *conmutador* is correct; anywhere it renders `Switch` it is wrong.

**Loop is *circuito* in the payments sense.** Open loop is *circuito abierto*, closed loop is *circuito cerrado*, and the page title *Inside the Loop* is *Dentro del circuito*. A programming loop in code or API prose is *bucle*, which is the one place that word is correct.

**Peninsular or Spain-preferred forms.** Some of these are understood across Latin America and a few are a house-consistency call rather than a regional error, but all of them read as European Spanish in a document that claims es-419:

| Peninsular | Use instead |
| --- | --- |
| portátil (as a noun) | computadora portátil |
| apartado | sección |
| incidencia | problema |
| costes | costos |
| móvil (as a noun) | celular |
| ordenador | computadora |
| importe | monto |
| valor añadido | valor agregado |
| fichero | archivo |
| pulsar (un botón) | hacer clic en |
| añadir | agregar |
| coger | tomar |

**Anglicisms that read as unedited output.** *listadas* for "listed" (use *que figuran*), *aplicar para* for "apply for" (use *solicitar*), *soporta* for "supports" where the meaning is capability (use *admite*), *remover* for "remove" (use *eliminar* or *quitar*).

**Do not invent glosses.** Writing *una nueva parte (party)* where the source says *a new party* adds content the English does not have. Two glosses are permitted and no others: the first appearance of a preserved English term, as described in section A.3, and the parenthetical forms already fixed in the glossary table.

**Acronyms.** `API` is invariable and feminine: *las API*, not *las APIs*. The same holds for other borrowed acronyms used as nouns.

---

## A.6 Linguistic review criteria

Every Spanish pull request needs a language reviewer and a domain reviewer. Where one person credibly covers both, the translation guidelines allow one reviewer plus a maintainer. A locale without designated reviewers is not ready for production use.

| Role | Reviewer | Status |
| --- | --- | --- |
| Language | *to be designated* | |
| Domain | *to be designated* | |

**Review in this order.** Each stage can stop the review; there is no point polishing the Spanish of a paragraph that has dropped a clause.

1. **Fidelity.** Does every heading, list item, table row, caveat and link in the English
   page appear in the Spanish one? Has anything been summarised, added, or glossed? Do
   MUST, SHOULD and MAY keep their force?
2. **Terminology.** Does every glossary term match section A.4? Is a
   term that is not yet in the table being introduced, and if so has it been agreed and
   added in this same pull request?
3. **Links and structure.** Do heading levels, list nesting and table shape match the
   source? Does the file extension of each link match the source? Where a heading has been
   translated, has every anchor pointing at it been updated in the same pull request? Do
   links resolve inside `docs/es/`, except where the target genuinely has no translation, in
   which case the English target is kept and the link text says so?
4. **Fluency.** Does it read as Spanish written by a person, in the register set out in the
   register section?

**What blocks and what does not.** A fluent paragraph that changes the meaning of a specification is a blocking defect. A stiff but accurate sentence is not. Glossary drift blocks on its own, with no other finding required. Preference between two defensible wordings is a comment, not a block; if it matters enough to enforce, it belongs in the glossary.

**This annex is a living document.** When a review settles a terminology question, the decision goes into it in the same pull request rather than staying in the review thread.
