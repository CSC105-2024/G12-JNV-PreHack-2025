import { ParticipationStatus } from '@prisma/client'

export interface Participation {
  id: string
  userId: string
  activityId: string
  status: ParticipationStatus
  createdAt: Date
}
