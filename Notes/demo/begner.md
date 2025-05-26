======================================================================================================================================================================================================================================================

QUESTION  NUMBER 01 :- What is Docker and how is it different from traditional virtualization?

🔹 What is Docker?
 Docker is an open-source platform that automates the deployment, scaling, and management of applications in lightweight containers.
    Each container runs on top of the host operating system's kernel, rather than running a full guest OS as in traditional virtualization.

    Docker uses a container engine to manage and run containers, which share the host OS kernel but remain isolated from each other.

Core Components of Docker:
 1.Docker Engine: The runtime that builds and runs containers.
     1.1 Docker Daemon (dockerd) — runs on the host, manages containers/images.

     1.2 Docker Client (docker) — command-line interface.

     1.3 REST API — Interface between client and daemon.

 2.Docker Images: Immutable blueprints of containers, containing the application code, runtime, libraries, and dependencies.
 3.Docker Containers: Running instances of Docker images.
 4.Dockerfile: Script with instructions to build Docker images.
 5.Docker Hub: Public registry of prebuilt Docker images.


🔹 What is Traditional Virtualization?

Traditional virtualization (e.g., using VMware, VirtualBox, KVM, or Hyper-V) involves creating Virtual Machines (VMs) that emulate physical hardware and run a full operating system.
    Each VM includes:

    1.A full guest OS.

    2.A virtual copy of the hardware.

    3.Application and all dependencies.

🔸 Docker vs. Traditional Virtualization — Key Differences
Feature	                   Docker(Containers)	                   Traditional Virtualization (VMs)
Architecture	       Shared OS kernel	                       Full OS per VM
Resource Usage	       Lightweight, uses fewer resources	       Heavy, duplicates OS per VM
Startup Time	       Seconds	                                   Minutes
Performance	           Near-native performance	                   Slightly lower due to full OS overhead
Isolation Level	       Process-level isolation (namespaces)	   Hardware-level isolation (hypervisor)
Portability	           Highly portable (across OS/envs)	       Less portable 
Security	           Less isolated (kernel is shared)	       Strong isolation (own OS & kernel)
Management Tools	   Docker CLI, Docker Compose, Swarm	       VM management tools 
Image Size	           Small (tens to hundreds of MBs)	           Large (GBs, due to OS)
Use Case	           Microservices, CI/CD, fast deployment	   Legacy apps, OS-specific apps, full OS

======================================================================================================================================================================================================================================================

QUESTION NUMBER 02 :- What are the key components of Docker architecture?

Docker follows a client-server model, where the client communicates with the daemon, which in turn uses container runtimes, images, and storage systems to manage containers.

1. 🧑‍💻 Docker Client (docker)
    1.1 Command-line interface (CLI) tool used to interact with Docker.

    1.2 Sends commands (like docker run, docker build, docker ps) to the Docker daemon using a REST API.

    1.3 The client can communicate with local or remote daemons.

2. 🖥️ Docker Daemon (dockerd)

    2.1 The core background service responsible for:

            Building and managing images

            Running and managing containers

            Handling volumes, networks, logs

    2.2 Listens for Docker API requests via a Unix socket or TCP port.

    2.3 Communicates with container runtimes like containerd and runc.

3. 🔗 Docker REST API  
    
    3.1 Provides programmatic access to Docker’s functionality.

    3.2 Enables the client to talk to the daemon.

    3.3 Can be used directly with tools like curl or Postman.

4. 📦 Docker Images
    4.1 Immutable, layered, read-only templates used to create containers.

    4.2 Stored in registries (public or private).

    4.3 Built using Dockerfiles, with each command creating a new image layer.

5. 🧪 Docker Containers
        Runtime instances of Docker images.

       Include:

                5.1 A writable layer

                5.2 Isolated environment using namespaces and cgroups

                5.3 Networking, volumes, and metadata

6.  🗃️ Docker Registries

                6.1 Repositories where images are stored and shared.

                6.2 Popular registry: Docker Hub

                6.3 Others: GitHub Container Registry, Amazon ECR, Google GCR, self-hosted registries.

