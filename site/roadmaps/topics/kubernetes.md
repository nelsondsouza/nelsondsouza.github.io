# Kubernetes Roadmap

> A beginner-friendly path from understanding Kubernetes to deploying, scaling, securing, and operating containerized applications.

## 1. Start Here

Kubernetes is a **container orchestration platform**.

Docker helps you build and run containers.

Kubernetes helps you manage containers across a cluster.

A simple mental model:

**Container → Pod → Deployment → Service → Cluster → Production**

Kubernetes can help with:

- Scheduling workloads
- Scaling applications
- Service discovery
- Load distribution
- Rolling updates
- Self-healing
- Configuration
- Secrets
- Resource management

Do not try to memorize YAML first.

Understand the concepts first.

---

## 2. What You Need Before Kubernetes

You should understand:

- Basic computer concepts
- Command line
- Containers
- Docker
- Images
- Ports
- Basic networking

Helpful:

- Linux
- Git & GitHub
- YAML
- APIs
- Cloud fundamentals

If Docker is completely new to you, learn Docker first.

---

## 3. Containers vs Kubernetes

### Docker

Think:

**Build → Package → Run**

Docker is commonly used to create and run container images.

### Kubernetes

Think:

**Deploy → Schedule → Connect → Scale → Heal → Operate**

Kubernetes manages containerized workloads across one or more machines.

A common architecture is:

**Developer → Image Registry → Kubernetes Cluster → Running Application**

---

## 4. Understand a Cluster

A Kubernetes cluster is a group of machines working together to run workloads.

Conceptually:

```text
Kubernetes Cluster
├── Control Plane
└── Worker Nodes
    ├── Pod
    ├── Pod
    └── Pod
```

### Control Plane

Makes cluster-level decisions.

### Worker Node

Runs application workloads.

You do not need to memorize every internal component initially.

---

## 5. Control Plane

Learn the purpose of:

- API server
- Scheduler
- Controller manager
- Cluster state storage

The **API server** is the main entry point for Kubernetes API operations.

The **scheduler** decides where eligible Pods should run.

Controllers continuously work toward the desired state.

The cluster state is stored in **etcd**.

Mental model:

**Desired State → Kubernetes Controllers → Actual State**

---

## 6. Kubernetes API

Kubernetes is heavily API-driven.

When you use:

```text
kubectl
```

you are generally communicating with the Kubernetes API.

Learn:

- Resources
- Objects
- API groups
- Namespaces
- `apiVersion`
- `kind`
- `metadata`
- `spec`
- `status`

A Kubernetes object usually describes:

**What I want → What currently exists**

---

## 7. kubectl

`kubectl` is the primary command-line tool for interacting with Kubernetes clusters.

Start with:

```text
kubectl version
kubectl cluster-info
kubectl get nodes
kubectl get pods
kubectl get services
```

Then learn:

```text
kubectl describe
kubectl logs
kubectl exec
kubectl apply
kubectl delete
```

Do not memorize hundreds of commands.

Learn how to discover commands:

```text
kubectl --help
kubectl explain
```

---

## 8. YAML

Kubernetes configurations are commonly written in YAML.

Basic structure:

```yaml
apiVersion: ...
kind: ...
metadata:
  name: ...
spec:
  ...
```

Understand:

- Indentation
- Lists
- Key/value pairs
- Strings
- Numbers
- Booleans

A YAML formatting mistake can prevent an object from being created.

---

## 9. Namespaces

Namespaces provide a way to organize and isolate groups of resources within a cluster.

Examples:

```text
development
testing
production
```

Useful commands:

```text
kubectl get namespaces
kubectl create namespace dev
kubectl get pods -n dev
```

Do not assume namespaces provide complete security isolation by themselves.

---

## 10. Pods

A **Pod** is the smallest deployable unit in Kubernetes.

A Pod can contain one or more containers.

Common beginner model:

```text
Pod
└── Application Container
```

Learn:

- Pod lifecycle
- Pod IP
- Container inside a Pod
- Pod scheduling
- Pod restart behavior

Usually, you do not manage individual Pods directly for production applications.

---

## 11. Pod Lifecycle

Understand states such as:

- Pending
- Running
- Succeeded
- Failed
- Unknown

Also understand:

- Container restarts
- Startup failures
- Scheduling failures
- Termination

When something goes wrong, start with:

```text
kubectl get pods
kubectl describe pod <name>
kubectl logs <name>
```

---

## 12. Labels and Selectors

Labels attach identifying metadata to Kubernetes objects.

