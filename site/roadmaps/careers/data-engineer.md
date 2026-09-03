# Data Engineer Roadmaps

**Build the systems that move, store and serve data.**

If you want to become a **Data Engineer**, this page helps you understand the technologies and concepts used to build reliable data pipelines and data platforms.

You do **not** need to learn every data technology.

Start with programming, databases and SQL, then progress toward pipelines, distributed systems, cloud platforms and data architecture.

---

## What Does a Data Engineer Do?

A Data Engineer builds and maintains the systems that make data available for analysis, applications and AI.

Typical work includes:

- Collecting data from different sources
- Building data pipelines
- Transforming data
- Designing data models
- Managing databases
- Building data warehouses and data lakes
- Processing large datasets
- Automating data workflows
- Monitoring data pipelines
- Improving reliability and performance
- Supporting analysts, engineers and data scientists

A simple way to think about the role is:

**Data Sources → Pipelines → Storage → Transformation → Data Consumers**

---

## Your Data Engineering Learning Path

A practical journey looks like:

**Foundations → Programming → SQL → Databases → Data Modeling → ETL/ELT → Pipelines → Distributed Data → Cloud → Data Architecture → Projects**

You don't need to master every branch immediately.

Build the foundation first.

---

## Recommended Roadmaps

### Start with the Foundations

Begin with the skills used across modern data engineering.

- Python
- SQL
- Git & GitHub
- Linux
- Bash

Python and SQL are especially important starting points.

---

### Learn Databases

Understand how structured data is stored and queried.

Learn:

- Tables
- Rows and columns
- Primary keys
- Foreign keys
- Relationships
- Indexes
- Transactions
- SQL queries
- Database design

Then explore different database technologies as your requirements grow.

---

### Learn Data Modeling

Data Engineering is not just moving data around.

You also need to understand how data should be structured.

Learn:

- Relational modeling
- Normalization
- Denormalization
- Fact tables
- Dimension tables
- Star schemas
- Data marts
- Analytical models

Good data models make downstream analysis much easier.

---

## ETL & ELT

You will frequently encounter two important patterns.

### ETL

**Extract → Transform → Load**

Data is transformed before it reaches its destination.

### ELT

**Extract → Load → Transform**

Data is loaded first and transformed inside the destination platform.

Understand both approaches and when each makes sense.

---

## Build Data Pipelines

A pipeline moves data from one or more sources to places where it can be used.

For example:

**API → Pipeline → Data Lake → Transformation → Warehouse → Dashboard**

Learn about:

- Batch processing
- Streaming
- Scheduling
- Dependencies
- Retries
- Error handling
- Data validation
- Incremental processing
- Pipeline monitoring

---

## Workflow Orchestration

As pipelines become more complex, you need a way to coordinate them.

Explore:

- Apache Airflow
- Scheduling
- DAGs
- Dependencies
- Task retries
- Monitoring
- Workflow automation

The goal is to build pipelines that can run reliably without constant manual intervention.

---

## Big Data & Distributed Processing

When datasets become too large or processing requirements become too complex for a single machine, distributed systems become important.

Explore:

- Apache Spark
- Hadoop
- HDFS
- Apache Flink
- Distributed processing
- Batch processing
- Stream processing

You don't need to learn every framework.

Understand the underlying concepts first.

---

## Data Warehousing

A data warehouse organizes data for analytical workloads.

Learn about:

- Data warehouses
- Data marts
- Dimensional modeling
- Analytical queries
- Partitioning
- Performance
- Data loading

Then explore platforms such as:

- Snowflake
- Databricks
- Cloud data warehouses

---

## Data Lakes & Lakehouses

Modern data platforms increasingly combine ideas from data lakes and warehouses.

Explore:

- Data lakes
- Lakehouse architecture
- Open table formats
- Apache Iceberg
- Delta Lake
- Apache Hudi

Understand the problem each technology is trying to solve before learning the specific tool.

---

## Cloud Data Engineering

Modern data platforms frequently run in the cloud.

Explore:

- AWS
- Microsoft Azure
- Google Cloud
- Cloud storage
- Cloud databases
- Compute
- Networking
- IAM
- Monitoring

You don't need to learn all three cloud providers.

Start with one.

---

## Kafka & Streaming

When data needs to move continuously, streaming technologies become important.

Learn:

- Events
- Producers
- Consumers
- Topics
- Partitions
- Consumer groups
- Message ordering
- Delivery guarantees

Then explore:

**Apache Kafka → Streaming Pipelines → Real-Time Data**

---

## Data Quality & Reliability

A pipeline that runs successfully can still produce bad data.

Learn to think about:

- Completeness
- Accuracy
- Consistency
- Freshness
- Validity
- Duplicates
- Missing data
- Schema changes

A strong Data Engineer doesn't just ask:

**"Did the pipeline run?"**

They also ask:

**"Can we trust the data?"**

---

## Don't Learn Everything at Once

A common beginner mistake is trying to learn:

**Python + SQL + Spark + Kafka + Airflow + AWS + Snowflake + Databricks + Kubernetes + everything else**

at the same time.

Don't.

Start with:

**Python → SQL → Databases → Data Modeling → ETL → Pipelines**

Then add distributed systems and cloud technologies.

---

## What Should You Learn First?

### Complete Beginner

Start with:

**Python → SQL → Git → Databases → Data Projects**

### Want to Build Data Pipelines?

Focus on:

**Python → SQL → ETL → Data Modeling → Airflow → Cloud**

### Want to Work with Big Data?

Build toward:

**SQL → Python → Data Engineering → Spark → Distributed Systems**

### Want to Work with Real-Time Data?

Build toward:

**Python → SQL → Data Pipelines → Kafka → Streaming**

### Want to Build Modern Data Platforms?

Build toward:

**Data Engineering → Cloud → Warehousing → Lakehouse → Data Architecture**

---

## Data Engineering Connects Many Teams

Data Engineers often sit between multiple parts of an organization.

For example:

**Applications → Data Engineering → Analytics**

and:

**Applications → Data Engineering → Machine Learning / AI**

This makes data engineering a foundational capability for modern technology organizations.

---

## Build Projects

Don't stop at tutorials.

Build practical projects such as:

- API-to-database pipeline
- Sales data pipeline
- Automated ETL workflow
- Data warehouse
- Batch processing pipeline
- Streaming pipeline
- Data lake
- Lakehouse
- End-to-end analytics platform

A good project should demonstrate that you can build something reliable from source to destination.

---

## Your Goal Is Not to Learn Every Data Tool

Tools change.

The core ability remains:

**Collect → Transform → Store → Validate → Serve → Monitor**

If you can build reliable data systems, you can adapt to new technologies.

---

## The Learn with Nelson System

Use the roadmap together with the rest of the learning ecosystem:

| Layer | Purpose |
|---|---|
| **Roadmap** | WHAT to learn |
| **Article** | LEARN the concepts |
| **GitHub** | DO the practical work |
| **Projects** | PROVE your skills |
| **AI at Work** | WORK SMARTER |

---

## Where Should You Go Next?

**New to technology?**

→ Start with **Start Here**

**Want to learn a specific data technology?**

→ Explore **Topic Roadmaps**

**Want to explore another career?**

→ Explore **Career Roadmaps**

**Ready to build?**

→ Explore the related **Tutorials and Projects**

---

[← Back to Career Roadmaps](index.md)

[← Back to All Roadmaps](../index.md)