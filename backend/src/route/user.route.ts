// src/routes/user.route.ts
import { Hono } from 'hono';
import auth from '../auth.ts';
import { registerUser, loginUser, getAccountSetting, updateAccountSetting } from '../controller/user.controller.ts';

const router = new Hono();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/account', auth, getAccountSetting);
router.put('/account', auth, updateAccountSetting);

export default router;
