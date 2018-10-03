import * as KoaRouter from "koa-router"

export function apply(router: KoaRouter) {
  router.get("schedule", "/schedule", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("schedule_insert", "/schedule/insert", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("schedule_update", "/schedule/update", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("schedule_delete", "/schedule/delete", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("schedule_select", "/schedule/select", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("schedule_projection", "/schedule/projection", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("schedule_union", "/schedule/union", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("schedule_difference", "/schedule/difference", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("schedule_join", "/schedule/join", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("schedule_before", "/schedule/before", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("schedule_after", "/schedule/after", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("schedule_meet", "/schedule/meet", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("schedule_meet_inverse", "/schedule/meet_inverse", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("schedule_overlap", "/schedule/overlap", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get(
    "schedule_overlap_inverse",
    "/schedule/overlap_inverse",
    async ctx => {
      await ctx.render("hello", {
        youAreUsingPug: true
      })
    }
  )

  router.get("schedule_start", "/schedule/start", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("schedule_start_inverse", "/schedule/start_inverse", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("schedule_during", "/schedule/during", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get(
    "schedule_during_inverse",
    "/schedule/during_inverse",
    async ctx => {
      await ctx.render("hello", {
        youAreUsingPug: true
      })
    }
  )

  router.get("schedule_finish", "/schedule/finish", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get(
    "schedule_finish_inverse",
    "/schedule/finish_inverse",
    async ctx => {
      await ctx.render("hello", {
        youAreUsingPug: true
      })
    }
  )

  router.get("schedule_equal", "/schedule/equal", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
}
