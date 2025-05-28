QUESTION NUMBER 16 :- Explain Docker networking. What are the different network drivers available?

    Docker networking is a fundamental part of how Docker containers communicate with each other and with the outside world. It provides various networking models (via network drivers) that support diverse use cases—from simple container-to-container communication on the same host to complex multi-host and overlay networks.

🧰 Docker Network Drivers
Docker provides several built-in drivers, each with specific use cases:
    1. bridge (Default for standalone containers)
        1.1 Use Case: Containers on the same host that need to communicate.

        1.2 Mechanism: Creates a Linux bridge (docker0) and connects containers via veth pairs.

        1.3 DNS Support: Yes, with --name or custom bridge network.

        1.4 Isolation: Containers are isolated unless explicitly linked or on the same custom bridge.

        CMD :- docker network create --driver bridge my-bridge-name

        🔍 By default, Docker creates the bridge network called bridge.

    2. host
        2.1 Use Case: When performance is critical and network isolation isn't needed.

        2.2 Mechanism: Container shares the host's network namespace (no virtual NIC).

        2.3 Ports: No need to publish ports; the container uses host’s IP directly.

        CMD :- docker run --network host nginx

        🔍 Useful for performance-critical apps or when services must bind to specific IPs.

    3. none
        3.1 Use Case: Completely isolated containers (no network).

        3.2 Mechanism: Container gets its own network namespace, but no interfaces (except loopback).

        3.3 Use Case: Security, testing, manual network configuration.


    4. overlay
        4.1 Use Case: Multi-host networking using Docker Swarm or Docker Enterprise.

        4.2 Mechanism: Creates a virtual network that spans across nodes using VXLAN encapsulation
        4.3 ncryption: Supports encrypted communication between nodes.

        4.4 DNS: Built-in service discovery via internal DNS.    

        cmd :- docker network create --driver overlay --attachable my-overlay

        🔍 Requires Swarm mode to be enabled. Great for microservices.
    
    5. macvlan
        5.1 Use Case: When containers need to appear as physical devices on the network.

        5.2 Mechanism: Assigns a MAC address to each container and connects them directly to the host's network.

        5.3 IP Management: Requires manual IP assignment or integration with DHCP.

        cmd :- docker network create -d macvlan \
                --subnet=192.168.1.0/24 \
                --gateway=192.168.1.1 \
                -o parent=eth0 my-macvlan-net

        🔍 Best for legacy applications or network appliances.

    6. ipvlan (Advanced)
        6.1 Use Case: Like macvlan, but simpler MAC handling and better suited to large-scale environments.

        6.2 Mechanism: Uses parent interface's MAC address; supports L2 (bridge mode) and L3 (routing mode).

        6.3 Performance: Slightly better than macvlan due to reduced ARP traffic.

🔄 Docker Network Lifecycle Commands:- 
    | Action               | Command                                           |
| -------------------- | ------------------------------------------------- |
| List networks        | `docker network ls`                               |
| Inspect a network    | `docker network inspect <network>`                |
| Create a network     | `docker network create --driver <driver> <name>`  |
| Connect container    | `docker network connect <network> <container>`    |
| Disconnect container | `docker network disconnect <network> <container>` |

🧪 Common Scenarios
| Scenario                            | Recommended Driver         |
| ----------------------------------- | -------------------------- |
| Local container communication       | `bridge`                   |
| No network access needed            | `none`                     |
| Host-level performance              | `host`                     |
| Multi-host app (Swarm)              | `overlay`                  |
| Access to physical LAN              | `macvlan` or `ipvlan`      |
| Large-scale policy-based networking | CNI plugins (e.g., Calico) |

/
===================================================================================================

OUESTION NO 17 . How would you share data between a host and a Docker container?

Sharing data between the host and a Docker container is a common and powerful feature. Docker supports this primarily through volumes and bind mounts.

🧰 Methods to Share Data Between Host and Docker Container

There are two primary ways:
    

    1. Volumes (Recommended)
        Volumes are managed by Docker and stored in a part of the host filesystem. They are ideal for persistent data.

        To create a named volume explicitly:--docker run -v my_volume:/app/data my_image

        Pros:
            Managed by Docker (cleaner, safer).

            ata persists after container is removed.

            Can be shared among containers.

       2. Bind Mounts
         Maps a specific directory or file on the host to the container.
         docker run -v /host/path:/container/path my_image

         Pros:
                Direct access to host files.

                Useful for development (e.g., live code reloading).
        Cons:
                Less portable (depends on host path).

                Requires host path to exist.

