# SQL Roadmap

**Learn SQL from zero to querying, analyzing, and managing relational data.**

SQL (Structured Query Language) is the language used to work with relational databases.

SQL is important for:

- Data analysis
- Data engineering
- Backend development
- Software engineering
- Business intelligence
- Reporting
- Data science
- Database administration

You do not need to become a database expert immediately.

First learn how data is organized, then learn how to retrieve and transform it.

---

## Before You Start

You should be comfortable with:

- Files and folders
- Basic computer use
- Simple arithmetic
- Basic programming concepts

Programming is helpful but **not required** to start SQL.

If programming is completely new to you:

→ [Programming Fundamentals](programming-fundamentals.md)

---

# Your SQL Learning Path

Follow this sequence:

**Data → Databases → Tables → SELECT → Filtering → Sorting → Aggregation → GROUP BY → JOINs → Subqueries → CTEs → Window Functions → INSERT/UPDATE/DELETE → Transactions → Database Design → Indexes → Performance → Security → Projects**

---

# 1. Understand Data

Before learning SQL syntax, understand what data looks like.

A simple dataset might contain:

| ID | Name | Department | Salary |
|---|---|---|---:|
| 1 | Ana | Finance | 50000 |
| 2 | Ravi | Engineering | 70000 |
| 3 | Sara | Finance | 60000 |

Think of:

- Rows as records
- Columns as attributes
- Values as individual pieces of information

SQL allows you to ask questions about this data.

---

# 2. What Is a Database?

A database is an organized system for storing and retrieving data.

A relational database organizes data into related tables.

Popular relational databases include:

- PostgreSQL
- MySQL
- SQL Server
- Oracle Database
- SQLite

The SQL language is broadly similar across these systems, but each database can have its own features and syntax differences.

---

# 3. What Is a Table?

A table contains rows and columns.

For example:

```text
employees
--------------------------------
id | name | department | salary
--------------------------------
1  | Ana  | Finance    | 50000
2  | Ravi | Engineering | 70000
```

Learn:

- Table
- Row
- Column
- Record
- Field
- Data type

---

# 4. Primary Keys

A primary key uniquely identifies a row.

Example:

```text
employee_id
```

A good primary key should uniquely identify each record.

Understand:

- Uniqueness
- `PRIMARY KEY`
- Identity
- Relationships between tables

---

# 5. Foreign Keys

A foreign key connects one table to another.

For example:

```text
employees.department_id
        ↓
departments.id
```

This allows databases to represent relationships.

Learn:

- Foreign keys
- Parent tables
- Child tables
- Referential integrity

---

# 6. SQL Basics

SQL statements are instructions sent to a database.

A basic query:

```sql
SELECT name
FROM employees;
```

Read it as:

**Select the name column from the employees table.**

Start by understanding:

- `SELECT`
- `FROM`

---

# 7. SELECT

`SELECT` retrieves data.

Example:

```sql
SELECT *
FROM employees;
```

Then become more precise:

```sql
SELECT name, salary
FROM employees;
```

Avoid using `SELECT *` when you only need specific columns, especially in production queries.

---

# 8. WHERE

Use `WHERE` to filter rows.

```sql
SELECT name, salary
FROM employees
WHERE salary > 60000;
```

Learn:

- Equality
- Comparisons
- Multiple conditions
- `AND`
- `OR`
- `NOT`

---

# 9. NULL

`NULL` means a value is missing or unknown.

It is not the same as:

- Zero
- Empty text
- False

Use:

```sql
WHERE manager_id IS NULL;
```

not:

```sql
WHERE manager_id = NULL;
```

Understanding `NULL` prevents many SQL mistakes.

---

# 10. Sorting

Use `ORDER BY` to sort results.

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC;
```

Learn:

- Ascending
- Descending
- Multiple sort columns

---

# 11. LIMIT

Use `LIMIT` to restrict returned rows in databases that support it.

```sql
SELECT *
FROM employees
LIMIT 10;
```

Different database systems may use different syntax for limiting rows.

Understand the concept:

**Return only the amount of data I need.**

---

# 12. DISTINCT

Use `DISTINCT` to remove duplicate result values.

```sql
SELECT DISTINCT department
FROM employees;
```

Don't use it automatically.

Understand why duplicates are appearing first.

---

# 13. Aliases

Aliases give columns or tables temporary names.

Example:

```sql
SELECT
    name AS employee_name,
    salary AS annual_salary
FROM employees;
```

Aliases make complex queries easier to read.

---

# 14. Calculated Columns

SQL can calculate values while querying.

```sql
SELECT
    name,
    salary,
    salary * 12 AS annual_salary
