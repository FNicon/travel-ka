import * as KoaRouter from "koa-router"

export function apply(router: KoaRouter) {
  router.get("manufacture", "/manufacture", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })

  router.get("manufacture_insert", "/manufacture/insert", async ctx => {
    await ctx.render("hello", {
      /*INSERT INTO public.train(id, name, "manufacturedAt", "endedAt")
	        VALUES (?, ?, ?, ?);*/
      youAreUsingPug: true
    })
  })
  router.get("manufacture_update", "/manufacture/update", async ctx => {
    await ctx.render("hello", {
      /*UPDATE public.train SET id=?, name=?, "manufacturedAt"=?, "endedAt"=?
        WHERE <condition>;*/
      youAreUsingPug: true
    })
  })
  router.get("manufacture_delete", "/manufacture/delete", async ctx => {
    await ctx.render("hello", {
      /*DELETE FROM public.train
	      WHERE <condition>;*/
      youAreUsingPug: true
    })
  })

  router.get("manufacture_select", "/manufacture/select", async ctx => {
    await ctx.render("hello", {
      /*SELECT id, name, "manufacturedAt", "endedAt"
	      FROM public.train;*/
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
      /*SELECT * FROM public.train WHERE xe < ys; */
      /*SELECT * FROM public.train WHERE "manufacturedAt"x < "endedAt"y;*/
      youAreUsingPug: true
    })
  })
  router.get("manufacture_after", "/manufacture/after", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.train WHERE xs > ye; */
      /*SELECT * FROM public.train WHERE "endedAt"x > "manufacturedAt"y;*/
      youAreUsingPug: true
    })
  })

  router.get("manufacture_meet", "/manufacture/meet", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.train WHERE xe == ys;*/
      /*SELECT * FROM public.train WHERE "manufacturedAt"x == "endedAt"y;*/
      youAreUsingPug: true
    })
  })
  router.get(
    "manufacture_meet_inverse",
    "/manufacture/meet_inverse",
    async ctx => {
      await ctx.render("hello", {
        /*SELECT * FROM public.train WHERE ys == xe;*/
        /*SELECT * FROM public.train WHERE "endedAt"x == "manufacturedAt"y;*/
        youAreUsingPug: true
      })
    }
  )

  router.get("manufacture_overlap", "/manufacture/overlap", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.train WHERE (xs,xe) OVERLAPS (ys,ye); */
      /*SELECT * FROM public.train WHERE ("endedAt"x,"manufacturedAt"x) OVERLAPS ("endedAt"y,"manufacturedAt"y);*/
      youAreUsingPug: true
    })
  })
  router.get(
    "manufacture_overlap_inverse",
    "/manufacture/overlap_inverse",
    async ctx => {
      await ctx.render("hello", {
        /*SELECT * FROM public.train WHERE (ys,ye) OVERLAPS (xs,xe); */
        /*SELECT * FROM public.train WHERE ("endedAt"y,"manufacturedAt"y) OVERLAPS ("endedAt"x,"manufacturedAt"x);*/
        youAreUsingPug: true
      })
    }
  )

  router.get("manufacture_start", "/manufacture/start", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.train WHERE xs == ys AND xe < ye;*/
      /*SELECT * FROM public.train WHERE "endedAt"x == "endedAt"y AND "manufacturedAt"x < "manufacturedAt"y;*/
      youAreUsingPug: true
    })
  })
  router.get(
    "manufacture_start_inverse",
    "/manufacture/start_inverse",
    async ctx => {
      await ctx.render("hello", {
        /*SELECT * FROM public.train WHERE xs == ys AND xe > ye;*/
        /*SELECT * FROM public.train WHERE "endedAt"x == "endedAt"y AND "manufacturedAt"x > "manufacturedAt"y;*/
        youAreUsingPug: true
      })
    }
  )

  router.get("manufacture_during", "/manufacture/during", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.train WHERE (xs BETWEEN (ys, ye)) AND (xe BETWEEN (ys, ye));*/
      /*SELECT * FROM public.train WHERE ("endedAt"y < "endedAt"x AND "endedAt"x < "manufacturedAt"y) 
                                        AND ("endedAt"y < "manufacturedAt"x AND "manufacturedAt"x < "manufacturedAt"y);*/
      youAreUsingPug: true
    })
  })
  router.get(
    "manufacture_during_inverse",
    "/manufacture/during_inverse",
    async ctx => {
      await ctx.render("hello", {
        /*SELECT * FROM public.train WHERE (ys BETWEEN (xs, xe)) AND (ye BETWEEN (xs, xe));*/
        /*SELECT * FROM public.train WHERE ("endedAt"x < "endedAt"y AND "endedAt"y < "manufacturedAt"x) 
                                          AND ("endedAt"x < "manufacturedAt"y AND "manufacturedAt"y < "manufacturedAt"x);*/
        youAreUsingPug: true
      })
    }
  )

  router.get("manufacture_finish", "/manufacture/finish", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.train WHERE xe == ye AND xs > ys;*/
      /*SELECT * FROM public.train WHERE "manufacturedAt"x == "manufacturedAt"y AND "endedAt"x > "endedAt"y;*/
      youAreUsingPug: true
    })
  })
  router.get(
    "manufacture_finish_inverse",
    "/manufacture/finish_inverse",
    async ctx => {
      await ctx.render("hello", {
        /*SELECT * FROM public.train WHERE xe == ye AND xs < ys;*/
        /*SELECT * FROM public.train WHERE "manufacturedAt"x == "manufacturedAt"y AND "endedAt"x < "endedAt"y;*/
        youAreUsingPug: true
      })
    }
  )

  router.get("manufacture_equal", "/manufacture/equal", async ctx => {
    await ctx.render("hello", {
      /*SELECT * FROM public.train WHERE xs == ys AND xe == ye;*/
      /*SELECT * FROM public.train WHERE "endedAt"x == "endedAt"y AND "manufacturedAt"x == "manufacturedAt"y;*/
      youAreUsingPug: true
    })
  })
}
