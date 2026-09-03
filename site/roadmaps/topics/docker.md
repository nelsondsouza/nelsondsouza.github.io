# Docker Roadmap

> A beginner-friendly path from running your first container to building, securing, networking, and deploying containerized applications.

## 1. Start Here

Docker is a platform for packaging applications and their dependencies into **containers**.

A simple mental model:

**Application + Dependencies → Image → Container → Network/Storage → Deployment**

Docker helps make software environments more consistent across:

- Development
- Testing
- CI/CD
- Servers
- Cloud platforms

You do not need Kubernetes to learn Docker.

Learn Docker first.

---

## 2. What You Need Before Docker

You only need:

- Basic computer skills
- A terminal or command prompt
- A simple application to containerize
- Basic understanding of files and folders

Helpful but not required:

- Git & GitHub
- Linux basics
- Programming
- Basic networking

If you are completely new to containers, start with the concepts before memorizing commands.

---

## 3. Understand Containers

A container is an isolated process with the files and dependencies it needs to run.

Think of it as:

> **A standardized environment for running an application.**

Containers are:

- Lightweight
- Portable
- Reproducible
- Isolated

They are not the same as virtual machines.

---

## 4. Containers vs Virtual Machines

### Virtual Machine

A VM typically includes:

**Application → Libraries → Guest OS → Hypervisor → Host**

### Container

A container typically uses:

**Application → Libraries → Container → Host OS Kernel**

Containers generally require fewer resources than full virtual machines.

Do not think:

> "A container is a tiny VM."

Think:

> "A container is an isolated application process packaged with what it needs."

---

## 5. Install Docker

For beginners, Docker Desktop is usually the easiest starting point on Windows or macOS.

On Linux, Docker Engine can be installed directly.

Verify the installation:

```text
docker --version
```

Then:

```text
docker run hello-world
```

Your first goal is simply:

**Run a container successfully.**

---

## 6. Learn the Docker CLI

Start with:

```text
docker --help
```

Then become comfortable with:

```text
docker ps
docker ps -a
docker images
docker pull
docker run
docker stop
docker start
docker restart
docker rm
docker rmi
```

Do not try to memorize every Docker command.

Understand what each command does.

---

## 7. Understand Images

A Docker **image** is a packaged template used to create containers.

Images contain things such as:

- Application files
- Runtime
- Libraries
- Configuration
- Metadata

Examples of image families:

- Python
- Node.js
- Java
- Nginx
- PostgreSQL

A useful model:

**Image → Container**

One image can be used to create multiple containers.

---

## 8. Understand Containers

A container is a running or stopped instance created from an image.

Basic example:

```text
docker run nginx
```

List running containers:

```text
docker ps
```

List all containers:

```text
docker ps -a
```

Stop one:

```text
docker stop <container>
```

Remove one:

```text
docker rm <container>
```

---

## 9. Run a Container Interactively

For a Linux shell:

```text
docker run -it ubuntu bash
```

Understand:

- `-i`
- `-t`
- Image name
- Command

You are now interacting with a process inside the container.

Exit:

```text
exit
```

---

## 10. Container Lifecycle

Understand:

**Create → Start → Running → Stop → Restart → Remove**

Useful commands:

```text
docker create
docker start
docker stop
docker restart
docker rm
```

Do not confuse:

**Stopping a container**

with

**Removing a container**

---

## 11. Run Containers in the Background

Use detached mode:

```text
docker run -d nginx
```

Then inspect:

```text
docker ps
```

This is common for services.

---

## 12. Container Names

Give containers meaningful names:

```text
docker run --name web-server nginx
```

Then use:

```text
docker stop web-server
docker start web-server
docker logs web-server
```

Readable names make troubleshooting easier.

---

## 13. Port Mapping

Containers can run services on their own network interfaces.

Expose a container port to your machine:

```text
docker run -p 8080:80 nginx
```

Mental model:

```text
Your Computer : 8080
        ↓
Container : 80
```

Then open the appropriate local address in your browser.

Understand:

**Host port ≠ Container port**

---

## 14. Environment Variables

Applications often need configuration.

Pass a variable:

```text
docker run -e APP_ENV=development my-app
```

Environment variables can control:

- Environment
- Database connection
- Feature flags
- Application settings

Do not put secrets directly into images or command histories when a safer secret-management approach is available.

---

## 15. Dockerfile

A Dockerfile describes how to build an image.

Basic example:

```dockerfile
FROM python:3

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["python", "app.py"]
```

Understand:

- `FROM`
- `WORKDIR`
- `COPY`
- `ADD`
- `RUN`
- `CMD`
- `ENTRYPOINT`
- `ENV`
- `EXPOSE`

You do not need every Dockerfile instruction immediately.

---

## 16. Build an Image

