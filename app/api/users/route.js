import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const allUsers = await prisma.user.findMany();
    return NextResponse.json({ message: "All users", allUsers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name } = body;

    console.log(name);

    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    const user = await prisma.user.create({ data: { name } });

    return NextResponse.json({ message: "User Created Successfully", user });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { name } = body;

    // Check if the name field is provided
    if (!name) {
      return NextResponse.json({ message: "Name is required to update all users" }, { status: 400 });
    }

    // Update all users with the new name
    const updateUserAll = await prisma.user.updateMany({
      data: {
        name, // Update all users with this name
      },
    });

    return NextResponse.json({ message: "All users updated", users: updateUserAll }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await prisma.user.deleteMany();
    return NextResponse.json({ message: "All users deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
