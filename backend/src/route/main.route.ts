// backend/src/routes/main.route.ts
import { Hono } from 'hono';
import userRouter from './user.route.ts';
import activityRouter from '../route/activity.route.ts';
import reviewRouter from '../route/review.route.ts';






const app = new Hono();

// mount user routes at /user
app.route('/user', userRouter);
app.route('/activity', activityRouter);
app.route('/review', reviewRouter);

// สามารถเพิ่ม route อื่นๆ เช่น
// app.get('/', (c) => c.text('Hello World!'));

export default app;
