version: '3.8'

services:
dev-db:
image: postgres:13
environment:
POSTGRES_USER: devuser
POSTGRES_PASSWORD: 123
POSTGRES_DB: nest
ports: - '5434:5432'
networks: - networkTesting
healthcheck:
test: ["CMD-SHELL", "pg_isready -U devuser -d nest || exit 1"]
interval: 5s
timeout: 5s
retries: 10
test-db:
image: postgres:13
environment:
POSTGRES_USER: devuser
POSTGRES_PASSWORD: 123
POSTGRES_DB: nest
ports: - '5435:5432'
networks: - networkTesting
api:
build: .
restart: always
depends_on:
dev-db:
condition: service_healthy
environment:
DATABASE_URL: postgresql://devuser:123@dev-db:5432/nest?schema=public
ports: - '3000:3000'
command: >
sh -c "npx prisma migrate deploy && node dist/src/main"

networks:
networkTesting:
