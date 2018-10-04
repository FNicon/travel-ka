/// <reference path="../koa-context.d.ts" />

import * as KoaRouter from "koa-router"

import { schemaName } from "../util/schedule"

export function apply(router: KoaRouter) {
  router.get("schedule-list", "/schedules", async ctx => {
    await ctx.render("schedule-list", {
      schedules: await ctx.knex(schemaName)
    })
  })
}
