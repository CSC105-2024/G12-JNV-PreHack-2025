// src/models/user.model.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma.user