7. ⚙️ Container Runtime (containerd, runc)

                7.1 containerd: A daemon that manages the complete container lifecycle — image pull, execution, snapshotting, etc.

                7.2 runc: A low-level runtime that actually creates and runs containers, compliant with the OCI (Open Container Initiative).

8. 🗄️ Storage Drivers (Union File Systems)
                8.1 Docker uses UnionFS (e.g., OverlayFS) to layer images efficiently.

                8.2 Each container adds a writable layer on top of the image’s read-only layers.

9. 🌐 Networking
                9.1 Docker provides multiple network drivers:
                | Driver    | Description                                |
| --------- | ------------------------------------------ |
| `bridge`  | Default; containers share a private subnet |
| `host`    | Container uses host’s network stack        |
| `none`    | No networking                              |
| `overlay` | Used in Docker Swarm to connect nodes      |




✅ Docker Architecture: Client, Server, Daemon, Registries
+------------------+      REST API       +--------------------+
|  Docker CLI      |  <----------------> |  Docker Daemon      |
|  (docker client) |                     |  (dockerd)          |
+------------------+                     +--------------------+
                                                |
                                                v
                                       +--------------------+
                                       |  Container Runtime |
                                       |  (containerd, runc)|
                                       +--------------------+
                                                |
                                                v
                                       +--------------------+
                                       |  Linux Kernel      |
                                       |  (Namespaces,      |
                                       |   Cgroups, etc.)   |
                                       +--------------------+

1. Docker CLI: Issues commands (like docker run, docker build) to the Docker daemon via the REST API.

2. Docker Daemon: Builds, runs, manages containers and communicates with other daemons.

3. Container Runtime: Low-level execution (e.g., runc, part of OCI standard).

4. Registries: Remote (Docker Hub, GitHub Container Registry) or local storage of Docker images.



How does Docker ensure resource isolation?
	Use terms like namespaces (PID, NET, MNT), cgroups, union filesystems.
    🧩 1.Docker uses namespaces to give it an isolated view of processes, network, and filesystem.

       2.Docker uses cgroups to ensure it doesn't consume too many system resources.

       3.Docker uses a union file system to provide an efficient, layered filesystem that is fast to create and small in size.

✅ Step 1: Install Docker
✅ Step 2: Learn to Use Basic Docker Commands
    🔹 docker run :- Start a container from an image:\
        docker run -d --name mynode -p 8080:80 nodejs
    🔹 docker ps :- List running containers:
        docker ps -a
    🔹 docker stop :- Stop a container:
        docker stop nodejs
    🔹 docker images :-List all available local images:
        docker images
    🔹 docker exec
        Run a command inside a running container:
✅ Step 4: Create Your Own Dockerfile and Build an Image
    Dockerfile
            FROM python:3.9-slim
            WORKDIR /app
            COPY app.js .
            CMD ["node", "app.js"]
    🔹 Build the Image
        docker build -t app.js .
    🔹 Run the Container
        docker run app.js
✅ Step 5: Pull Official Images and Inspect
    🔹 Pull an Image from Docker Hub
        docker pull redis
    🔹 Run and Inspect
        docker pull redis
✅ Step 6: Investigate Container Internals
    🔹 docker inspect:-Returns JSON metadata about a container or image:
        docker inspect myredis
    🔹 docker logs
        docker logs myredis

======================================================================================================================================================================================================================================================

QUESTION NUMBER 03:- Explain the difference between a Docker image and a Docker container.
| Feature              | **Docker Image**                               | **Docker Container**                                        |
| -------------------- | ---------------------------------------------- | ----------------------------------------------------------- |
| **Definition**       | A **read-only template** or blueprint          | A **running instance** of a Docker image                    |
| **State**            | **Static and immutable**                       | **Dynamic and ephemeral** (can change at runtime)           |
| **Filesystem**       | Built with multiple **read-only layers**       | Adds a **writable layer** on top of the image               |
| **Usage**            | Used to create containers                      | Executes the actual application or process                  |
| **Persistence**      | Persistent until deleted manually              | Temporary unless committed or data is persisted             |
| **Creation Command** | Built with `docker build`                      | Created and started with `docker run`                       |
| **Storage Location** | Stored in Docker registry or local image cache | Lives in memory and on disk as long as it's running/stopped |
| **Analogy**          | Like a **class definition** in programming     | Like an **object (instance)** created from that class       |