FROM employees;
```

Learn:

- Arithmetic expressions
- Aliases
- Derived values

---

# 15. Aggregate Functions

Aggregate functions summarize multiple rows.

Learn:

- `COUNT()`
- `SUM()`
- `AVG()`
- `MIN()`
- `MAX()`

Example:

```sql
SELECT AVG(salary)
FROM employees;
```

These are essential for reporting and analytics.

---

# 16. GROUP BY

`GROUP BY` creates summaries by category.

Example:

```sql
SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department;
```

Think:

**Group the data → Calculate something for each group.**

---

# 17. HAVING

`HAVING` filters grouped results.

Example:

```sql
SELECT
    department,
    AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;
```

Remember:

- `WHERE` filters rows before grouping
- `HAVING` filters groups after aggregation

---

# 18. CASE

`CASE` creates conditional logic.

Example:

```sql
SELECT
    name,
    salary,
    CASE
        WHEN salary >= 70000 THEN 'High'
        WHEN salary >= 50000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_band
FROM employees;
```

`CASE` is extremely useful for reporting and data transformation.

---

# 19. JOINs

JOINs combine data from multiple tables.

Suppose you have:

```text
employees
departments
```

You can combine them:

```sql
SELECT
    e.name,
    d.department_name
FROM employees e
JOIN departments d
    ON e.department_id = d.id;
```

Learn these carefully:

- `INNER JOIN`
- `LEFT JOIN`
- `RIGHT JOIN`
- `FULL OUTER JOIN`

Not every database supports every join type in exactly the same way.

---

# 20. Understand JOIN Logic

Don't memorize JOIN syntax without understanding what it does.

Ask:

**Which table is the starting point?**

**How are the rows related?**

**What happens when there is no matching row?**

A useful mental model:

**JOIN = Match related rows between tables.**

---

# 21. Many-to-Many Relationships

Some relationships require a junction table.

Example:

```text
students
    ↓
student_courses
    ↓
courses
```

Learn:

- One-to-one
- One-to-many
- Many-to-many
- Junction tables

This becomes important in application databases.

---

# 22. Subqueries

A subquery is a query inside another query.

Example:

```sql
SELECT name
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

Use subqueries when they make the logic clear.

Later, learn when a JOIN or CTE may be easier to understand.

---

# 23. Common Table Expressions

CTEs make complex queries easier to structure.

Example:

```sql
WITH department_stats AS (
    SELECT
        department,
        AVG(salary) AS average_salary
    FROM employees
    GROUP BY department
)
SELECT *
FROM department_stats;
```

Learn:

- `WITH`
- Named query steps
- Multiple CTEs
- Recursive CTEs later

Think of a CTE as a temporary named result used by a larger query.

---

# 24. Window Functions

Window functions perform calculations across related rows without collapsing them into one row per group.

Example:

```sql
SELECT
    name,
    department,
    salary,
    RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS salary_rank
FROM employees;
```

Learn:

- `OVER()`
- `PARTITION BY`
- `ORDER BY`
- `ROW_NUMBER()`
- `RANK()`
- `DENSE_RANK()`
- Running totals
- Moving calculations

Window functions are especially important for analytics.

---

# 25. Date & Time

Real data frequently contains dates and timestamps.

Learn:

- Dates
- Times
- Timestamps
- Date arithmetic
- Date differences
- Extracting date parts
- Time zones

Exact functions vary between database systems.

Always check the documentation for your database.

---

# 26. Text Functions

Learn common text operations:

- Concatenation
- Uppercase
- Lowercase
- Trimming
- Replacement
- Searching
- Splitting where supported

Text functions are useful for cleaning and transforming data.

---

# 27. INSERT

`INSERT` adds data.

Example:

```sql
INSERT INTO employees (name, department, salary)
VALUES ('Alex', 'Finance', 55000);
```

Understand:

- Required columns
- Optional columns
- Default values
- Constraints

---

# 28. UPDATE

`UPDATE` changes existing data.

Example:

```sql
UPDATE employees
SET salary = 58000
WHERE id = 4;
```

**Always check the `WHERE` condition.**

An incorrect `UPDATE` can change many rows.

---

# 29. DELETE

`DELETE` removes rows.

Example:

```sql
DELETE FROM employees
WHERE id = 4;
```

Again:

**Always understand which rows will be affected before executing a DELETE.**

---

# 30. Transactions

A transaction groups related database operations.

Understand:

- `BEGIN`
- `COMMIT`
- `ROLLBACK`

The goal is to keep related changes consistent.

Learn the basic idea of **ACID**:

- Atomicity
- Consistency
- Isolation
- Durability

---

# 31. Constraints

Constraints help protect data quality.

Learn:

- `PRIMARY KEY`
- `FOREIGN KEY`
- `NOT NULL`
- `UNIQUE`
- `CHECK`
- `DEFAULT`

