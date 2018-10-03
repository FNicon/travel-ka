import { BaseModelData, model } from "./base"

interface TrainData extends BaseModelData {
  name: string
  manufacturedAt: Date
  endedAt: Date
}

export class Train extends model<TrainData>("train") {}