===================================================================================================
QUESTION NUMBER 18 :- What is Docker Compose and when would you use it?

Docker Compose is a tool that allows you to define and manage multi-container Docker applications using a simple YAML file (docker-compose.yml). Instead of running multiple docker run commands manually, you can define all services, networks, and volumes in one file and bring them up with a single command.

    ✅ When to Use Docker Compose
        You would use Docker Compose when:

            You have multiple services that need to run together.

        E.g., a web server, a database, a cache (like Flask + PostgreSQL + Redis).

            You want reproducible, consistent environments.

        Great for development, testing, CI/CD pipelines.

            You want to simplify complex setups.

        Replace many docker run commands with a single docker-compose up.

            You need isolated environments per project.

        Each project can have its own docker-compose.yml and containers.

🧱 Basic Example of docker-compose.yml
version: '3.8'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html

  db:
    image: postgres
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password

CMD = docker-compose up

🛠 Common Commands
    docker-compose up – Start services.

    docker-compose down – Stop and remove services.

    docker-compose build – Build or rebuild services.

    docker-compose logs – View logs for services.

    docker-compose exec – Run a command in a running container.


🧪 When Not to Use Docker Compose
    For production orchestration, you might prefer tools like Docker Swarm or Kubernetes, though    Compose can still be used for simple deployments.

    If you only run a single container without dependencies, Compose might be overkill.

===================================================================================================

QUESTION NUMBER 19 :- How do environment variables work in Docker?

Environment variables in Docker allow you to pass configuration values into containers at runtime — a clean, flexible way to customize container behavior without modifying code or image files.

🧪 Ways to Set Environment Variables in Docker:
    1. Using -e Flag in docker run:---docker run -e MY_VAR=value my_image

    2. Using an Environment File (--env-file)
        Create a file called .env or env.list:
            MY_VAR=value
            ANOTHER_VAR=123
        cmd :- docker run --env-file env.list my_image
    3. In Docker Compose (docker-compose.yml)

        version: '3.8'
            Services:
            app:
                image: my_image
                environment:
                - MY_VAR=value
                - DB_PORT=5432

===================================================================================================

QUESTION NUMBER 20:- What is the purpose of the .dockerignore file?

ChatGPT said:
The .dockerignore file serves the same purpose as .gitignore — it tells Docker which files and directories to exclude when building an image using a Dockerfile.

🧩 Why is .dockerignore Important?

    1. Reduce image size
        Prevent unnecessary files (like docs, .git, logs, or local config) from being copied into the image.

    2. Speed up builds
        Fewer files = faster context upload to the Docker daemon.

    3.Improve security
        Exclude sensitive files like .env, SSH keys, or API secrets from being baked into images.

    4.Prevent cache invalidation
        Unchanging, ignored files won't trigger unnecessary rebuilds of layers.

🧪 Example .dockerignore
# Ignore node_modules and git directory
node_modules/
.git/

# Ignore temporary files
*.log
*.tmp

# Ignore environment and secrets
.env
secrets/


===================================================================================================
QUESTION NUMBER 21:- How do you implement multi-stage builds in Docker?

Multi-stage builds in Docker allow you to use multiple FROM statements in a single Dockerfile to optimize image size and separate build-time and runtime dependencies.

🧱 Why Use Multi-Stage Builds?
    Smaller final images – only copy what's needed to run the app.

    Cleaner separation – build tools stay in build stages.

    Better caching and performance.

    Ideal for languages that need compilation (e.g., Go, Java, Node.js, etc.).
🔧 Basic Example – Node.js App
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

CMD ["node", "dist/index.js"]

🔍 Explanation
    Stage 1 (builder)

        Installs full dependencies.

        Builds the app (e.g., transpiles TypeScript, bundles React, etc.).

    Stage 2 (runtime)

        Starts from a lighter base image.

        Copies only the built output.

        Installs only production dependencies.

===================================================================================================
QUESTION NUMBER 22:- What is the difference between Docker stop and Docker kill commands?


