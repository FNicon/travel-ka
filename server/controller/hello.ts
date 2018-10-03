import * as KoaRouter from "koa-router"

export function apply(router: KoaRouter) {
  router.get("hello", "/hello", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
}
