Data Modeling - structuring business requirements in form of tables with relationships.

### Questions

1. Data Model for something - app that we use on day-to-day basis. Design DM for uber.
2. Product sense - Flavor of prod, metrics, create and calculate metrics usign those metrics. Finally build datamodel calculate those metrics. Opening a second hand book store,
   a. what metrics to find if my book store is running well. - DAUs - MAUs - Duration spent on app - Number of visitors.
   b. fact_orders, fact_sessions etc.
3. SQL queries on top of those.

Kimball's Modeling??

1. Fact and Dimension tables. - Fact: Events, trasactions, number to measure, count, aggregate. - Dimension: context to fact tables, who, what, when, where.
2. DIM_PRODUCT, DIM_CUSTOMER, DIM_STORE, DIM_DATE.
3. Central fact table, 4 dimension table to provide context to the fact table.

- Periodic snapshot fact table
- factless fact table
- Accumulating snapshot fact table

- Star tables and Snowflake schema
- Central fact table has foriegn keys to all fact tbale to be queried and joined.
- Star is same as snowflake, it's just snowflake is further broken down. dim_product [], dim_category[]

- Relationship among tables:
- 1:1 , 1: N, N:1

-Slowly changes dimensions, if address changes yoy, how to store in dim customer table? - New address and override it on top of old address. - Keep history have both old and new address. Add a new row with status yes/no or have a start and end period - create a column to hold the new address and we store the new address in that column.

### Approach to final design

1. Identify business process. Ride share - rider, verification, tracker etc
2. Identify events and entities that could be associated. Payments, reviews, etc. Driver, vehicle entities are dimension table.
3. List out attributes of the table, driverId, RiderId, requestedAds, pickedup ads etc. Don't worry missing attribtues we will need them for other queries.
4. Relevant questions, gather requirements to tables.

Design and deliver data solutions from scratch:

1. Data modeling for airbnb.

purpose of data, is it more transactional or analytical? Data warehousing.

Schema - star schema - denormalized data, it can add redundant cols to tables. Reading is faster.

Analytics is for reading here. We can use star but storage is concern.

Snow flake which uses normalized data - reduces duplication but is less optimal for reads but good for storage involves more with joins and all.

2. Any directions on metrics? Primarily looking at two metrics customer obession/engagement to improve the experience. business profitability.