======================================================================================================================================================================================================================================================

QUESTION NUMBER 04:- How do you create a Docker container from an image?

To create a Docker container from an image, you use the docker run command, which does two things:

    1. Creates the container from the specified image.

    2. Starts the container immediately by default (unless you add options to delay/start later).

                docker run nodejs

        * Pulls the nodejs image from Docker Hub (if not already local)

        * Creates a container from the image

        * Starts the container

        * Runs the default command defined in the image (Nginx server)

        | Option               | Description                                      |
| -------------------- | ------------------------------------------------ |
| `-d`                 | Run container in detached (background) mode      |
| `--name mycontainer` | Assign a custom name to the container            |
| `-p 8080:80`         | Map host port 8080 to container port 80          |
| `-it`                | Interactive terminal (used for shells like bash) |
| `--rm`               | Automatically remove the container when it stops |

command :----- docker run -d --name webserver -p 8080:80 nginx

When you run docker run nginx, Docker:

    Pulls the image from Docker Hub if not already present.

    Creates a new container layer using a Union File System (adds a writable layer).

    Assigns a unique container ID (unless you provide a name).  

    Creates an isolated environment using:

    Namespaces (PID, NET, MNT)

    cgroups (CPU, memory limits)

    Starts the container and runs the default CMD defined in the image.

======================================================================================================================================================================================================================================================

QUESTION NUMBER 05 What is a Dockerfile and what is its purpose?


A Dockerfile is a text file that contains a set of instructions used by Docker to build a custom image. Think of it as a recipe that tells Docker exactly how to construct an image layer by layer.


📄 What Is a Dockerfile?
        A script-like file that defines:

        Base image to use (e.g., Ubuntu, Node.js, Python)

        Files to copy into the image

        Dependencies to install

        Commands to run during image build

        Default command to execute when a container starts



| Purpose                      | Description                                          |
| ---------------------------- | ---------------------------------------------------- |
| ✅ Automate image creation    | No need to manually configure containers             |
| ✅ Ensure consistency         | All developers/CI pipelines get the same environment |
| ✅ Enable version control     | Dockerfiles can be stored in Git like code           |
| ✅ Reusability                | Rebuild images as needed with minimal changes        |
| ✅ Declarative Infrastructure | Define app environments as code (like IaC)           |

``` bash
# Base image
FROM python:3.9-slim

# Set working directory inside container
WORKDIR /app

# Copy app files
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Default command when container runs
CMD ["python", "app.py"]

```
🔄 How to Use a Dockerfile
    1. Save the file as Dockerfile in your project folder
    2. Build the image:
        docker build -t my-python-app .
    3. Run a container from the image:
        docker run my-python-app

======================================================================================================================================================================================================================================================


QUESTION NUMBER 06 :- What are the most common instructions used in a Dockerfile?

| Instruction | Purpose                                         |
| ----------- | ----------------------------------------------- |
| `FROM`      | Sets the base image                             |
| `WORKDIR`   | Sets the working directory inside the container |
| `COPY`      | Copies files from host to container             |
| `RUN`       | Executes a command while building the image     |
| `CMD`       | Default command when container starts           |
| `EXPOSE`    | Documents the port the container listens on     |
| `ENV`       | Sets environment variables                      |

======================================================================================================================================================================================================================================================

QUESTION NUMBER 07:-How do you list all running containers in Docker?

CMD --- docker ps

📌 What It Shows:
    Container ID

    Image name

    Command used to start the container

    Uptime (how long it has been running)

    Ports exposed/mapped

    Container name

🔹 List All Containers (Running + Stopped):---docker ps -a
🔹 Show Only Container IDs:----docker ps -q
🔹 Filter by Image Name:---docker ps --filter "ancestor=nginx"
🔹 Show Containers with Specific Name:docker ps --filter "name=webserver"

