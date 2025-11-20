docker compose down -v
docker compose up -d
npx prisma migrate deploy
docker compose ps
docker compose logs api --tail=50