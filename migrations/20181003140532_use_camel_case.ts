import * as Knex from "knex";

exports.up = async function(knex: Knex) {
  knex.schema.table("train", function(table) {
    table.renameColumn("manufactured_at", "manufacturedAt")
    table.renameColumn("ended_at", "endedAt")
  })

  knex.schema.table("schedule", function(table) {
    table.renameColumn("train_id", "trainId")

    table.renameColumn("departed_at", "departedAt")
    table.renameColumn("arrived_at", "arrivedAt")
  })
}

exports.down = async function(knex: Knex) {
  knex.schema.table("train", function(table) {
    table.renameColumn("manufacturedAt", "manufactured_at")
    table.renameColumn("endedAt", "ended_at")
  })

  knex.schema.table("schedule", function(table) {
    table.renameColumn("trainId", "train_id")

    table.renameColumn("departedAt", "departed_at")
    table.renameColumn("arrivedAt", "arrived_at")
  })
}
