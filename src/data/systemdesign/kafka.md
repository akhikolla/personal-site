## Kafka notes:

* Apache Kafka is an open-source distributed event streaming platform that can be used as either a message queue or stream processing system, designed for high performance, scalability, and durability.
* Topics are logical groupings of partitions used for publishing and subscribing to data. Partitions are the physical storage units that allow parallel processing, and they are distributed across multiple brokers (servers) in the cluster.
* Kafka uses a partitioning algorithm that hashes the message key to assign the message to a specific partition. This ensures that messages with the same key always go to the same partition, preserving order at the partition level.
* Kafka partitions are append-only, immutable logs where messages cannot be altered or deleted once written.Each partition functions as an append-only log file where messages are sequentially added to the end. This immutability is central to Kafka's performance, reliability, and simplifies replication and recovery processes.
* Consumer groups ensure that each message is processed by exactly one consumer within the group, enabling load balancing and parallel processing while preventing duplicate message processing.
* Kafka uses a leader-follower replication model where each partition has a leader replica handling reads/writes and multiple follower replicas that passively replicate data, ensuring durability and availability even if brokers fail. This is how it handles fault tolerance for message durability. 
* Kafka uses a pull-based model where consumers actively poll brokers for new messages. This design choice allows consumers to control their consumption rate, prevents overwhelming slow consumers, and enables efficient batching.
* While message size can be configured, it's recommended to keep messages under 1MB to ensure optimal performance through reduced memory pressure and better network utilization.
* A hot partition occurs when one partition receives much more traffic than others (e.g., a popular ad getting many clicks), potentially overwhelming that partition's broker while leaving other brokers underutilized.
* Kafka cannot automatically redistribute hot partitions. Solutions include random partitioning, salting keys with random values, using compound keys, or implementing back pressure - but not automatic redistribution.
* Setting acks=all ensures that a message is acknowledged only when all in-sync replicas have received it, providing maximum durability guarantees at the cost of slightly higher latency.
* Consumers commit their offsets to Kafka after processing messages. When a consumer restarts, it reads its last committed offset and resumes from there, ensuring no messages are missed or duplicated.
* Kafka is designed as a high-performance streaming platform rather than a traditional message queue. Consumer retry patterns must be implemented using separate retry topics and dead letter queues rather than built-in mechanisms.
* Batching messages allows producers to send multiple messages in a single request, significantly reducing network overhead and improving throughput. This can be configured with maxSize and maxTime settings.
* Kafka topics have configurable retention policies controlled by retention.ms and retention.bytes settings. The default is to retain messages for 7 days (168 hours) with retention.bytes set to -1 (no size limit). Size limits can be configured but are not set by default.













