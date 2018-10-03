import { BaseModelData, model } from "./base"

interface ScheduleData extends BaseModelData {
  trainId: number

  source: string
  destination: string
  departedAt: Date
  arrivedAt: Date
}

export class Schedule extends model<ScheduleData>("schedule") {}