The docker stop and docker kill commands both halt running containers — but they differ in how they do it and what that means for your container's behavior.
🟥 docker stop  
    Gracefully stops a container by sending the SIGTERM signal, then SIGKILL if the container doesn’t stop in time.
        🔧 Behavior:
                Sends SIGTERM to the main process in the container.

                Waits (default: 10 seconds).

                If still running, sends SIGKILL to force termination.
        CMD:-docker stop <container_name>

🟥 docker kill:-Immediately stops a container by sending the SIGKILL signal, skipping graceful shutdown.

CMD:- docker kill <container_name>
⚠️ Behavior:
        Instantly kills the main process.

        No opportunity for cleanup.

        Useful for containers that hang or don’t respond to SIGTERM.

===================================================================================================
QUESTION NUMBER 23 :- How do you handle persistent data in Docker?

Handling persistent data in Docker is crucial because by default, data created inside a container is lost when the container is removed. To persist data beyond container lifetimes, Docker provides two main strategies:
🧱 1. Volumes (Recommended for Most Cases)
📁 2. Bind Mounts (Host-Container Path Mapping)

✅ Best Practices
            Use named volumes for persistent data (especially for DBs).

            Use bind mounts for development and testing.

            Never store critical data only inside a container.

            Add .dockerignore to prevent sensitive data from accidentally entering images.

            Version-control your docker-compose.yml and volume setup, not your data.

===================================================================================================
QUESTION NUMBER 24:-Explain health checks in Docker. How would you implement one?

Health checks in Docker are used to determine whether the application inside a container is running and functioning as expected. By adding a HEALTHCHECK instruction to your Dockerfile or using the --health-* flags in docker run, you can specify a command Docker will run to test container health periodically.

🔍 Why Use Health Checks?
            Helps in detecting unhealthy containers.

            Useful in orchestrators like Docker Swarm or Kubernetes to restart failed services.

            Gives visibility into container status beyond just “running”.
✅ Health Check Statuses
    Docker assigns one of the following statuses to a container:

        starting – The health check is still running for the first time.

        healthy – The container passed the health check.

        unhealthy – The container failed the health check consecutively.

🔧 How to Implement a Health Check in Dockerfile

FROM node:18

WORKDIR /app
COPY . .

RUN npm install

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl --fail http://localhost:3000/health || exit 1

CMD ["npm", "start"]

Explanation:

--interval=30s – Run the health check every 30 seconds.

--timeout=10s – Timeout for the health check command.

--start-period=5s – Grace period after container starts before health checks begin.

--retries=3 – Consider container unhealthy after 3 failures.

CMD – The command Docker runs to check health (curl, in this case).

===================================================================================================

QUESTION NUMBER 25:--What is the WORKDIR instruction in a Dockerfile and why is it important?

The WORKDIR instruction in a Dockerfile sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow it.

🧱 Syntax:WORKDIR /path/to/directory
    If the directory doesn't exist, Docker creates it.
    ✅ Example:
    FROM node:18

    WORKDIR /app

    COPY package.json .
    RUN npm install
    COPY . .

    CMD ["npm", "start"]

    In this example:

        Docker sets the working directory to /app.

        All subsequent commands (like COPY, RUN) are executed relative to /app.

🎯 Why WORKDIR is Important:
        Simplifies paths – No need to use full paths repeatedly.

        Keeps Dockerfiles clean and readable.

        Ensures consistency – You’re always operating in the correct folder.

        Better than using RUN cd ... – RUN cd won’t persist between layers, but WORKDIR does.

===================================================================================================

QUESTION NUMBER 26:- How do you restrict resources (CPU, memory) for a Docker container?

You can restrict CPU and memory usage of a Docker container using flags with the docker run command. This helps prevent a container from consuming too many host resources.

🧠 Why Resource Limiting?
        Prevents a single container from hogging system resources.

        Ensures better performance and stability in multi-container environments.

        Useful for production, CI/CD pipelines, and local dev environments.

🧮 Memory Limits:-docker run -m 512m --memory-swap 1g my-app
        -m or --memory → Limits container to 512 MB RAM.

        --memory-swap → Total memory + swap allowed (1 GB here).

        If --memory-swap = --memory, no swap will be used.

⚙️ CPU Limits:-docker run --cpus="1.5" my-app
        This restricts the container to 1.5 CPU cores.


