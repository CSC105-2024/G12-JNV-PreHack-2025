import { Hono } from 'hono'
import {
  createParticipation,
  getParticipationsByUser,
  getParticipationsByActivity,
  updateParticipationStatus,
  deleteParticipation // ✅ เพิ่มฟังก์ชันลบ
} from '../controller/participation.controller.ts'

const participationRoute = new Hono()

participationRoute.post('/', createParticipation)
participationRoute.get('/user/:userId', getParticipationsByUser)
participationRoute.get('/activity/:activityId', getParticipationsByActivity)
participationRoute.patch('/:id', updateParticipationStatus)
participationRoute.delete('/:id', deleteParticipation) // ✅ เพิ่มเส้นทาง DELETE

export default participationRoute
