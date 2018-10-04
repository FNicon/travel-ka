import * as Knex from "knex"

declare module "koa" {
  interface Context {
    knex: Knex
  }
}
