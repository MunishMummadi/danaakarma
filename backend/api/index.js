const Router = require('koa-router');
const { PrismaClient } = require('@prisma/client');
const router = new Router();
const prisma = new PrismaClient();


const handleResponse = (ctx, result, successMsg, errorMsg) => {
  if (result && (Array.isArray(result) ? result.length : result)) {
    ctx.body = {
      data: result,
      total: Array.isArray(result) ? result.length : 1,
      msg: successMsg
    };
  } else {
    ctx.body = {
      data: null,
      msg: errorMsg
    };
  }
};


const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error('operation error:', err);
    ctx.status = err.status || 500;
    ctx.body = {
      msg: 'operation failed'
    };
  }
};


router.get('/api/allFundraiser', errorHandler, async (ctx) => {
  const { organizer, city, category, active } = ctx.query;
  const where = {};
  if (organizer) where.organizer = { contains: organizer };
  if (city) where.city = { contains: city };
  if (category) where.categoryId = parseInt(category);
  if (active !== undefined) where.active = active === 'true';

  const result = await prisma.fundraiser.findMany({
    where,
    include: { category: true }
  });
  handleResponse(ctx, result, 'query success', 'no data');
});


router.get('/api/fundraiser/:id', errorHandler, async (ctx) => {
  const fundraiserId = parseInt(ctx.params.id);
  const result = await prisma.fundraiser.findUnique({
    where: { id: fundraiserId },
    include: { category: true }
  });
  handleResponse(ctx, result, 'query success', 'no data')
});


router.get('/api/allCategories', errorHandler, async (ctx) => {
  const result = await prisma.category.findMany();
  handleResponse(ctx, result, 'query success', 'no data');
});

module.exports = router;