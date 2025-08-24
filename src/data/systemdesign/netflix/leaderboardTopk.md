We’ll ingest frequent score updates, maintain real-time global rankings per game in Redis sorted sets, and answer Top-K global in O(log N + K). For Top-K among a user’s friends, we’ll intersect the global leaderboard with that user’s friend set using Redis 7 ZINTER (server-side, limited to K) or a pre-materialized, TTL’d “friends leaderboard” for large friend lists. Kafka (or Kinesis) guarantees durable, ordered ingestion; DynamoDB/Cassandra stores the authoritative last score per (player, game). The system targets p95 read < 50 ms, p95 write < 100–150 ms end-to-end, and sub-second freshness.

## Functional Requirements

- Ingest frequent score updates (incremental or absolute) for players across game modes/regions.
- Query Top-K Global (per mode/region).
- Query Top-K Among My Friends (per mode/region).

- Real-time feel: clients auto-refresh or receive push updates when Top-K changes.
- Return each entry’s rank, score, player profile, and tie handling.

- Support pagination (next-K) and “what’s my rank?”.
- Multi-tenancy: multiple game modes/shards/regions.
- Admin/anti-cheat hooks for invalidation and recompute.

## Non Functional Requirements

- Latency (p95): reads < 50 ms, writes E2E < 150 ms (API->visible).
- Freshness: eventual, typically < 1 s from ingest to visible rank.
- Availability: 99.9%+ read APIs, 99.9% ingest.
- Consistency: eventual for leaderboard; read-your-write not guaranteed.
- Throughput (example planning):
  - Peak writes: 100k updates/s across all games.
  - Peak reads: 200k reads/s, 60% global, 40% friends.
- Durability: all updates persist to the log (Kafka) and the source-of-truth DB