Constraints prevent invalid data from entering the database.

---

# 32. Database Design

Good SQL depends on good data design.

Learn:

- Entities
- Attributes
- Relationships
- Keys
- Normalization
- Denormalization

Understand why data is split across tables.

---

# 33. Normalization

Normalization reduces unnecessary duplication and improves data integrity.

Start with:

- First Normal Form
- Second Normal Form
- Third Normal Form

You don't need to memorize every rule immediately.

Understand the central idea:

**Store each piece of information in an appropriate place and connect related data using keys.**

---

# 34. Indexes

Indexes help databases find data efficiently.

Think of an index like the index of a book.

Instead of scanning every row, the database can use an index to locate relevant rows more efficiently.

Learn:

- What an index is
- When indexes help
- Index trade-offs
- Composite indexes
- Unique indexes

Indexes also consume storage and can make writes more expensive.

---

# 35. Query Performance

A query that works is not necessarily a good query.

Learn to investigate:

- Full table scans
- Index usage
- Join performance
- Large result sets
- Expensive sorting
- Repeated calculations

Learn how to read an execution plan.

---

# 36. EXPLAIN

Many databases provide an `EXPLAIN` command or equivalent.

Use it to understand how the database plans to execute a query.

Learn to ask:

**How is the database accessing the data?**

**Which operations are expensive?**

**Are indexes being used appropriately?**

---

# 37. SQL Security

SQL must be written safely.

Learn:

- Parameterized queries
- SQL injection
- Least privilege
- Database users
- Roles
- Permissions
- Secrets management

Never build SQL by blindly concatenating untrusted user input.

---

# 38. SQL in Applications

SQL is often used through programming languages.

Typical flow:

**Application → Database Driver → SQL → Database → Result → Application**

Learn how SQL is used from:

- Python
- JavaScript / TypeScript
- Java
- C#
- Other application languages

This is where SQL becomes part of real software systems.

---

# 39. SQL for Data Analysis

If your goal is analytics, prioritize:

**SELECT**

↓

**WHERE**

↓

**GROUP BY**

↓

**JOINs**

↓

**CASE**

↓

**CTEs**

↓

**Window Functions**

↓

**Date & Time**

↓

**Data Cleaning**

↓

**Business Metrics**

Then combine SQL with:

- Excel
- Power BI
- Python
- Data visualization

→ [Data Analyst Career](../careers/data-analyst.md)

---

# 40. SQL for Data Engineering

If your goal is data engineering, expand into:

- Advanced SQL
- Data modeling
- ETL / ELT
- Data warehouses
- Data lakes
- Pipelines
- Partitioning
- Performance
- Orchestration

SQL remains a core skill even when your data platform becomes very large.

→ [Data Engineer Career](../careers/data-engineer.md)

---

# 41. SQL for Backend Development

If your goal is application development, focus on:

- Database design
- CRUD
- Relationships
- Transactions
- Constraints
- Indexes
- Query performance
- Security
- Application integration

Then learn how your chosen programming language communicates with the database.

→ [Developer Career](../careers/developer.md)

---

# 42. Choose a Database to Practice

For beginners, start with one relational database.

Good options include:

### SQLite

Excellent for learning and small local projects.

### PostgreSQL

A strong choice for learning production-oriented relational database concepts.

### MySQL

Widely used and suitable for learning relational databases and SQL.

Don't install every database at once.

Pick one.

Learn SQL concepts first.

---

# 43. SQL Tools

You can work with SQL through:

- Database command-line tools
- Database GUI clients
- IDE extensions
- Cloud database platforms

The tool matters less than understanding the SQL you are writing.

---

# Beginner Practice

Start with simple questions.

Given an `employees` table:

- How many employees are there?
- What is the average salary?
- Who earns more than 60000?
- Which departments exist?
- How many employees are in each department?
- Which department has the highest average salary?
- Who is the highest-paid employee?

Then add another table.

Ask:

- Which employee belongs to which department?
- Which departments have no employees?
- Which employees have missing information?

---

# Intermediate Practice

Work with a small business database containing:

```text
customers
orders
products
order_items
```

Answer questions such as:

- Total sales
- Sales by customer
- Sales by product
- Sales by month
- Top customers
- Top products
- Average order value
- Customers with no orders

This forces you to use JOINs and aggregation.

---

# Your SQL Project

Build a small **Sales Analytics Database**.

Create:

```text
customers
products
orders
order_items
```

Then:

1. Design the tables
2. Add primary keys
3. Add foreign keys
4. Insert sample data
5. Write basic queries
6. Create JOINs
7. Calculate sales
8. Group results
9. Add CTEs
10. Use window functions
11. Add indexes
12. Examine query performance
13. Document the database

