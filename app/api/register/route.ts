import dbConnect from '@/lib/db';
import Guest from '@/models/Guest';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const { fullName, email } = await request.json();
    
    // Generate 3-digit OTP
    const otp = Math.floor(100 + Math.random() * 900).toString();
    
    // Create new guest
    const guest = new Guest({
      fullName,
      email,
      otp
    });

    await guest.save();

    return NextResponse.json({ 
      success: true, 
      otp,
      id: guest._id 
    });
  } catch (error: any) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}