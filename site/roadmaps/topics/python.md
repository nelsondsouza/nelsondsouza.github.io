# Python Roadmap

**Learn Python from zero to building useful programs.**

Python is a general-purpose programming language used for:

- Automation
- Web development
- Data analysis
- Data engineering
- Machine learning
- Artificial intelligence
- Testing
- Scripting
- APIs
- Backend systems

You don't need to learn all of Python.

Learn the parts that support your goal.

---

## Before You Start

You should understand a few basic programming ideas:

- What code is
- Variables
- Data
- Conditions
- Loops
- Functions

If these are completely new, start with:

→ [Programming Fundamentals](programming-fundamentals.md)

You can still learn Python as your first programming language.

---

# Your Python Learning Path

Follow this general sequence:

**Setup → Syntax → Variables → Data Types → Conditions → Loops → Functions → Collections → Modules → Files → Errors → OOP → Packages → Testing → Git → Projects**

---

# 1. Install Python

Start by installing Python on your computer.

Understand:

- Python interpreter
- Python version
- PATH
- Terminal
- Python REPL
- `.py` files

Check that Python works:

```text
python --version
```

or, depending on your system:

```text
python3 --version
```

---

# 2. Choose Your Code Editor

You need somewhere to write Python.

Popular choices include:

- Visual Studio Code
- PyCharm
- JupyterLab

For general-purpose development, **Visual Studio Code** is a practical starting point.

Learn how to:

- Create a project folder
- Open the folder
- Create a Python file
- Run Python
- Read terminal output

---

# 3. Your First Python Program

Start with something simple:

```python
print("Hello, world!")
```

Understand:

- `print()`
- Strings
- Parentheses
- Python statements
- Running a Python file

Don't worry about advanced syntax yet.

---

# 4. Variables

Variables store information.

```python
name = "Nelson"
age = 30
```

Learn:

- Creating variables
- Updating variables
- Naming variables
- Assigning values
- Reading values

Good variable names make programs easier to understand.

---

# 5. Python Data Types

Learn the basic built-in types.

### String

```python
name = "Nelson"
```

### Integer

```python
age = 30
```

### Float

```python
price = 99.50
```

### Boolean

```python
is_active = True
```

Also understand:

- `None`
- Type conversion
- `type()`

---

# 6. Operators

Learn Python operators.

### Arithmetic

```text
+
-
*
/
%
**
//
```

### Comparison

```text
==
!=
>
<
>=
<=
```

### Logical

```text
and
or
not
```

Understand what each operator does before memorizing syntax.

---

# 7. Strings

Python is widely used for text processing.

Learn:

- String creation
- Indexing
- Slicing
- Concatenation
- String methods
- Formatting

Modern Python commonly uses f-strings:

```python
name = "Nelson"
message = f"Hello, {name}"
```

Learn useful operations such as:

- `.lower()`
- `.upper()`
- `.strip()`
- `.split()`
- `.replace()`

---

# 8. Conditions

Use conditions when a program needs to make decisions.

```python
if age >= 18:
    print("Adult")
else:
    print("Minor")
```

Learn:

- `if`
- `elif`
- `else`
- Boolean expressions
- Nested conditions

Python uses indentation to define code blocks.

---

# 9. Loops

Loops repeat work.

### For Loop

```python
for item in items:
    print(item)
```

### While Loop

```python
while condition:
    do_something()
```

Learn:

- `for`
- `while`
- `range()`
- `break`
- `continue`

Understand when each loop is appropriate.

---

# 10. Lists

Lists store multiple values.

```python
languages = ["Python", "JavaScript", "Java"]
```

Learn:

- Creating lists
- Indexing
- Slicing
- Adding items
- Removing items
- Updating items
- Iterating over lists

Important methods include:

- `append()`
- `extend()`
- `insert()`
- `remove()`
- `pop()`
- `sort()`

---

# 11. Tuples

Tuples are ordered collections that are generally used when the collection should not be modified.

```python
coordinates = (10, 20)
```

Learn:

- Creating tuples
- Indexing
- Unpacking

Understand when a tuple makes more sense than a list.

---

# 12. Dictionaries

Dictionaries store key-value pairs.

```python
person = {
    "name": "Nelson",
    "age": 30
}
```

Learn:

- Keys
- Values
- Accessing values
- Updating values
- Adding entries
- Removing entries
- Iterating over dictionaries

Dictionaries are extremely important in Python applications.

---

# 13. Sets

Sets store unique values.

