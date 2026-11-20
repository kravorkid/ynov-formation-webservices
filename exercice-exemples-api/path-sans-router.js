import Koa from "koa";

const app = new Koa();

app.use(async (ctx, next) => {
  const debut = Date.now()
  await next()
  const fin = Date.now()
  console.log(`${ctx.method} ${ctx.path} - ${fin - debut}ms`)
});

app.use(async (ctx) => {

  // ctx.method renvois la méthode HTTP utilisée (GET, POST, etc.)
  // ctx.path renvois le chemin de la requête (ex: /users)
  // ctx.query renvois les paramètres de la requête (ex: ?name=John)
  // ctx.get('Content-Type') renvois le type de contenu de la requête (ex: application/json)
  // ctx.set('Content-Type', 'application/json') définit le type de contenu de la réponse
  // ctx.status renvois le code de statut de la réponse (ex: 200, 404, etc.)
  // ctx.status = 200
  //
  ctx.body = {
    message: 'Hello World',
    path: ctx.path,
    method: ctx.method,
    query: ctx.query,
    userAgent: ctx.get('User-Agent'),
  }

  if (ctx.path === '/texte') {
    ctx.body = 'Bonjour format texte'
  }
  else if (ctx.path === '/json') {
    ctx.body = {
      message: 'Bonjour format JSON'
    }
  }
  else if (ctx.path === '/vide') {
    ctx.body = null
    ctx.status = 204
  }
  else if (ctx.path === '/create') {
    ctx.status = 201
    ctx.set('Location', '/examples/1')
    ctx.body = {
      id: 1,
      name: 'Example'
    }
  }

});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