Build from a Dockerfile:

```text
docker build -t my-app .
```

Understand:

- Build context
- Image tag
- Dockerfile
- Build steps
- Build output

Then run:

```text
docker run my-app
```

Your first major Docker milestone is:

**Build your own image and run it successfully.**

---

## 17. Docker Image Layers

Docker images are built from layers.

Each Dockerfile instruction can contribute to the resulting image.

Why this matters:

- Build caching
- Faster rebuilds
- Image size
- Reproducibility

Place stable steps earlier when appropriate so Docker can reuse cached layers.

---

## 18. Docker Build Context

When you run:

```text
docker build .
```

the `.` represents the build context.

Docker can access files inside that context for instructions such as:

```dockerfile
COPY
```

Do not send unnecessary files into the build context.

---

## 19. `.dockerignore`

Create:

```text
.dockerignore
```

Exclude unnecessary files such as:

```text
.git
node_modules
__pycache__
*.log
.env
```

This can:

- Reduce build context
- Speed up builds
- Reduce accidental inclusion of files

---

## 20. Docker Volumes

Containers are generally disposable.

If data must survive container replacement, use persistent storage.

Docker volumes provide managed persistent storage.

Example:

```text
docker volume create app-data
```

Then:

```text
docker run -v app-data:/data my-app
```

Use volumes for data that should outlive a container.

---

## 21. Bind Mounts

Bind mounts connect a host directory to a container directory.

Example:

```text
docker run -v ./src:/app/src my-app
```

Useful for:

- Local development
- Editing code on the host
- Sharing files

Understand the difference:

**Volume = Docker-managed storage**

**Bind mount = specific host path**

---

## 22. Docker Networking

Containers often need to communicate.

Learn:

- Container networking
- Network drivers
- Bridge networks
- DNS between containers
- Ports
- Host networking concepts

Create a network:

```text
docker network create app-network
```

Run containers on it:

```text
docker run --network app-network ...
```

Containers on the same user-defined network can communicate using container/service names.

---

## 23. Container-to-Container Communication

Example architecture:

```text
Web App
   ↓
API
   ↓
Database
```

Each service can run in its own container.

The services communicate over a Docker network.

Do not expose every internal service port to the host unnecessarily.

---

## 24. Docker Compose

Docker Compose helps define and run multi-container applications.

A typical application might contain:

- Web application
- API
- Database
- Cache

Example structure:

```text
project/
├── Dockerfile
├── compose.yaml
└── src/
```

A Compose file defines services, networks, volumes, and configuration.

---

## 25. Compose Workflow

Typical commands include:

```text
docker compose up
docker compose up -d
docker compose ps
docker compose logs
docker compose down
```

Use Compose for repeatable local development environments.

---

## 26. Health Checks

A container being "running" does not necessarily mean the application is healthy.

Learn:

- Health checks
- Startup behavior
- Readiness concepts
- Dependency availability

A health check should test something meaningful about the service.

---

## 27. Logs

Inspect container logs:

```text
docker logs <container>
```

Follow logs:

```text
docker logs -f <container>
```

Learn to investigate:

- Startup errors
- Configuration problems
- Connection failures
- Application exceptions

Logging is one of your first debugging tools.

---

## 28. Inspect Containers

Use:

```text
docker inspect <container>
```

This can help you understand:

- Configuration
- Networks
- Mounts
- Environment
- Runtime information

Use inspection instead of guessing.

---

## 29. Execute Commands Inside Containers

Run a command:

```text
docker exec <container> <command>
```

Open a shell when appropriate:

```text
docker exec -it <container> sh
```

or:

```text
docker exec -it <container> bash
```

Do not depend on manually modifying running containers.

Make permanent changes in the image or application configuration.

---

## 30. Image Registries

An image registry stores and distributes container images.

Examples include:

- Docker Hub
- GitHub Container Registry
- Cloud provider registries
- Private enterprise registries

Learn:

```text
docker login
docker pull
docker tag
docker push
```

Mental model:

**Build → Tag → Push → Pull → Run**

---

## 31. Image Tags

Example:

```text
my-app:1.0
```

Understand:

- Repository
- Image name
- Tag

Avoid relying blindly on mutable tags such as:

```text
latest
```

For reproducible deployments, use deliberate versioning and, where appropriate, immutable image references.

---

## 32. Multi-Stage Builds

Multi-stage Dockerfiles can separate:

**Build environment**

from

**Runtime environment**

Example concept:

```text
Build Stage → Runtime Stage
```

Benefits can include:

- Smaller runtime images
- Fewer unnecessary tools
- Reduced attack surface

Learn this after basic Dockerfiles.

---

## 33. Optimize Images

Good practices include:

- Use appropriate base images
- Keep images small
- Remove unnecessary packages
- Use `.dockerignore`
- Use build cache effectively
- Use multi-stage builds
- Avoid unnecessary layers
- Pin important dependencies appropriately

Smaller is useful, but **correct and maintainable** is more important than blindly minimizing size.

---

## 34. Docker Security

Containers are not automatically secure.

Learn:

- Minimal base images
- Non-root users
- Image scanning
- Dependency security
- Secret handling
- Least privilege
- Read-only filesystems where appropriate
- Resource limits
- Network restrictions

Avoid running applications as root unless there is a specific reason.

---

## 35. Secrets

Do not put secrets into:

- Dockerfiles
- Source code
- Public repositories
- Container images

Understand safer approaches such as:

- Environment configuration
- Secret stores
- Docker/Compose secret mechanisms where appropriate
- Cloud secret-management services

Treat secrets as sensitive credentials, not normal configuration.

---

## 36. Resource Limits

Containers can consume CPU and memory.

Learn the concepts behind:

- CPU limits
- Memory limits
- Reservations
- Process limits

Resource controls become particularly important in shared environments.

---

## 37. Docker in Development

A useful development workflow:

**Code → Build → Run → Test → Debug → Rebuild**

Compose can provide a consistent local environment.

Example:

```text
Application
    ↓
Database
    ↓
Cache
```

This reduces "works on my machine" problems.

---

## 38. Docker in Testing

Containers can create repeatable test environments.

Use cases:

- Database for integration tests
- Temporary services
- API dependencies
- CI test environments

The goal is:

**Repeatable environment → Repeatable test**

---

## 39. Docker in CI/CD

Docker commonly appears in:

**Code → Test → Build Image → Scan → Push → Deploy**

CI/CD platforms can:

- Build images
- Run tests
- Scan images
- Push images
- Deploy applications

GitHub Actions is one example of a platform that can automate this workflow.

---

## 40. Docker and Kubernetes

Docker and Kubernetes solve different problems.

### Docker

Primarily helps you:

- Build images
- Run containers
- Manage local/containerized workloads

### Kubernetes

Helps orchestrate containers across systems.

Kubernetes can manage:

- Scheduling
- Scaling
- Service discovery
- Rollouts
- Self-healing

Learn Docker before Kubernetes.

---

## 41. Docker and Cloud

Major cloud platforms provide container services.

Examples include:

- AWS
- Azure
- Google Cloud

A typical path is:

**Application → Docker Image → Registry → Cloud Container Platform**

Do not jump into cloud deployment before understanding local containers.

---

## 42. Production Considerations

Production container deployments require attention to:

- Security
- Networking
- Storage
- Secrets
- Logging
- Monitoring
- Resource limits
- Health checks
- Image lifecycle
- Updates
- Backups
- Disaster recovery

A container running successfully on your laptop is not automatically production-ready.

---

## 43. Common Beginner Mistakes

Avoid:

- Treating containers like virtual machines
- Building huge images
- Running everything as root
- Putting secrets in images
- Using `latest` without understanding its behavior
- Storing persistent data only inside a container filesystem
- Exposing unnecessary ports
- Manually changing containers and expecting changes to persist
- Ignoring logs
- Ignoring health checks
- Using Docker Compose without understanding the services
- Jumping to Kubernetes too early
- Assuming Docker automatically provides security

---

## 44. Practice Projects

### Project 1 — Containerize a Simple App

Take a small Python, Java, or Node.js application.

Create:

- Dockerfile
- `.dockerignore`
- Image
- Running container

Skills:

**Dockerfile → Build → Run → Logs**

### Project 2 — Multi-Container Application

Create:

```text
Web/API
   ↓
Database
```

Use:

- Dockerfile
- Compose
- Network
- Volume
- Environment variables

Skills:

**Containers → Networking → Storage → Compose**

### Project 3 — Production-Style Container Workflow

Build:

**Application → Test → Docker Image → Scan → Registry → Deployment**

Include:

- Versioned image
- Health check
- Non-root user
- Logs
- Resource considerations
- CI workflow

---

## 45. Use AI With Docker

AI can help you:

- Explain Docker commands
- Create a starter Dockerfile
- Debug build errors
- Explain Compose files
- Diagnose networking problems
- Suggest image optimizations
- Explain container logs
- Review Docker security
- Create practice projects

A useful prompt includes:

- Operating system
- Docker version
- Dockerfile
- Compose file
- Exact command
- Exact error message
- Expected behavior

Do not blindly run destructive commands or delete volumes/images without understanding what data may be affected.

---

## 46. What to Learn First

If you are completely new:

