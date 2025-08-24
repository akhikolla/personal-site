Write scaling isn't (only) about throwing more hardware at the problem, there's a bunch of architectural choices we can make which improve the system's ability to scale.

* Vertical Scaling and Database Choices
* Sharding and Partitioning
* Handling Bursts with Queues and Load Shedding
* Batching and Hierarchical Aggregation

## Vertical Scaling and Write Optimization

* We'll start with the hardware, or "vertical scaling". Writes are bottlenecked by disk I/O, CPU, or network bandwidth. We should confirm we're hitting those walls before we proceed. Often this means we need to do some brief back-of-the-envelope math to see both 
(a) what our write throughput actually is, and 
(b) whether that fits within our hardware capabilities.
* A great example of this is using a write-heavy database like Cassandra. Cassandra achieves superior write throughput through its append-only commit log architecture. Instead of updating data in place (which requires expensive disk seeks), Cassandra writes everything sequentially to disk. This lets it handle 10,000+ writes per second on modest hardware, compared to maybe 1,000 writes per second for a traditional relational database doing the same work.
* Cassandra's read performance isn't great. Reading data often requires checking multiple files and merging results, which can be slower than a well-indexed relational database.

## Sharding and Partitioning

### Horizontal Sharding

* A great, simple example of sharding is what Redis Cluster does. Each entry in Redis is stored with a single string key. These keys are hashed using a simple CRC function to determine a "slot number". These slot numbers are then assigned to the different nodes in the cluster.
* Clients query the Redis Cluster to keep track of servers in the cluster and the slot numbers they are responsible for. When a client wants to write a value, it hashes the key to determine the slot number, looks up the server responsible for that slot, and sends the write request to that server.

### Vertical Partitioning

* While horizontal sharding splits rows, vertical partitioning splits columns. You separate different types of data that have different access patterns and scaling requirements. Instead of cramming everything into one massive table, you break it apart based on how the data is actually used.

## Handling Bursts with Queues and Load Shedding

* While partitioning and sharding will get you 80% of the way to scale, they often stumble in production. Real-world write traffic isn't steady, and while scale often does smooth (Amazon's ordering volume is surprisingly stable), some bursts are common. Interviewers love to drill in on things like "what happens on black friday, when order volume 4x's" or "during new years, we triple the number of drivers on the road".

we either need to 
(a) buffer the writes so we can process them as quickly as we can without failure, or 
(b) get rid of writes in a way that is acceptable to the business. 