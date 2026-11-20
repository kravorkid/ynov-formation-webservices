import Koa from "koa";
import Router from "@koa/router";

const app = new Koa();
const PORT = process.env.PORT || 3001;

// app.use(async (ctx, next) => {
//   const debut = Date.now()
//   await next()
//   const fin = Date.now()
//   console.log(`${ctx.method} ${ctx.path} - ${fin - debut}ms`)
// });
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
  const bool = ctx.query?.bool

  if (bool === undefined) {
    ctx.body = exemples;
    return
  }

  if (bool !== 'true' && bool !== 'false') {
    ctx.status = 400
    ctx.body = { error: "Invalid bool value" }
  }

  ctx.body = exemples.filter((e) => {
    return e.bool === (bool === 'true');
  });

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
