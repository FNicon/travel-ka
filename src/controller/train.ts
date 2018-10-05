/// <reference path="../koa-context.d.ts" />

import * as KoaRouter from "koa-router"

import { buildScheduleListUrls } from "./schedule"

interface TrainData {
  id: string
  name: string
  manufacturedAt: string
  endedAt: string
}

export function buildTrainListUrls(router: KoaRouter) {
  return {
    scheduleDetail: router.url.bind(router, "schedule-detail"),
    trainDetail: router.url.bind(router, "train-detail"),
    scheduleTrainDetail: router.url.bind(router, "schedule-train-detail")
  }
}

export function apply(router: KoaRouter) {
  // #region Overview

  router.get("train-form-new", "/train/new", async ctx => {
    await ctx.render("train/form")
  })

  router.post("train-new", "/train/new", async ctx => {
    let body = <TrainData>ctx.request.body

    await ctx.knex("train").insert([
      {
        id: body["id"],
        name: body["name"],
        manufacturedAt: body["manufacturedAt"],
        endedAt: body["endedAt"]
      }
    ])

    ctx.redirect("train-form-new")
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
        schedules: router.url("train-schedules", id),
        trainDetail: trainListUrls.trainDetail
      }
    })
  })

  router.get("train-form-edit", "/train/:id/edit", async ctx => {
    await ctx.render("train/form", {
      train: await ctx
        .knex("train")
        .where("id", "=", ctx.params["id"])
        .first(),
      urls: {
        delete: router.url("train-delete", ctx.params["id"]),
        edit: router.url("train-edit", ctx.params["id"])
      }
    })
  })

  router.post("train-edit", "/train/:id/edit", async ctx => {
    let body = <TrainData>ctx.request.body

    await ctx
      .knex("train")
      .where("id", "=", body["id"])
      .update({
        name: body["name"],
        manufacturedAt: body["manufacturedAt"],
        endedAt: body["endedAt"]
      })

    ctx.redirect(router.url("train-detail", body["id"]))
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

  const trainListUrls = buildTrainListUrls(router)

  router.get("train-list-union", "/train/:id/union", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx
        .knex("train")
        .where("id", "=", ctx.params["id"])
        .union(function() {
          this.from("train").where("id", "=", 1)
        }),
      urls: trainListUrls
    })
  })

  router.get("train-list-select", "/train/:id/select", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx.knex("train").where("id", "=", ctx.params["id"]),
      urls: trainListUrls
    })
  })

  router.get("train-list-projection", "/train/:id/projection", async ctx => {
    //Belum ada UInya//
    await ctx.render("train/list", {
      trains: await ctx
        .knex("train")
        .column("name", "manufacturedAt", "endedAt")
        .where("id", "=", ctx.params["id"]),
      urls: trainListUrls
    })
  })

  router.get("train-list-different", "/train/:id/different", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx
        .knex("train")
        .whereRaw(
          "id=? except select * from train where id=1",
          ctx.params["id"]
        ),
      urls: trainListUrls
    })
  })

  // #endregion
}
