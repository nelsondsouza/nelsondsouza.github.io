# Power BI Roadmap

> A beginner-friendly path from your first dataset to interactive reports, dashboards, data models, and decision-ready insights with Power BI.

## 1. Start Here

Power BI is Microsoft's business intelligence platform for connecting to data, transforming it, modeling it, analyzing it, and creating interactive reports.

A simple mental model is:

**Connect → Clean → Model → Calculate → Visualize → Share**

You do not need to learn every Power BI feature.

Start with the fundamentals and build one useful report at a time.

---

## 2. What You Need Before Power BI

Helpful prerequisites:

- Basic computer skills
- Basic Excel knowledge
- Understanding of tables and rows
- Basic arithmetic
- Basic understanding of data

Helpful but not required:

- SQL
- Statistics
- Database concepts

If you are completely new to data, learn Excel first.

---

## 3. Understand Power BI

Know the main components:

### Power BI Desktop

Used to:

- Connect to data
- Transform data
- Build data models
- Create reports
- Write DAX
- Design visuals

### Power BI Service

Used to:

- Publish reports
- Share content
- Manage workspaces
- Create dashboards
- Configure refresh
- Collaborate

### Power BI Mobile

Used to:

- View reports
- Monitor dashboards
- Interact with published content

Your first focus should be **Power BI Desktop**.

---

## 4. Learn the Basic Workflow

A typical Power BI project follows:

**1. Understand the business question**

**2. Connect to data**

**3. Transform the data**

**4. Build the data model**

**5. Create measures**

**6. Build visuals**

**7. Validate results**

**8. Publish**

**9. Share securely**

**10. Maintain and refresh**

Learn this workflow before learning advanced features.

---

## 5. Connect to Data

Power BI can connect to many sources.

Start with:

- Excel
- CSV
- Text files
- Folders

Then explore:

- SQL databases
- Web sources
- APIs
- Cloud services
- Data warehouses
- Other business systems

Before connecting, ask:

- Where does the data come from?
- Who owns it?
- How often does it change?
- Is it trustworthy?
- What does each field mean?

---

## 6. Power Query

Power Query is used to connect to and transform data.

Learn:

- Importing data
- Selecting columns
- Removing columns
- Filtering rows
- Renaming fields
- Changing data types
- Replacing values
- Splitting columns
- Merging columns
- Appending tables
- Removing duplicates
- Handling errors
- Grouping data
- Pivoting
- Unpivoting

The basic idea is:

**Get data → Transform data → Load data**

### Important principle

Keep transformations repeatable.

If you have to manually clean the same dataset every week, look for a Power Query solution.

---

## 7. Data Types

Correct data types matter.

Learn the difference between:

- Text
- Whole number
- Decimal number
- Fixed decimal
- Date
- Date/time
- Time
- Boolean

Incorrect data types can cause:

- Wrong calculations
- Incorrect sorting
- Unexpected filtering
- Relationship problems
- Poor performance

Always check data types after importing data.

---

## 8. Data Cleaning

Before building visuals, inspect the data.

Look for:

- Blank values
- Duplicates
- Invalid dates
- Incorrect categories
- Wrong data types
- Unexpected values
- Missing relationships
- Inconsistent naming

Ask:

**Is the data wrong, or is the value unusual but valid?**

Do not remove data simply because it looks unusual.

---

## 9. Understand Data Modeling

A Power BI report is much easier to maintain when the underlying model is well designed.

Learn:

- Tables
- Relationships
- Primary keys
- Foreign keys
- Cardinality
- Filter direction
- Fact tables
- Dimension tables
- Measures
- Calculated columns

The most useful beginner model is usually a **star schema**.

---

## 10. Star Schema

A simple star schema contains:

**Fact table**

Stores events or measurements.

Example:

- Sales
- Quantity
- Cost
- Revenue

**Dimension tables**

Describe those events.

Example:

- Date
- Product
- Customer
- Region

Mental model:

**Dimensions describe → Facts measure**

A good model makes reporting and DAX easier.

---

## 11. Understand Grain

Grain means:

> What does one row represent?

For example:

> One row = one sales order line

This is one of the most important questions in analytics.

If you do not understand the grain, you can easily:

