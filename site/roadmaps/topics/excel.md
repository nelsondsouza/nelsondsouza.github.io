# Excel Roadmap

> A beginner-friendly path from opening Excel for the first time to building useful, reliable spreadsheets, dashboards, and analysis.

## 1. Start Here

Excel is a spreadsheet tool for storing, calculating, analyzing, and presenting information.

You do **not** need to learn every Excel feature.

Start with this path:

**Cells → Data → Formulas → Functions → Tables → Charts → Analysis → Dashboards → Automation**

---

## 2. What You Need Before Excel

You only need:

- Basic computer skills
- Ability to use a keyboard and mouse
- Curiosity about working with data
- A willingness to practice

Helpful but not required:

- Basic arithmetic
- Understanding rows and columns
- A sample dataset to practice with

---

## 3. Understand the Excel Interface

Learn these first:

- Workbook
- Worksheet
- Row
- Column
- Cell
- Cell address
- Range
- Formula bar
- Ribbon
- Sheet tabs
- Name box
- Status bar

### The key idea

A **workbook** contains worksheets.

A worksheet contains cells.

Cells are identified by addresses such as:

`A1`, `B5`, `D10`

---

## 4. Enter and Organize Data

Learn how to work with:

- Text
- Numbers
- Dates
- Times
- Percentages
- Currency
- Blank cells
- Labels
- Headers

Practice:

- Entering data
- Editing data
- Copying and pasting
- Dragging the fill handle
- Inserting and deleting rows
- Inserting and deleting columns
- Adjusting column widths
- Freezing panes

### Good habit

Keep your raw data organized as a simple rectangular table:

**One row = one record**

**One column = one field**

---

## 5. Formatting

Learn formatting after you understand the data.

Important skills:

- Font formatting
- Alignment
- Number formats
- Date formats
- Currency formats
- Percentage formats
- Borders
- Cell styles
- Conditional formatting
- Format Painter

Do not use formatting to hide poor data structure.

---

## 6. Formulas: The Foundation

Every Excel formula starts with:

`=`

Learn:

- Addition
- Subtraction
- Multiplication
- Division
- Order of operations
- Cell references
- Range references

Examples:

`=A2+B2`

`=B2*C2`

`=SUM(B2:B10)`

### Relative references

`A1`

Changes when copied.

### Absolute references

`$A$1`

Stays fixed when copied.

### Mixed references

`$A1`

or

`A$1`

These become important when building reusable formulas.

---

## 7. Essential Functions

Start with the functions you will use repeatedly.

### Basic calculations

- `SUM`
- `AVERAGE`
- `MIN`
- `MAX`
- `COUNT`
- `COUNTA`

### Logic

- `IF`
- `IFS`
- `AND`
- `OR`
- `NOT`

### Conditional calculations

- `SUMIF`
- `SUMIFS`
- `COUNTIF`
- `COUNTIFS`
- `AVERAGEIF`
- `AVERAGEIFS`

### Error handling

- `IFERROR`

### Text

- `LEFT`
- `RIGHT`
- `MID`
- `LEN`
- `TRIM`
- `UPPER`
- `LOWER`
- `TEXTJOIN`

### Modern lookup and reference functions

- `XLOOKUP`
- `INDEX`
- `MATCH`

Learn the concept behind a function before memorizing its syntax.

---

## 8. Work With Dates

Dates appear everywhere in real-world spreadsheets.

Learn:

- Date values
- Date arithmetic
- `TODAY`
- `NOW`
- `YEAR`
- `MONTH`
- `DAY`
- `WEEKDAY`
- `EDATE`
- `EOMONTH`
- Working-day calculations
- Date filtering

Practice with:

- Deadlines
- Project schedules
- Sales dates
- Invoice dates
- Monthly reporting

---

## 9. Excel Tables

Convert structured data into an Excel Table.

Learn:

