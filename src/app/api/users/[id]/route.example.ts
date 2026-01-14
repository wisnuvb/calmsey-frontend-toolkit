/**
 * EXAMPLE: User by ID API Route
 * 
 * Copy this file to route.ts to create a fullstack API endpoint
 * 
 * Usage:
 * - GET /api/users/:id - Get user by ID
 * - PUT /api/users/:id - Update user
 * - DELETE /api/users/:id - Delete user
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/users/:id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // TODO: Replace with your database logic
    // Example: const user = await db.user.findUnique({ where: { id } });
    
    const user = {
      id,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/users/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    // TODO: Replace with your database logic
    // Example: const updatedUser = await db.user.update({
    //   where: { id },
    //   data: body,
    // });
    
    const updatedUser = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/users/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    // TODO: Replace with your database logic
    // Example: await db.user.delete({ where: { id } });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