Example:

```yaml
labels:
  app: web
```

Selectors allow Kubernetes resources to find matching objects.

Mental model:

**Labels identify → Selectors find**

This concept is fundamental to Services, Deployments, and many other resources.

---

## 13. Deployments

A Deployment manages a set of replicated Pods.

Typical flow:

```text
Deployment
    ↓
ReplicaSet
    ↓
Pods
    ↓
Containers
```

A Deployment helps with:

- Desired replica count
- Rolling updates
- Rollbacks
- Pod replacement

For many stateless applications, Deployment is the standard starting point.

---

## 14. ReplicaSets

A ReplicaSet maintains a desired number of matching Pods.

Example:

```text
Desired: 3 Pods

Pod A
Pod B
Pod C
```

If a Pod disappears, the ReplicaSet helps create a replacement.

Usually, you manage the Deployment rather than creating ReplicaSets directly.

---

## 15. Services

Pods are replaceable and their IP addresses can change.

A **Service** provides a stable way to reach a set of Pods.

Mental model:

```text
Client
  ↓
Service
  ↓
Pods
```

Learn:

- ClusterIP
- NodePort
- LoadBalancer
- Service selectors

---

## 16. Service Discovery

Applications need to find other services.

Kubernetes provides service discovery mechanisms, commonly through DNS.

Instead of depending on changing Pod IP addresses:

```text
api-service
```

can be used as a stable service name within the cluster.

Learn:

**Service name → DNS → Service → Pods**

---

## 17. Ingress and Gateway Concepts

External users need a way to reach applications.

Learn the concepts behind:

- Ingress
- Ingress controllers
- Gateway API
- HTTP routing
- TLS termination
- Host-based routing
- Path-based routing

Understand that **Ingress is an API/resource concept**, while an Ingress controller implements the behavior.

---

## 18. ConfigMaps

Applications need configuration that is not necessarily secret.

A ConfigMap can store non-sensitive configuration.

Examples:

- Application mode
- Feature settings
- Service URLs
- Configuration files

Do not use ConfigMaps for passwords or other sensitive secrets.

---

## 19. Secrets

Secrets are intended for sensitive configuration such as:

- Credentials
- Tokens
- Certificates
- Keys

Learn:

- Creating Secrets
- Mounting Secrets
- Environment variables
- Secret volumes
- External secret-management systems

Important:

**Kubernetes Secret does not automatically mean your secret is strongly protected in every environment.**

Understand encryption at rest and access controls.

---

## 20. Volumes

Containers are often disposable.

Applications may need persistent data.

Learn:

- Volumes
- PersistentVolume
- PersistentVolumeClaim
- StorageClass

Mental model:

```text
Application
    ↓
PVC
    ↓
Storage
```

Storage is especially important for databases and stateful workloads.

---

## 21. StatefulSets

Some applications need stable identity and persistent storage.

Examples:

- Databases
- Distributed systems
- Stateful services

A StatefulSet can provide:

- Stable network identity
- Ordered operations
- Stable storage associations

Do not automatically use StatefulSets for every application.

---

## 22. DaemonSets

A DaemonSet ensures that a Pod runs on selected nodes according to its scheduling rules.

Common use cases include:

- Node-level agents
- Logging agents
- Monitoring agents
- Security agents

Mental model:

**One suitable workload instance per node**

---

## 23. Jobs and CronJobs

### Job

Runs work to completion.

Examples:

- Data processing
- Migration
- Batch task

### CronJob

Creates Jobs on a schedule.

Examples:

- Nightly cleanup
- Scheduled reports
- Periodic backups

Understand:

**Deployment = continuously running workload**

**Job = completion-oriented workload**

**CronJob = scheduled Job**

---

## 24. Resource Requests and Limits

Containers consume resources.

Kubernetes lets you specify:

- CPU requests
- Memory requests
- CPU limits
- Memory limits

Requests influence scheduling.

Limits constrain resource usage according to Kubernetes behavior and the configured runtime.

Learn why resource settings matter for:

- Stability
- Scheduling
- Capacity
- Performance
- Cost

---

## 25. Probes

Kubernetes can check application health.

Learn:

### Startup Probe

Is the application starting successfully?

### Readiness Probe

Is the application ready to receive traffic?

### Liveness Probe

Should Kubernetes restart the container because it is unhealthy?

Mental model:

**Startup → Ready → Healthy**

Do not use a liveness probe as a substitute for proper application design.

---

## 26. Scheduling

Kubernetes decides where Pods run.

