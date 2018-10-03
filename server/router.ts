import * as KoaRouter from "koa-router"

import { apply as applyHello } from "./controller/hello"

export async function build() {
  const router = new KoaRouter()

  applyHello(router)

  return router
}