======================================================================================================================================================================================================================================================
QUESTION NUMBER 08 --What is Docker Hub?


Docker Hub is Docker’s official cloud-based registry service where users can find, share, store, and distribute container images.
    Docker Hub is like GitHub for Docker images.
        It is the default image registry used by Docker when you run commands like:
                                                                                    * docker pull ubuntu
                                                                                    * docker run nginx

                                                                                        | Feature                                | Description                                                                                  |
| -------------------------------------- | -------------------------------------------------------------------------------------------- |
| **Image Repository**                   | Public and private repositories to store images                                              |
| **Official Images**                    | Trusted, secure base images maintained by Docker or vendors (e.g., `nginx`, `mysql`, `node`) |
| **Docker Verified Publisher (DVP)**    | Verified images from vendors like Microsoft, Red Hat, Bitnami                                |
| **User & Org Accounts**                | Personal accounts or teams for collaboration                                                 |
| **Web UI & API**                       | Manage repositories, view image tags, pull stats, and automation                             |
| **Build Triggers (via GitHub/GitLab)** | Automatically build and push images when code changes                                        |
| **Image Tagging & Versioning**         | Organize and version images (e.g., `python:3.11-slim`)                                       |


======================================================================================================================================================================================================================================================
QUESTION NUMBER 09 :- How do you stop and remove a Docker container?
    ✅ 1. Stop a Running Container:-----docker stop <container_id_or_name>
                This sends a SIGTERM signal to gracefully stop the container.
                If the container doesn't stop within 10 seconds (default), Docker sends SIGKILL.
    ✅ 2. Remove a Stopped Container:------docker rm <container_id_or_name>

     ✅ 3.  Remove All Stopped Containers:----docker container prune
     | Action            | Command                     |
| ----------------- | --------------------------- |
| Stop container    | `docker stop <name or ID>`  |
| Remove container  | `docker rm <name or ID>`    |
| Stop & remove     | `docker rm -f <name or ID>` |
| Prune all stopped | `docker container prune`    |


======================================================================================================================================================================================================================================================
QUESTION NUMBER 10:--Explain the concept of Docker volumes. Why are they important?

Docker volumes are persistent storage locations managed by Docker that exist outside the container's writable layer. They are used to:

        - Store data independent of the container’s lifecycle

        - Share data between containers

        - Avoid losing data when a container is removed or recreated

| Benefit              | Description                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Persistence**      | Data stored in a container’s layer is lost when the container is removed. Volumes keep data across restarts/redeploys. |
| **Performance**      | Volumes are optimized by Docker for speed and I/O efficiency (better than bind mounts in many cases).                  |
| **Isolation**        | Volumes are managed by Docker and don’t depend on host paths, increasing portability and security.                     |
| **Sharing**          | Volumes can be mounted to multiple containers, enabling shared state or data sync.                                     |
| **Backup & Restore** | You can easily back up volumes using standard tools and reuse them elsewhere.                                          |

🛠️ How to Use Docker Volumes
🔹 1. Create a volume:-docker volume create mydata
🔹 2. Use the volume in a container:--docker run -d --name web -v mydata:/usr/share/nginx/html nginx
            mydata is the volume name

            It’s mounted to /usr/share/nginx/html inside the container
🔹 3. Inspect the volume":---docker volume inspect mydata
🔹 4. List volumes:----docker volume ls
🔹 5. Remove a volume:------docker volume rm mydata

======================================================================================================================================================================================================================================================
QUESTION NUMBER 11  What is the command to build a Docker image?

To build a Docker image, use the docker build command.
    docker build -t <image_name>:<tag> <path_to_dockerfile_directory>
    docker build -t myapp:latest .
        -t myapp:latest gives the image a name and a tag (latest is default if omitted).

        . specifies the build context, usually the current directory where your Dockerfile is located.

        | Option              | Description                                       |
| ------------------- | ------------------------------------------------- |
| `-t`                | Name and optionally tag the image (`name:tag`)    |
| `-f Dockerfile.dev` | Use a custom Dockerfile name                      |
| `--no-cache`        | Disable layer cache for a clean rebuild           |
| `--build-arg`       | Pass arguments defined with `ARG` in Dockerfile   |
| `--platform`        | Build for specific platform (e.g., `linux/arm64`) |


