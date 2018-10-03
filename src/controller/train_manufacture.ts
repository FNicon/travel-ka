import * as KoaRouter from "koa-router"

export function apply(router: KoaRouter) {
  router.get("manufacture", "/manufacture", async ctx => {
    await ctx.render("hello", {
      youAreUsingPug: true
    })
  })
}
