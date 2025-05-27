import type { Context } from 'hono'
import prisma from '../prismaClient.ts' // ✅ default import, ไม่มี .ts

// ดึง request ทั้งหมด (option: filter by user ได้)
export const getAllRequests = async (c: Context) => {
  try {
    const requests = await prisma.request.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
    return c.json(requests);
  } catch (error) {
    return c.json({ message: 'Failed to fetch requests', error: String(error) }, 500);
  }
};

// สร้าง request ใหม่
export const createRequest = async (c: Context) => {
  try {
    const data = await c.req.json();
    const userId = c.get('userId'); // ต้องมาจาก auth middleware
    if (!userId) {
      return c.json({ message: 'Unauthorized: No userId found' }, 401);
    }
    if (!data.title || !data.description) {
      return c.json({ message: 'Title and description are required' }, 400);
    }

    const newRequest = await prisma.request.create({
      data: {
        title: data.title,
        description: data.description,
        status: 'pending',
        userId,
      },
    });

    return c.json(newRequest, 201);
  } catch (error) {
    return c.json({ message: 'Failed to create request', error: String(error) }, 500);
  }
};

// อัปเดตสถานะ request
export const updateRequestStatus = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();

    if (!id || !data.status) {
      return c.json({ message: 'Request id and new status are required' }, 400);
    }

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: { status: data.status },
    });

    return c.json(updatedRequest);
  } catch (error) {
    return c.json({ message: 'Failed to update request', error: String(error) }, 500);
  }
};

// ลบ request
export const deleteRequest = async (c: Context) => {
  try {
    const id = c.req.param('id');
    if (!id) {
      return c.json({ message: 'Request id is required' }, 400);
    }
    await prisma.request.delete({ where: { id } });

    return c.text('Request deleted');
  } catch (error) {
    return c.json({ message: 'Failed to delete request', error: String(error) }, 500);
  }
};
