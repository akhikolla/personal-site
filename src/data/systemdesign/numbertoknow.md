## Modern Hardware Limits

AWS  M6i.32xlarge - 512 GB memory and 128 vCPUs for general workloads. 

### Memory Optimized instances: 

X1e.32xlarge provides 4 TB of RAM, while the U-24tb1.metal reaches 24 TB of RAM.

## Caching: 

Today's caches routinely handle terabyte-scale datasets with single digit millisecond latency. 

* Memory: Upto 1TB on memory optimized instances. 
* Latency: 
    Read: < 1ms within same region
    Write: 1-2 ms average cross region for optimized systems. 
* Throughput: 
    Reads: Over 100k requests/second per instance for in-memory caches like ElasticCache Redis on modern graviton based nodes. 
    Writes: Sustained throughput of hundreds of thousands of requests per second. 

### When to consider Sharding: 

1. When dataset size is approaching 1TB. 
2. Sustained throughput of 100k+ ops/second
3. Requirements below 0.5 ms consistently. 


## Databases: 

Single PostgreSQL or MySQL instances can routinely handle dozens of terabytes of data while maintaining a milli second response times. 

* Storage: Single instance can handle upto 64TiB for most of the database engines, with aurora supporting upto 128TB in some configurations. 
* Latency: 
    * Read:  1-5 ms for cached data, 5-30 ms for disk(optimized configurations for RDS and Aurora)
    * Write: 5-15ms for commit latency (for single node, high performance setups)
* Throughput: 
    Reads: upto 50k TPS in single node configurations on Aurora and RDS. 
    Writes: 10-20k TPS in single node configurations on Aurora and RDS. 
* Connections: 5-20k concurrent connections based on database and instance type. 

### When to consider Sharding: 

1. Database size approaching or exceeding 50TB. 
2. Write throughput conssitently exceeding 10k TPS. 
3. Read Latency exceeding 5ms for uncached data 
4. Geographic distribution, cross region replication or distributed needs. 
5. Backup windows that stretch into the hours or become operationally impractical. 

## Application Servers: 

* Memory: 64-512 GB standard, upto 2TB on high memory instances. 
* CPU: 8-64 cores. 
* Connections: 100k+ concurrent connections per instance for optimized configuration. 
* Network: Upto 25 Gbps bandwidth in modern server configuration. 
* Startup Time: 30-60 seconds for containerized apps. 

### When to consider Sharding: 

1. CPU utilization consistently above 70-80%
2. Response Latency exceeding the SLA or critical thresholds. 
3. Memory usage trending above 70-80%
4. Network bandwidth approaching 20Gbps. 

## Message Queues: 

Message queues have transformed simple task delagations systems into high performance data highways. Systems like kafka process millions of messages per second with single digit millisecond latency, while maintaining weeks or months of data. 

* Storage: Upto 50TB per broker in advanced configurations.
* Latency: 1-5ms end2end within a region for optimized setups. 
* Throughput: Upto 1 million messages/second per broker in modern configurations. 
* Message Size: 1KB-10MB efficiently handled. 
* Retention: Weeks to months of data, depending on disk capacity and configuration. 

### When to consider Sharding: 

1. Throughput: Nearing 800k messages/second per broker. 
2. Partition Count: Approaching 200k per cluster.
3. Consumer Lag: Consistently growing, impacting real time processing. 
4. Cross Region Replication: If geographic redundancy is required. 


### Common Mistakes: 

1. Premature sharding: 

Sharding is not always necessary. 

Design Yelp: 
10M businesses, each of which is roughly 1KB of data = 10 M * 1KB = 10GB of data! 10x of this 10GB to account for reviews, which can store in the same database and you're only at 100GB. why would you shard? 

Design Leetcode: 
Same comes up with caches, we have 100K competitions and up to 100K users per competition, we are looking at 100K * 100K * 36b ID + 4b float rating = 400GB, which is more than what we store at disk, this can still fit on a single large cache - no need to shard. 

2. Overestimating latency: 

I see this most with SSDs. Candidates tend to vastly overestimate the latency additonal to query an SSD(database) for a simple key or row lookup. 
 
We're talking 10 ms or so. Oftentimes we justify this by adding a cache layer to reduce latency when the simple row lookup is already fast enough - no need for additional infrastructure. 

However, we need to note that this is applicable only for simple row look ups with an index. It's still wise to cache expensive queries. 

3. Over engineering given a high write throughput: 

Imagine we have system with 5K writes per second, Candidates will often jump to adding a message queue to buffer this high write throughput, but we don't need to. 

Let's put this in perspective. A well tuned postgres instance with simple writes can handle upto 20k+ writes per second. 

#### What actually limits write capacity are: 

1. Complex transactions spanning multiple tables. 
2. Write amplification from excessive indexes. 
3. Writes that trigger expensive cascading updates. 
4. Heavy concurrent reads competing with writes. 

* Message queues become valuable when you need guaranteed delivery in case of downstream failures, event sourcing patterns, handling write spikes above 50K+ WPS, or decoupling producers from consumers. 
* Before reaching for message queues, consider simpler optimizations like batch writes, optimizing your schema and indexes, using connection pooling effectively, or using async  commits for non critical writes. 


