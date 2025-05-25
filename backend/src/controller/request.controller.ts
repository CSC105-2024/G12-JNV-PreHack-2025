// src/controller/request.controller.ts
import type { Context } from 'hono';
import { prisma } from '../prismaClient.ts';// <- ระบุ .ts ชัดเจน

// ดึงข้อมูล request ทั้งหมด
export const getAllRequests = async (c: Context) => {
  try {
    const requests = await prisma.request.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
    return c.json(requests);
  } catch (error) {
    return c.json({ message: 'Failed to fetch requests', error }, 500);
  }
};

// สร้าง request ใหม่
export const createRequest = async (c: Context) => {
  try {
    const data = await c.req.json();

    const newRequest = await prisma.request.create({
      data: {
        title: data.title,
        description: data.description,
        status: 'pending',
        userId: c.get('userId'), // auth middleware ต้อง set userId ใน context
      },
    });

    return c.json(newRequest, 201);
  } catch (error) {
    return c.json({ message: 'Failed to create request', error }, 500);
  }
};

// อัพเดตสถานะ request
export const updateRequestStatus = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();

    const updatedRequest = await prisma.request.update({
      where: { id },
      data: { status: data.status },
    });

    return c.json(updatedRequest);
  } catch (error) {
    return c.json({ message: 'Failed to update request', error }, 500);
  }
};

// ลบ request
export const deleteRequest = async (c: Context) => {
  try {
    const id = c.req.param('id');
    await prisma.request.delete({
      where: { id },
    });

    return c.text('Request deleted');
  } catch (error) {
    return c.json({ message: 'Failed to delete request', error }, 500);
  }
};
