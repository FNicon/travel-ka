import { Context } from "koa"
import * as Router from "koa-router"

let router = new Router()

router.get(
  "/",
  (ctx, next) => {
    ctx.body = { file: "index", data: {} }
    next()
  },
  ctx => {
    require("./render.ts").default(ctx)
  }
)

export default router

// export default async function(ctx: Context) {
//   ctx.body = {"template":true, "file" : "index", "data" : {}}
// }
