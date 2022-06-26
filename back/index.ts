export{}
const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser');
const router = require('./router.ts');

//jwt
const jwt = require('koa-jwt');
const {jwtsecret,expiresIn} = require('./secret.ts');

app.use(require('koa-logger')());

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Methods',
    'POST, GET, OPTIONS, PATCH, HEAD, PUT, DELETE'
  );
  ctx.set('Access-Control-Max-Age', '3600');
  ctx.set(
    'Access-Control-Allow-Headers',
    'x-requested-with,Authorization,Content-Type,Accept'
  );
  ctx.set('Access-Control-Allow-Credentials', 'true');
  if (ctx.request.method == 'OPTIONS') {
    ctx.response.status = 200;
  } else {
    try {
      await next();
    } catch (err) {
      console.log('handler fail' + err.message);
      ctx.response.status = err.statusCode || err.status || 500;
      ctx.response.body = {
        message: err.message,
      };
    }
  }
});

app.use(bodyparser());
app.use(require('koa-static')(__dirname + '/public'));//static file

app.use(jwt({secret:jwtsecret}).unless(
  {
    method:['GET','OPTIONS'],
    path:[/^\/api\/users\/login/,/^\/api\/users\/signup/],
  })
);

app.use(router.routes(), router.allowedMethods());
app.listen(8082);
console.log('Server running at http://127.0.0.1:8082/');