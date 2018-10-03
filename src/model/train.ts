import { BaseModelData, model } from "."

interface TrainData extends BaseModelData {
  name: string
  manufacturedAt: Date
  endedAt: Date
}

class Train extends model<TrainData>("train") {}
