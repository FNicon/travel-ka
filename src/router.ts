import * as KoaRouter from "koa-router"

import { apply as applyHello } from "./controller/hello"
import { apply as applySchedule } from "./controller/schedule"
import { apply as applyTrainManufacture } from "./controller/train_manufacture"

export async function build() {
  const router = new KoaRouter()

  applyHello(router)
  applySchedule(router)
  applyTrainManufacture(router)

  return router
}