======================================================================================================================================================================================================================================================
QUESTION NUMBER 12 How do you expose ports in Docker?

To expose ports in Docker, you need to map ports between the host machine and the Docker container so external clients can access services (like a web server, database, or API) running inside the container.

🔌 1. Expose Ports Using -p or --publish
        docker run -p <host_port>:<container_port> <image>
        docker run -d -p 8080:80 nginx
    🔄 Multiple Ports:
        docker run -p 5000:5000 -p 8000:8000 myapp


======================================================================================================================================================================================================================================================
QUESTION NUMBER 13  What is the difference between COPY and ADD instructions in a Dockerfile?

        Great question! Both COPY and ADD are Dockerfile instructions used to copy files and directories from your host machine into a Docker image — but they are not identical.

        | Feature          | `COPY`                             | `ADD`                                         |
| ---------------- | ---------------------------------- | --------------------------------------------- |
| **Purpose**      | Simple file copy                   | File copy **plus extra features**             |
| **Syntax**       | `COPY <src> <dest>`                | `ADD <src> <dest>`                            |
| **Local Files**  | ✅ Yes                              | ✅ Yes                                         |
| **URL Support**  | ❌ No                               | ✅ Yes — downloads from URL to image           |
| **Tar Handling** | ❌ No                               | ✅ Yes — auto-extracts local `.tar`, `.tar.gz` |
| **Clarity**      | ✅ Preferred (simpler, predictable) | ⚠️ Less predictable (multi-behavior)          |

======================================================================================================================================================================================================================================================
QUESTION NUMBER 14  How do you view logs for a running container?

A log is a record of events or messages generated by software systems, applications, or infrastructure. These messages are typically written to files, streams (like stdout/stderr), databases, or external logging systems.

🎯 Purpose of Logs — Why We Use Them:-
| Purpose           | Description                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| **🛠 Debugging**  | Trace bugs or unexpected behavior by reviewing what the app did step-by-step.                   |
| **📊 Monitoring** | Understand the health and performance of an app or system (e.g., errors, warnings, load times). |
| **🕵️ Auditing**  | Record user actions and system changes for compliance or security reviews.                      |
| **📈 Analytics**  | Derive insights from user behavior, usage patterns, or business metrics.                        |
| **⚠️ Alerts**     | Trigger notifications when certain error conditions or anomalies are logged.                    |


To view logs for a running Docker container, you use the docker logs command.
📄 Basic Command :---docker logs <container_id_or_name>

🔍 Common docker logs Options
| Option       | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| `-f`         | Follow log output (like `tail -f`)                             |
| `--tail <n>` | Show only the last `n` lines                                   |
| `-t`         | Show timestamps                                                |
| `--since`    | Show logs since a certain time (`2024-01-01T00:00:00` or `5m`) |
| `--until`    | Show logs until a certain time                                 |


======================================================================================================================================================================================================================================================
QUESTION NUMBER 15 :- What is the difference between CMD and ENTRYPOINT in a Dockerfile?
✅ CMD
Acts as a default argument to the container’s command.

If a user provides a command at docker run, CMD is ignored.
        FROM ubuntu
        CMD ["echo", "Hello from CMD"]
✅ ENTRYPOINT
Sets the fixed command that will always run.

    You can pass arguments to it at runtime, but not override it easily.
        FROM ubuntu
    ENTRYPOINT ["echo"]


| Aspect           | `CMD`                                    | `ENTRYPOINT`                                     |
| ---------------- | ---------------------------------------- | ------------------------------------------------ |
| **Purpose**      | Default **arguments** for the container  | Defines the **main command** to run              |
| **Overridable?** | ✅ Yes, can be overridden at `docker run` | ⚠️ Not easily overridden (unless `--entrypoint`) |
| **Typical Use**  | Provide default args or run scripts      | Lock the container to run a specific app         |
| **Form**         | Shell or exec                            | Usually in exec form (`["executable", "arg"]`)   |




