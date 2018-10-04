/// <reference path="koa-context.d.ts" />

import * as Koa from "koa"
import * as KoaViews from "koa-views"
import * as Knex from "knex"

import { build as buildRouter } from "./router"
import { build as buildKnexConfig } from "./config/knex"

export async function build() {
  const environType = process.env.NODE_ENV || "development"

  const app = new Koa()

  // Database
  const knex = Knex(buildKnexConfig()[environType])

  app.use(async (ctx, next) => {
    ctx.knex = knex
    await next()
  })

  // Views
  app.use(
    KoaViews("views", {
      extension: "pug"
    })
  )

  // Controllers
  const router = await buildRouter()

  app.use(router.routes())
  app.use(router.allowedMethods())

  return app
}
