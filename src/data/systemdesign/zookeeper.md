Zooper handles service discovery, configuration sharing/management, failure detection, leader election, distributed consensus/locks.

We should handle network delays, partial failures and still maintain consistency to handle above problems.

Zookeeper is a synchronized metadata fileSystem - each node connected will have same view of the data. This consistent view across all participating servers is what makes zookeeper powerful for coordination tasks.


1. ZooKeeper is a distributed coordination service designed to help manage configuration, naming, synchronization, and group services for distributed applications. It's not meant for bulk data storage but rather for coordinating distributed systems through small metadata operations.
2. ZNodes are the fundamental data units in ZooKeeper's tree-like namespace. Each ZNode can store small amounts of data (typically under 1MB) along with metadata, and they're organized in a hierarchical structure similar to a file system but where each 'folder' can also contain data.
3. Ephemeral ZNodes are tied to client sessions and provide automatic cleanup when clients fail. This is crucial for detecting server failures and maintaining accurate service discovery information without manual intervention.
4. Sequential ZNodes automatically append a monotonically increasing counter, making them perfect for ordered operations like message queues. The sequence numbers ensure messages are processed in the correct order across distributed systems.
5. ZooKeeper is optimized for small coordination data, not bulk storage. ZNodes are limited to 1MB and the entire dataset is kept in memory for fast access. This design supports high-performance coordination but limits data volume.
6. ZooKeeper watches are one-time notifications. After a watch fires, it must be re-registered to receive future notifications. This design prevents overwhelming clients with notifications and gives them control over when to re-establish watches.
7. The leader is responsible for processing all write requests and coordinating updates across the ensemble using the ZAB protocol. This centralized approach ensures consistency and ordering of all state changes.
8. This design optimizes for read-heavy workloads. Reads are served locally by any server for high throughput, while writes go through the leader to ensure consistency and proper ordering through the ZAB protocol.
9. The node with the lowest sequence number becomes the leader. This ensures a deterministic election process and natural failover - when the current leader fails, the node with the next lowest sequence number automatically becomes the new leader.
10. ZooKeeper locks are not designed for high-frequency scenarios. Each lock operation involves creating ZNodes and coordinating across the ensemble, making them better suited for longer-held locks. For high-frequency locking, Redis-based locks are more appropriate.
11. Each user's connection creates an ephemeral ZNode storing their server location. Other servers can read this ZNode to route messages correctly. When users disconnect, their ephemeral nodes automatically disappear, keeping the routing information current.
12. ZAB is ZooKeeper's consensus protocol that ensures all servers agree on the state of the system. It handles leader election and atomic broadcast of updates, maintaining consistency even when servers fail or network issues occur.
13. ZooKeeper provides sequential consistency, meaning updates from a client are applied in the order they were sent. If a client updates node A then node B, all servers will see the update to A before the update to B.
14. ZooKeeper prioritizes consistency over availability. Without a majority quorum, it stops processing writes to prevent split-brain scenarios where different partitions might make conflicting decisions. This ensures data consistency when the partition is resolved.
15. Session timeout configuration is critical. Too short timeouts cause false failures during brief network hiccups, while too long timeouts delay detection of actual failures. The typical range is 10-30 seconds to balance responsiveness with stability.
16. etcd is the coordination service that powers Kubernetes and is popular in cloud-native environments. Like ZooKeeper, it provides distributed key-value storage with strong consistency, but offers modern HTTP/JSON and gRPC APIs that integrate well with cloud-native tooling.






 


### Data Model based on ZNodes:

1. organizes data like a tree/hierarichal namespace.
2. Nodes in tree here are called ZNodes.
3. Znodes stores upto 1MB of data and metadata and can hold coordination data, not data like images or large documents.
4. Data stored in znodes is large but the number of znodes itself are thousands.

3 types of Znodes:

    1. Persistent ZNodes: These nodes exists until explicitly deleted. Used for max message size or rate limit parameters.
    2. Ephemeral ZNodes: Automatically deleted when the session ends, tracking server is alive and which users are online.
    3. Sequential ZNodes: Automatically appended monotonically increasing counter to their name. Can be used for distributed locks or ordering messages.

### Server roles within a Zookeeper ensemble

1. Zookeeper runs on group of servers called ensemble. A typical production deployment consists of 3,5,or 7 servers.
2. Server takes on different roles, leader - one server elected responsible for all update requests. When new server is register this write req goes to leader.
3. Followers, the rest of servers follow leader and serve read requests.

### Watch mechanism that enables real time notifications

1. Solves our chat app's notification problem. Watches allows servers to be notified when a ZNode changes. Eliminates need for constant polling or complex server to server communication.


