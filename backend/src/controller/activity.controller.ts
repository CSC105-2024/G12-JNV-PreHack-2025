import type { Context } from 'hono';
import prismaActivity from '../model/activity.model.ts';

// ดึงกิจกรรมทั้งหมด
export async function getAllActivities(ctx: Context) {
  const activities = await prismaActivity.findMany({
    orderBy: { date: 'asc' },
  });
  return ctx.json(activities);
}

// ดึงกิจกรรมตาม id (id เป็น string UUID)
export async function getActivityById(ctx: Context) {
  const id = ctx.req.param('id'); // id เป็น string UUID
  if (!id) return ctx.json({ message: 'Activity id is required' }, 400);

  const activity = await prismaActivity.findUnique({ where: { id } });
  if (!activity) return ctx.json({ message: 'Activity not found' }, 404);

  return ctx.json(activity);
}

// สร้างกิจกรรมใหม่
export async function createActivity(ctx: Context) {
  const data = await ctx.req.json();
  const { title, description, date, location } = data;

  if (!title || !description || !date || !location) {
    return ctx.json({ message: 'Missing required fields' }, 400);
  }

  const newActivity = await prismaActivity.create({
    data: {
      title,
      description,
      date: new Date(date),
      location,
    },
  });

  return ctx.json(newActivity, 201);
}

// อัปเดตกิจกรรม
export async function updateActivity(ctx: Context) {
  const id = ctx.req.param('id');
  const data = await ctx.req.json();

  if (!id) return ctx.json({ message: 'Activity id is required' }, 400);
  if (!data.location) return ctx.json({ message: 'location is required' }, 400);

  try {
    const updated = await prismaActivity.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        date: data.date ? new Date(data.date) : undefined,
        location: data.location,
      },
    });
    return ctx.json(updated);
  } catch {
    return ctx.json({ message: 'Activity update failed or not found' }, 400);
  }
}

// ลบกิจกรรม
export async function deleteActivity(ctx: Context) {
  const id = ctx.req.param('id');
  if (!id) return ctx.json({ message: 'Activity id is required' }, 400);

  try {
    await prismaActivity.delete({ where: { id } });
    return ctx.json({ message: 'Activity deleted' });
  } catch {
    return ctx.json({ message: 'Delete failed or activity not found' }, 400);
  }
}