This project demonstrates practical SQL ability.

---

# Use AI While Learning SQL

AI can help you:

- Explain SQL queries
- Generate practice datasets
- Create exercises
- Explain JOINs
- Review queries
- Find syntax errors
- Suggest alternative queries
- Explain execution plans

A strong learning pattern is:

**Write the query → Run it → Inspect the result → Think → Ask AI → Improve**

Don't simply ask AI to write every query.

You need to develop the ability to reason about data yourself.

---

# Common SQL Mistakes

### Using `SELECT *` Everywhere

Select the columns you actually need.

### Forgetting `WHERE`

Especially dangerous with `UPDATE` and `DELETE`.

### Confusing WHERE and HAVING

Remember:

**WHERE → rows**

**HAVING → groups**

### Incorrect JOINs

Understand the relationship before writing the JOIN.

### Ignoring NULL

`NULL` requires special handling.

### Using DISTINCT to Hide Problems

First understand why duplicates exist.

### No Index Strategy

Indexes should support real query patterns.

### Ignoring Security

Never trust raw user input in SQL.

### Learning Syntax Without Data Thinking

SQL is fundamentally about asking useful questions of data.

---

# When Are You Ready to Move On?

You should be able to:

- Explain what a relational database is
- Understand tables and relationships
- Write SELECT queries
- Filter and sort results
- Use aggregate functions
- Use GROUP BY
- Use HAVING
- Write JOINs
- Use CASE
- Write subqueries
- Use CTEs
- Use basic window functions
- Insert data
- Update data safely
- Delete data safely
- Understand transactions
- Use constraints
- Understand indexes
- Read basic execution plans
- Avoid SQL injection
- Build a small database project

If you can do these things, SQL can become a serious professional skill.

---

# SQL Career Connections

| Career | SQL Importance |
|---|---|
| Data Analyst | Essential |
| Data Engineer | Essential |
| Developer | Very important |
| Software Engineer | Very important |
| ML Engineer | Important |
| AI Engineer | Useful |
| Cloud & DevOps | Useful |
| Cybersecurity | Useful |
| Software Testing & QA | Useful |

SQL is one of the most transferable technical skills because data exists almost everywhere.

---

# Don't Try to Learn Everything

You don't need to master:

- Every database
- Every SQL dialect
- Every advanced optimization technique
- Database administration
- Distributed databases
- Every analytical function

Start with:

**One database + Core SQL + Real data + Projects**

Then expand.

---

# Your SQL Sequence

A practical progression is:

**Database Basics**

↓

**SELECT & Filtering**

↓

**Sorting & Aggregation**

↓

**GROUP BY & HAVING**

↓

**JOINs**

↓

**CASE & Subqueries**

↓

**CTEs**

↓

**Window Functions**

↓

**INSERT / UPDATE / DELETE**

↓

**Transactions & Constraints**

↓

**Database Design**

↓

**Indexes & Performance**

↓

**Security**

↓

**Real Projects**

↓

**Career Specialization**

---

# The Learn with Nelson System

Use this roadmap together with the rest of the ecosystem:

| Layer | Purpose |
|---|---|
| **Roadmap** | WHAT |
| **Article** | LEARN |
| **GitHub** | DO |
| **Projects** | PROVE |
| **AI at Work** | WORK SMARTER |

The roadmap gives you direction.

The tutorials teach the concepts.

GitHub gives you practice.

Projects prove that you can apply what you learned.

AI helps you learn and work more effectively.

---

## What You Now Know

SQL is not just a collection of commands.

You now have a map covering:

**Databases**

**Tables**

**Keys**

**SELECT**

**WHERE**

**Sorting**

**Aggregation**

**GROUP BY**

**HAVING**

**CASE**

**JOINs**

**Subqueries**

**CTEs**

**Window Functions**

**Data Modification**

**Transactions**

**Constraints**

**Database Design**

**Indexes**

**Performance**

**Security**

**Projects**

You don't need to master everything immediately.

Start querying real data.

---

## Where Should You Go Next?

**New to programming?**

→ [Programming Fundamentals](programming-fundamentals.md)

**Want to learn Python?**

→ [Python Roadmap](python.md)

**Want to become a Data Analyst?**

→ [Data Analyst Career](../careers/data-analyst.md)

**Want to become a Data Engineer?**

→ [Data Engineer Career](../careers/data-engineer.md)

**Want to build applications?**

→ [Developer Career](../careers/developer.md)

**Want to become a Software Engineer?**

→ [Software Engineer Career](../careers/software-engineer.md)

---

[← Back to Topic Roadmaps](index.md)

[← Back to All Roadmaps](../index.md)
