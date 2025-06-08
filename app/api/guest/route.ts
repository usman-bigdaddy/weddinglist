import dbConnect from '@/lib/db';
import Guest from '@/models/Guest';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const otp = searchParams.get('otp');
  
  try {
    const guest = await Guest.findOne({ otp });
    
    if (!guest) {
      return NextResponse.json(
        { success: false, error: 'Guest not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      guest: {
        fullName: guest.fullName,
        email: guest.email,
        otp: guest.otp,
        isVerified: guest.isVerified,
        verifiedAt: guest.verifiedAt,
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}