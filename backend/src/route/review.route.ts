import { Hono } from 'hono';
import auth from '../auth.ts';
import {
  getReviewsByActivity,
  createReview,
  updateReview,
  deleteReview,
} from '../controller/review.controller.ts';

const router = new Hono();

router.get('/', getReviewsByActivity);             // GET /review?activityId=xxx
router.post('/', auth, createReview);              // POST /review
router.put('/:id', auth, updateReview);            // ✅ เพิ่ม route แก้ไข review
router.delete('/:id', auth, deleteReview);         // DELETE /review/:id

export default router;