📌 Important Notes
    Resource limits only work on Linux and WSL2 (Windows/Mac use VM backend).

    Exceeding memory = container gets killed.

    Exceeding CPU = container slows down, not killed.

===================================================================================================

QUESTION NUMBER 27:- Explain Docker layer caching and how it affects build performance.

Docker builds images in a series of layers, where each instruction in a Dockerfile (like FROM, COPY, RUN) creates a new layer. Docker caches these layers so it doesn’t rebuild unchanged parts of the image every time — this is known as Docker Layer Caching.

⚡ Why It Matters for Performance
    Layer caching:

        Speeds up builds by reusing previously built layers.

        Reduces bandwidth and build time, especially in CI/CD pipelines.

        Allows incremental changes — only changed layers and those after them get rebuilt.

📚 How It Works – Example   
FROM node:18

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]


If you run docker build . multiple times:

    Docker caches each step.

    If package.json hasn’t changed, RUN npm install is skipped on the next build.

    But if you change package.json, Docker invalidates cache from that point on.

===================================================================================================

QUESTION NUMBER 28 :- What are Docker bind mounts and when would you use them?

Bind mounts allow you to mount a file or directory from your host machine into a container. This means the container can access and even modify files that live on your host.

🧠 How It Works
    You specify a path on the host and a path inside the container. Docker links them so changes in one are reflected in the other.

🧱 Syntax (with docker run):docker run -v /host/path:/container/path my-app

⚠️ Gotchas
    Bind mounts are dependent on host paths, so they are less portable.

    Can pose security risks if sensitive host files are exposed.

    Poor isolation — host changes affect container and vice versa.

🆚 Bind Mounts vs Volumes

| Feature       | Bind Mounts               | Docker Volumes                 |
| ------------- | ------------------------- | ------------------------------ |
| Host Location | You specify manually      | Managed by Docker              |
| Portability   | Low (host-specific paths) | High (Docker manages location) |
| Use Case      | Dev & testing             | Production, data persistence   |


🧵 Summary
    Bind mounts are great for development, live reloads, config sharing.

    They map host files to container paths directly.

    Not ideal for production — use Docker volumes instead for better portability and safety.

===================================================================================================

QUESTION NUMBER 29:- How do you update a running container without downtime?

To update a running Docker container without downtime, you need to use a zero-downtime deployment strategy. Docker alone doesn’t offer built-in zero-downtime updates, but you can achieve it with these techniques:

✅ 1. Run a New Container with the New Version
Instead of updating the existing container, you:


Build a new image
Start a new container
Switch traffic to the new one
Stop the old container

✅ 2. Use Docker Compose with Rolling Updates
If you use docker-compose, you can run a new container while the old one is still live.
services:
  web:
    image: my-app:v2
    ports:
      - "80:80"
    deploy:
      update_config:
        parallelism: 1
        delay: 10s

✅ 3. Use a Load Balancer or Reverse Proxy
Put Nginx, HAProxy, or Traefik in front of your app.

Route traffic to the current (old) container.

Spin up a new container behind the scenes.

When ready, switch traffic to the new container.

Remove the old one.

✅ 4. Use Orchestration Tools (Best Option for Production)
Use tools like:

Docker Swarm: docker service update --image my-app:v2 my-service

Kubernetes: Automatically handles rolling updates with kubectl set image or a Deployment YAML.
===================================================================================================

QUESTION NUMBER 30:---What is the difference between Docker attach and Docker exec commands?

The docker attach and docker exec commands are both used to interact with running containers — but they serve very different purposes.

🆚 Key Differences
| Feature            | `docker attach`                                            | `docker exec`                              |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------ |
| Purpose            | Attach to the container’s **main process**                 | Run a **new command** inside the container |
| Control            | Shares **stdin/stdout** of the main process                | Creates **separate exec session**          |
| Interrupt Effect   | `Ctrl+C` can **stop** the container                        | `Ctrl+C` only stops **that command**       |
| Use Case           | View logs, interact with main app (like a shell or server) | Run diagnostics, maintenance, new shells   |
| Number of Sessions | Only **one** attach session shares the main process        | Multiple `exec` sessions are allowed       |
| Output Separation  | Mixed with container logs                                  | Output only from the exec-ed command       |


