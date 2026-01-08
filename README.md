# Local Development Setup

## Prerequisites
- Docker
- Node.js 18+
- npm

## Quick Start

### 1. Start backend services
```bash
docker compose -f docker-comopse.yml up -d
```
This starts:
- MongoDB (port 27017)
- TikApi mock (port 5000)
- Python API (port 8081)

### 2. Start the NestJS server
```bash
cd jerusalem-youth-backoffice-server
npm install
export MONGODB_URI=mongodb://localhost:27017/back_office_dev
npm run start:dev
```

### 3. Start the React client
```bash
cd jerusalem-youth-backoffice-client
npm install
npx vite --host
```

### 4. Open browser
Go to http://localhost:2000

## Stopping

- Press `Ctrl+C` in the server and client terminals
- Stop Docker services:
```bash
docker compose -f docker-comopse.yml down
```

## Useful Commands

| Command | Description |
|---------|-------------|
| `docker ps` | Check running containers |
| `docker logs tiktok-att-api` | View Python API logs |
| `docker logs jy_mongo` | View MongoDB logs |
| `docker compose -f docker-comopse.yml down -v` | Stop and delete all data |
