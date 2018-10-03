import { Config } from "knex"

export function build() {
  const commonConfig: Config = {
    client: "postgresql",
    connection: process.env.DATABASE_URL || {
      database: "travel_ka",
      user: "travel_ka",
      password: "travel_ka"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

  return {
    development: commonConfig,
    production: commonConfig
  }
}
