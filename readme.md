# 🛒 Ecommerce Web App — Clickmart

A full-stack ecommerce web application built with **Node.js**, **React.js**, and **MongoDB**, deployed using **Docker**.

---

## 🧰 Tech Stack

| Layer       | Technology          |
|-------------|---------------------|
| Frontend    | React.js (CRA)      |
| Backend     | Node.js + Express   |
| Database    | MongoDB Atlas       |
| Payments    | Braintree / PayPal  |
| Deployment  | Docker + Nginx      |

---

## 📁 Project Structure

```
clickmart/
├── server.js                  # Node.js entry point
├── package.json               # Backend dependencies
├── Dockerfile.backend         # Backend Docker image
├── docker-compose.yml         # Multi-container setup
├── .env                       # Environment variables (not committed)
├── .dockerignore
└── client/                    # React frontend
    ├── src/
    ├── public/
    ├── package.json           # Frontend dependencies
    ├── Dockerfile.frontend    # Frontend Docker image
    └── nginx.conf             # Nginx config for React SPA
```

---

## ⚙️ Environment Variables

Create a `.env` file at the project root before running:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=2999
NODE_ENV=production
JWT_SECRET=your_jwt_secret
BRAINTREE_MERCHANT_ID=your_merchant_id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key
```

---

## 🐳 Docker Setup

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/) installed

Install on Ubuntu:
```bash
sudo apt update
sudo apt install docker.io docker-compose-plugin -y
sudo usermod -aG docker $USER
newgrp docker
```

---

## 🚀 Build & Run Commands

### Build Docker Images
```bash
docker compose build
```

### Build Without Cache (fresh build)
```bash
docker compose build --no-cache
```

### Start All Containers
```bash
docker compose up -d
```

### Build and Start in One Command
```bash
docker compose up -d --build
```

### Force Recreate Containers (after code update)
```bash
docker compose up -d --force-recreate
```

### Stop All Containers
```bash
docker compose down
```

### Stop and Remove Volumes
```bash
docker compose down -v
```

---

## 🌐 Access the App

| Service          | URL                        |
|------------------|----------------------------|
| React Frontend   | http://localhost:3000       |
| Node.js Backend  | http://localhost:2999       |

---

## 📜 Available Scripts (without Docker)

### Run Backend (development)
```bash
npm run server
```

### Run Frontend (development)
```bash
npm run client
```

### Run Both Concurrently
```bash
npm run dev
```

---

## 🔍 Useful Docker Commands

```bash
# View running containers
docker compose ps

# View live logs
docker compose logs -f

# View backend logs only
docker compose logs -f backend

# View frontend logs only
docker compose logs -f frontend

# Rebuild a single service
docker compose build backend
docker compose build frontend

# Restart a single container
docker compose restart backend
```

---

<!-- ## 🔁 CI/CD with Jenkins

This project uses a **Jenkins pipeline** for automated deployments:

- Triggers on push to the `dhruv` branch via **Generic Webhook Token**
- Auto-generates `.env` from Jenkins credentials
- Builds fresh Docker images
- Deploys with `docker compose up -d --force-recreate`
- Sends **email notification** on success or failure

--- -->

## 📬 Contact

**Author:** Dhruv Gajjar  
**License:** MIT