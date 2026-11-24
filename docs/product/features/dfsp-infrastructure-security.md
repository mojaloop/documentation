# Security architecture guidance for DFSP infrastructure

*A framework for schemes evaluating DFSP infrastructure vendors against the
threats DFSPs realistically face.*

- Version: 1.0
- Author: Yevhen Kyriukha
- Date: May 2026

## Scope

This guidance addresses the hardware and host environment operated within the
DFSP domain, including the infrastructure on which connectivity software,
signing services, certificate-management components, and related workloads
run.

## Executive summary

DFSP infrastructure security is a property of the system as a whole, not of
any component within it. A system is secure against the realistic threat when
all of the following architectural properties are present together and
reinforce each other: boot integrity resistant to physical attack, key
derivation bound to unmodified system state, workload isolation, workload
confidentiality, per-workload key separation, constrained signing operations,
and tamper-evident audit. Each addresses one facet of the threat. None
addresses the threat alone, and the absence of any one leaves a path through
which the realistic threat bypasses the others.

Cryptographic component stacks that combine HSM, TPM, and secure boot do not
satisfy this requirement on their own. The components depend on a trust chain
that the realistic threat targets, and once that chain is defeated, each
component continues to sign, seal, and verify whatever it is asked to. This
document provides the framework that schemes need to evaluate DFSP
infrastructure on architectural coherence rather than on component presence.

## Overview

When a DFSP joins a Mojaloop scheme, it relies on hardware and software to
connect to the Hub, sign transactions, and protect cryptographic keys. The
security of this infrastructure determines whether the participant can be
trusted to authorize transactions on behalf of its customers. If the
infrastructure is compromised, fraudulent transactions become
indistinguishable from legitimate ones, and the scheme's trust model breaks
down at that participant.

### What attackers realistically do

The threat model for DFSP infrastructure is straightforward. Attackers seek
financial gain through fraudulent transaction authorization. They use
commodity tools and publicly documented techniques. There are three paths by
which they reach DFSP systems: by exploiting software vulnerabilities or
supply chain compromises that give them code execution on the participant's
computers; by stealing administrator credentials through phishing, malware,
or social engineering; or, for branch-level and rural deployments where
physical security is variable, by stealing the equipment itself and breaking
into it in a lab.

In none of these cases is the attacker's goal to extract cryptographic keys
from secure hardware. The goal is to gain control of the computer that runs
the DFSP's connectivity software, then ask that computer to sign fraudulent
transactions exactly the way the legitimate software would. From the Hub's
perspective, the resulting transactions look authentic. They are signed by
the participant's legitimate signing capability, at the attacker's request.

The infrastructure must resist not the theft of cryptographic keys but the
compromise of the computer that uses them. Unbreakable locks on a thin wooden
door do not secure an entrance; an attacker breaks through the door panel.
Infrastructure with strong cryptographic components but a weak host
environment commits the same error.

### Why component checklists fail

A common procurement assumption is that a system with an HSM, a TPM, and
secure boot provides three independent layers of defense. It does not. Secure
boot is the trust anchor for the platform. The TPM's measurements are produced
by the boot chain that secure boot verifies. Keys sealed by the TPM, including
credentials that authenticate to the HSM, depend on those measurements being
authentic. The HSM signs for whatever system holds valid credentials.

If secure boot is defeated through any of the physical-access paths documented
in public research, the chain collapses: the attacker-controlled boot reports
whatever measurements it chooses, TPM-sealed credentials unseal on the
compromised system, and the HSM signs whatever the compromised host requests.
The HSM's keys remain non-extractable throughout. But extraction is not the
threat. The threat is invocation of the legitimate signing path from a
compromised host, and the entire component stack remains usable from that host
because each component trusts the layer below it.

The same dependency applies to host-compromise scenarios that do not require
defeating secure boot. An attacker who obtains kernel-level access through
software, supply chain, or operational vectors reaches the credentials that
authenticate to the HSM by the same path the legitimate application reaches
them. The HSM signs. The keys remain non-extractable. The fraud is authorized.

### Why coherence matters more than any single property

