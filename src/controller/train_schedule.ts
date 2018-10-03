import * as KoaRouter from "koa-router"

export function apply(router: KoaRouter) {
  router.get("schedule", "/schedule", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("schedule_insert", "/schedule/insert", async ctx => {
    await ctx.render("hello", {
      /*INSERT INTO public.schedule(id, "trainId", source, destination, "departedAt", "arrivedAt")
        VALUES (?, ?, ?, ?, ?, ?);*/
      youAreUsingPug: true
    })
  })
  router.get("schedule_update", "/schedule/update", async ctx => {
    await ctx.render("hello", {
      /*UPDATE public.schedule SET id=?, "trainId"=?, source=?, destination=?, "departedAt"=?, "arrivedAt"=?
	      WHERE <condition>;*/
      youAreUsingPug: true
    })
  })
  router.get("schedule_delete", "/schedule/delete", async ctx => {
    await ctx.render("hello", {
      /*DELETE FROM public.schedule
	      WHERE <condition>;*/
      youAreUsingPug: true
    })
  })

  router.get("schedule_select", "/schedule/select", async ctx => {
    await ctx.render("hello", {
      /*SELECT id, "trainId", source, destination, "departedAt", "arrivedAt"
	      FROM public.schedule;*/
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
      /*SELECT * FROM public.schedule WHERE xe < ys; */
      /*SELECT * FROM public.schedule WHERE "arrivedAt"x < "departedAt"y;*/
      youAreUsingPug: true
    })
  })
  router.get("schedule_after", "/schedule/after", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.schedule WHERE xs > ye; */
      /*SELECT * FROM public.schedule WHERE "departedAt"x > "arrivedAt"y;*/
      youAreUsingPug: true
    })
  })

  router.get("schedule_meet", "/schedule/meet", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.schedule WHERE xe == ys;*/
      /*SELECT * FROM public.schedule WHERE "arrivedAt"x == "departedAt"y;*/
      youAreUsingPug: true
    })
  })
  router.get("schedule_meet_inverse", "/schedule/meet_inverse", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.schedule WHERE ys == xe;*/
      /*SELECT * FROM public.schedule WHERE "departedAt"x == "arrivedAt"y;*/
      youAreUsingPug: true
    })
  })

  router.get("schedule_overlap", "/schedule/overlap", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.schedule WHERE (xs,xe) OVERLAPS (ys,ye); */
      /*SELECT * FROM public.schedule WHERE ("departedAt"x,"arrivedAt"x) OVERLAPS ("departedAt"y,"arrivedAt"y);*/
      youAreUsingPug: true
    })
  })
  router.get(
    "schedule_overlap_inverse",
    "/schedule/overlap_inverse",
    async ctx => {
      await ctx.render("hello", {
        /*SELECT * FROM public.schedule WHERE (ys,ye) OVERLAPS (xs,xe); */
        /*SELECT * FROM public.schedule WHERE ("departedAt"y,"arrivedAt"y) OVERLAPS ("departedAt"x,"arrivedAt"x);*/
        youAreUsingPug: true
      })
    }
  )

  router.get("schedule_start", "/schedule/start", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.schedule WHERE xs == ys AND xe < ye;*/
      /*SELECT * FROM public.schedule WHERE "departedAt"x == "departedAt"y AND "arrivedAt"x < "arrivedAt"y;*/
      youAreUsingPug: true
    })
  })
  router.get("schedule_start_inverse", "/schedule/start_inverse", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.schedule WHERE xs == ys AND xe > ye;*/
      /*SELECT * FROM public.schedule WHERE "departedAt"x == "departedAt"y AND "arrivedAt"x > "arrivedAt"y;*/
      youAreUsingPug: true
    })
  })

  router.get("schedule_during", "/schedule/during", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.schedule WHERE (xs BETWEEN (ys, ye)) AND (xe BETWEEN (ys, ye));*/
      /*SELECT * FROM public.schedule WHERE ("departedAt"y < "departedAt"x AND "departedAt"x < "arrivedAt"y) 
                                        AND ("departedAt"y < "arrivedAt"x AND "arrivedAt"x < "arrivedAt"y);*/
      youAreUsingPug: true
    })
  })
  router.get(
    "schedule_during_inverse",
    "/schedule/during_inverse",
    async ctx => {
      await ctx.render("hello", {
        /*SELECT * FROM public.schedule WHERE (ys BETWEEN (xs, xe)) AND (ye BETWEEN (xs, xe));*/
        /*SELECT * FROM public.schedule WHERE ("departedAt"x < "departedAt"y AND "departedAt"y < "arrivedAt"x) 
                                          AND ("departedAt"x < "arrivedAt"y AND "arrivedAt"y < "arrivedAt"x);*/
        youAreUsingPug: true
      })
    }
  )

  router.get("schedule_finish", "/schedule/finish", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.schedule WHERE xe == ye AND xs > ys;*/
      /*SELECT * FROM public.schedule WHERE "arrivedAt"x == "arrivedAt"y AND "departedAt"x > "departedAt"y;*/
      youAreUsingPug: true
    })
  })
  router.get(
    "schedule_finish_inverse",
    "/schedule/finish_inverse",
    async ctx => {
      await ctx.render("hello", {
        /*SELECT * FROM public.schedule WHERE xe == ye AND xs < ys;*/
        /*SELECT * FROM public.schedule WHERE "arrivedAt"x == "arrivedAt"y AND "departedAt"x < "departedAt"y;*/
        youAreUsingPug: true
      })
    }
  )

  router.get("schedule_equal", "/schedule/equal", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.schedule WHERE xs == ys AND xe == ye;*/
      /*SELECT * FROM public.schedule WHERE "departedAt"x == "departedAt"y AND "arrivedAt"x == "arrivedAt"y;*/
      youAreUsingPug: true
    })
  })
}
