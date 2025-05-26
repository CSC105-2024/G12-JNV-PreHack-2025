import type { Context, Next } from 'hono';
import { verifyToken } from './jwt.ts';

function getCookie(ctx: Context, name: string): string | undefined {
  const cookieHeader = ctx.req.header('Cookie');
  if (!cookieHeader) return undefined;
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const found = cookies.find(c => c.startsWith(name + '='));
  return found ? decodeURIComponent(found.substring(name.length + 1)) : undefined;
}

export default async function auth(ctx: Context, next: Next) {
  const token = getCookie(ctx, 'token');

  if (!token) {
    return ctx.json({ message: 'Unauthorized: No token provided' }, 401);
  }

  try {
    const user = verifyToken(token);

    if (typeof user === 'object' && user && 'id' in user) {
      ctx.set('userId', user.id);
      ctx.set('user', user);
      await next();
    } else {
      return ctx.json({ message: 'Invalid token payload' }, 401);
    }

  } catch {
    return ctx.json({ message: 'Invalid token' }, 401);
  }
}
