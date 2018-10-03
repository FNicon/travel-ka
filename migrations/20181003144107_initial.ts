import * as Knex from "knex"

exports.up = async function(knex: Knex) {
  await knex.schema.createTable("train", function(table) {
    table.increments("id").unsigned()

    table.string("name", 255)
    table.date("manufacturedAt")
    table.date("endedAt")
  })

  await knex.schema.createTable("schedule", function(table) {
    table.increments("id").unsigned()

    table.integer("trainId").unsigned()
    table.foreign("trainId").references("train.id")

    table.string("source")
    table.string("destination")
    table.dateTime("departedAt")
    table.dateTime("arrivedAt")
  })
}

exports.down = async function(knex: Knex) {
  await knex.schema.dropTableIfExists("train")
  await knex.schema.dropTableIfExists("schedule")
}