Learn:

- Node selection
- Node labels
- Node selectors
- Affinity
- Anti-affinity
- Taints
- Tolerations

Start simple.

Understand why a Pod may remain:

```text
Pending
```

before learning advanced scheduling rules.

---

## 27. Horizontal Scaling

A Deployment can run multiple replicas.

Example:

```text
1 Pod
 ↓
3 Pods
 ↓
10 Pods
```

Learn:

- Manual scaling
- Horizontal Pod Autoscaler
- CPU/memory metrics
- Application metrics
- Scaling behavior

Scaling is not simply "add more Pods."

Understand what limits the application.

---

## 28. Rolling Updates

Deployments can update applications gradually.

Concept:

```text
Old Pods
   ↓
New Pods
   ↓
Old Pods removed
```

Learn:

- Rolling updates
- Deployment strategy
- Availability
- Update progress
- Rollback

Useful commands:

```text
kubectl rollout status deployment/<name>
kubectl rollout history deployment/<name>
kubectl rollout undo deployment/<name>
```

---

## 29. Networking

Learn Kubernetes networking concepts:

- Pod-to-Pod communication
- Service-to-Pod communication
- External-to-Service communication
- Cluster DNS
- Network policies
- Container network interface concepts

Do not confuse:

**Pod IP**

with

**Service IP**

with

**Node IP**

with

**External IP**

---

## 30. Network Policies

NetworkPolicy can control which traffic is allowed between workloads, depending on the cluster networking implementation.

Think:

**Default connectivity → Define allowed communication**

Use least-privilege network access where appropriate.

Do not assume NetworkPolicy works unless the cluster's networking implementation supports and enforces it.

---

## 31. Security Fundamentals

Learn:

- Authentication
- Authorization
- RBAC
- Service accounts
- Secrets
- Pod security
- Network policies
- Least privilege
- Image security
- Admission controls

A Kubernetes cluster is not secure simply because it is private.

---

## 32. RBAC

RBAC means:

**Role-Based Access Control**

Understand:

- Role
- ClusterRole
- RoleBinding
- ClusterRoleBinding
- ServiceAccount

Mental model:

**Who → Can do what → To which resources**

Grant the minimum permissions required.

---

## 33. Service Accounts

Workloads may need to interact with the Kubernetes API or other systems.

Service accounts provide workload identities within Kubernetes.

Learn:

- ServiceAccount
- RBAC permissions
- Token handling
- Workload identity concepts

Do not give every application broad cluster permissions.

---

## 34. Container Image Security

Kubernetes runs container images.

Security therefore begins before deployment.

Learn:

- Trusted base images
- Image scanning
- Dependency vulnerabilities
- Image signing and verification concepts
- SBOM concepts
- Private registries
- Versioned images

Avoid treating:

```text
latest
```

as a complete versioning strategy.

---

## 35. Helm

Helm is a package manager and templating tool commonly used with Kubernetes.

Learn:

- Charts
- Templates
- Values
- Releases
- Repositories

Mental model:

**Chart + Values → Kubernetes Resources**

Use Helm after understanding raw Kubernetes manifests.

---

## 36. Kustomize

Kustomize lets you customize Kubernetes manifests without requiring a general-purpose template engine.

Learn:

- Base
- Overlay
- Patches
- Environment-specific configuration

Example:

```text
base
├── development
├── staging
└── production
```

Understand when Helm or Kustomize is appropriate.

---

## 37. Observability

A production cluster needs visibility.

Learn:

### Logs

What happened?

### Metrics

How much / how often?

### Traces

Where did a request travel?

Also learn:

- Cluster metrics
- Application metrics
- Events
- Alerts
- Dashboards

A useful mental model:

**Logs + Metrics + Traces + Events → Observability**

---

## 38. Troubleshooting

Learn a repeatable debugging process.

### Step 1

Check resources:

```text
kubectl get pods
kubectl get deployments
kubectl get services
```

### Step 2

Describe the resource:

```text
kubectl describe pod <name>
```

### Step 3

Read logs:

```text
kubectl logs <name>
```

### Step 4

Check events:

```text
kubectl get events
```

### Step 5

Inspect networking and configuration.

### Step 6

Check resource requests, limits, probes, and scheduling.

Do not randomly delete resources until the problem disappears.

---

## 39. Common Kubernetes Problems

Learn to recognize:

- `ImagePullBackOff`
- `ErrImagePull`
- `CrashLoopBackOff`
- `Pending`
- `CreateContainerConfigError`
- Failed probes
- Service selector mismatch
- DNS failures
- Insufficient resources
- Permission errors
- Volume mounting failures

