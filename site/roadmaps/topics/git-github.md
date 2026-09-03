# Git & GitHub Roadmap

> A beginner-friendly path from saving your first version of a project to collaborating safely with others using Git and GitHub.

## 1. Start Here

Git is a **version control system**.

It records changes to files so you can:

- See what changed
- Go back to earlier versions
- Experiment safely
- Work with other people
- Review changes
- Maintain project history

GitHub is a **platform for hosting and collaborating around Git repositories**.

Simple mental model:

**Files â†’ Git â†’ Repository â†’ GitHub â†’ Collaboration**

Git and GitHub are related, but they are not the same thing.

---

## 2. What You Need Before Git

You only need:

- Basic computer skills
- A folder containing files
- A command-line or terminal application
- Willingness to practice

Helpful but not required:

- Programming knowledge
- Basic GitHub account knowledge

You can learn Git without being a professional developer.

Git is useful for:

- Code
- Documentation
- Configuration
- Data projects
- Websites
- Infrastructure
- Analysis
- Project work

---

## 3. Understand Version Control

Without version control, people often create files like:

```text
report-final.xlsx
report-final-2.xlsx
report-final-revised.xlsx
report-final-really-final.xlsx
```

Version control provides a better history.

You can record meaningful changes such as:

```text
Add monthly sales analysis
Fix date calculation
Update project dashboard
```

The key idea:

**A commit is a recorded checkpoint in your project history.**

---

## 4. Install Git

Install Git for your operating system.

Then verify:

```text
git --version
```

Configure your identity:

```text
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the email associated with your Git hosting account when appropriate.

Check configuration:

```text
git config --list
```

---

## 5. Learn the Git Mental Model

A beginner should understand these areas:

```text
Working Directory
       â†“
Staging Area
       â†“
Repository
       â†“
Remote Repository
```

### Working directory

Your current files.

### Staging area

The changes you have selected for the next commit.

### Repository

The local Git history.

### Remote

Another copy of the repository, often hosted on GitHub.

This model explains most everyday Git commands.

---

## 6. Create a Repository

Move into your project folder:

```text
cd my-project
```

Initialize Git:

```text
git init
```

Check the repository:

```text
git status
```

Git will now track the project history once you start committing files.

---

## 7. Understand Git Status

Run:

```text
git status
```

frequently.

It tells you:

- Current branch
- Modified files
- Untracked files
- Staged changes
- Other repository information

For beginners:

**When confused, run `git status`.**

---

## 8. Track Files

Add a file:

```text
git add README.md
```

Add multiple files:

```text
git add .
```

Understand what staging means before using `git add .` blindly.

A useful habit is:

```text
git status
git diff
git add <files>
git status
```

Then commit.

---

## 9. Review Changes

Before committing, inspect what changed.

Use:

```text
git diff
```

For staged changes:

```text
git diff --staged
```

This helps catch:

- Accidental edits
- Debug code
- Wrong files
- Secrets
- Unintended changes

Review before you commit.

---

## 10. Create Commits

Commit staged changes:

```text
git commit -m "Add initial project structure"
```

A good commit should represent a meaningful change.

Good:

```text
Add expense calculation
Fix login validation
Create sales dashboard
```

Poor:

```text
update
changes
stuff
final
```

Write commit messages that explain the change.

---

## 11. Understand Commit History

View history:

```text
git log
```

A shorter view:

```text
git log --oneline
```

Learn to identify:

- Commit hash
- Author
- Date
- Commit message
- Parent history

Your history becomes a record of how the project evolved.

---

## 12. Undo Changes Safely

Git provides several ways to undo work.

Understand the difference between:

- Discarding working-directory changes
- Unstaging changes
- Reverting a commit
- Resetting history

Important commands to learn carefully:

```text
git restore
git restore --staged
git revert
git reset
```

### Beginner rule

Prefer **revert** when you need to undo an already shared commit.

Be careful with commands that rewrite history.

---

## 13. Ignore Unwanted Files

Create:

```text
.gitignore
```

Use it for files that should not normally be committed.

Examples:

```text
.env
node_modules/
__pycache__/
*.log
.DS_Store
```

Typical things to ignore:

- Secrets
- Temporary files
- Build output
- Local configuration
- Dependency folders
- IDE-generated files

Do not use `.gitignore` as a substitute for removing a secret that has already been committed.

---

## 14. Git Branches

A branch allows you to work on a separate line of development.

Create and switch:

```text
git switch -c feature/login
```

List branches:

```text
git branch
```

Switch branches:

```text
git switch main
```

Use branches to isolate changes.

---

## 15. Understand Branching

A simple model:

```text
main
  |
  +---- feature/report
  |
  +---- feature/login