- Creating tables
- Table headers
- Structured references
- Sorting
- Filtering
- Total Row
- Calculated columns
- Table expansion

Why tables matter:

- They make data easier to manage.
- Formulas can fill automatically.
- Filters are built in.
- Charts and analysis become easier to maintain.

---

## 10. Sorting and Filtering

Learn to:

- Sort one column
- Sort multiple columns
- Filter values
- Filter dates
- Filter text
- Filter numbers
- Filter blanks
- Use custom filters

Also understand the difference between:

**Sorting** = changing order

**Filtering** = temporarily showing only selected records

---

## 11. Data Cleaning

Real-world data is rarely perfect.

Learn to handle:

- Duplicate records
- Blank values
- Extra spaces
- Inconsistent spelling
- Incorrect data types
- Dates stored as text
- Numbers stored as text
- Inconsistent categories

Useful tools/functions:

- Remove Duplicates
- Find & Replace
- Text to Columns
- Flash Fill
- `TRIM`
- `CLEAN`
- `VALUE`
- `TEXT`

### Rule

Clean the data before trusting the analysis.

---

## 12. Data Validation

Use Data Validation to control what users can enter.

Learn:

- Drop-down lists
- Number restrictions
- Date restrictions
- Input messages
- Error alerts

Useful for:

- Status fields
- Categories
- Departments
- Priority
- Yes/No fields

---

## 13. Charts

Start with simple charts.

Learn:

- Column charts
- Bar charts
- Line charts
- Pie charts
- Area charts
- Scatter charts

Choose a chart based on the question.

Examples:

- Compare categories → Bar/Column
- Show trends → Line
- Show relationships → Scatter
- Show composition → Stacked charts

Avoid charts that make the data harder to understand.

---

## 14. PivotTables

PivotTables are one of Excel's most useful analysis tools.

Learn:

- Rows
- Columns
- Values
- Filters
- Grouping
- Summarization
- Sorting
- Filtering
- Calculated fields where appropriate
- PivotCharts
- Slicers

Practice questions such as:

- What are total sales by region?
- Which products perform best?
- What is the monthly trend?
- Which department has the highest cost?

---

## 15. Conditional Formatting

Use conditional formatting to make patterns visible.

Learn:

- Highlight rules
- Data bars
- Color scales
- Icon sets
- Formula-based rules

Use it for:

- Variance
- Status
- Exceptions
- Thresholds
- Performance indicators

Do not overload a sheet with visual effects.

---

## 16. Data Import and Power Query

When your data comes from elsewhere, learn Power Query.

Understand:

**Connect → Transform → Load**

Learn to:

- Import CSV files
- Import Excel files
- Combine files
- Remove columns
- Rename columns
- Change data types
- Split columns
- Merge queries
- Append queries
- Remove duplicates
- Filter rows
- Refresh data

Power Query is especially useful when the same cleanup process must be repeated.

---

## 17. Data Model and Power Pivot

After becoming comfortable with Excel analysis, learn the Data Model.

Understand:

- Tables
- Relationships
- Fact tables
- Dimension tables
- Measures
- Basic DAX concepts
- Power Pivot

Do not start here.

First become comfortable with normal Excel tables, formulas, and PivotTables.

---

## 18. Dashboard Design

A dashboard turns analysis into a decision-making view.

Learn:

- KPI cards
- Charts
- PivotCharts
- Slicers
- Timeline filters
- Layout
- Visual hierarchy
- Consistent formatting
- Clear titles
- User-focused design

A good dashboard answers:

1. What happened?
2. Where did it happen?
3. Why might it have happened?
4. What needs attention?

---

## 19. What-If Analysis

Learn how to test possible outcomes.

Tools include:

- Goal Seek
- Scenario Manager
- Data Tables
- Solver where appropriate

Use cases:

- Budget scenarios
- Pricing
- Forecasting
- Resource planning
- Capacity planning

---

## 20. Forecasting and Analysis

