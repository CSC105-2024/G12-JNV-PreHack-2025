// src/controllers/user.controller.ts
import type { Context } from 'hono';
import bcrypt from 'bcrypt';
import prismaUser from '../model/user.model.ts';
import { signToken } from '../jwt.ts';

const SALT_ROUNDS = 10;

export async function registerUser(ctx: Context) {
  const { firstname, lastname, email, password, gender } = await ctx.req.json();

  if (!firstname || !lastname || !email || !password || !gender) {
    return ctx.json({ message: 'Missing fields' }, 400);
  }

  const existingUser = await prismaUser.findUnique({ where: { email } });
  if (existingUser) {
    return ctx.json({ message: 'Email already registered' }, 400);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prismaUser.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      gender,
    },
  });

  return ctx.json({ message: 'User registered', userId: user.id }, 201);
}

export async function loginUser(ctx: Context) {
  const { email, password } = await ctx.req.json();

  if (!email || !password) {
    return ctx.json({ message: 'Email and password required' }, 400);
  }

  const user = await prismaUser.findUnique({ where: { email } });
  if (!user) {
    return ctx.json({ message: 'Invalid credentials' }, 401);
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return ctx.json({ message: 'Invalid credentials' }, 401);
  }

  const token = signToken({ id: user.id, email: user.email });

  // ✅ แก้ตรงนี้ เพิ่มข้อมูลผู้ใช้ให้ frontend ใช้งาน
  return ctx.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      gender: user.gender
    }
  });
}

export async function getAccountSetting(ctx: Context) {
  const userPayload = ctx.get('user') as { id: string };

  const user = await prismaUser.findUnique({
    where: { id: userPayload.id },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      gender: true,
    },
  });

  if (!user) {
    return ctx.json({ message: 'User not found' }, 404);
  }

  return ctx.json(user);
}

export async function updateAccountSetting(ctx: Context) {
  const userPayload = ctx.get('user') as { id: string };
  const { firstname, lastname, email, password, gender } = await ctx.req.json();

  const data: any = {
    firstname,
    lastname,
    email,
    gender,
  };

  if (password) {
    data.password = await bcrypt.hash(password, SALT_ROUNDS);
  }

  try {
    const updatedUser = await prismaUser.update({
      where: { id: userPayload.id },
      data,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        gender: true,
      },
    });
    return ctx.json(updatedUser);
  } catch {
    return ctx.json({ message: 'Update failed' }, 400);
  }
}