```

Each feature can be developed independently.

Do not create dozens of branches without a reason.

Choose a workflow that matches your team.

---

## 16. Merge Changes

Switch to the target branch:

```text
git switch main
```

Merge:

```text
git merge feature/login
```

A merge combines histories.

After merging:

- Test the application
- Review the result
- Resolve conflicts if necessary
- Push the updated branch

---

## 17. Merge Conflicts

Conflicts happen when Git cannot automatically determine which changes should remain.

Typical process:

**Conflict â†’ Inspect â†’ Decide â†’ Edit â†’ Stage â†’ Commit**

Conflict markers may look like:

```text
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
your version
&#61;&#61;&#61;&#61;&#61;&#61;&#61;
other version
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/login
```

Do not simply choose one side without understanding the changes.

After resolving:

```text
git add <file>
git commit
```

---

## 18. Remotes

A remote is another repository location.

View remotes:

```text
git remote -v
```

Add a remote:

```text
git remote add origin <repository-url>
```

Common remote name:

```text
origin
```

The remote is usually hosted on a service such as GitHub.

---

## 19. GitHub Basics

GitHub provides collaboration features around Git repositories.

Learn:

- Repository
- Profile
- Organization
- README
- Issues
- Pull requests
- Discussions
- Releases
- Actions
- Projects

Do not think of GitHub as simply a place to upload code.

It can be part of your complete software collaboration workflow.

---

## 20. Create a GitHub Repository

Typical flow:

**Create GitHub repository â†’ Connect local repository â†’ Push**

For an existing local repository:

```text
git remote add origin <repository-url>
git push -u origin main
```

After the first push:

```text
git push
```

---

## 21. Clone a Repository

To copy an existing repository:

```text
git clone <repository-url>
```

Then:

```text
cd project
```

Check:

```text
git status
```

Cloning is the normal starting point when joining an existing project.

---

## 22. Fetch and Pull

Understand the difference.

### Fetch

Downloads remote information without automatically changing your working branch.

```text
git fetch
```

### Pull

Fetches changes and integrates them according to your configured workflow.

```text
git pull
```

Learn what your team expects before using pull automatically in complex workflows.

---

## 23. Push

Send your local commits to the remote:

```text
git push
```

For a new branch:

```text
git push -u origin feature/login
```

Remember:

**Commit = local history**

**Push = share local commits with the remote**

---

## 24. GitHub Pull Requests

A pull request is a proposal to merge changes into another branch.

Typical workflow:

**Create branch â†’ Make changes â†’ Commit â†’ Push â†’ Open Pull Request â†’ Review â†’ Fix â†’ Merge**

A pull request can contain:

- Description
- Code changes
- Review comments
- Automated checks
- Discussion
- Approval

This is one of GitHub's most important collaboration features.

---

## 25. Code Review

Good code review asks:

- Does the change solve the problem?
- Is the implementation understandable?
- Are there tests?
- Could it introduce a bug?
- Is security affected?
- Is performance affected?
- Is documentation needed?

Review the change, not the person.

---

## 26. Issues

GitHub Issues can track:

- Bugs
- Features
- Tasks
- Questions
- Improvements

A useful issue includes:

- Clear title
- Context
- Expected behavior
- Actual behavior
- Steps to reproduce when relevant
- Acceptance criteria where appropriate

---

## 27. README Files

A good README helps someone understand the repository quickly.

Consider including:

- What the project does
- Why it exists
- Prerequisites
- Installation
- Usage
- Configuration
- Examples
- Testing
- Contribution information
- License

For learning projects, also explain what you are practicing.

---

## 28. Tags and Releases

Tags identify important points in history.

Example:

```text
v1.0.0
```

Learn:

```text
git tag
git tag v1.0.0
git push origin v1.0.0
```

GitHub Releases can package important project versions for users.

---

## 29. GitHub Actions

GitHub Actions provides workflow automation.

Use cases:

- Run tests
- Lint code
- Build applications
- Create artifacts
- Deploy websites
- Run scheduled tasks

Basic mental model:

**Event â†’ Workflow â†’ Jobs â†’ Steps**

Learn Actions after becoming comfortable with normal Git workflows.

---

## 30. Branch Protection and Collaboration

Professional repositories may use:

- Protected branches
- Required reviews
- Required status checks
- Pull request rules
- CODEOWNERS
- Permission controls

These practices reduce accidental changes to important branches.

---

## 31. Authentication and Security

Understand:

- HTTPS authentication
- SSH keys
- Personal access tokens
- Credential managers
- Repository permissions
- Two-factor authentication
- Secrets

Never commit:

- Passwords
- API keys
- Access tokens
- Private keys
- `.env` files containing secrets

If a secret is committed, assume it may be exposed and rotate it.

---

## 32. Git Workflows

Common approaches include:

### Feature Branch Workflow

```text
main
 â†“