- Double-count values
- Build incorrect measures
- Create incorrect relationships
- Misinterpret results

Always identify the grain before analyzing data.

---

## 12. Relationships

Learn:

- One-to-many relationships
- Many-to-many relationships
- Active relationships
- Inactive relationships
- Filter propagation
- Relationship direction

Begin with simple one-to-many relationships.

Avoid complicated many-to-many models until you understand why they are needed.

---

## 13. Calculated Columns vs Measures

This distinction is essential.

### Calculated column

Calculated for each row.

Useful when you need a value stored at row level.

### Measure

Calculated when a report evaluates it in a particular filter context.

Useful for:

- Totals
- Ratios
- KPIs
- Dynamic calculations

For analytical reporting, learn to prefer **measures** when the calculation should respond dynamically to filters.

---

## 14. DAX Fundamentals

DAX is the formula language used by Power BI.

Start with:

- Measures
- Calculated columns
- Variables
- Basic aggregation
- Filter context
- Row context

Useful functions:

- `SUM`
- `AVERAGE`
- `COUNT`
- `DISTINCTCOUNT`
- `MIN`
- `MAX`
- `DIVIDE`
- `IF`
- `SWITCH`

Do not memorize hundreds of functions.

Understand how evaluation context works.

---

## 15. Filter Context

Filter context is one of the most important DAX concepts.

A measure can produce different results depending on:

- Page filters
- Visual filters
- Slicers
- Rows and columns in a visual
- Relationships

Example:

A total sales measure may show:

**All regions → total sales**

but when a user selects:

**West → West sales**

The same measure can return a different result because the filter context changed.

---

## 16. Core DAX Patterns

After the basics, learn patterns such as:

- Percent of total
- Year-to-date
- Month-to-date
- Previous period
- Year-over-year growth
- Running totals
- Moving averages
- Ranking
- Variance
- Conditional KPIs

Useful functions to explore:

- `CALCULATE`
- `FILTER`
- `ALL`
- `REMOVEFILTERS`
- `VALUES`
- `SELECTEDVALUE`
- `DATEADD`
- `TOTALYTD`
- `RANKX`

Learn these through business questions rather than memorizing syntax.

---

## 17. Date Tables

Time-based analysis needs a reliable date dimension.

Learn:

- Date table
- Calendar
- Year
- Quarter
- Month
- Week
- Fiscal periods
- Sort columns
- Relationships to fact tables

Use a dedicated date table when building serious time-based reports.

---

## 18. Build Your First Visuals

Start simple.

Learn:

- Cards
- Tables
- Matrix
- Bar charts
- Column charts
- Line charts
- Area charts
- Scatter charts
- Maps where appropriate

Choose a visual based on the question.

Do not start with complicated visuals.

---

## 19. Slicers and Filters

Learn:

- Visual-level filters
- Page-level filters
- Report-level filters
- Slicers
- Date slicers
- Relative date filtering

A good filter should help users answer a meaningful question.

Avoid giving users dozens of unnecessary filter options.

---

## 20. Report Pages

Design reports around user questions.

Example:

### Page 1 — Executive Summary

- Revenue
- Cost
- Margin
- Trend
- Key exceptions

### Page 2 — Performance

- Product
- Region
- Customer
- Monthly trend

### Page 3 — Detail

- Transaction-level table
- Drill-through
- Supporting information

Each page should have a clear purpose.

---

## 21. Dashboard Design

A good report is not a collection of charts.

Learn:

- Visual hierarchy
- Alignment
- Spacing
- Consistency
- Clear titles
- Appropriate number formats
- Meaningful comparisons
- Limited visual noise

Use emphasis to direct attention to what matters.

---

## 22. Drill-Down and Drill-Through

Learn the difference.

### Drill-down

Move through levels within a visual.

Example:

**Year → Quarter → Month → Day**

### Drill-through

Move to another page containing detailed information about a selected item.

Example:

**Region → Region Detail**

These features help users investigate without overcrowding the main report.

---

## 23. Tooltips and Interactions

Learn:

- Report tooltips
- Visual interactions
- Cross-filtering
- Cross-highlighting
- Bookmarks

Use these features to provide context.

Do not add interactions simply because they are available.

---

## 24. Performance Basics

