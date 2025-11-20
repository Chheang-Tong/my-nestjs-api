FROM node:20-alpine

WORKDIR /usr/src/app

# 1. Install deps
COPY package*.json ./
RUN npm install

# 2. Copy source
COPY . .

# 3. Generate Prisma client INSIDE the image
ENV DATABASE_URL="postgresql://devuser:123@dev-db:5432/nest?schema=public"
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main"]
