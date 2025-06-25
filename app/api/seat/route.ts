// app/api/seat/route.ts
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

import Guest from '@/models/Guest';
import dbConnect from '@/lib/db';

export async function PUT(request: Request) {
   await dbConnect();
  try {
    const { id, seatNumber } = await request.json();

    // Validate input
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    // Update the guest's seat number
    const updatedGuest = await Guest.findByIdAndUpdate(
      id,
      { seatNumber: seatNumber || null },
      { new: true }
    );

    if (!updatedGuest) {
      return NextResponse.json({ error: 'Guest not found' }, { status: 404 });
    }

    return NextResponse.json(updatedGuest);
  } catch (error) {
    console.error('Error updating seat number:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}