The status is a clue, not the diagnosis.

---

## 40. Local Kubernetes

Before using a cloud cluster, practice locally.

Common learning environments include:

- Docker Desktop Kubernetes
- Minikube
- Kind

Your goal:

```text
Local Machine
    ↓
Local Kubernetes Cluster
    ↓
Deploy Application
    ↓
Access Application
```

Use whichever environment best fits your computer and learning setup.

---

## 41. Kubernetes in the Cloud

Major cloud providers offer managed Kubernetes services.

Examples include:

- Amazon EKS
- Azure Kubernetes Service
- Google Kubernetes Engine

Managed Kubernetes reduces some operational responsibilities, but you still need to understand:

- Networking
- Identity
- Storage
- Security
- Scaling
- Costs
- Observability

Cloud Kubernetes is not "Kubernetes without complexity."

---

## 42. CI/CD with Kubernetes

A common delivery flow:

```text
Code
 ↓
Test
 ↓
Build Image
 ↓
Scan
 ↓
Push Image
 ↓
Deploy
 ↓
Verify
```

Learn how CI/CD can update:

- Image tags
- Kubernetes manifests
- Helm releases
- Kustomize overlays

Avoid deploying untested images directly to production.

---

## 43. GitOps

GitOps uses Git as an important source of desired deployment configuration.

Conceptually:

```text
Git
 ↓
Desired Configuration
 ↓
GitOps Controller
 ↓
Kubernetes Cluster
```

Learn the principles before learning a specific GitOps tool.

Common tools include:

- Argo CD
- Flux

---

## 44. High Availability

Production systems may need resilience against failures.

Learn:

- Multiple replicas
- Multiple nodes
- Pod disruption concepts
- Availability zones
- Scheduling constraints
- Load distribution
- Failure domains

More replicas do not automatically guarantee high availability.

Architecture matters.

---

## 45. Cost Management

Kubernetes can become expensive when resources are poorly managed.

Understand:

- CPU requests
- Memory requests
- Limits
- Node utilization
- Autoscaling
- Cluster capacity
- Idle workloads
- Cloud infrastructure costs

Good Kubernetes operations balance:

**Reliability + Performance + Security + Cost**

---

## 46. Production Architecture

A simplified production model:

```text
Users
  ↓
DNS / Edge
  ↓
Load Balancer
  ↓
Ingress / Gateway
  ↓
Services
  ↓
Pods
  ↓
Application Dependencies
  ↓
Databases / Storage
```

Supporting systems include:

- Identity
- Secrets
- Monitoring
- Logging
- CI/CD
- Registry
- Backup
- Security controls

---

## 47. Common Beginner Mistakes

Avoid:

- Learning YAML without understanding Kubernetes
- Treating Pods like permanent servers
- Managing production Pods manually
- Using `latest` blindly
- Giving workloads excessive permissions
- Storing important data only inside ephemeral containers
- Exposing unnecessary services
- Ignoring resource requests
- Ignoring health probes
- Assuming running means healthy
- Skipping logs and events when troubleshooting
- Installing too many tools too early
- Jumping into service meshes before mastering fundamentals
- Moving to production before practicing failure scenarios

---

## 48. Practice Projects

### Project 1 — Deploy a Web App

Create:

```text
Deployment
    ↓
Pod
    ↓
Container
```

Add:

- Service
- Port
- Labels
- Selectors

Goal:

**Deploy and access a containerized application.**

### Project 2 — Web + Database

Create:

```text
Web App
   ↓
Service
   ↓
Database
   ↓
Persistent Storage
```

Use:

- Deployment
- Service
- Secret
- ConfigMap
- PVC

Goal:

**Understand networking, configuration, and persistence.**

### Project 3 — Production-Style Application

Build:

```text
Ingress / Gateway
       ↓
Service
       ↓
Deployment
       ↓
Pods
       ↓
Database
```

Add:

- Health probes
- Resource requests
- Autoscaling
- RBAC
- Network policy
- Monitoring
- CI/CD
- Versioned images

Goal:

**Operate a realistic Kubernetes workload.**

---

## 49. Use AI With Kubernetes

AI can help you:

- Explain Kubernetes resources
- Generate starter manifests
- Explain YAML errors
- Diagnose `CrashLoopBackOff`
- Explain scheduling failures
- Review RBAC permissions
- Explain networking
- Review Helm charts
- Analyze logs and events
- Create practice scenarios

