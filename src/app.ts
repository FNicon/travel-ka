import * as Koa from "koa"
import * as KoaViews from "koa-views"

import { build as buildRouter } from "./router"

export async function build() {
  const app = new Koa()

  const router = await buildRouter()

  app.use(
    KoaViews("views", {
      extension: "pug"
    })
  )

  app.use(router.routes())
  app.use(router.allowedMethods())

  return app
}
