# install prisma
yarn add -D prisma
# 
yarn add @prisma/client
# initialize prisma
npx prisma init
#reset database 
npx prisma migrate reset
# create
npx prisma migrate dev --name init
# generate client
npx prisma generate
# remove generated prisma client
rm -rf generated/prisma

# open studio
npx prisma studio
# check status
npx prisma db pull
npx prisma db push
npx prisma migrate status
# check client
node -e "const {PrismaClient} = require('@prisma/client'); const prisma = new PrismaClient(); async function main(){ const allUsers = await prisma.user.findMany(); console.log(allUsers); } main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });"
# prisma db seed
npx prisma db seed
# prisma format
npx prisma format
# prisma validate
npx prisma validate
# prisma version
npx prisma --version
# prisma help
npx prisma --help
# prisma generate --watch
npx prisma generate --watch
# prisma migrate dev --name add-field
npx prisma migrate dev --name add-field
# prisma migrate dev --name remove-field
npx prisma migrate dev --name remove-field
npx prisma migrate dev --name remove-field

# prisma migrate dev --name update-field
npx prisma migrate dev --name update-field
# prisma migrate dev --name rename-field
npx prisma migrate dev --name rename-field
# list prisma folder 
ls prisma

# remove prisma
rm -rf prisma
yarn add -D dotenv