Give AI:

- Kubernetes version
- Resource YAML
- `kubectl` output
- Logs
- Events
- Expected behavior

Never blindly apply AI-generated manifests to production.

Review:

**Permissions → Images → Network access → Storage → Resources → Secrets**

---

## 50. What to Learn First

If you are completely new:

1. Containers
2. Kubernetes purpose
3. Cluster
4. Control plane
5. Worker nodes
6. `kubectl`
7. YAML
8. Namespaces
9. Pods
10. Labels and selectors
11. Deployments
12. Services
13. Service discovery
14. ConfigMaps
15. Secrets
16. Volumes and PVCs
17. Probes
18. Resource requests and limits
19. Networking
20. Ingress / Gateway concepts
21. Scaling
22. Rolling updates
23. RBAC
24. Security
25. Helm / Kustomize
26. Observability
27. CI/CD
28. Cloud Kubernetes
29. GitOps
30. High availability

Do not start with advanced cluster administration.

---

## 51. Beginner-to-Advanced Sequence

### Level 1 — Kubernetes Basics

Learn:

- Cluster
- Nodes
- Pods
- `kubectl`
- YAML
- Namespaces

### Level 2 — Application Deployment

Learn:

- Deployments
- ReplicaSets
- Services
- Labels
- Selectors

### Level 3 — Configuration and Storage

Learn:

- ConfigMaps
- Secrets
- Volumes
- PVCs
- StorageClasses

### Level 4 — Application Reliability

Learn:

- Probes
- Resource requests
- Resource limits
- Scaling
- Rolling updates
- Rollbacks

### Level 5 — Networking

Learn:

- DNS
- Services
- Ingress
- Gateway API
- Network policies

### Level 6 — Security

Learn:

- RBAC
- Service accounts
- Pod security
- Image security
- Secrets
- Least privilege

### Level 7 — Operations

Learn:

- Logs
- Metrics
- Events
- Troubleshooting
- Autoscaling
- Capacity
- Cost

### Level 8 — Platform Engineering

Explore:

- Helm
- Kustomize
- GitOps
- Policy
- Admission controls
- Multi-cluster management
- Cloud Kubernetes
- Advanced observability

---

## 52. Your Everyday Kubernetes Workflow

A practical workflow:

**1. Build**

Create your application container image.

**2. Publish**

Push the image to a registry.

**3. Define**

Create Kubernetes manifests.

**4. Apply**

```text
kubectl apply -f ...
```

**5. Inspect**

```text
kubectl get ...
```

**6. Verify**

Check:

- Pods
- Services
- Logs
- Probes

**7. Troubleshoot**

Use:

```text
kubectl describe
kubectl logs
kubectl get events
```

**8. Update**

Deploy a new image version.

**9. Observe**

Monitor health and performance.

**10. Roll back**

Return to a known-good version when necessary.

---

## 53. You Are Ready When You Can

You are ready to move beyond Kubernetes fundamentals when you can:

- Explain why Kubernetes exists
- Explain a cluster
- Explain control plane vs worker node
- Use `kubectl`
- Read Kubernetes YAML
- Create a Namespace
- Understand Pods
- Deploy an application
- Create a Service
- Explain labels and selectors
- Configure environment values
- Use ConfigMaps and Secrets appropriately
- Persist data with PVCs
- Explain Deployments
- Configure health probes
- Set resource requests and limits
- Troubleshoot failed Pods
- Explain Kubernetes networking
- Apply basic RBAC
- Understand rolling updates and rollbacks
- Scale workloads
- Explain Helm and Kustomize
- Understand observability
- Explain CI/CD deployment
- Explain managed cloud Kubernetes
- Apply basic production security principles

---

## 54. What You Now Know

You now have a path from:

**Container → Pod → Deployment → Service → Storage → Networking → Security → Scaling → Observability → CI/CD → Cloud**

The goal is not to memorize Kubernetes YAML.

The goal is to understand how Kubernetes maintains a desired application state across a cluster.

---

## 55. Next

Continue with related Learn with Nelson roadmaps:

- Docker
- Linux
- Git & GitHub
- APIs
- Databases
- AWS
- Azure
- Cloud Fundamentals
- DevOps
- Terraform
- CI/CD
- Software Architecture
- Cybersecurity

Then follow:

**Learn → Containerize → Deploy → Observe → Secure → Scale → Prove**

---

## One-Line Mental Model

**Kubernetes keeps containerized applications running in the desired state across a cluster.**
