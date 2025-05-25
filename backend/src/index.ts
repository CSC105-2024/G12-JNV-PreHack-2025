import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

import requestRouter from './route/request.route.ts';
import userRouter from './route/user.route.ts';
import activityRouter from './route/activity.route.ts';
import reviewRouter from './route/review.route.ts';

const app = new Hono();

app.use('*', cors({
  origin: 'http://localhost:5173', // เปลี่ยนให้ตรงกับ URL frontend ที่ใช้
  credentials: true,
}));

app.route('/user', userRouter);
app.route('/activity', activityRouter);
app.route('/request', requestRouter);
app.route('/review', reviewRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
