/// <reference path="../koa-context.d.ts" />

import * as KoaRouter from "koa-router"

export function buildScheduleListUrls(router: KoaRouter) {
  return {
    scheduleDetail: router.url.bind(router, "schedule-detail"),
    trainDetail: router.url.bind(router, "train-detail"),
    scheduleTrainDetail: router.url.bind(router, "schedule-train-detail")
  }
}

export function apply(router: KoaRouter) {
  const scheduleTrainListUrls = buildScheduleListUrls(router)

  // #region Details

  router.get("schedule-list-by-train", "/schedule-train/:id", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx.knex("schedule").where("trainId","=",ctx.params["id"]),
      urls: scheduleTrainListUrls
    })
  })

}
