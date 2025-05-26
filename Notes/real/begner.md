# 🐳 Docker Complete Study Notes

> *A comprehensive guide to Docker fundamentals - organized like handwritten notes*

---

## 📋 Table of Contents

- [🎯 **Question 01**: What is Docker & Traditional Virtualization?](#-question-01-what-is-docker--traditional-virtualization)
- [🏗️ **Question 02**: Docker Architecture Components](#️-question-02-docker-architecture-components)
- [📦 **Question 03**: Docker Image vs Container](#-question-03-docker-image-vs-container)
- [🚀 **Question 04**: Creating Docker Containers](#-question-04-creating-docker-containers)
- [📝 **Question 05**: Understanding Dockerfile](#-question-05-understanding-dockerfile)
- [⚙️ **Question 06**: Common Dockerfile Instructions](#️-question-06-common-dockerfile-instructions)
- [📊 **Question 07**: Listing Docker Containers](#-question-07-listing-docker-containers)
- [🌐 **Question 08**: Docker Hub Registry](#-question-08-docker-hub-registry)
- [🛑 **Question 09**: Stop & Remove Containers](#-question-09-stop--remove-containers)
- [💾 **Question 10**: Docker Volumes](#-question-10-docker-volumes)
- [🔨 **Question 11**: Building Docker Images](#-question-11-building-docker-images)
- [🔌 **Question 12**: Exposing Ports](#-question-12-exposing-ports)
- [📄 **Question 13**: COPY vs ADD Instructions](#-question-13-copy-vs-add-instructions)
- [📋 **Question 14**: Viewing Container Logs](#-question-14-viewing-container-logs)
- [⚡ **Question 15**: CMD vs ENTRYPOINT](#-question-15-cmd-vs-entrypoint)

---

## 🎯 **Question 01**: What is Docker & Traditional Virtualization?

### 🔹 What is Docker?

Docker is an **open-source platform** that automates the deployment, scaling, and management of applications in lightweight containers.

> *Think of it as shipping containers for software!*

**Core Components:**
```
🏗️ Docker Engine
   ├── 🔧 Docker Daemon (dockerd) — manages containers/images
   ├── 💻 Docker Client (docker) — command-line interface  
   └── 🌐 REST API — Interface between client and daemon

📦 Docker Images — Immutable blueprints
🧪 Docker Containers — Running instances
📝 Dockerfile — Build instructions script
🌍 Docker Hub — Public registry
```

### 🔹 Traditional Virtualization

Uses hypervisors (VMware, VirtualBox) to create **Virtual Machines (VMs)** that include:
- Full guest OS
- Virtual hardware copy
- Applications & dependencies

### 📊 **Docker vs Traditional Virtualization**

| Feature | 🐳 Docker (Containers) | 🖥️ Traditional VMs |
|---------|----------------------|-------------------|
| **Architecture** | Shared OS kernel | Full OS per VM |
| **Resource Usage** | Lightweight ⚡ | Heavy 🐌 |
| **Startup Time** | Seconds | Minutes |
| **Performance** | Near-native | Slightly lower |
| **Isolation** | Process-level | Hardware-level |
| **Portability** | Highly portable 🚀 | Less portable |
| **Security** | Shared kernel | Strong isolation |
| **Image Size** | MBs | GBs |

---

## 🏗️ **Question 02**: Docker Architecture Components

Docker follows a **client-server model** with these key components:

### 🧑‍💻 **1. Docker Client**
- Command-line interface (CLI)
- Sends commands via REST API
- Can communicate with local/remote daemons

### 🖥️ **2. Docker Daemon (dockerd)**
```
Core Responsibilities:
├── 🏗️ Building & managing images
├── 🏃‍♂️ Running & managing containers  
├── 💾 Handling volumes & networks
└── 📝 Managing logs
```

### 🔗 **3. Docker REST API**
- Programmatic access to Docker
- Enables client-daemon communication
- Can be used with curl/Postman

### 📦 **4. Docker Images**
- Immutable, layered templates
- Stored in registries
- Built using Dockerfiles

### 🧪 **5. Docker Containers**
- Runtime instances of images
- Include writable layer
- Isolated using namespaces & cgroups

### 🗃️ **6. Docker Registries**
```
Popular Registries:
├── 🌍 Docker Hub (default)
├── 🐙 GitHub Container Registry
├── 🚀 Amazon ECR
├── 🔧 Google GCR
└── 🏠 Self-hosted registries
```

### ⚙️ **7. Container Runtime**
- **containerd**: Manages complete container lifecycle
- **runc**: Low-level OCI-compliant runtime

### 🗄️ **8. Storage Drivers**
- Uses UnionFS (OverlayFS)
- Layers images efficiently
- Writable layer per container

### 🌐 **9. Networking**

| Driver | Description |
|--------|-------------|
| `bridge` | Default; private subnet |
| `host` | Uses host's network stack |
| `none` | No networking |
| `overlay` | Docker Swarm networking |

### 📈 **Architecture Diagram**
```
┌──────────────────┐    REST API    ┌────────────────────┐
│  Docker CLI      │ ◄─────────────► │  Docker Daemon     │
│  (docker client) │                │  (dockerd)         │
└──────────────────┘                └────────────────────┘
                                               │
                                               ▼
                                    ┌────────────────────┐
                                    │  Container Runtime │
                                    │  (containerd/runc) │
                                    └────────────────────┘
                                               │
                                               ▼
                                    ┌────────────────────┐
                                    │  Linux Kernel      │
                                    │  (Namespaces,      │
                                    │   Cgroups, etc.)   │
                                    └────────────────────┘
```

### 🛡️ **Resource Isolation Methods**
1. **Namespaces** → Isolated view (PID, NET, MNT)
2. **Cgroups** → Resource limits (CPU, memory)
3. **Union Filesystems** → Efficient layered storage

---

## 📦 **Question 03**: Docker Image vs Container

### 📊 **Key Differences**

| Feature | 🖼️ **Docker Image** | 🏃‍♂️ **Docker Container** |
|---------|-------------------|-------------------------|
| **Definition** | Read-only template/blueprint | Running instance of image |
| **State** | Static & immutable | Dynamic & ephemeral |
| **Filesystem** | Multiple read-only layers | Adds writable layer on top |
| **Usage** | Used to create containers | Executes actual application |
| **Persistence** | Persistent until deleted | Temporary unless committed |
| **Creation** | Built with `docker build` | Created with `docker run` |
| **Storage** | Registry/local cache | Memory & disk while running |
| **Analogy** | Class definition 📋 | Object instance 🏃‍♂️ |

> **Simple Analogy**: Image is like a **recipe** 📝, Container is the **actual dish** 🍽️

---

## 🚀 **Question 04**: Creating Docker Containers

### 🔧 **Basic Command**
```bash
docker run nodejs
```
**What happens:**
1. ⬇️ Pulls nodejs image from Docker Hub
2. 🏗️ Creates container from image  
3. ▶️ Starts container immediately
4. 🏃‍♂️ Runs default command

### 📋 **Common Options**

| Option | Description | Example |
|--------|-------------|---------|
| `-d` | Detached (background) mode | `docker run -d nginx` |
| `--name` | Custom container name | `--name webserver` |
| `-p` | Port mapping | `-p 8080:80` |
| `-it` | Interactive terminal | `-it ubuntu bash` |
| `--rm` | Auto-remove when stopped | `--rm` |

### 💡 **Complete Example**
```bash
docker run -d --name webserver -p 8080:80 nginx
```

### 🔄 **Behind the Scenes Process**
```
🔍 Image Check → 📥 Pull (if needed) → 🏗️ Create Layer → 
🆔 Assign ID → 🛡️ Create Isolation → ▶️ Start Container
```

---

## 📝 **Question 05**: Understanding Dockerfile

### 📄 **What is a Dockerfile?**

A **text file** containing instructions to build custom Docker images.

> *Think of it as a recipe that tells Docker exactly how to cook your application!*

### 🎯 **Purpose & Benefits**

| Purpose | Description |
|---------|-------------|
| ✅ **Automate Creation** | No manual container configuration |
| ✅ **Ensure Consistency** | Same environment for all developers |
| ✅ **Version Control** | Store in Git like regular code |
| ✅ **Reusability** | Rebuild as needed with changes |
| ✅ **Infrastructure as Code** | Declarative environment definition |

### 📋 **Sample Dockerfile**
```dockerfile
# Base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application
COPY . .

# Default command
CMD ["python", "app.py"]
```

### 🔄 **How to Use**
```bash
# 1. Build image
docker build -t my-python-app .

# 2. Run container
docker run my-python-app
```

---

## ⚙️ **Question 06**: Common Dockerfile Instructions

### 📋 **Essential Instructions**

| Instruction | Purpose | Example |
|-------------|---------|---------|
| `FROM` | Sets base image | `FROM python:3.9` |
| `WORKDIR` | Sets working directory | `WORKDIR /app` |
| `COPY` | Copy files to container | `COPY . /app` |
| `RUN` | Execute commands during build | `RUN npm install` |
| `CMD` | Default command when starting | `CMD ["python", "app.py"]` |
| `EXPOSE` | Document port usage | `EXPOSE 8080` |
| `ENV` | Set environment variables | `ENV NODE_ENV=production` |

### 💡 **Pro Tips**
- Use `WORKDIR` instead of `RUN cd`
- Combine `RUN` commands to reduce layers
- Place frequently changing instructions at the end
- Use `.dockerignore` to exclude unnecessary files

---

## 📊 **Question 07**: Listing Docker Containers

### 🔍 **Basic Command**
```bash
docker ps
```

**Shows:**
- 🆔 Container ID
- 🖼️ Image name  
- 💻 Command used
- ⏰ Uptime
- 🔌 Port mappings
- 📛 Container name

### 📋 **Useful Variations**

| Command | Purpose |
|---------|---------|
| `docker ps -a` | List ALL containers (running + stopped) |
| `docker ps -q` | Show only container IDs |
| `docker ps --filter "ancestor=nginx"` | Filter by image |
| `docker ps --filter "name=webserver"` | Filter by name |
| `docker ps --format "table {{.Names}}\t{{.Status}}"` | Custom format |

---

## 🌐 **Question 08**: Docker Hub Registry

### 🏢 **What is Docker Hub?**

Docker's **official cloud-based registry** for container images.

> *It's like GitHub, but for Docker images!*

### ✨ **Key Features**

| Feature | Description |
|---------|-------------|
| **📦 Image Repository** | Public & private repositories |
| **🏆 Official Images** | Trusted images (nginx, mysql, node) |
| **✅ Verified Publishers** | Verified vendor images |
| **👥 Team Collaboration** | Organization accounts |
| **🌐 Web UI & API** | Manage via browser or API |
| **🔄 Build Triggers** | Auto-build from GitHub/GitLab |
| **🏷️ Tagging & Versioning** | Organize with tags (python:3.11-slim) |

### 💡 **Common Commands**
```bash
# Pull official image
docker pull ubuntu

# Run from Docker Hub
docker run nginx

# Search for images
docker search redis
```

---

## 🛑 **Question 09**: Stop & Remove Containers

### 🔄 **Step-by-Step Process**

| Action | Command | Description |
|--------|---------|-------------|
| **1. Stop** | `docker stop <name/id>` | Sends SIGTERM (graceful) |
| **2. Remove** | `docker rm <name/id>` | Removes stopped container |
| **Force Stop+Remove** | `docker rm -f <name/id>` | Force stop and remove |
| **Cleanup All** | `docker container prune` | Remove all stopped containers |

### 💡 **Examples**
```bash
# Graceful stop
docker stop webserver

# Remove stopped container
docker rm webserver

# Force remove running container
docker rm -f webserver

# Clean up all stopped containers
docker container prune
```

### ⚠️ **Important Notes**
- `docker stop` waits 10 seconds before SIGKILL
- Removed containers lose all data (unless using volumes)
- Use `--rm` flag to auto-remove containers

---

## 💾 **Question 10**: Docker Volumes

### 📦 **What are Docker Volumes?**

**Persistent storage** locations managed by Docker that exist **outside** the container's writable layer.

### 🎯 **Why Volumes are Important**

| Benefit | Description |
|---------|-------------|
| **💾 Persistence** | Data survives container removal/recreation |
| **⚡ Performance** | Optimized for speed and I/O efficiency |
| **🔒 Isolation** | Managed by Docker, platform independent |
| **🤝 Sharing** | Multiple containers can share volumes |
| **💼 Backup & Restore** | Easy backup with standard tools |

### 🛠️ **Volume Commands**

```bash
# Create volume
docker volume create mydata

# Use volume in container
docker run -d --name web -v mydata:/usr/share/nginx/html nginx

# List volumes
docker volume ls

# Inspect volume
docker volume inspect mydata

# Remove volume
docker volume rm mydata
```

### 📋 **Volume Types**
1. **Named Volumes** → `docker volume create`
2. **Anonymous Volumes** → Created automatically
3. **Bind Mounts** → Host directory mapping

---

## 🔨 **Question 11**: Building Docker Images

### 🏗️ **Basic Build Command**
```bash
docker build -t <image_name>:<tag> <path>
```

### 💡 **Example**
```bash
docker build -t myapp:latest .
```
- `-t myapp:latest` → Name and tag the image
- `.` → Build context (current directory)

### 📋 **Build Options**

| Option | Description | Example |
|--------|-------------|---------|
| `-t` | Name and tag image | `-t myapp:v1.0` |
| `-f` | Custom Dockerfile name | `-f Dockerfile.dev` |
| `--no-cache` | Disable layer cache | `--no-cache` |
| `--build-arg` | Pass build arguments | `--build-arg NODE_ENV=prod` |
| `--platform` | Target platform | `--platform linux/arm64` |

### 🔄 **Build Process**
```
📁 Read Context → 📝 Parse Dockerfile → 🏗️ Execute Instructions → 
📦 Create Layers → 🏷️ Tag Image → ✅ Complete
```

---

## 🔌 **Question 12**: Exposing Ports

### 🌐 **Port Mapping Basics**

Map ports between **host machine** and **Docker container** for external access.

### 🔧 **Basic Syntax**
```bash
docker run -p <host_port>:<container_port> <image>
```

### 💡 **Examples**
```bash
# Single port mapping
docker run -d -p 8080:80 nginx

# Multiple ports
docker run -p 5000:5000 -p 8000:8000 myapp

# Bind to specific interface
docker run -p 127.0.0.1:8080:80 nginx

# Random host port
docker run -P nginx
```

### 📋 **Port Options**

| Option | Description | Example |
|--------|-------------|---------|
| `-p 8080:80` | Map host:container ports | External → Internal |
| `-p 80` | Map to random host port | Docker chooses port |
| `-P` | Publish all exposed ports | Auto-map all EXPOSE ports |
| `--publish` | Same as `-p` | Long form |

---

## 📄 **Question 13**: COPY vs ADD Instructions

### 📊 **Key Differences**

| Feature | 📋 `COPY` | ➕ `ADD` |
|---------|-----------|---------|
| **Purpose** | Simple file copy | File copy + extra features |
| **Syntax** | `COPY <src> <dest>` | `ADD <src> <dest>` |
| **Local Files** | ✅ Yes | ✅ Yes |
| **URL Support** | ❌ No | ✅ Downloads from URLs |
| **Tar Handling** | ❌ No auto-extract | ✅ Auto-extracts tar files |
| **Best Practice** | ✅ Preferred (predictable) | ⚠️ Use sparingly |

### 💡 **Examples**

```dockerfile
# COPY - Simple and clear
COPY package.json /app/
COPY . /app/

# ADD - Extra features
ADD https://example.com/file.tar.gz /tmp/
ADD archive.tar.gz /extracted/  # Auto-extracts
```

### 🎯 **When to Use**
- **Use COPY** → For regular file copying (90% of cases)
- **Use ADD** → Only when you need URL download or tar extraction

---

## 📋 **Question 14**: Viewing Container Logs

### 📊 **What are Logs?**

**Records of events** generated by applications for:
- 🛠️ **Debugging** → Trace bugs and issues
- 📊 **Monitoring** → Health and performance tracking  
- 🕵️ **Auditing** → Security and compliance
- 📈 **Analytics** → Usage patterns and insights
- ⚠️ **Alerts** → Trigger notifications

### 📄 **Basic Log Command**
```bash
docker logs <container_id_or_name>
```

### 🔍 **Log Options**

| Option | Description | Example |
|--------|-------------|---------|
| `-f` | Follow logs (like `tail -f`) | `docker logs -f myapp` |
| `--tail <n>` | Show last n lines | `--tail 50` |
| `-t` | Show timestamps | `docker logs -t myapp` |
| `--since` | Logs since time/duration | `--since 2024-01-01` or `--since 5m` |
| `--until` | Logs until specific time | `--until 2024-01-02` |

### 💡 **Practical Examples**
```bash
# Follow live logs
docker logs -f --tail 100 webserver

# Logs from last 30 minutes with timestamps
docker logs -t --since 30m myapp

# Logs between specific times
docker logs --since "2024-01-01T00:00:00" --until "2024-01-01T12:00:00" myapp
```

---

## ⚡ **Question 15**: CMD vs ENTRYPOINT

### 📊 **Key Differences**

| Aspect | 📝 `CMD` | 🎯 `ENTRYPOINT` |
|--------|----------|----------------|
| **Purpose** | Default **arguments** | Main **command** to run |
| **Overridable?** | ✅ Easily overridden | ⚠️ Not easily overridden |
| **Use Case** | Default args/scripts | Lock container to specific app |
| **Form** | Shell or exec form | Usually exec form |

### 💡 **Examples**

#### 📝 **CMD Example**
```dockerfile
FROM ubuntu
CMD ["echo", "Hello from CMD"]
```
```bash
# Uses CMD
docker run myimage
# Output: Hello from CMD

# Override CMD
docker run myimage echo "Custom message"
# Output: Custom message
```

#### 🎯 **ENTRYPOINT Example**
```dockerfile
FROM ubuntu
ENTRYPOINT ["echo"]
```
```bash
# Uses ENTRYPOINT
docker run myimage "Hello World"
# Output: Hello World

# Cannot easily override
docker run myimage ls
# Output: ls (echo command still runs)
```

#### 🔄 **Combined Usage**
```dockerfile
FROM ubuntu
ENTRYPOINT ["echo"]
CMD ["Hello Default"]
```
```bash
# Uses both
docker run myimage
# Output: Hello Default

# Override CMD only
docker run myimage "Custom Message"
# Output: Custom Message
```

### 🎯 **Best Practices**
- **Use CMD** → For flexible default behavior
- **Use ENTRYPOINT** → For fixed application behavior
- **Combine both** → ENTRYPOINT for command, CMD for default args

---

## 🎉 **Conclusion**

This comprehensive guide covers all essential Docker concepts from basic containerization to advanced Dockerfile instructions. Each section is designed to build upon the previous knowledge, creating a complete learning path for Docker mastery.

### 🚀 **Next Steps**
1. Practice with hands-on Docker exercises
2. Explore Docker Compose for multi-container apps
3. Learn about Docker Swarm for orchestration
4. Study Kubernetes for advanced container management

---

> **Happy Dockering!** 🐳✨

*Made with ❤️ for Docker learners everywhere*