A report that looks good but loads slowly is still a poor report.

Learn to watch:

- Model size
- Number of columns
- High-cardinality fields
- Unnecessary calculated columns
- Complex DAX
- Excessive visuals
- Poor data types
- Unnecessary relationships

Helpful tools include:

- Performance Analyzer
- DAX Studio
- Model view

Start with a clean model before trying advanced optimization.

---

## 25. Publish to Power BI Service

Once your report works in Desktop:

**Publish → Workspace**

Learn:

- Workspaces
- Reports
- Semantic models
- Dashboards
- Apps
- Sharing

Understand the difference between developing a report and distributing it.

---

## 26. Data Refresh

A report is only useful if the data stays current.

Learn:

- Manual refresh
- Scheduled refresh
- Refresh failures
- Data source credentials
- Gateways
- Incremental refresh concepts

Understand:

**Refresh the data model → Report reflects updated data**

Design refresh processes deliberately.

---

## 27. Security

Learn the basics of:

- Workspace permissions
- Sharing permissions
- Row-Level Security (RLS)
- Data access
- Sensitivity considerations

### Row-Level Security

RLS can restrict which rows a user is allowed to see.

Example:

**Regional Manager → only their region**

Security should be designed before distributing sensitive reports.

---

## 28. Governance

Professional Power BI environments need governance.

Understand:

- Workspace structure
- Naming standards
- Ownership
- Certified content
- Deployment practices
- Documentation
- Access management
- Data lineage

A report that nobody can maintain is not a successful analytics solution.

---

## 29. Deployment and Lifecycle

As your skills grow, learn:

- Development environments
- Test environments
- Production environments
- Deployment pipelines
- Version control concepts
- Change management
- Release practices

Not every beginner needs these immediately.

Learn them when working with shared or enterprise reporting.

---

## 30. Power BI + SQL

A common professional workflow is:

**SQL database → Power Query → Power BI model → DAX → Report**

SQL helps retrieve and prepare data.

Power BI helps model, analyze, visualize, and distribute it.

Learn both as complementary skills.

---

## 31. Power BI + Excel

Excel and Power BI complement each other.

Use Excel for:

- Quick analysis
- Small datasets
- Ad hoc work
- Manual modeling when appropriate

Use Power BI for:

- Interactive reporting
- Reusable dashboards
- Larger models
- Centralized reporting
- Scheduled refresh

Knowing when to use each tool is more important than choosing one permanently.

---

## 32. Power BI + Python

Python can support:

- Advanced data preparation
- Statistical analysis
- Automation
- Specialized analytics

Do not introduce Python into a report unless it adds real value.

---

## 33. Common Beginner Mistakes

Avoid:

- Importing everything without understanding it
- Building visuals before modeling data
- Ignoring the grain
- Creating excessive calculated columns
- Writing complicated DAX too early
- Using many-to-many relationships without understanding them
- Creating too many visuals
- Using decorative charts
- Ignoring filter context
- Mixing unrelated data into one table
- Sharing reports without checking permissions
- Treating a dashboard as a data model
- Ignoring refresh failures

---

## 34. Practice Projects

### Project 1 — Sales Dashboard

Create:

- Sales
- Quantity
- Profit
- Product
- Region
- Monthly trend

Build:

- KPI cards
- Trend chart
- Product chart
- Regional analysis
- Slicers

Skills:

**Power Query → Model → DAX → Visuals**

### Project 2 — Project Performance Dashboard

Track:

- Project
- Planned progress
- Actual progress
- Budget
- Actual cost
- Variance
- Forecast
- Status

Build:

- Executive summary
- Cost view
- Schedule view
- Progress view
- Detail page

Skills:

**Data modeling → Measures → KPIs → Drill-through**

### Project 3 — Management Reporting Model

Create a reusable reporting model with:

- Date dimension
- Fact table
- Multiple dimensions
- Standard measures
- Executive report
- Detailed report
- Refresh process

Skills:

**Star schema → DAX → Reporting → Governance**

---

## 35. Use AI With Power BI

AI can help you:

- Explain DAX
- Debug formulas
- Suggest data transformations
- Explain relationships
- Generate practice datasets
- Review a data model
- Suggest dashboard layouts
- Explain errors
- Create learning exercises
- Document measures

