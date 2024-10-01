const Koa = require('koa');
const router = require('./api/index');
const cors = require('@koa/cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = new Koa();

app.use(cors({
  origin: '*'
}));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('http://localhost:3000/');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});