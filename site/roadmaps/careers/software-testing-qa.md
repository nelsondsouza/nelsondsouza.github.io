# Software Testing & QA Roadmaps

**Build confidence in software through testing and quality engineering.**

If you want to work in **Software Testing & QA**, this page helps you understand the skills and practices used to discover defects, prevent failures and build quality into software delivery.

You do not need to learn every testing tool.

Start with testing fundamentals, then progress toward test design, automation, APIs, performance, security, accessibility and quality engineering.

---

## What Does a Software Tester Do?

Software testers help teams understand whether software behaves as expected and where it may fail.

Typical work includes:

- Understanding requirements
- Designing test scenarios
- Finding defects
- Executing tests
- Automating repetitive tests
- Testing APIs
- Testing user interfaces
- Testing mobile applications
- Testing performance
- Testing security
- Reporting and tracking defects
- Improving the overall quality process

A simple way to think about testing is:

**Understand → Test → Find → Explain → Fix → Verify → Prevent**

---

## Your Testing & QA Learning Path

A practical journey looks like:

**Foundations → Testing Fundamentals → Test Design → Test Types → API/UI Testing → Automation → Performance → Security → CI/CD → Quality Engineering**

You do not need to learn every testing discipline at once.

Build the fundamentals first.

---

## Recommended Roadmaps

### Start with the Foundations

Testing requires an understanding of the software being tested.

Start with:

- Programming fundamentals
- Git & GitHub
- HTTP/HTTPS
- APIs
- Databases
- SQL
- Linux

You don't need to become a professional developer before learning testing.

But basic technical knowledge will make you much more effective.

---

## Testing Fundamentals

Understand why testing exists and how testing fits into software development.

Learn:

- What software testing is
- Verification and validation
- Test cases
- Test scenarios
- Test data
- Expected results
- Actual results
- Defects
- Severity
- Priority
- Test environments

The objective is not simply to find bugs.

It is to provide useful information about software quality and risk.

---

## The Test Pyramid

A useful way to think about automated testing is:

**Many unit tests → Some integration tests → Fewer end-to-end tests**

Each layer provides different value.

### Unit Tests

Test small pieces of code in isolation.

### Integration Tests

Test how components work together.

### System / End-to-End Tests

Test complete workflows from the user's perspective.

Learn why different test levels exist rather than simply memorizing the pyramid.

---

## Test Types

Explore different testing purposes.

### Functional Testing

Does the software do what it is supposed to do?

### Regression Testing

Did a change break something that previously worked?

### Smoke Testing

Does the build appear stable enough for deeper testing?

### User Acceptance Testing

Does the solution meet the user's or business need?

### Exploratory Testing

What can you discover by actively investigating the product?

Different testing types answer different questions.

---

## API Testing

Modern applications depend heavily on APIs.

Learn:

- HTTP methods
- Status codes
- Headers
- Request bodies
- Response bodies
- Authentication
- Authorization
- Validation
- Error handling
- API contracts

Then practice with API testing tools such as:

- Postman

The goal is to test both expected and unexpected behavior.

---

## UI Testing

User interfaces require testing across different workflows and conditions.

Test:

- Navigation
- Forms
- Validation
- User interactions
- Error messages
- Responsive behavior
- Browser compatibility

Learn to distinguish useful end-to-end tests from tests that are unnecessarily fragile.

---

## Test Automation

Automation is useful when tests need to be repeated consistently.

Learn:

- Test automation concepts
- Locators
- Assertions
- Test data
- Fixtures
- Setup and teardown
- Test reporting
- Screenshots and traces
- Parallel execution

Explore tools such as:

- Selenium
- Cypress
- Playwright

Start with one tool.

Understand automation principles before collecting tools.

---

## Performance Testing

Software can be functionally correct and still perform poorly.

Learn about:

- Load testing
- Stress testing
- Response time
- Throughput
- Concurrency
- Resource utilization
- Scalability
- Bottlenecks

Explore tools such as:

- JMeter

A useful performance question is:

**"How does the system behave when real usage increases?"**

---

## Security Testing

Security is part of software quality.

Understand:

- Authentication testing
- Authorization testing
- Input validation
- Session security
- API security
- Dependency security
- Common web vulnerabilities

Learn the security basics before moving into specialized security testing.

---

## Accessibility Testing

Software should be usable by people with different abilities.

Explore:

- Keyboard navigation
- Focus management
- Semantic structure
- Labels
- Contrast
- Screen-reader compatibility
- Accessible forms
- Alternative text