A useful prompt includes:

- Business question
- Table names
- Column names
- Relationships
- Expected result

Always validate AI-generated DAX against known results.

---

## 36. What to Learn First

If you are completely new:

1. Power BI Desktop
2. Import Excel/CSV data
3. Power Query
4. Data types
5. Data cleaning
6. Tables and relationships
7. Star schema
8. Basic measures
9. Basic DAX
10. Filter context
11. Charts
12. Slicers
13. Report design
14. Date tables
15. Time intelligence
16. Power BI Service
17. Refresh
18. Security
19. Performance
20. Governance

Do not start with advanced DAX.

---

## 37. Career Connections

### Data Analyst

Focus on:

**Power Query → SQL → Modeling → DAX → Visualization → Insights**

### Business Analyst

Focus on:

**Business questions → KPIs → Reports → Decision support**

### Project Controls

Focus on:

**Progress → Cost → Variance → Forecast → Management dashboards**

### Planning & Scheduling

Focus on:

**Schedule data → Progress → Trends → Delays → Forecast → Reporting**

### Cost & Commercial

Focus on:

**Budget → Commitments → Actuals → Variance → Forecast → Dashboards**

### Management / Operations

Focus on:

**KPIs → Trends → Exceptions → Drill-down → Decisions**

---

## 38. Beginner-to-Advanced Sequence

### Level 1 — Power BI Basics

Learn:

- Desktop
- Data sources
- Basic visuals
- Filters

### Level 2 — Power Query

Learn:

- Cleaning
- Transformations
- Combining data
- Refreshable workflows

### Level 3 — Data Modeling

Learn:

- Relationships
- Fact tables
- Dimensions
- Star schema
- Grain

### Level 4 — DAX

Learn:

- Measures
- Context
- `CALCULATE`
- Time intelligence
- KPI calculations

### Level 5 — Report Design

Learn:

- Layout
- Visual selection
- Slicers
- Drill-through
- Tooltips

### Level 6 — Power BI Service

Learn:

- Workspaces
- Publishing
- Sharing
- Refresh

### Level 7 — Professional Power BI

Learn:

- RLS
- Performance
- Governance
- Deployment
- Lifecycle management

### Level 8 — Enterprise Analytics

Connect Power BI with:

- SQL
- Data warehouses
- Cloud data
- Enterprise semantic models
- Other BI/data platforms

---

## 39. Your First Power BI Workflow

Use this process:

**1. Define the question**

What decision should the report support?

**2. Identify the data**

Which sources contain the required information?

**3. Inspect**

Understand tables, fields, and grain.

**4. Transform**

Clean and prepare data with Power Query.

**5. Model**

Create relationships and a sensible schema.

**6. Calculate**

Create measures for required metrics.

**7. Visualize**

Choose visuals that answer the questions.

**8. Validate**

Compare results against trusted totals.

**9. Design**

Make the report clear and usable.

**10. Publish**

Move the report to the Power BI Service.

**11. Secure**

Control access to sensitive data.

**12. Maintain**

Monitor refreshes, performance, and changes.

---

## 40. You Are Ready When You Can

You are ready to move forward when you can:

- Import data
- Clean data with Power Query
- Explain the grain of a table
- Build a basic star schema
- Create relationships
- Create simple measures
- Explain basic filter context
- Build useful visuals
- Create interactive report pages
- Use slicers
- Build a basic dashboard
- Publish a report
- Configure or understand refresh
- Apply basic security concepts
- Explain your findings to a non-technical user

---

## 41. What You Now Know

You now have a path from:

**Data Source → Power Query → Data Model → DAX → Visuals → Report → Power BI Service**

The goal is not to create the most complicated report.

The goal is to create a report that is:

**Correct → Clear → Useful → Maintainable → Secure**

---

## 42. Next

Continue with related Learn with Nelson roadmaps:

- Excel
- SQL
- Data Engineering
- Python
- Cloud
- Project Controls
- Planning & Scheduling
- Cost & Commercial Management

Then follow:

**Learn → Practice → Build → Prove → Apply**

---

## One-Line Mental Model

**Power BI turns connected data into interactive, reusable decision-support reports.**
