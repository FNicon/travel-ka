import { Context } from "koa"
import * as Pug from "pug"

const viewsModulePath = "./views"

export default function(ctx: Context) {
  ctx.body = Pug.renderFile(
    viewsModulePath + "/" + ctx.response.body.file + ".pug",
    ctx.response.body.data
  )
  ctx.set("Content-Type", "text/html")
}
