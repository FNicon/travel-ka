/// <reference path="koa-context.d.ts" />

import * as Koa from "koa"
import * as KoaMount from "koa-mount"
import * as KoaStatic from "koa-static"
import * as KoaViews from "koa-views"
import * as KoaBody from "koa-bodyparser"
import * as Knex from "knex"

import { build as buildRouter } from "./router"
import { build as buildKnexConfig } from "./config/knex"

export async function build() {
  const environType = process.env.NODE_ENV || "development"

  const app = new Koa()

  // Static Folder
  const publicFiles = "./public"

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

  app.use(KoaMount("/static", KoaStatic(publicFiles)))

  app.use(KoaBody())

  // Controllers
  const router = await buildRouter()

  app.use(router.routes())
  app.use(router.allowedMethods())

  return app
}
