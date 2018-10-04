/// <reference path="../koa-context.d.ts" />

import * as KoaRouter from "koa-router"
import { buildScheduleListUrls } from "./schedule"

export function apply(router: KoaRouter) {
  // #region Overview

  router.get("train-form-new", "/train/new", async ctx => {
    await ctx.render("train/form")
  })

  router.post("train-new", "/train/new", async ctx => {
    // TODO
  })

  router.get("train-list", "/trains", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx.knex("train"),
      urls: {
        trainDetail: router.url.bind(router, "train-detail")
      }
    })
  })

  // #endregion

  // #region Details

  router.get("train-detail", "/train/:id", async ctx => {
    const id: number = ctx.params["id"]

    await ctx.render("train/detail", {
      train: await ctx
        .knex("train")
        .where("id", "=", id)
        .first(),
      urls: {
        schedules: router.url("train-schedules", id)
      }
    })
  })

  router.get("train-form-edit", "/train/:id/edit", async ctx => {
    await ctx.render("train/form", {
      train: await ctx
        .knex("train")
        .where("id", "=", ctx.params["id"])
        .first()
    })
  })

  router.post("train-edit", "/train/:id/edit", async ctx => {
    // TODO
  })

  const scheduleListUrls = buildScheduleListUrls(router)

  router.get("train-schedules", "/train/:id/schedules", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx
        .knex("schedule")
        .where("trainId", "=", ctx.params["id"]),
      urls: scheduleListUrls
    })
  })

  // #endregion
}