1. What containers are
2. Containers vs VMs
3. Install Docker
4. `docker run`
5. `docker ps`
6. Images
7. Containers
8. Container lifecycle
9. Port mapping
10. Environment variables
11. Dockerfile
12. `docker build`
13. `.dockerignore`
14. Volumes
15. Bind mounts
16. Networking
17. Logs
18. `docker exec`
19. Docker Compose
20. Registries
21. Image tagging
22. Health checks
23. Security
24. Multi-stage builds
25. CI/CD
26. Kubernetes concepts

Do not begin with Kubernetes.

---

## 47. Your Everyday Docker Workflow

For a small application:

**1. Write code**

**2. Create Dockerfile**

**3. Build**

```text
docker build -t my-app:1.0 .
```

**4. Run**

```text
docker run --name my-app my-app:1.0
```

**5. Inspect**

```text
docker ps
docker logs my-app
```

**6. Test**

Verify application behavior.

**7. Improve**

Change the Dockerfile or application.

**8. Rebuild**

Create a new image.

**9. Version**

Use a meaningful image tag.

**10. Push**

Send the image to an appropriate registry.

**11. Deploy**

Run it in the target environment.

---

## 48. Career Connections

### Developer

Use Docker for:

**Local environments → Testing → Packaging → Deployment**

### Data Engineer

Use Docker for:

**Data services → Databases → Pipelines → Development environments**

### Cloud / DevOps

Focus on:

**Images → Containers → Networking → Registries → CI/CD → Kubernetes → Cloud**

### Software Architect

Understand:

**Container boundaries → Service architecture → Networking → Scalability → Security**

### Cybersecurity

Focus on:

**Image security → Least privilege → Secrets → Runtime security → Supply chain**

### Data Analyst / BI

Use Docker when your analytics stack requires reproducible services such as:

- Databases
- APIs
- Development environments
- Specialized tools

---

## 49. Beginner-to-Advanced Sequence

### Level 1 — Container Basics

Learn:

- Images
- Containers
- Docker CLI
- Lifecycle

### Level 2 — Build Applications

Learn:

- Dockerfiles
- Builds
- Layers
- `.dockerignore`

### Level 3 — Storage and Networking

Learn:

- Volumes
- Bind mounts
- Networks
- Ports

### Level 4 — Multi-Container Development

Learn:

- Compose
- Service dependencies
- Health checks
- Configuration

### Level 5 — Image Management

Learn:

- Registries
- Tags
- Versioning
- Multi-stage builds
- Image optimization

### Level 6 — Security

Learn:

- Non-root containers
- Secrets
- Scanning
- Least privilege
- Supply chain security

### Level 7 — CI/CD

Learn:

- Automated builds
- Tests
- Image scanning
- Registry publishing
- Deployment

### Level 8 — Orchestration and Cloud

Explore:

- Kubernetes
- Container platforms
- Cloud registries
- Managed container services
- Observability

---

## 50. Your First Docker Workflow

Use this process:

**1. Understand**

What application are you containerizing?

**2. Identify**

What runtime and dependencies does it need?

**3. Build**

Write a Dockerfile.

**4. Ignore**

Create an appropriate `.dockerignore`.

**5. Build the image**

Create a versioned image.

**6. Run**

Start the container.

**7. Test**

Verify functionality.

**8. Inspect**

Check logs, ports, mounts, and configuration.

**9. Secure**

Remove unnecessary privileges and protect secrets.

**10. Compose**

Add additional services when needed.

**11. Automate**

Build and test the image in CI.

**12. Deploy**

Move the tested image into the target environment.

---

## 51. You Are Ready When You Can

You are ready to move forward when you can:

- Explain images vs containers
- Run a container
- Inspect containers
- Read container logs
- Stop and remove containers
- Map ports
- Use environment variables
- Write a basic Dockerfile
- Build an image
- Use `.dockerignore`
- Persist data with volumes
- Connect containers with networks
- Use Docker Compose
- Push an image to a registry
- Use meaningful image tags
- Add a health check
- Apply basic container security
- Explain how Docker fits into CI/CD
- Explain why Kubernetes is different

---

## 52. What You Now Know

You now have a path from:

**First Container → Dockerfile → Images → Networking → Storage → Compose → Registries → Security → CI/CD → Cloud/Kubernetes**

The goal is not to memorize Docker commands.

The goal is to understand how to package and run applications in a:

**Repeatable → Portable → Secure → Maintainable**

way.

---

## 53. Next

Continue with related Learn with Nelson roadmaps:

- Programming Fundamentals
- Python
- Java
- Git & GitHub
- Linux
- APIs
- Databases
- Kubernetes
- CI/CD
- AWS
- Azure
- Cloud Fundamentals
- DevOps

Then follow:

**Learn → Practice → Containerize → Prove → Deploy**

---

## One-Line Mental Model

**Docker packages applications into reproducible containers so they can run consistently across environments.**
