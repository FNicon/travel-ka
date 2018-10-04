/// <reference path="../koa-context.d.ts" />

import * as KoaRouter from "koa-router"

export function buildScheduleListUrls(router: KoaRouter) {
  return {
    scheduleDetail: router.url.bind(router, "schedule-detail"),
    trainDetail: router.url.bind(router, "train-detail")
  }
}

export function apply(router: KoaRouter) {
  const scheduleListUrls = buildScheduleListUrls(router)

  // #region Overview

  router.get("schedule-form-new", "/schedule/new", async ctx => {
    await ctx.render("schedule/form")
  })

  router.post("schedule-new", "/schedule/new", async ctx => {
    // TODO
  })

  router.get("schedule-list", "/schedules", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx.knex("schedule"),
      urls: scheduleListUrls
    })
  })

  // #endregion

  // #region Details

  router.get("schedule-detail", "/schedule/:id", async ctx => {
    const id: number = ctx.params["id"]

    await ctx.render("schedule/detail", {
      schedule: await ctx
        .knex("schedule")
        .where("id", "=", id)
        .first(),
      urls: {
        before: router.url("schedule-list-before", id),
        after: router.url("schedule-list-after", id),
        meets: router.url("schedule-list-meets", id),
        metBy: router.url("schedule-list-met-by", id),
        overlaps: router.url("schedule-list-overlaps", id),
        overlappedBy: router.url("schedule-list-overlapped-by", id),
        starts: router.url("schedule-list-starts", id),
        startedBy: router.url("schedule-list-started-by", id),
        covers: router.url("schedule-list-covers", id),
        coveredBy: router.url("schedule-list-covered-by", id),
        finishes: router.url("schedule-list-finishes", id),
        finishedBy: router.url("schedule-list-finished-by", id),
        equals: router.url("schedule-list-equals", id),
        trainDetail: scheduleListUrls.trainDetail
      }
    })
  })

  router.get("schedule-form-edit", "/schedule/:id/edit", async ctx => {
    await ctx.render("schedule/form", {
      schedule: await ctx
        .knex("schedule")
        .where("id", "=", ctx.params["id"])
        .first()
    })
  })

  router.post("schedule-edit", "/schedule/:id/edit", async ctx => {
    // TODO
  })

  router.get("schedule-list-before", "/schedule/:id/before", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx.knex("schedule").where(
        "arrivedAt",
        ">",
        ctx
          .knex("schedule")
          .select("departedAt")
          .where("id", "=", ctx.params["id"])
          .first()
      ),
      urls: scheduleListUrls
    })
  })

  router.get("schedule-list-after", "/schedule/:id/after", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx.knex("schedule").where(
        "departedAt",
        "<",
        ctx
          .knex("schedule")
          .select("arrivedAt")
          .where("id", "=", ctx.params["id"])
          .first()
      ),
      urls: scheduleListUrls
    })
  })

  router.get("schedule-list-meets", "/schedule/:id/meets", async ctx => {
    // TODO
    // SELECT * FROM public.train WHERE xe == ys;
    // SELECT * FROM public.train WHERE "manufacturedAt"x == "endedAt"y;
  })

  router.get("schedule-list-met-by", "/schedule/:id/met-by", async ctx => {
    // TODO
    // SELECT * FROM public.train WHERE ys == xe;
    // SELECT * FROM public.train WHERE "endedAt"x == "manufacturedAt"y;
  })

  router.get("schedule-list-overlaps", "/schedule/:id/overlaps", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx
        .knex("schedule")
        .where(
          "departedAt",
          "<",
          ctx
            .knex("schedule")
            .select("departedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "arrivedAt",
          "<",
          ctx
            .knex("schedule")
            .select("arrivedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "arrivedAt",
          ">",
          ctx
            .knex("schedule")
            .select("departedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        ),
      urls: scheduleListUrls
    })
    // TODO
    // SELECT * FROM public.train WHERE (xs,xe) OVERLAPS (ys,ye);
    // SELECT * FROM public.train WHERE ("endedAt"x,"manufacturedAt"x) OVERLAPS ("endedAt"y,"manufacturedAt"y);
  })

  router.get(
    "schedule-list-overlapped-by",
    "/schedule/:id/overlapped-by",
    async ctx => {
      await ctx.render("schedule/list", {
        schedules: await ctx
          .knex("schedule")
          .where(
            "departedAt",
            ">",
            ctx
              .knex("schedule")
              .select("departedAt")
              .where("id", "=", ctx.params["id"])
              .first()
          )
          .andWhere(
            "arrivedAt",
            ">",
            ctx
              .knex("schedule")
              .select("arrivedAt")
              .where("id", "=", ctx.params["id"])
              .first()
          )
          .andWhere(
            "arrivedAt",
            "<",
            ctx
              .knex("schedule")
              .select("departedAt")
              .where("id", "=", ctx.params["id"])
              .first()
          ),
        urls: scheduleListUrls
      })
    }
  )

  router.get("schedule-list-starts", "/schedule/:id/starts", async ctx => {
    // TODO
    // SELECT * FROM public.train WHERE xs == ys AND xe < ye;
    // SELECT * FROM public.train WHERE "endedAt"x == "endedAt"y AND "manufacturedAt"x < "manufacturedAt"y;
  })

  router.get(
    "schedule-list-started-by",
    "/schedule/:id/started-by",
    async ctx => {
      // TODO
      // SELECT * FROM public.train WHERE xs == ys AND xe > ye;
      // SELECT * FROM public.train WHERE "endedAt"x == "endedAt"y AND "manufacturedAt"x > "manufacturedAt"y;
    }
  )

  router.get("schedule-list-covers", "/schedule/:id/covers", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx
        .knex("schedule")
        .where(
          "departedAt",
          "<",
          ctx
            .knex("schedule")
            .select("departedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "arrivedAt",
          ">",
          ctx
            .knex("schedule")
            .select("arrivedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        ),
      urls: scheduleListUrls
    })
  })

  router.get(
    "schedule-list-covered-by",
    "/schedule/:id/covered-by",
    async ctx => {
      await ctx.render("schedule/list", {
        schedules: await ctx
          .knex("schedule")
          .where(
            "departedAt",
            ">",
            ctx
              .knex("schedule")
              .select("departedAt")
              .where("id", "=", ctx.params["id"])
              .first()
          )
          .andWhere(
            "arrivedAt",
            "<",
            ctx
              .knex("schedule")
              .select("arrivedAt")
              .where("id", "=", ctx.params["id"])
              .first()
          ),
        urls: scheduleListUrls
      })
    }
  )

  router.get("schedule-list-finishes", "/schedule/:id/finishes", async ctx => {
    // TODO
    // SELECT * FROM public.train WHERE xe == ye AND xs > ys;
    // SELECT * FROM public.train WHERE "manufacturedAt"x == "manufacturedAt"y AND "endedAt"x > "endedAt"y;
  })

  router.get(
    "schedule-list-finished-by",
    "/schedule/:id/finished-by",
    async ctx => {
      // TODO
      // SELECT * FROM public.train WHERE xe == ye AND xs < ys;
      // SELECT * FROM public.train WHERE "manufacturedAt"x == "manufacturedAt"y AND "endedAt"x < "endedAt"y;
    }
  )

  router.get("schedule-list-equals", "/schedule/:id/equals", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx
        .knex("schedule")
        .where(
          "departedAt",
          "=",
          ctx
            .knex("schedule")
            .select("departedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "arrivedAt",
          "=",
          ctx
            .knex("schedule")
            .select("arrivedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        ),
      urls: scheduleListUrls
    })
  })

  // #endregion
}
