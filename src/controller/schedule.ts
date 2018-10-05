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
  const scheduleListUrls = buildScheduleListUrls(router)

  interface ScheduleData {
    id: string
    trainId: string
    source: string
    destination: string
    departedAt: string
    arrivedAt: string
  }

  // #region Overview

  router.get("schedule-form-new", "/schedule/new", async ctx => {
    await ctx.render("schedule/form")
  })

  router.post("schedule-new", "/schedule/new", async ctx => {
    // TODO
    //Belum ditest//
    let body = <ScheduleData>ctx.request.body
    await ctx.knex("schedule").insert([
      {
        id: body.id,
        trainId: body.trainId,
        source: body.source,
        destination: body.destination,
        departedAt: body.departedAt,
        arrivedAt: body.arrivedAt
      }
    ])
    ctx.redirect("train-form-new")
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
        join: router.url("schedule-list-train-join", id),
        union: router.url("schedule-list-union", id),
        select: router.url("schedule-list-select", id),
        projection: router.url("schedule-list-projection", id),
        different: router.url("schedule-list-different", id),
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
        trainDetail: scheduleListUrls.trainDetail,
        scheduleDetail: scheduleListUrls.trainDetail,
        scheduleEdit: router.url("schedule-form-edit", id)
      }
    })
  })

  router.get("schedule-form-edit", "/schedule/:id/edit", async ctx => {
    await ctx.render("schedule/form", {
      schedule: await ctx
        .knex("schedule")
        .where("id", "=", ctx.params["id"])
        .first(),
      urls: {
        delete: router.url("schedule-delete", ctx.params["id"]),
        edit: router.url("schedule-edit", ctx.params["id"])
      }
    })
  })

  router.post("schedule-edit", "/schedule/edit", async ctx => {
    let body = <ScheduleData>ctx.request.body
    await ctx
      .knex("schedule")
      .where("id", "=", body["id"])
      .update({
        trainId: body.trainId,
        source: body.source,
        destination: body.destination,
        departedAt: body.departedAt,
        arrivedAt: body.arrivedAt
      })
    ctx.redirect(
      router.url("schedule-detail", {
        id: body.id
      })
    )
  })

  router.post("schedule-delete", "/schedule/delete", async ctx => {
    let body = <ScheduleData>ctx.request.body
    await ctx
      .knex("schedule")
      .where("id", "=", body["id"])
      .del()
    ctx.redirect(router.url("schedule-list", {}))
  })

  router.get("schedule-list-union", "/schedule/:id/union", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx
        .knex("schedule")
        .where("id", "=", ctx.params["id"])
        .union(function() {
          this.from("schedule").where("id", "=", 1)
        }),
      urls: scheduleListUrls
    })
  })

  router.get("schedule-list-select", "/schedule/:id/select", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx.knex("schedule").where("id", "=", ctx.params["id"]),
      urls: scheduleListUrls
    })
  })

  router.get(
    "schedule-list-projection",
    "/schedule/:id/projection",
    async ctx => {
      //Belum UInya//
      await ctx.render("schedule/list", {
        schedules: await ctx
          .knex("schedule")
          .column("source", "departedAt", "arrivedAt")
          .where("id", "=", ctx.params["id"]),
        urls: scheduleListUrls
      })
    }
  )

  router.get(
    "schedule-list-different",
    "/schedule/:id/different",
    async ctx => {
      await ctx.render("schedule/list", {
        schedules: await ctx
          .knex("schedule")
          .whereRaw(
            "id= ? except select * from schedule WHERE id=1",
            ctx.params["id"]
          ),
        urls: scheduleListUrls
      })
    }
  )

  router.get(
    "schedule-list-train-join",
    "/schedule/:id/train/join",
    async ctx => {
      //Belum ada UInya//
      await ctx.render("train-schedule/list", {
        schedules: await ctx
          .knex("schedule")
          .select(
            "schedule.id",
            "schedule.trainId",
            "train.name",
            "schedule.source",
            "schedule.destination",
            "schedule.departedAt",
            "schedule.arrivedAt"
          )
          .join("train", "schedule.trainId", "=", "train.id")
          .where("schedule.id", "=", ctx.params["id"]),
        urls: scheduleListUrls
      })
    }
  )

  router.get("schedule-list-before", "/schedule/:id/before", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx.knex("schedule").where(
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
  })

  router.get("schedule-list-after", "/schedule/:id/after", async ctx => {
    await ctx.render("schedule/list", {
      schedules: await ctx.knex("schedule").where(
        "departedAt",
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

  router.get("schedule-list-meets", "/schedule/:id/meets", async ctx => {
    // TODO
    // SELECT * FROM public.schedule WHERE xe == ys;
    // SELECT * FROM public.schedule WHERE "departedAt"x == "arrivedAt"y;
    await ctx.render("schedule/list", {
      schedules: await ctx.knex("schedule").where(
        "arrivedAt",
        "=",
        ctx
          .knex("schedule")
          .select("departedAt")
          .where("id", "=", ctx.params["id"])
          .first()
      ),
      urls: scheduleListUrls
    })
  })

  router.get("schedule-list-met-by", "/schedule/:id/met-by", async ctx => {
    // TODO
    // SELECT * FROM public.schedule WHERE ys == xe;
    // SELECT * FROM public.schedule WHERE "arrivedAt"x == "departedAt"y;
    await ctx.render("schedule/list", {
      schedules: await ctx.knex("schedule").where(
        "departedAt",
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
    // SELECT * FROM public.schedule WHERE (xs,xe) OVERLAPS (ys,ye);
    // SELECT * FROM public.schedule WHERE ("arrivedAt"x,"departedAt"x) OVERLAPS ("arrivedAt"y,"departedAt"y);
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
    }
  )

  router.get("schedule-list-starts", "/schedule/:id/starts", async ctx => {
    // TODO
    // SELECT * FROM public.schedule WHERE xs == ys AND xe < ye;
    // SELECT * FROM public.schedule WHERE "arrivedAt"x == "arrivedAt"y AND "departedAt"x < "departedAt"y;
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

  router.get(
    "schedule-list-started-by",
    "/schedule/:id/started-by",
    async ctx => {
      // TODO
      // SELECT * FROM public.schedule WHERE xs == ys AND xe > ye;
      // SELECT * FROM public.schedule WHERE "arrivedAt"x == "arrivedAt"y AND "departedAt"x > "departedAt"y;
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
            ">",
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
    // SELECT * FROM public.schedule WHERE xe == ye AND xs > ys;
    // SELECT * FROM public.schedule WHERE "departedAt"x == "departedAt"y AND "arrivedAt"x > "arrivedAt"y;
    await ctx.render("schedule/list", {
      schedules: await ctx
        .knex("schedule")
        .where(
          "arrivedAt",
          "=",
          ctx
            .knex("schedule")
            .select("arrivedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "departedAt",
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

  router.get(
    "schedule-list-finished-by",
    "/schedule/:id/finished-by",
    async ctx => {
      // TODO
      // SELECT * FROM public.schedule WHERE xe == ye AND xs < ys;
      // SELECT * FROM public.schedule WHERE "departedAt"x == "departedAt"y AND "arrivedAt"x < "arrivedAt"y;
      await ctx.render("schedule/list", {
        schedules: await ctx
          .knex("schedule")
          .where(
            "arrivedAt",
            "=",
            ctx
              .knex("schedule")
              .select("arrivedAt")
              .where("id", "=", ctx.params["id"])
              .first()
          )
          .andWhere(
            "departedAt",
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
        )
        .andWhere("id", "!=", ctx.params["id"]),
      urls: scheduleListUrls
    })
  })

  // #endregion
}
