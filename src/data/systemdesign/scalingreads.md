There is an imbalance in terms of the reads and writes that a system could contain.

For example,
every tweet that's posted, thousands of users read it.
every product that's uploaded to amazon, hundreds browse it.
youtube processes billions of video views daily but only millions of uploads.

The standard read to write ratio starts at 10:1 but often reachs 100:1 or higher for content heavy applications. As no of reads increase database will struggle to load.

This is a physics problem:

1. CPU cores can only execute so many instructions per second.
2. Memory can hold only so much data
3. Disk I/O is bounded by speed of spinning platters or SSD write cycles.

## Solution: Simple optimizations to complex distributed systems.

1. Optimize read performance within your database.
2. Scale your database horizontally.
3. Add external caching layers.

### Optimize within the Database

1. Indexing: 

* Similar to book index. Instead of scanning every page to find mentions of the database, you check the index at the back which tells you exactly which pages to look at.
* When queried without an index, the database performs what's called a full table scan, it reads every single row to find matches. With an index, it can jump directly to relevant rows.
* Turns O(n) operation to O(log n), which is differences between scanning 1 million rows versus checking may be 20 index entries.

Different types of indexes: 

1. B-Tree for general queries. 
2. Hash Indexes work well for exact matches
3. Specialized indexes handle full text search or geographical queries. 

* Addressing Read scaling problem is to add indexes to columns we frequently query, join on or sort by. 
* If designing a social media app and users often search for posts by hashtag, index the hashtag column, If sorting products by price, index price column. 
* In interviews, confidently add indexes for your query patterns - under-indexing kills more applications than over-indexing ever will.

2. Hardware upgrades: 

* Use better and bigger hardware. SSD provides 10-100x faster random I/o than spinning disks. More RAM means more data stays in memory, avoiding disk reads entirely. Faster CPUs and more cores handle more concurrent queries.

3. Denormalization Strategies: 

* Normalization is the process of structuring data to reduce redundancy by splitting information across multiple tables to aovid storing duplicate data. While it saves storage space it makes queries more complex because we need joins to bring related data back together. 
* For read-heavy systems, denormalization (the opposite of normalization where you store redundant data) trades storage for speed. Instead of joining three tables to get user profile data, store the data redundantly in a single table.


### Scale database horizontally

1. Read Replicas

* The first approach to scaling beyond a single database is adding read replicas. Read replicas copy data from your primary database to additional servers. All writes go to the primary, but reads can go to any replica. This distributes read load across multiple servers.
* Leader-follower replication is the standard approach. One primary (leader) handles writes, multiple secondaries (followers) handle reads. Replication can be synchronous (slower but consistent) or asynchronous (faster but potentially stale).
* The key challenge is replication lag. When you write to the primary, it takes time to propagate to replicas. Users might not see their own changes immediately if they're reading from a lagging replica.

2. Database Sharding

* Read replicas distribute load but don't reduce dataset size that each database needs to handle. Sharding can help by splitting data across multiple databases.
* For read scaling, sharding helps in two main ways: smaller datasets mean faster individual queries, and you can distribute read load across multiple databases.
* Functional sharding splits data by business domain or feature rather than by records. Put user data in one database, product data in another. Now user profile requests only query the smaller user database, and product searches only hit the product database.
* Geographic sharding is particularly effective for global read scaling. Store US user data in US databases, European data in European databases. Users get faster reads from nearby servers while reducing load on any single database.

### Add External Caching Layers

* Importantly, most applications exhibit highly skewed access patterns. On Twitter, millions read the same viral tweets. On e-commerce sites, thousands view the same popular products. This means you're repeatedly querying your database for identical data - data that rarely changes between requests.
* Caches exploit this pattern by storing frequently accessed data in memory.

1. Application-Level Caching

* In-memory caches like Redis or Memcached sit between your application and database. When your application needs data, it checks the cache first. On a hit, you get sub-millisecond response times. On a miss, you query the database and populate the cache for future requests.
* Cache invalidation remains the primary challenge. When data changes, you need to ensure caches don't serve stale data. Common strategies include:
    * TTL time based expiration - set fixed time for cached entires. 
    * Write through invalidation - update/delete cached entires when writing to db. 
    * Write behind invalidation - queue invalidation events to process asynsly. 
    * Tagged invalidation - Assocaite cache entries with tags, invaliadte all entries with a specific tag when related data changes. 
    * Versioned keys - includes version numbers in cache keys. 

2. CDN and Edge Caching 

* Content Delivery Networks extend caching beyond your data center to global edge locations. While originally designed for static assets, modern CDNs cache dynamic content including API responses and database query results.
