// backend/src/routes/main.route.ts
import { Hono } from 'hono'

import userRouter from './user.route.ts'
import activityRouter from './activity.route.ts'
import reviewRouter from './review.route.ts'
import participationRoute from './participation.route.ts'

const app = new Hono()

// mount each route
app.route('/user', userRouter)
app.route('/activity', activityRouter)
app.route('/review', reviewRouter)
app.route('/participations', participationRoute)

// test root route
app.get('/', (c) => c.text('Hello from main.route.ts'))

export default app