The architectural properties named in the executive summary address specific
facets of the realistic threat. Each is individually well-known and
individually insufficient. A system with workload isolation but weak boot
integrity is broken when the equipment is stolen and the boot chain is
bypassed in a lab. A system with strong boot integrity but no workload
isolation is broken when one of its workloads is compromised through a
software vulnerability. A system with workload isolation but no workload
confidentiality is broken when a compromised workload uses side-channel
analysis against shared memory encryption to recover keys protecting other
workloads. A system with all of these but no per-workload key separation lets
one compromised workload sign for the scope of another. The architecture is
secure against the realistic threat only when the properties are present
together, in a configuration where each property's protection is not
undermined by the absence of another.

Schemes evaluating vendors should ask not which components or properties are
present, but how the architecture as a whole defends against the realistic
threat. What dependencies exist between components? What remains protected if
a lower layer is defeated? Does any single architectural assumption being
violated collapse the system's defenses?

## Why this guidance exists

DFSP infrastructure security is not a property of any single component, and it
is not produced by combining several components on a procurement checklist. It
is a property of the architecture in which components are arranged, the
dependencies between them, and whether the architecture as a whole addresses
the realistic threat model. Schemes evaluating vendors should therefore
evaluate infrastructure against the architecture, not against the presence of
named cryptographic components, however comprehensive.

This document presents the framework for that evaluation. It begins with the
threat model (what attackers realistically do) and then describes the
architectural properties that together address that threat, the dependencies
between them, and the questions schemes should require vendors to answer. The
framework is technology-neutral: it defines properties schemes should
evaluate, not the mechanisms vendors must use to implement them.

## The threat model for DFSP infrastructure

Attackers targeting DFSP infrastructure are typically not state-level
adversaries with lab-grade cryptanalytic capability. They are adversaries
seeking financial gain through fraudulent transaction authorization, with
access to public vulnerability research, commodity attack tooling, and (for
the physical-attack variant discussed below) bench-level hardware analysis
equipment for side-channel and fault attacks. The equipment for bus
interception, fault injection, and electromagnetic or power analysis has
become inexpensive and widely available.

There are three realistic paths by which attackers obtain the access needed to
authorize fraudulent transactions.

