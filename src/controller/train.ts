/// <reference path="../koa-context.d.ts" />

import * as KoaRouter from "koa-router"

export function buildTrainListUrls(router: KoaRouter) {
  return {
    scheduleDetail: router.url.bind(router, "schedule-detail"),
    trainDetail: router.url.bind(router, "train-detail"),
    scheduleTrainDetail: router.url.bind(router, "schedule-train-detail")
  }
}

export function apply(router: KoaRouter) {
  interface TrainData {
    id: string
    name: string
    manufacturedAt: string
    endedAt: string
  }

  const trainListUrls = buildTrainListUrls(router)

  // #region Overview
  router.get("train-list", "/trains", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx.knex("train"),
      urls: trainListUrls
    })
  })

  // #endregion

  // #region Details
  router.get("train-form-new", "/train/new", async ctx => {
    await ctx.render("train/form")
  })

  router.get("train-detail", "/train/:id", async ctx => {
    const id: number = ctx.params["id"]

    await ctx.render("train/detail", {
      train: await ctx
        .knex("train")
        .where("id", "=", id)
        .first(),
      urls: {
        join: router.url("train-list-schedule-join", id),
        union: router.url("train-list-union", id),
        select: router.url("train-list-select", id),
        projection: router.url("train-list-projection", id),
        different: router.url("train-list-different", id),
        before: router.url("train-list-before", id),
        after: router.url("train-list-after", id),
        meets: router.url("train-list-meets", id),
        metBy: router.url("train-list-met-by", id),
        overlaps: router.url("train-list-overlaps", id),
        overlappedBy: router.url("train-list-overlapped-by", id),
        starts: router.url("train-list-starts", id),
        startedBy: router.url("train-list-started-by", id),
        covers: router.url("train-list-covers", id),
        coveredBy: router.url("train-list-covered-by", id),
        finishes: router.url("train-list-finishes", id),
        finishedBy: router.url("train-list-finished-by", id),
        equals: router.url("train-list-equals", id),
        trainDetail: trainListUrls.trainDetail,
        schedules: router.url("schedule-list-by-train", id),
        trainEdit: router.url("train-form-edit", id)
      }
    })
  })

  router.post("train-add", "/train/new", async ctx => {
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

  router.post("train-edit", "/train/edit", async ctx => {
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

  router.post("train-delete", "/train/delete", async ctx => {
    let body = <TrainData>ctx.request.body
    await ctx
      .knex("train")
      .where("id", "=", body["id"])
      .del()
    ctx.redirect(router.url("train-list", {}))
  })

  router.get(
    "train-list-schedule-join",
    "/train/:id/schedule/join",
    async ctx => {
      //Belum ada UInya//
      await ctx.render("train/list", {
        trains: await ctx
          .knex("train")
          .join("schedule", "schedule.trainId", "=", "train.id"),
        urls: trainListUrls
      })
    }
  )

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

  router.get("train-list-before", "/train/:id/before", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx.knex("train").where(
        "endedAt",
        "<",
        ctx
          .knex("train")
          .select("manufacturedAt")
          .where("id", "=", ctx.params["id"])
          .first()
      ),
      urls: trainListUrls
    })
  })

  router.get("train-list-after", "/train/:id/after", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx.knex("train").where(
        "manufacturedAt",
        ">",
        ctx
          .knex("train")
          .select("endedAt")
          .where("id", "=", ctx.params["id"])
          .first()
      ),
      urls: trainListUrls
    })
  })

  router.get("train-list-meets", "/train/:id/meets", async ctx => {
    // TODO
    // SELECT * FROM public.train WHERE xe == ys;
    // SELECT * FROM public.train WHERE "manufacturedAt"x == "endedAt"y;
    await ctx.render("train/list", {
      trains: await ctx.knex("train").where(
        "endedAt",
        "=",
        ctx
          .knex("train")
          .select("manufacturedAt")
          .where("id", "=", ctx.params["id"])
          .first()
      ),
      urls: trainListUrls
    })
  })

  router.get("train-list-met-by", "/train/:id/met-by", async ctx => {
    // TODO
    // SELECT * FROM public.train WHERE ys == xe;
    // SELECT * FROM public.train WHERE "endedAt"x == "manufacturedAt"y;
    await ctx.render("train/list", {
      trains: await ctx.knex("train").where(
        "manufacturedAt",
        "=",
        ctx
          .knex("train")
          .select("endedAt")
          .where("id", "=", ctx.params["id"])
          .first()
      ),
      urls: trainListUrls
    })
  })

  router.get("train-list-overlaps", "/train/:id/overlaps", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx
        .knex("train")
        .where(
          "manufacturedAt",
          "<",
          ctx
            .knex("train")
            .select("manufacturedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "endedAt",
          "<",
          ctx
            .knex("train")
            .select("endedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "endedAt",
          ">",
          ctx
            .knex("train")
            .select("manufacturedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        ),
      urls: trainListUrls
    })
    // TODO
    // SELECT * FROM public.train WHERE (xs,xe) OVERLAPS (ys,ye);
    // SELECT * FROM public.train WHERE ("endedAt"x,"manufacturedAt"x) OVERLAPS ("endedAt"y,"manufacturedAt"y);
  })

  router.get(
    "train-list-overlapped-by",
    "/train/:id/overlapped-by",
    async ctx => {
      await ctx.render("train/list", {
        trains: await ctx
          .knex("train")
          .where(
            "manufacturedAt",
            ">",
            ctx
              .knex("train")
              .select("manufacturedAt")
              .where("id", "=", ctx.params["id"])
              .first()
          )
          .andWhere(
            "endedAt",
            ">",
            ctx
              .knex("train")
              .select("endedAt")
              .where("id", "=", ctx.params["id"])
              .first()
          )
          .andWhere(
            "manufacturedAt",
            "<",
            ctx
              .knex("train")
              .select("endedAt")
              .where("id", "=", ctx.params["id"])
              .first()
          ),
        urls: trainListUrls
      })
    }
  )

  router.get("train-list-starts", "/train/:id/starts", async ctx => {
    // TODO
    // SELECT * FROM public.train WHERE xs == ys AND xe < ye;
    // SELECT * FROM public.train WHERE "endedAt"x == "endedAt"y AND "manufacturedAt"x < "manufacturedAt"y;
    await ctx.render("train/list", {
      trains: await ctx.knex("train").where(
        "manufacturedAt",
        "=",
        ctx
          .knex("train")
          .select("manufacturedAt")
          .where("id", "=", ctx.params["id"])
          .first(),
        "endedAt",
        "<",
        ctx
          .knex("train")
          .select("endedAt")
          .where("id", "=", ctx.params["id"])
          .first()
      ),
      urls: trainListUrls
    })
  })

  router.get("train-list-started-by", "/train/:id/started-by", async ctx => {
    // TODO
    // SELECT * FROM public.train WHERE xs == ys AND xe > ye;
    // SELECT * FROM public.train WHERE "endedAt"x == "endedAt"y AND "manufacturedAt"x > "manufacturedAt"y;
    await ctx.render("train/list", {
      trains: await ctx
        .knex("train")
        .where(
          "manufacturedAt",
          "=",
          ctx
            .knex("train")
            .select("manifacturedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "endedAt",
          ">",
          ctx
            .knex("train")
            .select("endedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        ),
      urls: trainListUrls
    })
  })

  router.get("train-list-covers", "/train/:id/covers", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx
        .knex("train")
        .where(
          "manufacturedAt",
          "<",
          ctx
            .knex("train")
            .select("manufacturedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "endedAt",
          ">",
          ctx
            .knex("train")
            .select("endedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        ),
      urls: trainListUrls
    })
  })

  router.get("train-list-covered-by", "/train/:id/covered-by", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx
        .knex("train")
        .where(
          "manufacturedAt",
          ">",
          ctx
            .knex("train")
            .select("manufacturedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "endedAt",
          "<",
          ctx
            .knex("train")
            .select("endedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        ),
      urls: trainListUrls
    })
  })

  router.get("train-list-finishes", "/train/:id/finishes", async ctx => {
    // TODO
    // SELECT * FROM public.train WHERE xe == ye AND xs > ys;
    // SELECT * FROM public.train WHERE "manufacturedAt"x == "manufacturedAt"y AND "endedAt"x > "endedAt"y;
    await ctx.render("train/list", {
      trains: await ctx
        .knex("train")
        .where(
          "endedAt",
          "=",
          ctx
            .knex("train")
            .select("endedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "manufacturedAt",
          ">",
          ctx
            .knex("train")
            .select("manufacturedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        ),
      urls: trainListUrls
    })
  })

  router.get("train-list-finished-by", "/train/:id/finished-by", async ctx => {
    // TODO
    // SELECT * FROM public.train WHERE xe == ye AND xs < ys;
    // SELECT * FROM public.train WHERE "manufacturedAt"x == "manufacturedAt"y AND "endedAt"x < "endedAt"y;
    await ctx.render("train/list", {
      trains: await ctx
        .knex("train")
        .where(
          "endedAt",
          "=",
          ctx
            .knex("train")
            .select("endedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "manufacturedAt",
          "<",
          ctx
            .knex("train")
            .select("manufacturedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        ),
      urls: trainListUrls
    })
  })

  router.get("train-list-equals", "/train/:id/equals", async ctx => {
    await ctx.render("train/list", {
      trains: await ctx
        .knex("train")
        .where(
          "manufacturedAt",
          "=",
          ctx
            .knex("train")
            .select("manufacturedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere(
          "endedAt",
          "=",
          ctx
            .knex("train")
            .select("endedAt")
            .where("id", "=", ctx.params["id"])
            .first()
        )
        .andWhere("id", "!=", ctx.params["id"]),
      urls: trainListUrls
    })
  })

  // #endregion
}
