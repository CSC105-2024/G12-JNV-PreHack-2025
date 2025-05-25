// src/routes/activity.route.ts
import { Hono } from 'hono';
import auth from '../auth.ts';
import {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controller/activity.controller.ts';

const router = new Hono();

router.get('/', getAllActivities);
router.get('/:id', getActivityById);
router.post('/', auth, createActivity);
router.put('/:id', auth, updateActivity);
router.delete('/:id', auth, deleteActivity);

export default router;
