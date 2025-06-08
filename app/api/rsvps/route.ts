import dbConnect from '@/lib/db';
import Guest from '@/models/Guest';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await dbConnect();
  
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter') || 'all';
  const search = searchParams.get('search') || '';
  
  try {
    let query: any = {};
    
    // Apply status filter
    if (filter === 'verified') query.isVerified = true;
    if (filter === 'pending') query.isVerified = false;
    
    // Apply search filter
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { otp: search }
      ];
    }
    
    const rsvps = await Guest.find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    
    return NextResponse.json(rsvps);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}