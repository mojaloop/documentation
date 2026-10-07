# Infrastructure for Production Mojaloop

**What to procure and how to deploy it for reliable, high-performance schemes**

---

## About this document

This guide is for Mojaloop adopters, hub operators, system integrators and procurement teams who are planning the infrastructure for a production Mojaloop scheme. It explains which infrastructure decisions matter, the trade-offs behind each one, and what the Mojaloop community recommends, so you can make good procurement decisions and challenge vendor proposals with confidence.

It is based on the Mojaloop Foundation engineering session *Infrastructure for production Mojaloop* presented at MojaCom32 in Accra, Ghana September 2026, and it includes the full content of the presenter's notes.

### Scope

**In scope:** on-premises, production switches running live schemes, where downtime means payments don't happen. The guide covers reliability, performance and SLAs, and what to procure and how to deploy it.

**Same concerns, not covered separately:** pre-production environments, such as staging and performance-test environments, share most of these concerns. They should mirror the production topology closely, especially if you want performance-test results you can trust. Most of this guide therefore applies to them too.

**Out of scope:** development environments, experimentation, labs and sandboxes, and the specifics of cloud deployments. That's not because they don't matter. The trade-offs there are very different (you can run Mojaloop on a laptop for development), and they deserve separate treatment.

### Contents