```python
skills = {"Python", "SQL", "Git"}
```

Learn:

- Creating sets
- Adding values
- Removing values
- Membership testing
- Set operations

Understand why sets are useful when duplicates should not matter.

---

# 14. Functions

Functions allow you to create reusable logic.

```python
def greet(name):
    return f"Hello, {name}"
```

Learn:

- `def`
- Parameters
- Arguments
- Return values
- Default arguments
- Keyword arguments
- Scope

Functions are one of the most important Python concepts.

---

# 15. Scope

Understand where variables exist and can be accessed.

Learn:

- Local variables
- Global variables
- Function scope
- Parameters
- Return values

Prefer clear data flow over unnecessary global variables.

---

# 16. Comprehensions

Python provides concise ways to create collections.

For example:

```python
squares = [x * x for x in range(10)]
```

Learn:

- List comprehensions
- Dictionary comprehensions
- Set comprehensions

Use them when they improve readability.

Don't make code unnecessarily clever.

---

# 17. Modules

As programs grow, separate code into files.

Learn:

```python
import math
```

and:

```python
from pathlib import Path
```

Understand:

- Modules
- Imports
- Standard library
- Your own modules
- Import paths

---

# 18. Python Standard Library

Python includes many useful modules.

Explore:

- `pathlib`
- `os`
- `sys`
- `json`
- `csv`
- `datetime`
- `math`
- `statistics`
- `re`
- `collections`

Don't memorize the entire standard library.

Learn how to find and use the right module.

---

# 19. File Handling

Programs often need to read and write files.

Learn:

- Text files
- CSV
- JSON
- File paths
- Reading
- Writing
- Encoding

Modern Python commonly uses `pathlib` for working with paths.

Example:

```python
from pathlib import Path

file = Path("data.txt")
```

---

# 20. JSON

JSON is widely used by APIs and applications.

Example:

```json
{
  "name": "Nelson",
  "role": "Developer"
}
```

Python provides the `json` module.

Learn:

- JSON objects
- JSON arrays
- Loading JSON
- Saving JSON
- Converting between Python objects and JSON

---

# 21. Exceptions

Python programs can encounter errors.

Learn:

- `try`
- `except`
- `else`
- `finally`
- `raise`

Example:

```python
try:
    result = 10 / value
except ZeroDivisionError:
    print("Cannot divide by zero")
```

Don't use broad exception handling without understanding what you are catching.

---

# 22. Debugging

Learn to investigate problems systematically.

Use:

- Error messages
- Tracebacks
- Print statements
- Debugger
- Breakpoints
- Small test cases

A traceback is not your enemy.

It is information about where your program failed.

---

# 23. Object-Oriented Programming

Learn Python's object-oriented features after you are comfortable with functions and data structures.

Understand:

- Classes
- Objects
- Attributes
- Methods
- Constructors
- Encapsulation
- Inheritance
- Polymorphism

Example:

```python
class User:
    def __init__(self, name):
        self.name = name
```

Don't use classes simply because you can.

Use them when they make the design clearer.

---

# 24. Iterators & Generators

Learn how Python handles sequences of values.

Understand:

- Iterables
- Iterators
- `iter()`
- `next()`
- Generators
- `yield`

Generators become particularly useful when working with large amounts of data.

---

# 25. Decorators

Decorators allow you to modify or extend function behavior.

Learn the basic idea:

```python
@decorator
def function():
    pass
```

Understand:

**A decorator wraps another function.**

Don't prioritize advanced decorator patterns until your fundamentals are strong.

---

# 26. Context Managers

Learn the `with` statement.

Example:

```python
with open("data.txt") as file:
    content = file.read()
```

Understand:

- Resource management
- `with`
- Context managers
- Why cleanup matters

---

# 27. Type Hints

Python is dynamically typed, but type hints can make code easier to understand and maintain.

Example:

```python
def add(a: int, b: int) -> int:
    return a + b
```

Learn:

- Basic type hints
- Function annotations
- Collections
- Optional values
- Type checking

You don't need to become a typing expert immediately.

---

# 28. Virtual Environments

Real Python projects commonly use isolated environments.

Learn:

- Why environments are needed
- Creating an environment
- Activating it
- Installing packages
- Deactivating it

A common approach is:

```text
python -m venv .venv
```

Then install project dependencies inside the environment.

---

# 29. Package Management

Learn how Python packages are installed and managed.

Understand:

- PyPI
- `pip`
- Requirements
- Project dependencies
- Virtual environments

Example:

```text
pip install requests
```

Never install a package without understanding what it is and why your project needs it.

---

# 30. Project Structure

Move beyond single Python files.

A project may contain:

```text
project/
├── src/
├── tests/
├── README.md
├── pyproject.toml
└── .gitignore
```

Understand what each part is responsible for.

Good structure becomes increasingly important as projects grow.

---

# 31. Testing

Learn to verify your Python programs.

Start with:

- Assertions
- Test cases
- Edge cases
- Unit tests

Then explore:

- `pytest`
- Fixtures
- Mocking
- Test coverage

The goal is confidence in your code.

---

# 32. Logging

Don't rely entirely on `print()` in real applications.

Learn Python's `logging` module.

Understand:

- Log messages
- Log levels
- Debugging
- Application logs
- Log configuration

Typical levels include:

- DEBUG
- INFO
- WARNING
- ERROR
- CRITICAL

---

# 33. Working With APIs

Python is frequently used to communicate with APIs.

Learn:

- HTTP basics
- GET
- POST
- Request parameters
- Headers
- JSON responses
- Status codes
- Authentication

A common Python library is:

```text
requests
```

Later explore modern alternatives such as asynchronous HTTP clients when required.

---

# 34. Databases

Python can interact with databases.

Start with:

- SQL basics
- SQLite
- Database connections
- Queries
- Transactions

Then explore Python database libraries appropriate to the database you use.

---

# 35. Git & GitHub

Use Git to track your Python projects.

Learn:

- Repository
- Commit
- Branch
- Merge
- Pull
- Push
- `.gitignore`

Then publish projects to GitHub.

Your GitHub repository should show:

- What the project does
- How to install it
- How to run it
- Example usage
- Tests
- Project structure

---

# 36. Python Style

Readable code matters.

Learn:

- Clear names
- Small functions
- Consistent formatting
- Useful comments
- Documentation
- PEP 8
- Code organization

Don't write code merely to make it short.

Write code that another person can understand.

---

# 37. Python Security Basics

As soon as Python interacts with users, files, networks or credentials, security matters.

Learn:

- Input validation
- Secrets management
- Environment variables
- Dependency security
- Safe file handling
- Authentication basics
- Avoiding code injection
- Safe API usage

Never hard-code passwords or API keys into source code.

---

# 38. Performance Basics

You don't need to optimize everything.

First write correct, readable code.

Then learn:

- Algorithmic complexity
- Profiling
- Memory usage
- Efficient data structures
- Lazy evaluation
- Caching

Measure before making performance changes.

---

# Choose Your Python Direction

Once your Python fundamentals are strong, specialize.

## Python for Data Analysis

Learn:

- NumPy
- pandas
- Matplotlib
- Jupyter
- SQL
- Data cleaning
- Data visualization

→ [Data Analyst Career](../careers/data-analyst.md)

---

## Python for Data Engineering

Learn:

- SQL
- ETL
- APIs
- Data pipelines
- Airflow
- Spark
- Data warehouses
- Cloud platforms

→ [Data Engineer Career](../careers/data-engineer.md)

---

## Python for Machine Learning

Learn:

- NumPy
- pandas
- scikit-learn
- Statistics
- Machine learning
- Model evaluation
- Model deployment

→ [ML Engineer Career](../careers/ml-engineer.md)

---

## Python for AI Engineering

Learn:

- APIs
- LLMs
- Embeddings
- RAG
- AI agents
- Vector databases
- Evaluation
- AI application development

→ [AI Engineer Career](../careers/ai-engineer.md)

---

## Python for Backend Development

Learn:

- HTTP
- REST APIs
- FastAPI
- Django
- Databases
- Authentication
- Testing
- Deployment

→ [Developer Career](../careers/developer.md)

---

## Python for Automation

Learn:

- Files
- APIs
- Web automation
- Scheduling
- Command line
- Data processing

Automation is one of the fastest ways to turn Python knowledge into practical value.

---

# Beginner Projects

Start small.

### Project 1 — Calculator

Practice:

- Variables
- Input
- Operators
- Functions

### Project 2 — Number Guessing Game

Practice:

- Conditions
- Loops
- Random numbers

### Project 3 — To-Do List

Practice:

- Lists
- Functions
- Files

### Project 4 — Expense Tracker

Practice:

- Dictionaries
- Functions
- CSV/JSON
- File handling

### Project 5 — API Client

Practice:

- HTTP
- APIs
- JSON
- Error handling

### Project 6 — Automation Script

Practice:

