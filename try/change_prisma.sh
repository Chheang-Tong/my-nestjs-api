psql -h localhost -p 5432 -U davidlong -d postgres

-- Make sure devuser fully owns the DB
ALTER DATABASE nest OWNER TO devuser;

-- Connect to that DB
\c nest

-- Make devuser own the schema
ALTER SCHEMA public OWNER TO devuser;

-- Extra safety: grant all privileges on schema
GRANT ALL PRIVILEGES ON SCHEMA public TO devuser;
\q
npx prisma migrate dev --name init
# =========================================