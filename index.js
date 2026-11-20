import Koa from "koa";
import Router from "@koa/router";

const app = new Koa();

const router = new Router();

const exemples = [
  { id: 1, title: "Premier exemple", bool: true },
  { id: 2, title: "Second exemple", bool: false },
  { id: 3, title: "Troisième exemple", bool: true },
];

router.get("/", (ctx) => {
  ctx.body = "Hello World";
});

router.get("/health", (ctx) => {
  ctx.status = 200;
  ctx.body = {
    status: "ok",
  };
});

router.get("/exemples", (ctx) => {
  if (ctx.query.bool === "true") {
    ctx.body = exemples.filter((e) => {
      return e.bool === true;
    });
    return;
  } else if (ctx.query.bool === "false") {
    ctx.body = exemples.filter((e) => {
      return e.bool === false;
    });
    return;
  }
  ctx.body = exemples;
});

router.get("/exemples/count", (ctx) => {
  ctx.body = { count: exemples.length };
});

router.get("/exemples/:id", (ctx) => {
  const id = parseInt(ctx.params.id);
  const exemple = exemples.find((e) => e.id === id);

  if (!exemple) {
    ctx.status = 404;
    ctx.body = {
      error: "Exemples introuvables",
    };
    return;
  }
  ctx.body = exemple;
});

app.use(router.routes(), router.allowedMethods());
// app.use(async (ctx) => {
//
//   // ctx.method renvois la méthode HTTP utilisée (GET, POST, etc.)
//   // ctx.path renvois le chemin de la requête (ex: /users)
//   // ctx.query renvois les paramètres de la requête (ex: ?name=John)
//   // ctx.get('Content-Type') renvois le type de contenu de la requête (ex: application/json)
//   // ctx.set('Content-Type', 'application/json') définit le type de contenu de la réponse
//   // ctx.status renvois le code de statut de la réponse (ex: 200, 404, etc.)
//   // ctx.status = 200
//   //
//   ctx.body = {
//     message: 'Hello World',
//     path: ctx.path,
//     method: ctx.method,
//     query: ctx.query,
//     userAgent: ctx.get('User-Agent'),
//   }
//
//   if (ctx.path === '/texte') {
//     ctx.body = 'Bonjour format texte'
//   }
//   else if (ctx.path === '/json') {
//     ctx.body = {
//       message: 'Bonjour format JSON'
//     }
//   }
//   else if (ctx.path === '/vide') {
//     ctx.body = null
//     ctx.status = 204
//   }
//   else if (ctx.path === '/create') {
//     ctx.status = 201
//     ctx.set('Location', '/examples/1')
//     ctx.body = {
//       id: 1,
//       name: 'Example'
//     }
//   }
//
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