- Files
- Paths
- Loops
- Logging

---

# Your Python Learning Project

Build an **Expense Tracker**.

Start with:

```text
Add expense
List expenses
Calculate total
```

Then improve it:

```text
Categories
Dates
Search
Filtering
CSV storage
JSON storage
Validation
Tests
Logging
Git
README
```

Eventually turn it into a small application.

This gives you a practical path from beginner Python to real software development.

---

# Use AI While Learning Python

AI can accelerate learning when used correctly.

Ask AI to:

- Explain Python errors
- Explain unfamiliar syntax
- Review your code
- Suggest exercises
- Generate test cases
- Explain documentation
- Compare two approaches
- Help debug a problem

A strong pattern is:

**Think → Code → Test → Get stuck → Ask AI → Understand → Fix**

Avoid:

**Prompt → Copy code → Run → Move on**

Your objective is not merely to produce Python code.

Your objective is to **understand Python well enough to solve problems independently.**

---

# Common Beginner Mistakes

### Learning Syntax Without Building

Writing code is more valuable than watching endless tutorials.

### Copying AI-Generated Code

Understand every important part of the solution.

### Ignoring Error Messages

Read the traceback.

### Using Global Variables Everywhere

Prefer clear function inputs and outputs.

### Writing Huge Functions

Break complex logic into smaller functions.

### Installing Packages for Everything

The standard library already provides many capabilities.

### Premature Optimization

Make it correct first.

### Skipping Git

Start version control early.

### Skipping Testing

Small tests prevent small mistakes from becoming large problems.

---

# When Are You Ready to Move On?

You don't need to know every Python feature.

You should be able to:

- Install and run Python
- Write scripts
- Use variables
- Work with common data types
- Use conditions
- Use loops
- Write functions
- Work with lists and dictionaries
- Read and write files
- Handle exceptions
- Use modules
- Create virtual environments
- Install packages
- Write basic tests
- Debug programs
- Use Git
- Build a small project

If you can do these things, start specializing.

---

# Python Career Connections

Python can support many career paths:

| Career | Why Python Helps |
|---|---|
| Developer | Backend, APIs and automation |
| Data Analyst | Analysis and automation |
| Data Engineer | Pipelines and data processing |
| ML Engineer | Machine learning systems |
| AI Engineer | AI applications and agents |
| Software Engineer | General software development |
| Cloud & DevOps | Automation and scripting |
| Cybersecurity | Security automation and tooling |
| Software Testing & QA | Test automation |

One language can open many doors.

---

# Don't Try to Learn Everything

Python has a huge ecosystem.

You do **not** need:

- Every library
- Every framework
- Every advanced language feature
- Every package
- Every Python trick

Learn the language.

Then learn the tools required by your chosen direction.

---

# Your Python Sequence

A practical progression is:

**Python Basics**

↓

**Functions & Data Structures**

↓

**Files & Modules**

↓

**Errors & Debugging**

↓

**OOP & Advanced Python**

↓

**Packages & Environments**

↓

**Testing & Git**

↓

**APIs & Databases**

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

The roadmap gives you the direction.

The tutorials teach the concepts.

GitHub gives you practice.

Projects prove that you can apply what you learned.

AI helps you work and learn more effectively.

---

## What You Now Know

Python is much more than syntax.

You now have a map covering:

**Python Setup**

**Syntax**

**Variables**

**Data Types**

**Conditions**

**Loops**

**Collections**

**Functions**

**Modules**

**Files**

**Exceptions**

**OOP**

**Packages**

**Virtual Environments**

**Testing**

**Logging**

**APIs**

**Databases**

**Git**

**Projects**

**Career Specialization**

You don't need to master all of this at once.

Build your knowledge one layer at a time.

---

## Where Should You Go Next?

**New to programming?**

→ [Programming Fundamentals](programming-fundamentals.md)

**Want to work with data?**

→ [Data Analyst Career](../careers/data-analyst.md)

**Want to build data pipelines?**

→ [Data Engineer Career](../careers/data-engineer.md)

**Want to build machine learning systems?**

→ [ML Engineer Career](../careers/ml-engineer.md)

**Want to build AI applications?**

→ [AI Engineer Career](../careers/ai-engineer.md)

**Want to build software?**

→ [Software Engineer Career](../careers/software-engineer.md)

**Want to build applications?**

→ [Developer Career](../careers/developer.md)

---

[← Back to Topic Roadmaps](index.md)

[← Back to All Roadmaps](../index.md)
