// src/routes/request.route.ts
import { Hono } from 'hono';
import auth from '../auth.ts';
import {
  getAllRequests,
  createRequest,
  updateRequestStatus,
  deleteRequest,
} from '../controller/request.controller.ts';

const router = new Hono();

router.get('/', getAllRequests);
router.post('/', auth, createRequest);
router.put('/:id', auth, updateRequestStatus);
router.delete('/:id', auth, deleteRequest);

export default router;
