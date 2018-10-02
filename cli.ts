import { watch } from "chokidar"
import { normalize } from "path"

import * as Koa from "koa"
import * as yargs from "yargs"

const middlewareModulePath = "./server"

// Preload
require(middlewareModulePath)

// Argument parser

interface AppArgs extends yargs.Arguments {
  watch: boolean
  port: number
}

const argv = yargs
  .option("watch", {
    description: "Hot-reload if managed source-code is changed",
    type: "boolean"
  })
  .option("port", {
    alias: "p",
    default: process.env["PORT"] || 8000,
    defaultDescription: "(env.PORT)",
    type: "number"
  })
  .help()
  .strict().argv as AppArgs

// Server app.

const app = new Koa()

var router = require(middlewareModulePath).default

app.use(router.routes()).use(router.allowedMethods())

app.listen(argv.port)
console.error(`Listening on ${argv.port}.`)

// Hot-reloading
// https://codeburst.io/dont-use-nodemon-there-are-better-ways-fc016b50b45e

if (argv.watch) {
  const watcher = watch(middlewareModulePath)
  console.error(`Watching managed source-code on '${middlewareModulePath}'.`)

  const cacheIdPattern = new RegExp(
    normalize(`/${middlewareModulePath}/`).replace(/[\/\\]/g, "[\\/\\\\]")
  )

  watcher.on("ready", () => {
    watcher.on("all", () => {
      console.error("Changes is detected. Clearing caches.")
      Object.keys(require.cache).forEach(path => {
        if (cacheIdPattern.test(path)) delete require.cache[path]
      })
    })
  })
}