Build toward analytical work.

Learn:

- Trends
- Variance
- Growth rates
- Percent change
- Moving averages
- Forecasting
- Basic statistics
- Correlation
- Sensitivity analysis

Always distinguish:

**Actual → Forecast → Target → Variance**

---

## 21. Collaboration and Protection

Learn:

- Comments
- Sharing
- Co-authoring
- Version history
- Sheet protection
- Workbook protection
- Locked cells
- Permissions

Understand that protection is not the same as strong security.

Avoid storing sensitive information in spreadsheets without understanding your organization's security requirements.

---

## 22. Automation

Once you understand Excel manually, automate repetitive work.

Explore:

- Excel macros
- VBA
- Office Scripts
- Power Automate
- Power Query refreshes

Automation should remove repetitive work, not hide poor processes.

---

## 23. Excel + Other Tools

Excel becomes more powerful when combined with other tools.

### Excel + Power BI

Prepare and analyze data in Excel, then build broader reporting in Power BI.

### Excel + SQL

Use SQL to retrieve structured data and Excel to explore or present it.

### Excel + Python

Use Python for advanced automation, analysis, and data processing when Excel alone becomes limiting.

### Excel + Power Automate

Automate workflows around files, approvals, notifications, and business processes.

---

## 24. Common Beginner Mistakes

Avoid these:

- Putting multiple values in one cell
- Using merged cells inside raw datasets
- Mixing headers with data
- Leaving inconsistent spellings
- Hard-coding numbers inside formulas unnecessarily
- Using too many nested formulas
- Building dashboards before cleaning data
- Creating charts without a clear question
- Using manual copy-paste for repeatable processes
- Keeping multiple conflicting versions of the same workbook
- Ignoring formula errors
- Treating Excel as a database for workloads it was not designed to handle

---

## 25. Practice Projects

### Project 1 — Personal Expense Tracker

Build:

- Date
- Category
- Description
- Amount
- Payment method
- Monthly summary
- Category summary
- Chart

Skills:

**Tables → Formulas → SUMIFS → Charts**

### Project 2 — Sales Analysis

Build:

- Sales table
- Product analysis
- Regional analysis
- Monthly trend
- PivotTables
- PivotCharts
- Slicers

Skills:

**Cleaning → PivotTables → Charts → Dashboard**

### Project 3 — Project Reporting Dashboard

Build:

- Project
- Task
- Owner
- Status
- Planned date
- Actual date
- Budget
- Actual cost
- Variance
- Completion %

Then create:

- KPI summary
- Status view
- Schedule view
- Cost view
- Filters

Skills:

**Tables → Formulas → Conditional Formatting → PivotTables → Dashboard**

---

## 26. Use AI With Excel

AI can help you learn and work faster.

Use AI to:

- Explain formulas
- Build example formulas
- Debug formulas
- Explain Excel errors
- Suggest data-cleaning steps
- Generate practice datasets
- Explain PivotTables
- Suggest dashboard layouts
- Help document a workbook
- Convert a business question into an analysis plan

### Better prompt

Instead of:

> "Give me an Excel formula."

Ask:

> "I have sales in column D and region in column B. I want total sales for the West region. Explain the formula step by step and show a small example."

Always verify AI-generated formulas against your actual data.

---

## 27. What to Learn First

If you are completely new, do this in order:

1. Cells and ranges
2. Data entry
3. Basic formatting
4. Formulas
5. `SUM`, `AVERAGE`, `COUNT`
6. `IF`
7. `SUMIFS` and `COUNTIFS`
8. Tables
9. Sorting and filtering
10. Data cleaning
11. Charts
12. PivotTables
13. Conditional formatting
14. Power Query
15. Dashboards
16. Power Pivot / DAX
17. Automation

Do not try to master everything at once.

---

## 28. Career Connections

Excel is useful in many careers.

### Data Analyst

Focus on:

