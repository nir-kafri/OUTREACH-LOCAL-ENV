# Local Development Setup

## Prerequisites
- **Docker Desktop** ([download](https://www.docker.com/products/docker-desktop/)) - must be **open and running**
  - Docker runs our database and backend services in containers
  - After installing, open the app and wait for it to fully start (whale icon stops animating)
- **Node.js 18+** ([download](https://nodejs.org/))
- **Git** ([download](https://git-scm.com/downloads))

---

## Setup (one time only)

### 1. Clone this repo
```bash
git clone https://github.com/nir-kafri/OUTREACH-LOCAL-ENV.git
cd OUTREACH-LOCAL-ENV
```
> This repo contains Docker configuration and setup files

### 2. Clone the service repos inside this folder
```bash
git clone https://dev.azure.com/JerusalemYouthOutreach/Outreach/_git/jerusalem-youth-backoffice-server
git clone https://dev.azure.com/JerusalemYouthOutreach/Outreach/_git/jerusalem-youth-backoffice-client
git clone https://dev.azure.com/JerusalemYouthOutreach/Outreach/_git/tiktok-att-api
```
> These are the actual application code repos. They must be cloned **inside** the OUTREACH-LOCAL-ENV folder.

### 3. Install dependencies
```bash
cd jerusalem-youth-backoffice-server && npm install && cd ..
cd jerusalem-youth-backoffice-client && npm install && cd ..
```
> Downloads all the packages needed to run the apps

---

## Running (every time you want to work)

### 1. Start Docker services
> ⚠️ **Make sure Docker Desktop app is open first!**

```bash
docker compose -f docker-comopse.yml up -d
```
> This starts 3 services in the background:
> - **MongoDB** (database) on port 27017
> - **tikapi-mock** (fake TikTok API for testing) on port 5000  
> - **tiktok-att-api** (Python backend) on port 8081
>
> The `-d` flag means "detached" - runs in background so you can use the terminal

### 2. Start the NestJS server (open a new terminal)
```bash
cd jerusalem-youth-backoffice-server
export MONGODB_URI=mongodb://localhost:27017/back_office_dev
npm run start:dev
```
> - `export MONGODB_URI=...` tells the server where to find the database
> - **Windows users:** use `set MONGODB_URI=...` instead of `export`
> - This runs on port 1337

### 3. Start the React client (open another terminal)
```bash
cd jerusalem-youth-backoffice-client
npx vite --host --port 2000
```
> This is the frontend that you'll see in the browser

### 4. Open http://localhost:2000
> You should see the application login page

---

## Stopping

1. Press `Ctrl+C` in the server and client terminals
2. Stop Docker services:
```bash
docker compose -f docker-comopse.yml down
```
> Add `-v` at the end to also delete the database data

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| "dockerDesktopLinuxEngine not found" | Open Docker Desktop app and wait for it to start |
| Port already in use | Restart your computer or kill the process using that port |
