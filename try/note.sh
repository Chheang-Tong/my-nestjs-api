psql postgres
\c nest
ALTER TABLE "_prisma_migrations" OWNER TO devuser;

GRANT ALL PRIVILEGES ON SCHEMA public TO devuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO devuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO devuser;

\q

npx prisma migrate dev --name init
# =========================================
psql postgres
ALTER ROLE devuser CREATEDB;
\q
npx prisma migrate dev --name init
# =========================================