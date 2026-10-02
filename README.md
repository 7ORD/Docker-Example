# Docker Example 🐳

Welcome to the Docker Example repository! This project is designed to help beginners understand Docker by building an image, running a container, and starting a small application stack containing a backend and an MQTT broker.

You do not need any previous Docker experience. Follow the instructions in order, and you will be able to run everything on your own computer.

## Table of Contents

- [1. Docker Fundamentals](#1-docker-fundamentals)
- [2. Getting Started](#2-getting-started)
- [3. Build a Docker Image](#3-build-a-docker-image)
- [4. Run a Standalone Container](#4-run-a-standalone-container)
  - [Using the Command Line](#41-using-the-command-line)
  - [Using Docker Desktop](#42-using-docker-desktop)
- [5. Run the MQTT and Backend Stack](#5-run-the-mqtt-and-backend-stack)
  - [Using the Command Line](#51-using-the-command-line)
  - [Using Docker Desktop](#52-using-docker-desktop)
- [6. Useful Docker Commands](#6-useful-docker-commands)
- [7. Troubleshooting](#7-troubleshooting)

---

## 1. Docker Fundamentals

Before running anything, it helps to understand what Docker actually does.

### What is Docker?

Imagine you have written an application on your computer. It works perfectly, but when you try to run it on another computer, it doesn't work because that computer is missing some software or has different settings.

Docker helps solve this problem by packaging an application together with the software and settings it needs to run.

This package can then be used on other computers running Docker, without having to manually install all the application's dependencies on each machine.

Think of Docker as a way to package and run applications in their own small, isolated environments.

### The four main concepts

There are four important terms to understand before continuing.

#### 1. Dockerfile

A `Dockerfile` is a set of instructions that tells Docker how to package an application.

For example, it might tell Docker to:

- Start with an operating system or runtime that is already prepared.
- Install the software the application needs.
- Copy the application files into the package.
- Specify which command should run when the application starts.

Think of a Dockerfile as a recipe.

#### 2. Docker image

A Docker image is the package created using a Dockerfile.

It contains the application and the files and software it needs to run.

Once you have built an image, you can use it to create containers whenever you need them.

Think of an image as a finished recipe prepared and ready to use.

#### 3. Docker container

A container is a running instance of a Docker image.

When you start a container, Docker takes the image and runs the application inside it.

You can create multiple containers from the same image. Each container runs separately from the others.

Think of an image as a template and a container as a running copy of that template.

#### 4. Docker Compose

Applications often need more than one container.

For example, this repository uses a backend application and an MQTT broker. The backend can communicate with the MQTT broker to exchange messages.

Starting and configuring each container individually can become tedious.

Docker Compose solves this problem by using a configuration file to describe the containers that make up an application.

With a single command, Compose can create and start the entire group of containers.

Think of Compose as a set of instructions for starting several containers together.

### How everything fits together

The process looks like this:

1. **Dockerfile:** describes how to build the application package.
2. **Image:** the package created from the Dockerfile.
3. **Container:** a running application created from the image.
4. **Docker Compose:** starts and manages multiple containers together.

### A few other terms you will encounter

| Term | Plain-English explanation |
|---|---|
| Image name | The name you give an image so you can find and run it. |
| Port | A numbered communication endpoint that applications use to send and receive data. |
| Port mapping | Connects a port on your computer to a port inside a container. |
| Volume | A way to store data separately from a container's own files, so it can survive container replacement. |
| Registry | An online place where Docker images can be stored and shared, such as Docker Hub. |
| Terminal / CLI | A text-based window where you type commands to control Docker. |

### What is Docker Desktop?

Docker Desktop is a graphical application that lets you manage Docker using buttons and menus instead of typing every command.

It lets you view images, start and stop containers, inspect logs, and see which ports containers are using.

You can use either Docker Desktop or the command line to manage Docker. Both control the same Docker environment.

---

## 2. Getting Started

### Step 1: Install Docker Desktop

If you have not installed Docker yet, download Docker Desktop for your operating system.

Download it here:

https://www.docker.com/products/docker-desktop/

Follow the installer instructions. On Windows, Docker Desktop may ask you to enable WSL 2 or install additional components.

Once installed, open Docker Desktop and wait until Docker has finished starting.

**Important:** Docker Desktop must be running before you can use the commands in this guide.

### Step 2: Download this repository

You need a copy of this repository on your computer.

If you have Git installed, open a terminal and run:

```bash
git clone https://github.com/7ORD/Docker-Example.git
```

Move into the downloaded folder:

```bash
cd Docker-Example
```

Alternatively, open the repository on GitHub, click **Code**, select **Download ZIP**, and extract the downloaded file.

Open a terminal in the extracted `Docker-Example` folder.

### Step 3: Check that Docker works

Run the following command:

```bash
docker --version
```

This should display your installed Docker version.

Next, check that Docker is running:

```bash
docker info
```

If this displays information about your Docker installation, you are ready to continue.

If you receive an error saying Docker cannot connect to its daemon, open Docker Desktop and wait for it to finish starting.

### Understanding file locations

The commands in this guide assume you are running them from the main `Docker-Example` folder.

The repository contains a `docker` directory with the Dockerfile and Compose configuration.

Your terminal should be in the directory containing the `docker` folder before you continue.

---

## 3. Build a Docker Image

In this section, you will use the provided Dockerfile to build your own Docker image.

You only need to build the image once initially. You can then create containers from it whenever you need them.

### Step 1: Open a terminal

Make sure you are in the main `Docker-Example` folder.

You can check your current directory using:

**Windows PowerShell:**

```powershell
Get-Location
```

**Linux or macOS:**

```bash
pwd
```

You should be in the directory containing the `docker` folder.

### Step 2: Build the image

Run:

```bash
docker build -t test:latest -f docker/Dockerfile docker
```

This command tells Docker to build an image using the provided Dockerfile.

Let's break it down:

| Part | What it means |
|---|---|
| `docker build` | Tells Docker to build an image. |
| `-t test:latest` | Names the image `test` and gives it the tag `latest`. |
| `-f docker/Dockerfile` | Tells Docker which Dockerfile to use. |
| `docker` | Tells Docker which folder contains the files available during the build. |

The final `docker` is important. It is the build context: the folder Docker can access when processing instructions such as copying files into the image.

**Note:** This command assumes the Dockerfile is named `Dockerfile` inside the `docker` directory. If it has a different filename, replace `docker/Dockerfile` with its actual path.

Docker will now read the Dockerfile and carry out its instructions. The first build may take a little while because Docker might need to download a base image and install dependencies.

Wait until the build finishes successfully.

### Step 3: Check that the image exists

Run:

```bash
docker image ls
```

This lists the Docker images available on your computer.

Look for an image named `test` with the tag `latest`.

You have now built your first image!

**Remember:** Building an image does not automatically mean that the application is running. You have created the package; the next step is to run it in a container.

---

## 4. Run a Standalone Container

A standalone container is a container that you start and manage individually, rather than starting it as part of a Compose stack.

You will learn two ways to do this.

- Using the command line.
- Using Docker Desktop.

You only need to use one of these methods.

### 4.1 Using the Command Line

#### Step 1: Start the container

Run the following command:

```bash
docker run -d --name docker-example -p 3000:3000 test:latest
```

This creates a new container from your `test:latest` image and starts it.

Here is what each part means:

| Part | What it means |
|---|---|
| `docker run` | Creates and starts a container. |
| `-d` | Runs the container in the background. |
| `--name docker-example` | Gives the container a name so you can easily find it. |
| `-p 3000:3000` | Maps port 3000 on your computer to port 3000 inside the container. |
| `test:latest` | Specifies which image to use. |

Port mapping follows this format:

```text
PORT_ON_YOUR_COMPUTER:PORT_INSIDE_THE_CONTAINER
```

In this example, both ports are `3000`.

The mapping is useful when the application listens on port 3000 inside the container and you want to access it through port 3000 on your computer.

If the application uses a different port, you will need to adjust the mapping accordingly.

#### Step 2: Check that the container is running

Run:

```bash
docker ps
```

This lists currently running containers.

You should see a container named `docker-example`.

To see all containers, including stopped ones, run:

```bash
docker ps -a
```

#### Step 3: View the container logs

Logs show messages produced by the application, which can help you understand what it is doing or identify errors.

Run:

```bash
docker logs docker-example
```

To keep watching new log messages as they appear, use:

```bash
docker logs -f docker-example
```

Press `Ctrl+C` to stop watching the logs. This does not stop the container.

#### Step 4: Stop the container

When you have finished experimenting, run:

```bash
docker stop docker-example
```

This stops the running application.

The container still exists, but it is no longer running.

To start it again:

```bash
docker start docker-example
```

#### Step 5: Remove the container

When you no longer need the container, stop it and remove it:

```bash
docker rm -f docker-example
```

The `-f` option forces the container to stop if necessary before removing it.

This removes the container, **not the image**. You can still use `test:latest` to create another container.

---

### 4.2 Using Docker Desktop

You can perform the same steps through the Docker Desktop interface.

#### Step 1: Open Docker Desktop

Start Docker Desktop and wait for it to finish loading.

#### Step 2: Find your image

1. Open the **Images** section in the left-hand menu.
2. Find the image named `test` with the tag `latest`.
3. Click the **Run** button next to the image.

If you cannot see the image, make sure you successfully completed Section 3.

#### Step 3: Configure the container

Docker Desktop will display a window for configuring the new container.

1. Enter `docker-example` as the container name, if a name field is shown.
2. Expand the optional settings if necessary.
3. Under **Ports**, configure the host port as `3000` and the container port as `3000`, if the application listens on port 3000.
4. Leave other settings at their defaults unless you know you need to change them.
5. Click **Run**.

Docker Desktop will create and start the container.

#### Step 4: Inspect the container

1. Open the **Containers** section.
2. Find `docker-example`.
3. Click the container to view its details.
4. Open the logs to see the application's output.
5. Check the port information to see which ports are mapped.

If the application provides a web interface, you can usually access it at `http://localhost:3000` when the application is listening on port 3000 and the port mapping is configured correctly.

An MQTT broker or another service does not necessarily provide a web page, so a browser is not a suitable test for every container.

#### Step 5: Stop or remove the container

In the Containers section, use the controls next to the container to stop it.

If you want to remove it completely, use the delete or remove option.

Removing a container does not automatically remove the image it was created from.

---

## 5. Run the MQTT and Backend Stack

Now that you understand images and containers, you can run multiple containers together using Docker Compose.

The supplied Compose file is located at:

```text
docker/docker-compose.yml
```

It defines two services:

| Service | Purpose | Port |
|---|---|---|
| `backend` | Runs the backend application using the `test:latest` image. | `3000` |
| `mqtt` | Runs the Eclipse Mosquitto MQTT broker. | `1883` |

MQTT is a messaging protocol commonly used when applications and devices need to exchange messages.

The MQTT broker acts as a central point for receiving messages and passing them to the appropriate subscribers.

In this example, the backend service depends on the MQTT service. Compose starts the MQTT service before starting the backend service.

The Compose file also maps port `1883` so that MQTT clients on your computer can connect to the broker.

### 5.1 Using the Command Line

#### Step 1: Make sure the standalone container is stopped

If you ran the standalone container in Section 4, stop and remove it first:

```bash
docker rm -f docker-example
```

The Compose stack also uses host port 3000. Removing the standalone container avoids a port conflict if it is still running.

#### Step 2: Start the stack

From the main `Docker-Example` folder, run:

```bash
docker compose -f docker/docker-compose.yml up -d
```

This command tells Docker Compose to start the services defined in the supplied file.

Let's break it down:

| Part | What it means |
|---|---|
| `docker compose` | Runs Docker Compose. |
| `-f docker/docker-compose.yml` | Specifies the Compose file to use. |
| `up` | Creates and starts the services. |
| `-d` | Runs the containers in the background. |

Compose will use the existing `test:latest` image for the backend and download the `eclipse-mosquitto:2` image if it is not already available locally.

If you have not built `test:latest`, return to Section 3 first.

Wait for the command to finish.

#### Step 3: Check the running services

Run:

```bash
docker compose -f docker/docker-compose.yml ps
```

You should see the `backend` and `mqtt` services listed.

Check that both containers are running.

If a container exits or shows an error, continue to the next step to inspect its logs.

#### Step 4: View the logs

To view the logs from both services:

```bash
docker compose -f docker/docker-compose.yml logs
```

To watch new log messages as they appear:

```bash
docker compose -f docker/docker-compose.yml logs -f
```

You can also view the logs from an individual service:

```bash
docker compose -f docker/docker-compose.yml logs backend
```

Or:

```bash
docker compose -f docker/docker-compose.yml logs mqtt
```

Press `Ctrl+C` to stop watching the logs. This does not stop the services.

#### Step 5: Connect to the MQTT broker

The supplied Compose file maps the MQTT broker's port 1883 to port 1883 on your computer.

An MQTT client running on your computer can therefore use:

```text
Host: localhost
Port: 1883
```

For example, if you have an MQTT client application installed, configure it to connect to `localhost` on port `1883`.

If your MQTT client runs in another container within the same Compose stack, it should normally connect to the broker using the service name:

```text
Host: mqtt
Port: 1883
```

This works because Compose creates a network that allows its services to communicate using their service names.

**Important:** Port 1883 is the standard unencrypted MQTT port. The provided configuration does not, by itself, establish authentication or encryption. Use appropriate security settings before exposing an MQTT broker beyond a trusted local environment.

#### Step 6: Stop the stack

When you have finished, run:

```bash
docker compose -f docker/docker-compose.yml down
```

This stops and removes the containers created for the Compose stack and its default network.

It does not delete your `test:latest` image.

You can start the stack again at any time by repeating the `up -d` command.

---

### 5.2 Using Docker Desktop

Docker Desktop can also start and manage your Compose stack.

#### Step 1: Open Docker Desktop

Make sure Docker Desktop is running.

#### Step 2: Open the repository in a terminal

From the main `Docker-Example` folder, run:

```bash
docker compose -f docker/docker-compose.yml up -d
```

This starts the stack.

Although you are using a terminal for the initial command, you can manage the running containers through Docker Desktop afterwards.

#### Step 3: View the containers

1. Open Docker Desktop.
2. Select **Containers** from the left-hand menu.
3. Find the Compose project created from this repository.
4. Expand it to see its services.

You should see the `backend` and `mqtt` containers grouped together under the Compose project.

#### Step 4: Inspect the services

Select either container to view its details.

You can inspect:

- Whether the container is running.
- Its logs.
- Its port mappings.
- Other container details provided by Docker Desktop.

Use the logs to check whether the services have started successfully.

#### Step 5: Stop the stack

You can stop the containers using Docker Desktop's stop controls.

To remove the entire Compose stack and its network, you can also run the following command from the repository folder:

```bash
docker compose -f docker/docker-compose.yml down
```

---

## 6. Useful Docker Commands

Keep this section handy when experimenting with Docker.

### Images

List all images on your computer:

```bash
docker image ls
```

Remove an image you no longer need:

```bash
docker image rm test:latest
```

Docker will not remove an image if a container still depends on it. Remove the relevant containers first.

### Containers

Show running containers:

```bash
docker ps
```

Show all containers, including stopped ones:

```bash
docker ps -a
```

View a container's logs:

```bash
docker logs docker-example
```

Stop a container:

```bash
docker stop docker-example
```

Start a stopped container:

```bash
docker start docker-example
```

Remove a container:

```bash
docker rm docker-example
```

### Docker Compose

Start the stack:

```bash
docker compose -f docker/docker-compose.yml up -d
```

Stop the stack and remove its containers:

```bash
docker compose -f docker/docker-compose.yml down
```

Show the stack's status:

```bash
docker compose -f docker/docker-compose.yml ps
```

View the logs:

```bash
docker compose -f docker/docker-compose.yml logs
```

Follow the logs:

```bash
docker compose -f docker/docker-compose.yml logs -f
```

Restart the stack:

```bash
docker compose -f docker/docker-compose.yml restart
```

### A useful distinction

| Command | Result |
|---|---|
| `docker stop` | Stops a container but keeps it. |
| `docker rm` | Removes a container. |
| `docker image rm` | Removes an image. |
| `docker compose down` | Stops and removes the Compose stack's containers and default network. |
| `docker compose up -d` | Creates and starts the Compose stack in the background. |

---

## 7. Troubleshooting

Here are some common problems you might encounter when following this guide.

### Docker is not running

**Possible error:** Docker cannot connect to the Docker daemon.

**Solution:** Open Docker Desktop and wait for it to finish starting. Then try the command again.

### The Dockerfile cannot be found

**Possible error:** Docker cannot locate the Dockerfile.

**Solution:** Make sure your terminal is in the main repository folder and that the Dockerfile exists at the path supplied to the `-f` option.

For example:

```bash
docker build -t test:latest -f docker/Dockerfile docker
```

If your Dockerfile has a different name, use its actual path.

### The image cannot be found

**Possible error:** Docker cannot find `test:latest`.

**Solution:** Build the image using Section 3 and check that it appears when you run:

```bash
docker image ls
```

### A port is already in use

**Possible error:** Docker cannot bind to port 3000 or 1883.

**Solution:** Another application or container may already be using that port.

Check which containers are running:

```bash
docker ps
```

Stop any container that is using the conflicting port and try again.

Alternatively, change the host-side port mapping in the relevant configuration.

For example, `"3001:3000"` maps host port 3001 to container port 3000. You would then access the application through port 3001 on your computer.

### The container starts and immediately stops

**Solution:** Check the container's logs to see why it exited.

For a standalone container:

```bash
docker logs docker-example
```

For the Compose stack:

```bash
docker compose -f docker/docker-compose.yml logs
```

The logs may show a missing file, a configuration problem, or an application error.

### The backend cannot connect to MQTT

**Solution:** Check that the MQTT container is running and inspect its logs.

If the backend is connecting to the broker from inside the Compose network, it should use the service name `mqtt` and port `1883`, rather than `localhost`.

Inside the backend container, `localhost` refers to the backend container itself, not the separate MQTT container.

Also remember that `depends_on` controls startup order; it does not necessarily mean that the MQTT broker is fully ready to accept connections before the backend starts.

---

## Congratulations! 🎉

You have now learned the basics of Docker and how to use it to run applications.

You should now understand how to:

- Explain the difference between a Dockerfile, an image, and a container.
- Build an image from a Dockerfile.
- Start and manage a standalone container through the command line or Docker Desktop.
- Use Docker Compose to run a backend and an MQTT broker together.
- View logs, troubleshoot common errors, and clean up when you have finished.

The best way to learn Docker is to experiment. Try stopping containers, restarting them, rebuilding the image after changing the application, and inspecting the logs to see what happens.

For further reading, the official Docker documentation is available at https://docs.docker.com/get-started/.