feature branch
 â†“
pull request
 â†“
main
```

### Trunk-Based Development

Developers integrate small changes frequently into a shared mainline.

### GitHub Flow

A lightweight branch-and-pull-request workflow.

### Git Flow

A more structured branching model involving branches such as:

- `main`
- `develop`
- Feature branches
- Release branches
- Hotfix branches

Do not adopt a complicated workflow simply because it is popular.

Use the simplest workflow that fits the project.

---

## 33. Advanced Git Concepts

After mastering everyday Git, explore:

- Interactive rebase
- Cherry-pick
- Stash
- Bisect
- Reflog
- Submodules
- Worktrees
- Rewriting history
- Signed commits
- Hooks

These are powerful tools.

Learn them only after understanding normal commits, branches, merges, and remotes.

---

## 34. Git Internals

You do not need Git internals to use Git effectively.

Later, understand:

- Objects
- Blobs
- Trees
- Commits
- References
- HEAD
- Index
- Content-addressed storage

This explains why Git can efficiently track project history.

---

## 35. Git for Different Work

Git is useful beyond application code.

### Data

Track:

- SQL
- Notebooks
- Analysis scripts
- Documentation

### Infrastructure

Track:

- Terraform
- Kubernetes manifests
- Configuration

### Documentation

Track:

- Markdown
- Technical documentation
- Guides

### Websites

Track:

- HTML
- CSS
- JavaScript
- Static-site configuration

### Project work

Track appropriate:

- Templates
- Scripts
- Reporting logic
- Documentation

Avoid putting large binary datasets or generated files into Git without understanding the consequences.

---

## 36. GitHub for Portfolio Building

A GitHub profile can demonstrate your work.

Create repositories that show:

- Clear README
- Good structure
- Meaningful commits
- Useful projects
- Tests where appropriate
- Documentation
- Clean issue history
- Practical problem solving

Quality matters more than having hundreds of repositories.

---

## 37. Common Beginner Mistakes

Avoid:

- Committing everything blindly
- Committing secrets
- Huge commits
- Vague commit messages
- Working directly on `main` when a branch workflow is expected
- Pulling without understanding local changes
- Force-pushing shared branches
- Rewriting public history casually
- Ignoring merge conflicts
- Never reviewing diffs
- Treating GitHub as a backup service only
- Tracking generated files unnecessarily
- Using complicated Git workflows without need

---

## 38. Practice Projects

### Project 1 â€” Personal Git Repository

Create a small project.

Practice:

- `git init`
- `git status`
- `git add`
- `git commit`
- `git log`
- `.gitignore`

### Project 2 â€” Feature Branch Workflow

Create:

```text
main
feature-a
feature-b
```

Practice:

- Branches
- Commits
- Merging
- Conflict resolution

### Project 3 â€” GitHub Collaboration

Create a GitHub repository.

Practice:

- Clone
- Branch
- Push
- Pull request
- Code review
- Issue
- Merge

### Project 4 â€” Automated Repository

Add GitHub Actions to:

- Install dependencies
- Run tests
- Check code quality
- Build the project

---

## 39. Use AI With Git & GitHub

AI can help you:

- Explain Git commands
- Explain merge conflicts
- Suggest `.gitignore` entries
- Explain Git history
- Write README files
- Review commit messages
- Explain GitHub Actions
- Debug workflow files
- Create practice scenarios

A useful prompt includes:

- Current branch
- Command executed
- Exact error
- `git status`
- Relevant repository context

Do not run destructive commands suggested by AI without understanding their effect.

Be especially careful with:

```text
git reset --hard
git push --force
git clean
```

---

## 40. What to Learn First

If you are completely new:

1. What version control means
2. Install Git
3. `git config`
4. `git init`
5. `git status`
6. `git add`
7. `git diff`
8. `git commit`
9. `git log`
10. `.gitignore`
11. Branches
12. `git switch`
13. Merge
14. Conflict resolution
15. Remotes
16. Clone
17. Push
18. Pull
19. GitHub repositories
20. Pull requests
21. Issues
22. Code review
23. GitHub Actions
24. Security
25. Advanced Git

---

## 41. Your Everyday Git Workflow

For a typical feature:

**1. Update**

```text
git pull
```

**2. Create a branch**

```text
git switch -c feature/my-change
```

**3. Work**

Edit your files.

**4. Inspect**

```text
git status
git diff
```

**5. Stage**

```text
git add <files>
```

**6. Commit**

```text
git commit -m "Add my change"
```

**7. Push**

```text
git push -u origin feature/my-change
```

**8. Open a Pull Request**

Review the changes.

**9. Respond to feedback**

Make additional commits.

**10. Merge**

Follow the repository's workflow.

**11. Clean up**

Delete the branch when appropriate.

---

## 42. You Are Ready When You Can

You are ready to move forward when you can:

- Explain Git vs GitHub
- Create a repository
- Check repository status
- Review changes
- Stage files
- Create meaningful commits
- Read commit history
- Create and switch branches
- Merge changes
- Resolve a basic conflict
- Connect a remote
- Clone a repository
- Push and pull changes
- Open a pull request
- Review changes
- Use `.gitignore`
- Protect secrets
- Understand basic GitHub Actions

---

## 43. Career Connections

### Developer

Use Git daily for:

**Branches â†’ Commits â†’ Pull Requests â†’ Reviews â†’ Releases**

### Data Analyst

Track:

**SQL â†’ Python â†’ Analysis â†’ Documentation**

### Data Engineer

Track:

**Pipelines â†’ SQL â†’ Infrastructure â†’ Configuration**

### DevOps / Cloud

Track:

**Infrastructure as Code â†’ Kubernetes â†’ CI/CD â†’ Automation**

### Cybersecurity

Track:

**Security tooling â†’ Policies â†’ Automation â†’ Detection logic**

### Project / PMO / Reporting

Use Git where appropriate for:

**Templates â†’ Reporting logic â†’ Documentation â†’ Automation â†’ Change history**

---

## 44. Beginner-to-Advanced Sequence

### Level 1 â€” Git Basics

Learn:

- Repository
- Status
- Add
- Commit
- Log
- Diff

### Level 2 â€” Branching

Learn:

- Branch
- Switch
- Merge
- Conflicts

### Level 3 â€” GitHub

Learn:

- Repositories
- Clone
- Push
- Pull
- Pull requests

### Level 4 â€” Collaboration

Learn:

- Reviews
- Issues
- Branch protection
- Releases

### Level 5 â€” Automation

Learn:

- GitHub Actions
- CI
- CD
- Workflow files

### Level 6 â€” Advanced Git

Learn:

- Rebase
- Cherry-pick
- Stash
- Bisect
- Reflog
- Worktrees

### Level 7 â€” Professional Practice

Learn:

- Branching strategy
- Secure workflows
- Code ownership
- Release management
- Repository governance

---

## 45. What You Now Know

You now have a path from:

**First Repository â†’ Commits â†’ Branches â†’ GitHub â†’ Pull Requests â†’ Reviews â†’ Automation â†’ Professional Collaboration**

The goal is not to memorize Git commands.

The goal is to confidently answer:

**What changed?**

**Who changed it?**

**Why was it changed?**

**Can I review it?**

**Can I safely undo it?**

**Can the team collaborate on it?**

---

## 46. Next

Continue with related Learn with Nelson roadmaps:

- Programming Fundamentals
- Python
- Java
- SQL
- Docker
- Kubernetes
- CI/CD
- Cloud
- Software Engineering
- Software Architecture

Then follow:

**Learn â†’ Practice â†’ Build â†’ Collaborate â†’ Prove â†’ Apply**

---

## One-Line Mental Model

**Git records project history; GitHub turns that history into collaboration, review, and delivery.**