**Network or supply chain compromise.** The attacker exploits a vulnerability
in software running on the participant's host: a web-facing service, a log
aggregation tool, a monitoring agent, or any of the dozens of dependencies
that comprise a typical deployment. Container escape vulnerabilities are
published regularly and remain exploitable in practice. [Copy Fail
(CVE-2026-31431, April 2026)](https://copy.fail) is a recent demonstration that
container boundaries collapse when the shared kernel is exploited. Supply
chain attacks deliver malicious code through legitimate update channels,
compromised dependencies, or tampered installation media. Either path yields
code execution on the host, typically with privileges sufficient to invoke
the application's normal interfaces.

**Operational compromise.** Credentials are stolen via phishing or malware on
administrator workstations, social engineering compromises operations staff,
or insider access provides direct system access.

**Physical seizure plus lab analysis.** The attacker obtains physical
possession of the DFSP infrastructure (by theft from a branch, interception
during transport, or seizure from an unattended location) and takes it to a
lab. With physical possession and bench-level equipment, the attacker defeats
the system's boot integrity to gain root access on a still-functional system
that retains its operational keys, certificates, and configuration. This path
is realistic for any deployment where physical security is variable.
Branch-level installations, rural sites, and infrastructure housed outside
controlled facilities are routinely accessible to opportunistic theft. The
attacks available in a lab are well-documented: boot media replacement,
recovery-mode abuse, debug-interface exposure, vulnerable early boot stages,
and fault injection against verification paths, all available at hobbyist
price points.

The attacker's objective in all three paths is the same: produce signatures
the Hub will accept. The dominant realistic path is host compromise leading to
invocation of the legitimate signing interface. The attacker who has
compromised the host holds the credentials the participant uses to authenticate
to the Hub. With those credentials, the attacker invokes the same interface
the legitimate application invokes, and (through the same Hub-side control
plane that allows participants to manage their own connectivity) adjusts
whatever network-layer access controls, certificate bindings, or endpoint
allowlists would otherwise constrain that invocation. The resulting
transactions are produced by the participant's own signing capability,
presented through channels the Hub's controls have been reconfigured to
accept. From the Hub's perspective, the request is indistinguishable from a
legitimate one.

This threat applies regardless of which cryptographic components are present.
An HSM keeps its keys non-extractable; a TPM seals credentials to boot-chain
measurements; secure boot verifies the boot chain at startup. Each of these
performs its design function correctly, and none of them prevents the
compromised host from invoking the signing interface, or the control plane
that governs how the Hub recognizes it, or both.

## The architectural properties

The properties named below address the realistic threat as a coherent whole.
Each section describes one property and identifies how that property depends
on the others. The properties cannot be evaluated independently. A system that
satisfies any one property in a configuration that violates another property
is not secure against the realistic threat, regardless of which component
implements which property.

### Boot integrity resistant to physical attack

The security of every other property depends on the integrity of the running
system. If an attacker modifies the boot sequence, the kernel, or the runtime
configuration, all higher-level security properties become contingent on the
attacker's restraint. TPMs measure what the boot chain reports. HSMs sign for
whatever system holds valid credentials. Sealed keys unseal on systems that
produce matching measurements. Once the boot chain is defeated, every
downstream protection operates on attacker-controlled premises.

Secure boot configurations should not be treated as evidence of
physical-attack resistance unless the vendor documents the attack classes
tested and the mitigations implemented. Software vulnerabilities such as
[BootHole](https://access.redhat.com/security/vulnerabilities/grub2bootloader)
(CVE-2020-10713) and [PKfail](https://kb.cert.org/vuls/id/455367)
(CVE-2024-8105) have bypassed Secure Boot trust assumptions on widely deployed
Linux and UEFI systems, and they require patches or revocations that may not
be applied consistently in deployed infrastructure. More fundamentally,
vulnerabilities in immutable first-stage boot code cannot be directly patched
in deployed silicon. Vendors may add downstream mitigations or fix future
silicon revisions, but no software update modifies the ROM itself. The AMD
Secure Processor (AMD-SP, formerly PSP), which establishes platform
root-of-trust functions on AMD Ryzen and EPYC CPUs and underpins SEV memory
encryption, has been compromised by [voltage fault injection across Zen 1,
Zen 2, and Zen 3 SEV-capable
microarchitectures](https://arxiv.org/abs/2108.04575). The researchers describe
their attack directly: "By manipulating the input voltage to AMD systems on a
chip (SoCs), we induce an error in the read-only memory (ROM) bootloader of the
AMD-SP, allowing us to gain full control over this root-of-trust." With this
control, they extracted endorsement keys and forged attestation reports. Intel
platforms have also had published voltage and fault attacks against their
integrity guarantees, including
[V0LTpwn](https://www.usenix.org/conference/usenixsecurity20/presentation/kenjar)
and [Plundervolt](https://plundervolt.com/) against SGX. A "secure boot"
feature does not, by itself, demonstrate resistance to an attacker who
possesses the hardware and has bench-level tooling.

What boot integrity requires, architecturally, is hardening against
physical-access attacks. Bootloader code paths that resist fault injection.
Controlled debug interfaces locked in production, with detection of attempts
to re-enable them. Tamper-resistant boot flow where signature verification
cannot be modified by a physical attacker. Verification chains that extend
from immutable hardware roots of trust through every stage of boot.

For vendor evaluation, the relevant question is what physical attacks the
system has been analyzed against, what defenses are documented against each,
and what testing supports the claims. Responses asserting only that secure
boot is enabled do not answer the question.

### Key derivation bound to unmodified system state

The complement to boot integrity is key derivation bound to it. Keys derived
only when the boot chain executes unmodified mean a modified system cannot
produce them; the attacker who bypasses boot integrity gains root on a system
that cannot decrypt its own configuration. Boot integrity verification and
key derivation together form a single defense. Verification establishes that
the system started cleanly. Binding ensures that keys exist only on a system
that did.

How strong the defense is depends on how the binding is implemented. TPM-based
sealing provides a baseline: keys are released only when Platform
Configuration Register values match the values they had when the keys were
sealed. The PCR values record measurements taken during boot. The limitation
of this baseline is that the measurements are written to the TPM by the boot
code itself. An attacker who can replace the code that performs measurements
can cause the TPM to record attacker-controlled or misleading measurements.
The TPM faithfully records the measurements it is given and releases keys
when the policy is satisfied. The binding does not hold against an attacker
who controls the code that produces the measurements.

A stronger architectural property is binding that holds against this
attacker. The component that measures the system must be one the attacker
cannot replace by defeating boot integrity, and the keys must remain unusable
on a compromised system even when its measurements would otherwise satisfy
the binding.

Vendors should be asked what component produces the measurements that the key
binding depends on, and what the attacker needs to do to control that
component's output. In typical TPM-based setups, the bootloader writes
measurements to the TPM. Secure boot is supposed to prevent bootloader
modification, but secure boot itself does not resist physical attackers, as
discussed in the previous section. An attacker who defeats secure boot through
fault injection, recovery-mode abuse, or vulnerable early boot stages can run
a modified bootloader that writes whatever measurements it chooses. In such
setups, the key binding inherits whatever protection boot integrity actually
provides against physical attack.

### Workload isolation

DFSP infrastructure typically runs multiple workloads: the connector itself,
monitoring agents, log shippers, optional integration components, and
sometimes a local interface for operators. The architectural requirement is
that compromise of the host kernel does not propagate to protected workloads.

Container-level isolation does not provide this. When workloads share a
kernel, a vulnerability in that kernel collapses container boundaries. Copy
Fail (CVE-2026-31431) is the recent demonstration. Default container
deployments are all in scope for shared-kernel exploitation. Hypervisor
isolation that treats the host kernel as part of the trusted computing base
does not provide it either: a compromised host kernel reads guest memory
through the path the hypervisor allows it. What the architecture must do is
treat the host kernel as a potential attacker and ensure that protected
workloads remain inaccessible to it.

This property matters even in systems that include HSM, TPM, and secure boot.
A compromised host kernel reads whatever credentials and material the
legitimate signing workload uses to authenticate to those components. The HSM
signs requests presented with valid credentials regardless of which process
on the host presented them. The TPM releases sealed material to any caller
that satisfies the policy. Cryptographic components defend the keys they hold;
they do not defend against being legitimately invoked by a compromised
workload that has obtained the same access the authorized workload was
granted.

An evaluation should establish whether the host kernel is part of the trusted
computing base, what protects the signing workload's memory from a compromised
host kernel, and how DMA-capable devices are constrained against bypassing the
boundary. Where the answer depends on assumptions the realistic threat model
violates (physical security that may not hold, integrity of a boot chain that
can be defeated, isolation that breaks when a kernel vulnerability is
exploited), the property is not actually present, even if a mechanism is
named.

### Workload confidentiality

Workload isolation establishes that software paths between workloads are
blocked. A compromised workload cannot reach another's memory, processes, or
storage through OS interfaces. Workload confidentiality is the additional
requirement that hardware-level attacks against one workload's memory
operations do not yield access to another workload's data.

The relevant attack combines side-channel analysis with memory access. A
compromised workload running on the system has legitimate access to memory
subsystem operations within its own scope. By performing carefully chosen
memory accesses, an attacker generates side-channel signals (timing
variations, power consumption changes, electromagnetic emissions) that reveal
information about cryptographic operations the system performs to protect
memory. If memory encryption uses keys or cryptographic material
shared across workloads, side-channel analysis against one workload's
operations may recover that material, exposing other workloads protected by
it. The attacker then reads other workloads' memory directly, either through
their now-decryptable RAM contents or through a cold-boot capture.

Current confidential-computing technologies protect memory at enclave, VM, or
platform boundaries, depending on the implementation. They still have
physical attack surfaces and explicit threat-model boundaries. [TEE.fail
(October 2025)](https://tee.fail) demonstrates DDR5 memory-bus interposition
attacks against Intel SGX, Intel TDX, and AMD SEV-SNP at sub-$1000 attacker
cost, with extraction of cryptographic material relevant to attestation in
affected configurations. A vendor may classify this as a physical attack
outside the intended scope of the technology. Schemes deploying infrastructure
into branches, rural sites, or other physically exposed environments must
evaluate that assumption against their deployment reality.

What the architecture must ensure is that compromise, observation, or
side-channel analysis of one workload does not yield access to another
workload's protected data. The mechanism may vary (hardware isolation, memory
encryption, separate execution domains, physical separation, or other
designs), but the property is the same: sensitive workload data must not
become visible outside the workload authorized to use it, regardless of what
else runs on the same hardware.

Vendor responses should explain what prevents one workload from observing
another workload's protected data through software, DMA, physical memory
access, or side-channel paths; how memory-protection domains are scoped, and
whether compromise or observation of one yields access to another; and what
attack research the vendor has analyzed against the memory subsystem and the
cryptographic implementations that protect it.

### Per-workload key separation

In a system with multiple workloads, each workload's signing capability should
be cryptographically isolated from every other workload. A compromise of
workload A should not yield signing capability for workload B's transactions.

Cryptographic peripherals such as HSMs can provide per-partition isolation
when configured with separate client identities for each partition. The
peripheral distinguishes requests by client identity. This is a real property
when correctly configured.

The limitation is that partition isolation depends on the integrity of the
client credentials and on the host-level boundaries between workloads. When
workloads share a kernel, an attacker with kernel-level access reads any
workload's client credentials and impersonates that workload to the
peripheral. The peripheral sees a valid client identity and signs. Partition
isolation in this case reduces to host-level isolation, which is exactly what
the realistic threat breaks.

What is required, architecturally, is per-workload key separation that
survives kernel-level host compromise. The boundary between workloads must be
enforced by an isolation mechanism that remains meaningful when the host
kernel is under attacker control. This is the same requirement as workload
isolation, expressed from the perspective of the signing path: compromise of
one workload, including kernel-level compromise within its boundary, must not
yield signing capability for another.

The test for an evaluation is whether an attacker who has obtained
kernel-level access on the system can invoke signing capability for any
workload other than the one they have compromised. If the answer depends on
whether the attacker can read another workload's credentials from the same
kernel's memory, the property is not present.

### Constrained signing operations

Even when the other architectural properties hold, the signing interface can
be invoked maliciously by a workload compromised within its own isolation
domain. The signing capability must be constrained in two ways: it must not be
usable to compromise itself, and it must not be usable to authorize unlimited
fraudulent transactions before detection.

The first constraint is cryptographic. The caller must not be able to select
unsafe algorithms, influence nonces, downgrade cryptographic parameters,
invoke padding-oracle-prone modes, or otherwise cause the signing service to
leak key material through normal outputs. Techniques in this category include
nonce reuse in ECDSA, predictable nonces in deterministic schemes implemented
incorrectly, padding-oracle constructions against PKCS\#1 v1.5, algorithm
downgrade where the interface accepts a weak option, and chosen-message
attacks against weak hash functions. None of these requires extracting the key
from its protected storage. They use the legitimate signing capability to
leak the key through normal output. Once leaked, the key is usable from
anywhere, indefinitely, with no further infrastructure compromise required.

The second constraint is operational. The caller must not be able to sign
arbitrary business payloads without structure, rate limits, policy checks, and
tamper-evident audit. A compromised workload with legitimate access to signing
should be limited to the scope, payload structure, and transaction rate the
architecture permits. It must not be able to turn the signing service into
either a key-extraction oracle or an unlimited authorization oracle.

Both constraints depend on the other architectural properties. Enforcement
performed by code or interfaces the compromised workload can reach is not
enforcement. Constrained signing as a security property requires that the
constraints exist in infrastructure the compromised workload cannot bypass,
for example by reaching the key directly through a less-constrained path.

Schemes should ask: what cryptographic algorithms and parameters does the
signing interface enforce, and can the caller override them? How are nonces
generated, and can the caller influence them? What side-channel-resistant
implementations are used? Can the application sign arbitrary content, or only
structured operations the system was designed to authorize, and at what rate?
What records are kept, and can a compromised application alter them?

### Tamper-evident operational records

Forensic audit is the corollary of constrained signing operations. A signing
system that records its operations in logs that the signer itself can modify
provides tamper-evident audit only against careless attackers. An attacker who
has compromised the signing host rewrites the logs before they are signed, and
the signed logs are valid.

Log integrity must be enforced by infrastructure the compromised workload
cannot reach. The signing keys for log integrity are isolated from the
workload that generates the logs. The log signing operation occurs at a
privilege level the workload cannot reach. The resulting log chains are
append-only with cryptographic linkage between entries. The audit trail is
tamper-evident not because the workload promises not to modify it, but because
the workload structurally cannot.

This property requires structural separation between the infrastructure that
signs transactions and the infrastructure that signs audit logs. If a single
component signs both (HSM, TPM, or any other peripheral) at the request of the
same host application, a compromised host produces both fraudulent
transactions and false log entries that conceal them, and both are
cryptographically valid. The property therefore depends on workload
isolation: the workload that produces logs must not be able to invoke the
log-signing infrastructure for arbitrary content, even when compromised.

Vendors should be able to explain how audit logs are protected against
modification by the same workload whose operations they record, whether log
signing is performed by infrastructure structurally separated from
transaction signing, and what enforces that separation.

## Evaluation

These architectural properties form a single coherent architecture, not a
list of independent features. The security of DFSP infrastructure depends on
all of them being present together, in a configuration where each property's
contribution is not undermined by the absence or weakness of another. A system
that satisfies most of these properties is not partially secure against the
realistic threat; the architecture fails at whichever required property the
realistic threat can reach.

The evaluation question for schemes is therefore not which properties or
components a vendor includes, but whether the architecture as a whole resists
the realistic threat. Vendors should be required to describe their
architecture in terms that map to all of these properties, to explain the
dependencies between them, and to identify what the architecture protects
against and what it does not. Specifically, schemes should require answers to
several scenarios. If an attacker physically seizes this equipment and
defeats boot integrity in a lab, what survives? If an attacker compromises any
single workload running on the host, what signing capability do they gain and
what do they not? If the host kernel is rooted through a software
vulnerability, what protected material remains inaccessible? If the
cryptographic peripheral is invoked by a workload that has been compromised
within its isolation domain, what constraints apply to what it can sign?

A vendor whose architecture addresses the realistic threat answers these
questions concretely and identifies the dependencies between defenses. A
vendor whose security claim rests on component presence (HSM, TPM, secure
boot) does not, because the components do not by themselves answer the
questions. Where the response consists of marketing language, generalities,
or assertions that named components are sufficient, the evaluation has not
been satisfied.

### Vendor evaluation checklist

The following checklist consolidates the questions schemes should require a
vendor to answer. A named mechanism is not sufficient on its own; the response
should explain the protection boundary, its dependencies, and the evidence
supporting the claim.

| Property | The vendor response should establish |
| --- | --- |
| Boot integrity | Which physical attack classes have been analyzed, which defenses address each class, and what testing supports the claims. |
| State-bound key derivation | Which component produces the measurements used for key derivation, whether an attacker can control that component, and what key material remains usable after system modification. |
| Workload isolation | Whether the host kernel is inside the trusted computing base, what protects workload memory after host compromise, and how DMA-capable devices are constrained. |
| Workload confidentiality | How software, DMA, physical-memory, and side-channel paths are separated between workloads, and whether compromise or observation of one protection domain exposes another. |
| Per-workload key separation | Whether kernel-level compromise of one workload or the host permits invocation of another workload's signing capability. |
| Constrained signing | Which algorithms, parameters, payload structures, policies, and rates are enforced outside the compromised workload's control, and whether the caller can influence nonces or select unsafe operations. |
| Tamper-evident records | Whether the workload being audited can modify records or invoke log signing for arbitrary content, and what structurally separates transaction signing from audit-log signing. |

## Applicability

This guidance is not tied to a particular Mojaloop software release. It applies
to infrastructure operated in the DFSP domain wherever the compromise of that
infrastructure could be used to produce transactions that a Mojaloop Hub would
accept as authentic.
