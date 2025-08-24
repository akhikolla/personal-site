This service powers metadata for movies, shows, episodes, and makes it searchable, browsable, and filterable for end users across devices.

## 🧠 Clarifying Questions to Ask

Q1: What types of content will we support — movies, shows, episodes, trailers, etc.?
A: All of them. The catalog should handle series with multiple seasons, trailers, feature films, and upcoming content.

Q2: Is the catalog global? Should it handle different languages, regional availability, and content ratings per country?
A: Yes, the system must support global metadata with localization.

Q3: What kind of users or services will consume this catalog — internal tools, recommendation engine, mobile/web clients?
A: All of the above. The system must support high read throughput with low latency.

Q4: Do we need to handle real-time updates? For example, can metadata change frequently (e.g., when dubbing gets added)?
A: Updates are not in real-time but can be frequent — for example, daily ingest jobs or manual editor updates.

Q5: What kind of metadata are we talking about? Just title and description, or rich data like cast, genre, maturity ratings, thumbnails?
A: All of them. We want a complete metadata system that is extensible.

## ✅ Functional Requirements

- Store and manage metadata for all types of content: movies, series, episodes, trailers.
- Allow querying by title, genre, actors, tags, etc.
- Handle hierarchical relationships (series → seasons → episodes).
- Support localization (e.g., descriptions, subtitles in multiple languages).
- Support regional restrictions (e.g., title available in US but not India).
- Allow updates to metadata from content ingestion pipelines or internal editors.
- Serve fast and efficient APIs to downstream services like search, homepage, recommendation engine.

## 🚀 Non-Functional Requirements

- High Availability: The catalog should be accessible 24/7 globally.
- Scalability: Must support millions of titles and billions of reads per day.
- Low Latency: Responses under 100ms for user-facing calls.
- Consistency: Metadata updates should eventually reflect across all services.
- Durability: Metadata should never be lost.
- Extensibility: Support for new metadata fields in the future.

## 📌 Assumptions

- Reads >> Writes (high read throughput, low write volume).
- Metadata size is relatively small (compared to video files).
- Most queries are read-heavy, cacheable, and repeated frequently.
- Metadata can be updated multiple times a day.
- Multiple services (UI, search, recommendations) consume the same APIs.

## 📐 High-Level System Design

At a high level, we break the system into:

Metadata Ingestion Layer
Ingests metadata from studios, content providers, and manual editors. Validates, transforms, stores data in DynamoDB.

Metadata Store (Master DB)
Stores the full raw metadata records in a durable and normalized form. Partitioned by contentID

Search & Serving Layer (Read-Optimized)
Handles queries using denormalized, indexed data. Optimized for queries, filters, autocomplete.

API Layer
Exposes REST/gRPC endpoints to internal and external consumers.

Cache Layer
Reduces pressure on the serving layer. CDN Caches metadata blobs globally. Redis used for hot content(trending, homepage)

Localization & Regional Rules Engine
Filters or adjusts responses based on country, language, or maturity rules.

## TradeOffs:

Metadata Storage: DynamoDB vs PostgreSQL

- Why not SQL (PostgreSQL)?

* SQL is great for relationships and joins, but Netflix metadata isn’t deeply relational.
* Scaling globally with Postgres involves sharding and high operational overhead.

- Why DynamoDB?

* Global scale out of the box.
* Schemaless — can easily evolve metadata structure.
* Easy to query by partition key (e.g., contentId) or secondary indexes (e.g., title).
* Write-heavy and read-heavy workloads supported.
* Backed by AWS and Netflix infra standards.

→ Choice: DynamoDB for metadata storage with Global Secondary Indexes (GSIs) for filtering/search.

Search Layer: Elasticsearch vs Solr vs Custom

- Why Elasticsearch (ES)?

* Full-text search on titles, descriptions, tags.
* Faceted search (genre + rating + year).
* Optimized for autocomplete, fuzzy search.
* Netflix already uses it in production for other search use cases.

→ Choice: Elasticsearch for user-facing title search and filters.

Caching: Redis + CDN

Redis: For server-to-server caching (e.g., metadata by content ID).
CDN: For edge caching of common metadata blobs (e.g., homepage rows).

→ Choice: Redis for internal, CloudFront or Akamai CDN for global edge caching.

## 🔗 APIs

    GET /catalog/{id} – Fetch full metadata for a title

    GET /catalog/search?title=&genre=Action – Search by filters

    POST /catalog – Add new title (studio/internal CMS)

    PATCH /catalog/{id} – Update metadata

    GET /catalog/homepage?region=IN – Get homepage content for region

🧠 How Do We Scale?

- Horizontally scale API layer (stateless)
- DynamoDB handles millions of TPS with partition keys
- Elasticsearch clusters handle full-text indexing/search
- Redis scales using clustering and key partitioning
- CloudFront (or similar CDN) caches content closest to users

🔥 Why Redis (and not Kafka, Flink, etc.)?

Redis is great for caching. Kafka and Flink are streaming systems used for processing and transporting data, not for low-latency lookup.

Redis gives:

- Microsecond-level response time (compared to 10–50ms in Elasticsearch or 50–100ms in DynamoDB).
- Built-in TTL to auto-expire stale cache entries.
- Data structures like sorted sets, hash maps for lightweight logic.
- Horizontal scalability via Redis Cluster.

🚫 Why not Kafka/Flink?
Kafka is ideal for data ingestion pipelines (e.g., pushing new content to the catalog), not for key-value lookup.
Flink is used for real-time stream processing (e.g., counting, filtering, anomaly detection).
Redis is not a replacement for these — it’s complementary. But in this use case, we don’t need to stream data in real time to clients — we need fast access to metadata.

🧠 “Can it scale to serve billions of reads per day?” ✅ Yes.

- API layer is stateless — easily horizontally scaled.
- DynamoDB auto-scales for write throughput.
- Elasticsearch is sharded and replicated.
- Redis Cluster supports high concurrency.

🧠 “Is latency under 100ms?” ✅ Yes.

Hot paths use Redis (~1–2ms).
Fallbacks to Elasticsearch (~50ms).
Edge caching via CDN (sub-10ms globally).
