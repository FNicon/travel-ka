import * as Knex from "knex"

exports.up = async function(knex: Knex) {
  knex.schema.createTable("train", function(table) {
    table.increments("id").unsigned()

    table.string("name", 255)
    table.date("manufactured_at")
    table.date("ended_at")
  })

  knex.schema.createTable("schedule", function(table) {
    table.increments("id").unsigned()

    table.integer("train_id").unsigned()
    table.foreign("train_id").references("train.id")

    table.string("source")
    table.string("destination")
    table.dateTime("departed_at")
    table.dateTime("arrived_at")
  })
}

exports.down = async function(knex: Knex) {
  knex.schema.dropTableIfExists("train")
  knex.schema.dropTableIfExists("schedule")
}
