import type { Context } from 'hono'
import prisma from '../prismaClient.ts'
import { ParticipationStatus } from '@prisma/client'

// POST /participations
export const createParticipation = async (c: Context) => {
  try {
    const { userId, activityId, status } = await c.req.json()
    console.log('📦 Incoming Participation:', { userId, activityId, status })

    if (!userId || !activityId) {
      return c.json({ message: 'userId and activityId are required' }, 400)
    }

    const existing = await prisma.participation.findUnique({
      where: {
        userId_activityId: { userId, activityId }
      }
    })

    if (existing) {
      console.warn('⚠️ Already participated:', { userId, activityId })
      return c.json({ message: 'Already participated' }, 400)
    }

    const participation = await prisma.participation.create({
      data: {
        userId,
        activityId,
        status: status || ParticipationStatus.joined
      }
    })

    console.log('✅ Participation created:', participation)
    return c.json(participation)
  } catch (err) {
    console.error('❌ Failed to create participation:', err)
    return c.json({ error: 'Failed to create participation', detail: String(err) }, 500)
  }
}

// GET /participations/user/:userId
export const getParticipationsByUser = async (c: Context) => {
  try {
    const userId = c.req.param('userId')
    if (!userId) return c.json({ message: 'Missing userId' }, 400)

    const participations = await prisma.participation.findMany({
      where: { userId },
      include: { activity: true }
    })

    return c.json(participations)
  } catch (err) {
    console.error('❌ Error fetching participations by user:', err)
    return c.json({ error: 'Failed to fetch participations' }, 500)
  }
}

// GET /participations/activity/:activityId
export const getParticipationsByActivity = async (c: Context) => {
  try {
    const activityId = c.req.param('activityId')
    if (!activityId) return c.json({ message: 'Missing activityId' }, 400)

    const participations = await prisma.participation.findMany({
      where: { activityId },
      include: { user: true }
    })

    return c.json(participations)
  } catch (err) {
    console.error('❌ Error fetching participations by activity:', err)
    return c.json({ error: 'Failed to fetch participations' }, 500)
  }
}

// PATCH /participations/:id
export const updateParticipationStatus = async (c: Context) => {
  try {
    const id = c.req.param('id')
    const { status } = await c.req.json()

    if (!id || !status) {
      return c.json({ message: 'Participation id and status are required' }, 400)
    }

    const updated = await prisma.participation.update({
      where: { id },
      data: { status: status as ParticipationStatus }
    })

    console.log('🔄 Participation updated:', updated)
    return c.json(updated)
  } catch (err) {
    console.error('❌ Error updating participation status:', err)
    return c.json({ message: 'Failed to update participation', error: String(err) }, 500)
  }
}

// DELETE /participations/:id
export const deleteParticipation = async (c: Context) => {
  try {
    const id = c.req.param('id')
    if (!id) return c.json({ message: 'Participation ID is required' }, 400)

    await prisma.participation.delete({ where: { id } })

    console.log('🗑️ Participation deleted:', id)
    return c.text('Participation deleted')
  } catch (err) {
    console.error('❌ Error deleting participation:', err)
    return c.json({ message: 'Failed to delete participation', error: String(err) }, 500)
  }
}