1. [Cloud or on-premises?](#1-cloud-or-on-premises)
2. [Physical foundations: sites, power and network](#2-physical-foundations-sites-power-and-network)
3. [Sizing the hardware: 500, 1,000 and 2,000 TPS](#3-sizing-the-hardware-500-1000-and-2000-tps)
4. [Storage and replication: what not to buy](#4-storage-and-replication-what-not-to-buy)
5. [Platform choice](#5-platform-choice)
6. [High availability, RPO and RTO](#6-high-availability-rpo-and-rto)
7. [Operating the platform](#7-operating-the-platform)
8. [Looking ahead: TigerBeetle](#8-looking-ahead-tigerbeetle)
9. [Procurement checklist](#9-procurement-checklist)
10. [Questions to settle within your scheme](#10-questions-to-settle-within-your-scheme)
11. [Glossary](#glossary)
12. [References](#references)

---

## 1. Cloud or on-premises?

Both are valid. Some adopters run live Mojaloop schemes today with the switch hosted in public cloud, and others run entirely in their own data centres. Most current questions from the community concern on-premises deployment, which is the focus of the rest of this guide.

| | Public cloud | On-premises |
|---|---|---|
| **Strengths** | **Speed:** production-grade infrastructure in weeks, not months. **Elastic:** add capacity for growth and seasonal peaks on demand. **Resilience built in:** multiple zones and regions available off the shelf. | **Lower long-term cost** for steady, predictable national volumes. **Sovereignty:** full control of where data and keys live. **Predictable spend:** no metered compute or egress bills. |
| **Watch out for** | Higher long-run cost at steady high volume; data residency and regulator approval; egress fees and managed-service lock-in. | Long lead times for facilities and procurement; needs in-house platform skills; capacity bought up front for peak. |

The cloud's big advantage is time. You don't wait for a data centre fit-out or a hardware tender, and you can add capacity quickly as the scheme grows or for seasonal peaks. Availability zones give you physically separate failure domains out of the box.

The trade-offs are significant, though:
- **Cost:** at steady, high national volumes, renting compute around the clock usually costs more over five or more years than owning it.
- **Data residency:** many central banks and regulators require it, so you need an in-country region or explicit approval.
- **Egress:** data leaving the cloud is charged.
- **Lock-in:** if you build on a cloud provider's proprietary managed database or messaging service, moving later becomes harder.

On-premises flips this. You get lower long-term cost for predictable load, full sovereignty over data and keys, and predictable spend. But lead times for facilities and procurement are long, you need platform skills in-house or contracted, and you buy capacity up front for peak.

### What should drive the decision?

Five questions:

- **Regulation:** must the switch and its data stay in-country? Is there an in-country cloud region the regulator accepts? This often decides the question on its own.
- **Timeline:** when must the scheme go live? Facilities and hardware procurement can take months. If go-live is six months away and you don't have a suitable data centre, cloud may be the only realistic route.
- **Volume:** steady, high, predictable load favours owning. Uncertain growth favours renting.
- **Skills:** can you staff 24x7 platform operations, or will you buy them in? Either way you'll need Kubernetes skills, but on-premises you also own the hardware lifecycle.
- **Exit:** whatever you choose, keep it portable. Mojaloop runs on standard Kubernetes. If you avoid cloud-only managed services, you keep the option to move later.

> **A common path:** start in cloud to meet the go-live date, keep the platform portable, then move on-premises when volumes and in-house skills justify it. Note that migrating a live system is not trivial, so plan for it from the start.

---

## 2. Physical foundations: sites, power and network

### The data centre

**Facility**
- Concurrently maintainable: Tier III or equivalent.
- Maintenance must not require a switch outage.
- Physical security and audited access control.
- Cooling for dense racks, and 24x7 remote hands.

A concurrently maintainable facility can carry out planned maintenance on power or cooling without taking your equipment down. If the facility needs a maintenance window where everything goes dark, your SLA inherits it.

**Power**
- Independent A and B feeds from separate distribution paths.
- UPS plus generator, with fuel contracts and regular load tests. A test start is not enough.
- Dual power supplies on every server and switch, one plugged into each feed.

Dual power supplies are cheap to specify at procurement time and expensive to retrofit.

**Network**
- Two carriers whose fibre enters the building by physically different routes. Two carriers sharing one duct get cut by the same excavator.
- Redundant top-of-rack switches, with each server bonded across both (2 × 25 GbE per server).
- Separate DFSP-facing traffic, replication traffic and management traffic: at least logically (VLANs), and ideally physically.

### One, two or three sites?

This single decision largely sets your RPO, your RTO and part of your latency.

| Topology | Survives | RPO | RTO | Watch-outs |
|---|---|---|---|---|
| One site, three failure domains (racks / power zones) | Node, rack, switch or power-feed loss | 0 (acknowledged transfers) | No outage; brief partial stall (seconds to ~1 min) | Whole-site loss is an outage |
| Two sites: primary + asynchronous DR | Site loss, with manual failover | Seconds of replication lag | Minutes to hours (a human decision) | In-flight transfers need reconciliation |
| Three sites: two active + quorum witness | Site loss, automatically | 0 (acknowledged transfers) | Seconds to ~1 min (site-failure detection) | Needs low inter-site latency (a few ms RTT); every commit pays it |

**One site with three failure domains** (different racks, different power zones) survives losing a node, a rack, a switch or a power feed. RPO is zero for acknowledged transfers. There's no outage, only a brief stall of seconds to about a minute for the traffic that was on the failed node. That includes the database, because the recommended production design uses a three-node Percona XtraDB Cluster ([Section 6](#6-high-availability-rpo-and-rto)). Losing the whole site is an outage.

**Two sites as primary and DR, with asynchronous replication,** survives site loss. However:
- **RPO is the replication lag,** typically seconds. With asynchronous replication, the primary acknowledges a transfer before the change reaches the DR site. If the whole primary site is lost, acknowledged transfers still in that window are lost with it.
- **Within the primary site, RPO is still zero.** Replication inside the site is synchronous, so the lag only matters if the entire primary site is lost.
- **RTO is minutes to hours,** because failover is usually a human decision.
- **Transfers in flight** at the moment of failure need reconciliation.

**Three sites, with two active and a third acting as quorum witness,** can fail over automatically:
- RPO is zero for acknowledged transfers.
- RTO is seconds to about a minute while the site failure is detected.
- For the database, a small Galera arbitrator in the witness site provides the tie-breaking vote.
- The cost is that sites must be close: a few milliseconds of round-trip time (RTT) at most, because every synchronous commit pays that latency.

> **Why not simply two active sites?** Kubernetes' etcd, Kafka's controller quorum and Percona XtraDB Cluster all need a majority to act safely. With two sites, when the link between them drops, neither side can tell whether the other has failed or is just unreachable. Either both stop, or you risk split brain (two ledgers both accepting transfers). The witness breaks the tie, and it can be small: it only needs to vote, not carry traffic.

### How facility choices show up in SLAs and performance

| Availability | Downtime per year |
|---|---|
| 99.9% | ≈ 8.8 hours |
| 99.95% | ≈ 4.4 hours |
| 99.99% | ≈ 53 minutes |
| 99.999% | ≈ 5 minutes |

99.9% allows almost nine hours of downtime a year, while 99.99% allows 53 minutes, which is a single bad incident.

- **The weakest shared dependency caps your SLA.** One power feed, one carrier or one site caps the whole system, no matter how redundant the servers are.
- **Distance is latency.** With synchronous replication between sites, every commit waits for the round trip. A Mojaloop transfer commits several times (prepare, fulfil, position updates), so 10 ms between sites isn't 10 ms per transfer. It's a multiple of that, and it reduces achievable throughput.
- **Planned maintenance counts** unless your SLA explicitly excludes it. Concurrently maintainable facilities and rolling Kubernetes upgrades keep it out of the downtime budget.
- **Agree the SLA first,** then design the site topology to meet it, not the other way round.

---

## 3. Sizing the hardware: 500, 1000 and 2000 TPS

### Sizing principles

1. **Size for peak, not average.** Payment traffic is spiky: salary days, month-end, religious and national holidays. Peaks can reach several times the daily average. Use real data from existing schemes in your market if you have it.
2. **Survive a node loss at peak.** Plan N+1: with any one server down, you must still meet peak.
3. **Keep headroom.** Don't design to run at 95% of capacity at peak; aim for no more than about 70% utilisation at design peak.
4. **Split compute from data.** Stateless Mojaloop services run on worker nodes. Kafka and the databases get dedicated data nodes with local disks (not SAN or NAS), so a busy service can't starve the ledger database of CPU.
5. **Use fast local disks.** NVMe in the data nodes, with power-loss protection on the MySQL drives. Commit latency directly limits TPS.
6. **Prove it on your hardware.** The community performance-test tooling is public. Run it on what you actually buy, before go-live and after major upgrades.

### What the Mojaloop performance tests show

The Mojaloop performance workstream publishes everything in the [ml-perf-whitepaper-ws](https://github.com/mojaloop/ml-perf-whitepaper-ws) repository: Terraform, Helm overrides, test scripts and full scenario reports.
- **Flows:** every run uses end-to-end flows (discovery, quote, transfer) against eight DFSP simulators, four payers and four payees.
- **Load:** generated by k6 from its own separate cluster, so the load generator doesn't compete with the switch for resources.
- **Judgement:** results are judged on a steady-state window, with a validity gate confirming the Kafka pipeline kept pace.

Three results matter for procurement:

- **500 TPS (v17.1.0, ISO 20022, full mTLS): PASS, p99 951 ms.** It ran a single Kafka broker and a single MySQL with relaxed durability, so it is a throughput benchmark, not a production posture.
- **1,000 TPS (v17.1.0, ISO 20022, HA): PASS, p99 997 ms against the < 1 s goal.** This is the production posture:
  - Kafka with replication factor 3 and a minimum of 2 in-sync replicas.
  - MySQL semi-synchronous replication with an fsync on every commit.
  - Zero fallbacks to asynchronous replication.
- **2,000 TPS (chart v17.3.0, HA): PASS on throughput.**
  - 1,998 TPS sustained over a 60-minute window (7.2 million transfers), with the validity gate passed and nothing saturated.
  - At 2,000 TPS the criterion is throughput; no latency goal is defined above 1,000 TPS. The report's own summary applies the one-second goal throughout and labels the run a fail, which is why some readers will have seen that label.
  - For information, p99 was 1,727 ms and the median just under one second.

All of these ran on plain 8-vCPU VMs with MicroK8s. No node exceeded about 70% CPU in the HA runs.

**Takeaways:**
- **Throughput scales with commodity nodes.** Going from 1,000 to 2,000 TPS took about 1.84× the infrastructure.
- **Latency rises with load independently of hardware.** At 2,000 TPS, six sequential Kafka hops account for about 518 ms of the transfer leg while every tier sits between 50% and 65% CPU. That is a property of the software pipeline, which the community is working on.
- **You can't buy your way to a lower p99.** Bigger servers won't lower it, so don't let anyone sell you premium hardware on that basis.

### What was actually tested

| | 500 TPS | 1,000 TPS | 2,000 TPS |
|---|---|---|---|
| Result | ✓ 500 TPS, p99 951 ms | ✓ 1,000 TPS, p99 997 ms | ✓ 1,998 TPS (p99 1,727 ms, for information) |
| Resilience posture | Not HA: single Kafka and MySQL | HA: Kafka RF 3, MySQL semi-sync | HA, as 1,000 TPS |
| Switch application nodes | 5 × 8 vCPU / 32 GB | 10 × 8 vCPU / 32 GB | 20 × 8 vCPU / 32 GB |
| Kafka nodes | 1 × 4 vCPU / 16 GB | 3 × 8 vCPU / 32 GB | 3 × 8 vCPU / 32 GB |
| MySQL nodes | 1 × 4 vCPU / 16 GB | 2 × 8 vCPU / 32 GB | 2 × 16 vCPU / 64 GB |
| Switch cluster total (incl. monitoring) | ≈ 50 vCPU / 200 GB | ≈ 122 vCPU / 490 GB | ≈ 224 vCPU / 900 GB |
| Busiest node, peak CPU | 84% | 70% | 65% |

All runs used AWS m7i VMs with MicroK8s, with full mTLS, JWS and ILP enabled. They also applied ISO 27001 technical controls such as encryption at rest and real persistence.

- **At 500 TPS:** five 8-vCPU application nodes plus one small Kafka node and one small MySQL node. About 50 vCPU in total, with no HA.
- **At 1,000 TPS with HA:** ten application nodes, three Kafka nodes and two MySQL nodes, all 8 vCPU and 32 GB. About 120 vCPU. The busiest node peaked at 70%, and MySQL used under a third of its provisioned IOPS, so storage demand is modest.
- **At 2,000 TPS:** twenty application nodes, the same three Kafka nodes, and two MySQL nodes doubled to 16 vCPU. About 220 vCPU, with the busiest node at 65%.

The pattern: **the application tier scales out, MySQL scales up, and Kafka absorbed double the load on unchanged hardware.**

Comparability caveats:
- **Message format:** the 500 and 1,000 TPS runs used ISO 20022, whose messages are about 30% larger. The 2,000 TPS run used FSPIOP with evenly spread load, so treat it as a floor, not a ceiling.
- **Software version:** the 2,000 TPS run used a feature branch with an unreleased chart version (v17.3.0).
- **Database topology:** all runs used a MySQL primary with a semi-synchronous replica. The production design recommended here uses a Percona XtraDB Cluster, which has not yet been through these tests.

> **Tuning tip for implementers:** match consumer replica counts to Kafka partition counts, and make replica counts multiples of the node count. Otherwise the scheduler builds persistent hotspots.

### Translating to bare metal: servers per site (HA)

| Role | 500 TPS | 1,000 TPS | 2,000 TPS |
|---|---|---|---|
| Kubernetes control plane | 3 × 8 cores, 32 GB | 3 × 8 cores, 32 GB | 3 × 8 cores, 32 GB |
| Application workers | 3 × 16 cores, 128 GB | 3 × 24 cores, 192 GB | 5 × 24 cores, 192 GB |
| Kafka brokers (local NVMe) | 3 × 8 cores, 64 GB, 2 × 1.92 TB | 3 × 8 cores, 64 GB, 2 × 1.92 TB | 3 × 16 cores, 64 GB, 2 × 3.84 TB |
| Percona XtraDB Cluster (PLP NVMe, RAID1) | 3 × 8 cores, 64 GB, 1.92 TB | 3 × 16 cores, 128 GB, 3.84 TB | 3 × 32 cores, 256 GB, 7.68 TB |
| Monitoring | 1 × 8 cores, 64 GB | 1 × 8 cores, 64 GB | 1 × 16 cores, 64 GB |
| Load balancers | 2 × 8 cores, 32 GB | 2 × 8 cores, 32 GB | 2 × 8 cores, 32 GB |
| **Total per site** | **15 servers · 144 cores · ≈ 1.0 TB RAM** | **15 servers · 192 cores · ≈ 1.4 TB RAM** | **17 servers · 320 cores · ≈ 2.1 TB RAM** |

Network for all tiers: a pair of 25 GbE top-of-rack switches, with dual 25 GbE per server.

**Method**
- **vCPU mapping:** one AWS vCPU is one hyperthread, so an 8-vCPU instance is about four physical cores.
- **Workers:** sized so that with one worker down, the remaining capacity still equals the test's full provisioned capacity.
  - At 1,000 TPS that's three workers with 24 cores and 192 GB. Lose one and you still have 96 threads against the 80 vCPU tested.
  - At 2,000 TPS it's five of the same.
- **Kafka:** three brokers with local NVMe. At 2,000 TPS they're upsized to 16 cores so that losing one broker doesn't push the survivors into the mid-80s % utilisation. That is an inference; the tests didn't exercise it.
- **Database:** production uses a three-node Percona XtraDB Cluster (PXC) instead of the tested primary and replica, so there's one extra server per site.
  - It still scales vertically, because writes go to one node at a time and the participant position rows are hot. It therefore gets generous headroom: 16 cores at 1,000 TPS and 32 at 2,000, with all three nodes sized identically.
  - The drives must have power-loss protection (PLP), because every commit is flushed to disk.
- **Supporting roles:** a dedicated three-node Kubernetes control plane, a monitoring node, and a pair of load balancers replacing the cloud load balancer.
- **The 500 TPS column** follows the same method.
  - The application tier comes from the 500 TPS run: 40 vCPU provisioned, so three 16-core workers with 128 GB.
  - That run had no HA, so the data tier is scaled down from the 1,000 TPS HA run.
  - The result is still 15 servers. At the low end, the fixed HA roles (control plane, three Kafka brokers, three database nodes, load balancers) set the floor, not throughput.

> **Important caveat:** the published performance tests used a primary plus semi-sync replica, not PXC. Every PXC commit also waits for certification across the cluster, so run the performance tests on PXC before relying on these latency figures.

So: **15 servers per site at 500 and 1,000 TPS, and 17 at 2,000.** Multiply by the number of sites in your topology, and validate on your own hardware with the same test suite.

### Indicative hardware budget per site

| Throughput | Indicative range (hardware only) | Servers |
|---|---|---|
| 500 TPS | $150k – $190k | 15 |
| 1,000 TPS | $165k – $215k | 15 |
| 2,000 TPS | $220k – $285k | 17 |

These are deliberately ranges, not a price list, because the market is volatile.

- **Basis:** single-unit US street prices for the specified servers as of September 2026, plus about 30% contingency to stay conservative. The figures include the third database node.
- **Prices are volatile:**
  - A 2026 DRAM shortage puts memory at roughly a third of hardware cost.
  - CPU prices swing with promotions, and some parts have long lead times.
  - Get dated quotes, and order the full memory population in one purchase.
- **Challenge OEM quotes:** OEM list prices for memory and SSDs can be several times the street price. If a vendor quote looks high, challenge those lines first.
- **Excludes:** the DR site, non-production environments, racks and power, shipping and duties, support and subscriptions, and cold storage. A DR site sized for full peak roughly doubles the server count.

---

## 4. Storage and replication: what not to buy

This is the section adopters most need to understand, because it is where vendor proposals most often diverge from what Mojaloop actually needs.

### Where Mojaloop keeps its state

**Stateless services.** The Mojaloop services (account lookup, quoting, the API adapter, the central-ledger handlers, settlement) are stateless. They hold nothing that can't be lost, so you run many replicas on any node and scale them horizontally.

**Stateful components.** All durable state lives in a small number of components, and each of them replicates itself across nodes:

| Component | How it replicates |
|---|---|
| Kafka | Three copies of every message on three brokers (replication factor 3) |
| MySQL (Percona XtraDB Cluster) | Three-node synchronous cluster; every commit is replicated to all nodes before it returns |
| Redis | Replicas with failover |
| MongoDB | Replica set |

The performance tests used a MySQL primary with a semi-synchronous replica. That gives the same data guarantee as PXC, but without automatic failover.

**The storage layer therefore doesn't need to provide redundancy, because the application already does.** What storage needs to be is:
- **fast,** with low commit latency;
- **independent,** meaning each replica on its own node with its own disks.

That's local NVMe.

### Why SAN/NAS is an anti-pattern for Mojaloop

A SAN or NAS is not just unnecessary for Mojaloop; it actively works against you.

- **Redundant.** Kafka and MySQL already keep three copies of the data. Put those on a SAN with RAID-10 and array-to-array mirroring, and a single record can exist twelve times. You pay for every copy.
- **Slower.** Kafka and the database flush to disk on every commit. With a SAN, each flush is a network round trip to the array. That latency is added to every transfer, and it caps your TPS.
- **Shared failure.** This one is subtle. You carefully placed three replicas on three servers so that they fail independently. If all three disks are volumes on the same array, one controller fault, firmware bug or bad upgrade takes out all three at once. You've converted a triple-redundant design into a single point of failure.
- **Costly.** The SAN carries several cost items of its own:
  - the arrays themselves;
  - Fibre Channel switches;
  - host bus adapters (HBAs) in every server;
  - licences and support contracts.

  Together these frequently cost more than the servers and all other components combined. As a reference point, a budget-level hybrid SAN with 500 TB usable, a redundant Fibre Channel fabric and 5-year support had a US street price of roughly $175k–$280k in September 2026. That is about a quarter of a million US dollars for a single storage subsystem, comparable to or exceeding the entire server bill of materials for a 1,000 TPS site.

**Local mirroring is fine.** A cheap local RAID1 mirror on each MySQL server is fine and is included in the recommended bill of materials. The anti-pattern is the shared array and its mirroring, not local disk protection.

**A nuance, honestly stated.** The performance tests used AWS EBS, which is itself network-attached, and they still passed. The core argument against SAN/NAS is therefore duplication, correlated failure and cost. Latency is a real but secondary factor, and it matters most for your p99.

> **Instead:** use local NVMe in each data node, exposed through Kubernetes local persistent volumes, with replicas spread across nodes and racks.

### VM replication vs application replication

Many enterprise environments enable hypervisor-level HA and replication by default. It interacts badly with application-level replication.

| Hypervisor / storage replication | Kafka / MySQL replication |
|---|---|
| Copies disk blocks, usually asynchronously | Replicates committed transactions in a strict order, tracked by Kafka offsets and MySQL GTIDs (global transaction identifiers) |
| At best crash-consistent for one VM at a time, with no coordination across VMs | Uses quorum to decide who is leader |
| Knows nothing about transactions, or about who the Kafka leader or MySQL primary is | Designed to be the single source of truth |

**When both run, they collide:**
- **Double write path:** every commit is replicated twice, adding latency and wasting bandwidth for no benefit.
- **Stale resurrection:** the hypervisor restarts a failed database or broker VM from its replicated disk. That copy is behind, but it comes up believing it's current.
- **Split brain:** a network partition triggers a hypervisor failover at the same time as the application elects a new leader, and you end up with two primaries accepting writes.

### What recovery then looks like, and how to avoid it

**Symptoms seen after such a failover:**
- **MySQL:** a member comes back with transactions the rest of the cluster doesn't have, or is missing ones it does. The cluster detects that the member's transaction history (its GTID set) no longer matches, rejects it, and you rebuild it from a healthy donor. That is the *good* outcome.
- **Kafka:** a broker comes back with a log that diverges from its peers. If it becomes leader through an unclean election, acknowledged messages can be lost.
- **Restored VMs:** if you restore several VMs from replicas, each lands at a slightly different point in time. The ledger database, participant positions and Kafka offsets no longer agree.
- **Transfers:** some are stuck mid-flight, and settlement positions need manual reconciliation, in a payment system, under pressure.

**Guidance:**
- **Let the application own replication.**
- **For stateful components,** turn off hypervisor HA restart and VM replication. Better still, don't put a hypervisor under them at all.
- **When a replica fails,** rebuild it from its healthy peers. Never restore a stale VM image into a live cluster.
- **For true disasters,** keep proper backups with point-in-time recovery. That is a different thing from replication.

---

## 5. Platform choice

### The recommendation: keep it simple

The recommended stack, from top to bottom:

| Layer | Recommendation |
|---|---|
| Applications | Mojaloop, Kafka, MySQL, Redis, MongoDB, deployed with Helm |
| Platform services | Open source: Prometheus, Grafana and Loki for observability, cert-manager for certificates, an ingress controller, GitOps tooling for deployment |
| Orchestration | Open-source Kubernetes installed directly on bare metal, e.g. RKE2, K3s, MicroK8s or kubeadm (the performance tests used MicroK8s) |
| Operating system | Standard Linux, e.g. Ubuntu, SLES, Rocky |
| Hardware | Mid-range x86 servers ("a VW, not a Rolls-Royce") with local NVMe, 2 × 25 GbE and dual power supplies. Nothing exotic. |

**Why bare metal?**
- **No hypervisor overhead or hypervisor licences.**
- **Direct disk access:** the databases get direct access to NVMe.
- **No missing functionality:** Kubernetes already provides most of what you'd want from a virtualisation layer, namely scheduling, isolation, self-healing and rolling upgrades.
- **Fewer failure modes:** every layer you remove is a layer that can't fail or be misconfigured.

That is how you get maximum value from adequate, inexpensive hardware.

### The compromise: open source over vendor platforms

This is a deliberate compromise, and it is worth being honest about both sides.

| What you gain | What you take on | How to mitigate |
|---|---|---|
| Far lower licence and hardware cost | You own integration and upgrades | Optional commercial support subscriptions for open-source Kubernetes distributions and Linux, at a fraction of proprietary platform licence costs |
| No lock-in: runs the same in cloud or on-premises | No single vendor to call at 3 a.m.; support is community-first | Train and certify a local platform team |
| The same stack the community tests Mojaloop on | Needs genuine platform engineering skills | Contract integrators for operations, not licences |

The Mojaloop Foundation considers this trade the right one for most adopters.

## 6. High availability, RPO and RTO

### How Mojaloop achieves HA

| Layer | Mechanism | If one node is lost |
|---|---|---|
| Stateless services | Replicas spread across nodes (anti-affinity); horizontal scaling | No outage. Traffic on the dead node stalls until rerouted |
| Kafka | Replication factor 3, minimum 2 in sync, `acks = all`; unclean leader election off | Leaders re-elected in seconds; no acknowledged message lost |
| MySQL: Percona XtraDB Cluster | 3 nodes, virtually synchronous; one writer at a time via ProxySQL | Writer lost: proxy moves writes in seconds; no committed transfer lost |
| PXC quorum | Any 2 of 3 nodes keep the cluster writable | Failed node rejoins by syncing from a peer (IST/SST) |
| Kubernetes control plane | 3 etcd members | Survives the loss of one |
| API design | Asynchronous, idempotent transfer IDs, duplicate checks | DFSPs safely retry transfers that were in flight |

**Stateless services** run as replicas spread across nodes with anti-affinity, so no single node holds all copies of anything. Lose a node and there's no outage. The surviving pods keep serving, although traffic that was on the dead node stalls until it's rerouted (see below).

**Kafka** runs three replicas with a minimum of two in sync. Producers wait for all in-sync replicas, and unclean leader election stays off. A message is only acknowledged once two brokers hold it, so losing a broker loses nothing acknowledged, and new leaders are elected in seconds.

**The ledger: Percona XtraDB Cluster.** The recommended production design for the ledger is a three-node Percona XtraDB Cluster.
- **No promotion step:** every commit is certified and replicated to all nodes before it returns, so every node holds every committed transfer.
- **Single-writer routing:** all three nodes are active and in sync, but writes go to one node at a time through ProxySQL. The reason is Mojaloop's workload: every transfer updates one of a handful of participant position rows. With several writers, concurrent updates to the same row fail certification at commit time, and at these rates that means a high rate of rejected commits. Single-writer routing avoids that.
- **Writer loss:** if the writer node dies, the proxy moves writes to another node in seconds.
- **Quorum:** any two of the three nodes keep the cluster writable, and a failed node rejoins by syncing from a peer.

Note that the published performance results used a MySQL primary with a semi-sync replica, not PXC.

**The control plane** has three etcd members and survives the loss of one.

**The API design** matters too. Transfers are asynchronous with unique IDs and duplicate checks, so a DFSP that loses a response during a failure can retry safely without creating a double payment.

### Losing one node: what RPO and RTO really look like

A common question: with three replicas of everything, replication in Kafka and a synchronous database cluster, why would losing one node cost anything at all?

**RPO: zero.** For data, losing one node costs nothing.
- **Acknowledged transfers** survive any single-node loss.
- **In-flight transfers** were never acknowledged, so the DFSP retries them and idempotency makes that safe.
- **Conditions:** this holds only if:
  - every producer on the transfer path uses `acks=all`;
  - unclean leader election stays off in Kafka;
  - the database cluster keeps quorum.

**RTO: a brief stall.** Recovery time is a different story, because every failover mechanism has to notice the failure first.
- **Node detection:** by default Kubernetes takes around 40–50 seconds to mark a node NotReady and pull its pods out of service.
- **Consumer rebalance:** Kafka consumer pods on that node hold partitions that sit unconsumed until the group rebalances, around 45 seconds by default.
- **Effect:** there's no outage, but the slice of transfers touching the failed node stalls for up to about a minute, and some hit client timeouts. That is what a DFSP experiences.

**Database: seconds, not minutes.** With Percona XtraDB Cluster the database is no longer the exception.
- Every node already holds every commit, so there's no promotion or catch-up step.
- ProxySQL detects the failed writer and moves writes to a surviving node in seconds.
- The one rule is to write to a single node at a time, because Mojaloop's hot position rows would cause commit conflicts with several writers.

> **To shrink RTO,** use shorter Kafka consumer session timeouts, outlier detection in the service mesh, tight readiness probes, and faster node-failure detection. These shorten the partial stall to seconds, at the cost of more false positives. **After any failure, your redundancy is spent until the node is replaced,** which is why the sizing is N+1.

---

## 7. Operating the platform

Buying the right infrastructure is half the job; operating it is the other half.

- **Replication ≠ backup.** Replication faithfully copies a bad migration or an accidental delete to every replica. Take scheduled backups with point-in-time recovery, store them off-site, and actually test restores.
- **Observe everything.** Use Prometheus, Grafana and Loki. Alert on Kafka consumer lag, database replication lag and disk latency; those are your early warnings.
- **Rehearse failure.** Run regular drills: pull a node, a switch, a power feed, and the database writer node, on a schedule. An RTO you haven't demonstrated is a hope, not a number, and hope is not a strategy.
- **Test performance** on your own hardware, before go-live and after every major upgrade.
- **Secure the platform.** mTLS, JWS and ILP are part of the tested configuration. Manage PKI and key storage properly, and keep a security patch cadence.
- **Review capacity** quarterly: growth trend against headroom, well ahead of known peaks.

---

## 8. Looking ahead: TigerBeetle

The Mojaloop community is working towards replacing the MySQL ledger with [TigerBeetle](https://tigerbeetle.com/), a purpose-built financial transactions database. This affects procurement in the following ways:

- **Throughput headroom:** about 450,000 native TigerBeetle transfers per second equates to about 65,000 Mojaloop TPS (worst case) on a six-replica production cluster. There is no need for more cores or RAM to scale throughput; large headroom already exists.
- **Latency:** less hot-path write latency means better p99 latency.
- **Scaling:** better, sub-linear throughput scaling means much better performance on the same hardware.
- **MySQL still needed:** transaction metadata is still stored in MySQL, so the requirement to host MySQL remains. It will need fewer resources, because contention is eliminated, so you will not need to add hardware.

> **Key takeaway:** buying for today's MySQL ledger characteristics will not hurt you. You will gain more growth headroom when you upgrade to TigerBeetle-powered Mojaloop.

---

## 9. Procurement checklist

Take this into your next tender or design review.

**Questions to answer before you buy anything**

- [ ] Target SLA, RPO and RTO agreed with the regulator
- [ ] Peak and sustained TPS, with a growth forecast
- [ ] Site topology chosen: failure domains, witness, DR; three-node PXC with proxy failover
- [ ] Diverse power (A+B feeds) and diverse network carriers
- [ ] Latency between sites measured, not assumed

**What the bill of materials should look like**

- [ ] Mid-range servers with local NVMe; no SAN or NAS
- [ ] Bare-metal open-source Kubernetes; no hypervisor under data components
- [ ] Headroom for N+1 at peak, and ~30% spare
- [ ] Budget going to skills, support and failure drills, not licences
- [ ] A successful performance test on the delivered hardware written into the contract as an acceptance criterion

---

## 10. Questions to settle within your scheme

These were the prompts for the session's open discussion, and they are useful questions for any scheme planning team:

- What's driving your cloud or on-premises decision?
- What SLA does your regulator or scheme rulebook expect, and has it been translated into a site topology yet?
- If you have vendor proposals on the table, where do they differ most from the approach in this guide?

---

## Glossary

| Term | Meaning |
|---|---|
| **acks = all** | Kafka producer setting: a message is only acknowledged once all in-sync replicas have it |
| **Anti-affinity** | Kubernetes rule that spreads replicas of the same service across different nodes |
| **DFSP** | Digital Financial Service Provider: a participant in the scheme |
| **DR** | Disaster recovery, typically a secondary site |
| **etcd** | The consensus store holding Kubernetes cluster state |
| **FSPIOP / ISO 20022** | The two API message formats Mojaloop supports; ISO 20022 messages are about 30% larger |
| **GTID** | Global transaction identifier: MySQL's unique ID for each committed transaction, used to track which transactions each server has applied |
| **HBA** | Host bus adapter: the interface card fitted in each server to connect it to a SAN, typically Fibre Channel |
| **IST / SST** | Incremental / State Snapshot Transfer: how a Percona XtraDB Cluster node catches up from a peer when rejoining |
| **ISR** | In-sync replicas: the Kafka replicas fully caught up with the leader |
| **N+1** | Capacity sized so that the service still meets its target with any one component failed |
| **p99** | 99th-percentile latency: 99% of requests complete within this time |
| **PLP** | Power-loss protection: SSD capacitors that guarantee acknowledged writes reach flash during a power cut |
| **PXC** | Percona XtraDB Cluster: a synchronous, Galera-based MySQL cluster |
| **RF** | Replication factor: the number of copies Kafka keeps of each message |
| **RPO** | Recovery point objective: how much acknowledged data can be lost in a failure |
| **RTO** | Recovery time objective: how long service takes to recover after a failure |
| **RTT** | Round-trip time: how long a message takes to reach another site and the reply to come back |
| **SAN / NAS** | Storage area network / network-attached storage: shared, network-connected storage arrays |
| **Split brain** | Two parts of a cluster each believing they are in charge and accepting writes independently |
| **ToR** | Top-of-rack switch |
| **TPS** | Transfers per second |

---

## References

- Mojaloop performance workstream: [github.com/mojaloop/ml-perf-whitepaper-ws](https://github.com/mojaloop/ml-perf-whitepaper-ws). It contains the infrastructure code, Helm overrides, test scripts and the full scenario reports for the 500, 1,000 and 2,000 TPS runs referenced in this guide.
