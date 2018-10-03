import * as KoaRouter from "koa-router"

export function apply(router: KoaRouter) {
  router.get("manufacture", "/manufacture", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("manufacture_insert", "/manufacture/insert", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("manufacture_update", "/manufacture/update", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("manufacture_delete", "/manufacture/delete", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("manufacture_select", "/manufacture/select", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("manufacture_projection", "/manufacture/projection", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("manufacture_union", "/manufacture/union", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("manufacture_difference", "/manufacture/difference", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("manufacture_join", "/manufacture/join", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("manufacture_before", "/manufacture/before", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("manufacture_after", "/manufacture/after", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("manufacture_meet", "/manufacture/meet", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get(
    "manufacture_meet_inverse",
    "/manufacture/meet_inverse",
    async ctx => {
      await ctx.render("hello", {
        youAreUsingPug: true
      })
    }
  )

  router.get("manufacture_overlap", "/manufacture/overlap", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get(
    "manufacture_overlap_inverse",
    "/manufacture/overlap_inverse",
    async ctx => {
      await ctx.render("hello", {
        youAreUsingPug: true
      })
    }
  )

  router.get("manufacture_start", "/manufacture/start", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get(
    "manufacture_start_inverse",
    "/manufacture/start_inverse",
    async ctx => {
      await ctx.render("hello", {
        youAreUsingPug: true
      })
    }
  )

  router.get("manufacture_during", "/manufacture/during", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get(
    "manufacture_during_inverse",
    "/manufacture/during_inverse",
    async ctx => {
      await ctx.render("hello", {
        youAreUsingPug: true
      })
    }
  )

  router.get("manufacture_finish", "/manufacture/finish", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get(
    "manufacture_finish_inverse",
    "/manufacture/finish_inverse",
    async ctx => {
      await ctx.render("hello", {
        youAreUsingPug: true
      })
    }
  )

  router.get("manufacture_equal", "/manufacture/equal", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
}
