import type { Context } from 'hono';
import prismaReview from '../model/review.model.ts';

// helper ตรวจสอบ UUID string
function parseId(id: string | undefined): string | null {
  if (!id) return null;
  if (typeof id === 'string' && id.length === 36) return id;
  return null;
}

// ดึงรีวิวทั้งหมดของกิจกรรม (query param ?activityId=xxx)
export async function getReviewsByActivity(ctx: Context) {
  const activityId = ctx.req.query('activityId');
  if (!activityId || typeof activityId !== 'string' || activityId.length !== 36) {
    return ctx.json({ message: 'Valid activityId query parameter is required' }, 400);
  }

  const reviews = await prismaReview.findMany({
    where: { activityId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
      user: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
    },
  });

  return ctx.json(reviews);
}

// สร้างรีวิวใหม่ (user ต้อง login)
export async function createReview(ctx: Context) {
  const userPayload = ctx.get('user') as { id: string };
  if (!userPayload?.id) {
    return ctx.json({ message: 'Unauthorized' }, 401);
  }

  const { activityId, rating, comment } = await ctx.req.json();

  if (!activityId || typeof activityId !== 'string' || activityId.length !== 36 || typeof rating !== 'number') {
    return ctx.json({ message: 'activityId (UUID) and rating are required' }, 400);
  }

  const newReview = await prismaReview.create({
    data: {
      userId: userPayload.id,
      activityId,
      rating,
      comment: comment || '',
    },
  });

  return ctx.json(newReview, 201);
}

// แก้ไขรีวิว (เฉพาะเจ้าของรีวิวเท่านั้น)
export async function updateReview(ctx: Context) {
  const userPayload = ctx.get('user') as { id: string };
  const reviewId = parseId(ctx.req.param('id'));

  if (reviewId === null) {
    return ctx.json({ message: 'Review id is required and must be UUID string' }, 400);
  }

  const review = await prismaReview.findUnique({ where: { id: reviewId } });
  if (!review) {
    return ctx.json({ message: 'Review not found' }, 404);
  }

  if (review.userId !== userPayload.id) {
    return ctx.json({ message: 'Forbidden' }, 403);
  }

  const { rating, comment } = await ctx.req.json();

  const updatedReview = await prismaReview.update({
    where: { id: reviewId },
    data: {
      rating: typeof rating === 'number' ? rating : review.rating,
      comment: typeof comment === 'string' ? comment : review.comment,
    },
  });

  return ctx.json(updatedReview);
}

// ลบรีวิวตาม id (เจ้าของรีวิวเท่านั้น)
export async function deleteReview(ctx: Context) {
  const userPayload = ctx.get('user') as { id: string };
  const reviewId = parseId(ctx.req.param('id'));

  if (reviewId === null) {
    return ctx.json({ message: 'Review id is required and must be UUID string' }, 400);
  }

  const review = await prismaReview.findUnique({ where: { id: reviewId } });
  if (!review) {
    return ctx.json({ message: 'Review not found' }, 404);
  }

  if (review.userId !== userPayload.id) {
    return ctx.json({ message: 'Forbidden' }, 403);
  }

  await prismaReview.delete({ where: { id: reviewId } });
  return ctx.json({ message: 'Review deleted' });
}
