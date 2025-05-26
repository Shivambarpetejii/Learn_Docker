QUESTION NUMBER 16 :- Explain Docker networking. What are the different network drivers available?

    Docker networking is a fundamental part of how Docker containers communicate with each other and with the outside world. It provides various networking models (via network drivers) that support diverse use cases—from simple container-to-container communication on the same host to complex multi-host and overlay networks.

🧰 Docker Network Drivers
Docker provides several built-in drivers, each with specific use cases:
    1. bridge (Default for standalone containers)
        1.1 Use Case: Containers on the same host that need to communicate.

        1.2 Mechanism: Creates a Linux bridge (docker0) and connects containers via veth pairs.

        1.3 DNS Support: Yes, with --name or custom bridge network.

        1.4 Isolation: Containers are isolated unless explicitly linked or on the same custom bridge.

        CMD :- docker network create --driver bridge my-bridge

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
    1. 🔗 Bind Mounts (Host Paths)
        Mechanism: Directly mounts a directory or file from the host into the container.

Use Case: You want real-time access to files (e.g., source code, config files, logs).

Path on host is explicitly specified.