**Cleaning → Formulas → PivotTables → Charts → Dashboards → Power Query**

### Project Controls

Focus on:

**Schedules → Costs → Variance → Forecasts → Reporting → Dashboards**

### Planning & Scheduling

Focus on:

**Dates → Dependencies → Progress → Variance → Forecasting → Reporting**

### Cost & Commercial

Focus on:

**Budgets → Actuals → Commitments → Variance → Cash Flow → Forecasting**

### Finance

Focus on:

**Financial models → Forecasts → Variance → Scenario analysis → Controls**

### Operations

Focus on:

**Data → KPIs → Process reporting → Analysis → Automation**

### Business / Management

Focus on:

**KPIs → Trends → Dashboards → Decision support**

---

## 29. Beginner-to-Advanced Learning Sequence

### Level 1 — Spreadsheet Basics

Learn:

- Cells
- Rows
- Columns
- Formatting
- Basic formulas

### Level 2 — Formula Skills

Learn:

- Functions
- Logic
- Lookups
- Dates
- Text

### Level 3 — Structured Data

Learn:

- Tables
- Sorting
- Filtering
- Validation
- Cleaning

### Level 4 — Analysis

Learn:

- PivotTables
- PivotCharts
- Conditional formatting
- What-if analysis

### Level 5 — Data Transformation

Learn:

- Power Query
- Data Model
- Relationships

### Level 6 — Dashboards

Learn:

- KPIs
- Interactive charts
- Slicers
- Dashboard design

### Level 7 — Automation

Learn:

- VBA
- Office Scripts
- Power Automate
- Repeatable workflows

### Level 8 — Advanced Analytics

Connect Excel with:

- Power BI
- SQL
- Python
- Enterprise data sources

---

## 30. Your Excel Learning System

Use the Learn with Nelson system:

**Roadmap = WHAT**

Use this roadmap to understand what exists and what to learn next.

**Article = LEARN**

Read the detailed tutorial to understand concepts.

**GitHub = DO**

Follow examples and practice with files, formulas, and exercises.

**Projects = PROVE**

Build something real.

**AI at Work = WORK SMARTER**

Use AI to learn, automate, analyze, and improve your workflow.

---

## 31. Your First Excel Workflow

For your first real dataset:

**1. Understand the question**

What decision are you trying to support?

**2. Inspect the data**

What columns and records exist?

**3. Clean the data**

Fix duplicates, blanks, types, and inconsistencies.

**4. Structure the data**

Convert it into a proper Excel Table.

**5. Calculate**

Use formulas and functions.

**6. Analyze**

Use PivotTables and appropriate analysis.

**7. Visualize**

Create charts or a dashboard.

**8. Validate**

Check totals, formulas, filters, and assumptions.

**9. Communicate**

Explain the important result clearly.

**10. Automate**

Only after the process works reliably.

---

## 32. You Are Ready When You Can

You do not need to know every Excel feature.

You are ready to move forward when you can:

- Create a clean table
- Use formulas confidently
- Use common functions
- Work with dates
- Clean messy data
- Use lookups
- Build PivotTables
- Create useful charts
- Explain a result
- Build a simple dashboard
- Refresh imported data
- Check your work for errors

---

## 33. What You Now Know

You now have a complete path from:

**First Spreadsheet → Formulas → Functions → Structured Data → Analysis → Dashboards → Power Query → Data Model → Automation**

The goal is not to become an Excel feature collector.

The goal is to use Excel to **solve problems, analyze information, communicate insights, and improve work.**

---

## 34. Next

Continue with the next topic roadmap in the Learn with Nelson library.

Recommended related paths:

- Data Analyst
- Project Controls
- Planning & Scheduling
- Cost & Commercial
- Finance
- Business Analysis
- Operations

Then move from:

**Learn → Practice → Build → Prove → Apply**

---

## One-Line Mental Model

**Excel turns structured data into calculations, analysis, and decisions.**
