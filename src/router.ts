import * as KoaRouter from "koa-router"

import { apply as applyHello } from "./controller/hello"
import { apply as applySchedule } from "./controller/schedule"
import { apply as applyTrain } from "./controller/train"
import { apply as applyScheduleTrain } from "./controller/schedule-train"

export async function build() {
  const router = new KoaRouter()

  applyHello(router)
  applySchedule(router)
  applyTrain(router)
  applyScheduleTrain(router)

  return router
}
