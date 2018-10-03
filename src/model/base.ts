import * as Knex from "knex"

export interface BaseModelData {
  id: number
}

abstract class BaseModel<D extends BaseModelData> {
  remoteId?: number

  data: Partial<D>

  constructor(protected knex: Knex, data: Partial<D> = {}) {
    if (data.id) {
      this.remoteId = data.id
    }

    this.data = { ...(data as {}) }
  }
}

export function model<D extends BaseModelData>(schema: string) {
  return class Model extends BaseModel<D> {
    async save() {
      if (this.remoteId) {
        await this.knex(schema)
          .where("id", "=", this.remoteId)
          .update(this.data)
      } else {
        await this.knex(schema).insert(this.data)
      }
    }
  }
}
