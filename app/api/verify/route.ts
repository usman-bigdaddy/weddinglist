import dbConnect from '@/lib/db';
import Guest from '@/models/Guest';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await dbConnect();
  
  try {
    const { otp, action } = await request.json();
    
    const guest = await Guest.findOne({ otp });
    
    if (!guest) {
      return NextResponse.json(
        { success: false, error: 'Guest not found' },
        { status: 404 }
      );
    }

    if (action === 'approve') {
      if (guest.isVerified) {
        return NextResponse.json(
          { success: false, error: 'Guest already verified' },
          { status: 400 }
        );
      }
      
      guest.isVerified = true;
      guest.verifiedAt = new Date();
      await guest.save();
    }

    return NextResponse.json({ 
      success: true,
      action,
      guest: {
        fullName: guest.fullName,
        email: guest.email,
        isVerified: guest.isVerified,
        verifiedAt: guest.verifiedAt
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}