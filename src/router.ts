import * as KoaRouter from "koa-router"

import { apply as applyHello } from "./controller/hello"
import { apply as applySchedule } from "./controller/train_schedule"
import { apply as applyManufacture } from "./controller/train_manufacture"

export async function build() {
  const router = new KoaRouter()

  applyHello(router)
  applySchedule(router)
  applyManufacture(router)

  return router
}
