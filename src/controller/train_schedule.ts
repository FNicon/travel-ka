import * as KoaRouter from "koa-router"

export function apply(router: KoaRouter) {
  router.get("schedule", "/schedule", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
  router.get("scheduleNew", "/schedule/new", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
}
