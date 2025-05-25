// src/routes/review.route.ts
import { Hono } from 'hono';
import auth from '../auth.ts';
import { getReviewsByActivity, createReview, deleteReview } from '../controller/review.controller.ts';

const router = new Hono();

router.get('/', getReviewsByActivity); // ?activityId=xxx
router.post('/', auth, createReview);
router.delete('/:id', auth, deleteReview);

export default router;