Accessibility should be considered throughout development, not only during final testing.

---

## Mobile Testing

Mobile applications introduce additional testing considerations.

Explore:

- Different devices
- Screen sizes
- Operating systems
- Network conditions
- Permissions
- App lifecycle
- Installation and updates
- Performance
- Offline behavior

Then explore appropriate mobile testing approaches and tools.

---

## Mocking & Test Doubles

Sometimes a test should isolate the component being tested.

Learn about:

- Mocks
- Stubs
- Spies
- Fakes
- Test doubles
- Dependency isolation

Use them carefully.

Over-mocking can produce tests that pass while failing to represent real system behavior.

---

## TDD & BDD

### Test-Driven Development

A common TDD cycle is:

**Red → Green → Refactor**

Write a failing test, make it pass, then improve the implementation.

### Behavior-Driven Development

BDD focuses on describing expected behavior in language that developers, testers and business stakeholders can understand.

The goal of both approaches is to improve feedback and software quality.

---

## Shift Left Testing

Testing should not begin only after development is complete.

Shift testing earlier into the development lifecycle.

For example:

**Requirements → Design → Development → Testing → Deployment**

Quality activities can happen throughout the process.

The earlier a problem is discovered, the easier it may be to address.

---

## CI/CD & Automated Quality

Automated tests become much more valuable when integrated into delivery pipelines.

Learn how tests can run automatically during:

- Pull requests
- Builds
- Deployments
- Release processes

Explore:

- Git
- GitHub
- GitHub Actions
- Jenkins

A basic quality pipeline might look like:

**Code → Build → Test → Report → Deploy**

---

## Quality Engineering

Modern QA increasingly moves beyond "testing at the end."

Quality Engineering focuses on building quality into the entire software lifecycle.

Think about:

- Prevention
- Automation
- Observability
- Risk
- Reliability
- Developer collaboration
- Continuous feedback

The goal is:

**Build quality in, rather than inspect quality in later.**

---

## Don't Learn Everything at Once

A common beginner mistake is trying to learn:

**Selenium + Cypress + Playwright + JMeter + Postman + security + performance + mobile + everything else**

at the same time.

Don't.

Start with:

**Testing Fundamentals → Test Design → API Testing → One Automation Tool**

Then move toward:

**Performance → Security → Accessibility → CI/CD → Quality Engineering**

---

## What Should You Learn First?

### Complete Beginner

Start with:

**Testing Fundamentals → Test Cases → Bug Reporting → API Basics → SQL**

### Want to Become an Automation Tester?

Build toward:

**Testing → Programming → API Testing → Playwright / Cypress / Selenium → CI/CD**

### Want to Focus on API Testing?

Build toward:

**HTTP → APIs → Authentication → Postman → Automation → API Contracts**

### Want to Focus on Performance Testing?

Build toward:

**Testing Fundamentals → HTTP → Load Testing → JMeter → Performance Analysis**

### Want to Become a Quality Engineer?

Build toward:

**Testing → Automation → CI/CD → Performance → Security → Observability → Quality Engineering**

---

## Tester vs Developer

Testing and development are different disciplines, but they work closely together.

### Developer

Often focuses more on:

**Design → Code → Unit Tests → Implementation**

### Tester / QA

Often focuses more on:

**Risk → Behavior → Scenarios → Defects → Quality**

Modern teams increasingly share quality responsibility.

Good testers understand how software is built.

Good developers understand how software can fail.

---

## Build Projects

Don't stop at tutorials.

Create testing projects such as:

- Manual test plan
- API test collection
- Automated UI test suite
- Regression test suite
- Performance test
- Accessibility test
- CI/CD quality pipeline
- End-to-end test framework

A strong portfolio should demonstrate that you can:

**Understand → Design → Automate → Analyze → Report**

---

## Your Goal Is Not to Collect Testing Tools

Testing tools change.

Your durable skills are:

**Question → Observe → Test → Investigate → Communicate → Improve**

Learn how to think about risk and software behavior.

Then you can adapt to new tools.

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

**Want to learn a specific testing technology?**

→ Explore **Topic Roadmaps**

**Want to build software?**

→ Explore **Software Engineer**

**Want to secure software?**

→ Explore **Cybersecurity**

**Want to design reliable systems?**

→ Explore **Software Architect**

**Ready to practice?**

→ Explore the related **Tutorials and Projects**

---

[← Back to Career Roadmaps](index.md)

[← Back to All Roadmaps](../index.md)