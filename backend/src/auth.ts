import type { Context, Next } from 'hono';
import { verifyToken } from './jwt.ts';

// ฟังก์ชันดึงค่า cookie จาก header
function getCookie(ctx: Context, name: string): string | undefined {
  const cookieHeader = ctx.req.header('Cookie');
  if (!cookieHeader) return undefined;
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const found = cookies.find(c => c.startsWith(name + '='));
  return found ? decodeURIComponent(found.substring(name.length + 1)) : undefined;
}

export default async function auth(ctx: Context, next: Next) {
  // อ่าน token จาก cookie ด้วยฟังก์ชันข้างบน
  const token = getCookie(ctx, 'token');

  if (!token) {
    return ctx.json({ message: 'Unauthorized' }, 401);
  }

  try {
    const user = verifyToken(token);
    ctx.set('user', user); // เก็บข้อมูล user ไว้ใน context
    await next();
  } catch {
    return ctx.json({ message: 'Invalid token' }, 401);
  }
}
