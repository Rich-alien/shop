# Duzit

Admin application for managing products. The project is split into two workspaces:

- `frontend` - Angular application
- `backend` - NestJS API with Prisma and PostgreSQL

## Requirements

- Node.js
- npm
- Docker, if you want to run PostgreSQL in a container
- PostgreSQL, if you run the database locally without Docker

## First Run

Install dependencies from the repository root:

```bash
npm install
```

Start PostgreSQL with Docker:

```bash
docker compose up -d
```

Create `backend/.env` and add a PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/products_db"
```

Apply database migrations:

```bash
npm --workspace backend exec prisma migrate dev
```

Start frontend and backend together from the repository root:

```bash
npm start
```

After that open:

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:3000`

## Useful Commands

Start the whole app:

```bash
npm start
```

Run only frontend:

```bash
npm run start:frontend
```

Run only backend:

```bash
npm run start:backend
```

Start PostgreSQL container:

```bash
docker compose up -d
```

Stop PostgreSQL container:

```bash
docker compose down
```

Build frontend:

```bash
npm --workspace frontend run build
```

Build backend:

```bash
npm --workspace backend run build
```

Run backend tests:

```bash
npm --workspace backend test
```

## Ports

- `4200` - Angular dev server
- `3000` - NestJS API
- `5432` - PostgreSQL from Docker

The frontend expects the API at `http://localhost:3000/`.
