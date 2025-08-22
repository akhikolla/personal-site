Design a service which allows us to query the topK most viewed videos in a given time period. The time periods are fixed and might be minute, hour, day, month, or all-time.

<p> </p>

## Functional Requirements (FR)

- Query Top K Most Viewed Videos - Support querying top-K videos (up to 1000)
- Accept a time period as input

## Non-Functional Requirements (NFR)

- Consistency - Staleness requirement: videos should appear in top-K within 60 seconds
- Performance - Read latency should be between 10ms to 100ms
- Scalability - Must handle massive reads and writes
- Accuracy - Approximations like Bloom Filter, Count-Min Sketch, or PNN are not allowed

## Core Entities

View, Video, Window (min/hour/Day/All-Time)

## API

view comes in we can connect to a stream, api call/kafka topic? represents this?

Input - {videoId}

API to get views - GET /views/video?k={k}&window={window} -> [{videoId, views}] - sortedlist

- no, need for video metadata and assume we have a downstream aggregater that can read from me and then augument this videoId with the video names or client can make separate calls to get info.

## HLD

Optimal sol from scalibility and work backwards to system that actual functions.

Take working solution and make it optimal. before NFRs. Don't take all FR together.

should we solve all time first and then get the window split check?

- We are talking about avaiability -- obvious solution is to replicate the service. If we replicate the service we are bound to enable some kind of the load balancer or an api gateway if we intend deal with or to enable the ratelimiting or authentication and stuff.

- if service fails, LB takes it out and client still have availability.
- this is a stateful service, if we want to bring back that failed service we have a problem. we should try to manage state within our service such that it doesn't spread across the entire design. TopK is stateful but we need to figure out how to deal it.

- if we lost one instances, we boot it back up and re read those messages from kafka if kafka has retention enabled and mesages and then repopulate the counts. We have to start from scratch. If service is already at bottle neck in terms of views it's ingesting we will have hard time catching up. let's say out system is already 80% utilized on steady state and where it doesn't actually need to catch up and only 20% available to work through backlog. I functionally working with quarter of second it will take more time to catch up.

Most services don't have bunch of excess capacity to rework those jobs, in this case we probably want to do is enable checkpointing.

- write out our counts,heap and ids of last view that we processed that we have to some kind of blob S3/Azure storage. when our service starts up we read from checkpoint, we restore all of the state and then we resume reading from stream from that latest time point, we can do checkpoint in hourly, minutely basis etc but this helps with recover, scale. We need service to add new service we can catch up quickly and check points aren't far behind. For keep consistency.

- How to handle write volumes from kafka topic, we are gonna have multiple shards. How are shards organized. We can assigned that video to one topK service.We can assign that one video to one topK service. Easy way is to take module of number of shards, and videoIds are distributed in semi random fashion. Challenge is we would have to aggregate them across read side.

- TopK service will need to query from each shard and aggregate it. We are going to have top 1000 views from each heap and be able to to accept an arbitary, we can guarantee that global 1000 is gonna be from one of these heap, all we need to do is merge sorted lists and functionally we need to iterate over each item only once. This solution provides way to shards out right and produce a value.

- View stream is partitioned in the same way counters were. How can we make it more elastic? If we need to able to add more shards, we need Zookeeper, where we can keep track of no of shards out there, along side the range of avaiable videos in each shard. If we add a new shards we might need to remove videos from one shard and have to redistribute them, we use checkpoints and retention on kafka streams to pull this off.

- Asynchronous replication with eventual consistency and local reads provides the best balance for streaming systems with strict latency requirements. It allows each node to serve reads immediately without waiting for cross-node synchronization, while still maintaining data durability through asynchronous replication. This approach minimizes latency while ensuring high availability, which is crucial for real-time analytics where slight data inconsistencies are often acceptable in exchange for continuous operation.

- While precomputation typically trades storage for query latency, it doesn't 'always' reduce latency. Precomputed results may become stale, require complex invalidation, or create hotspots. The effectiveness depends on query patterns, update frequency, and cache hit rates.

- When scaling stateful stream processors horizontally, the main challenge is redistributing accumulated state (like counters, heaps, or time windows) across new nodes. Unlike stateless processors that can instantly utilize new capacity, stateful systems must migrate existing state data, which can be expensive and temporarily impact processing during rebalancing. This is why techniques like consistent hashing and incremental state migration are critical for stateful distributed systems.

## Deep Dive

- Of all time counts is solved, how do we handle time windows? a considerable amount of time is needed.

### Approaches:

1. Producing arbitarary aggregation based on time:
