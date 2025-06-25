import mongoose, { Schema, Document } from 'mongoose';

export interface IGuest extends Document {
  fullName: string;
  email: string;
  otp: string;
  isVerified: boolean;
  createdAt: Date;
  verifiedAt?: Date;
  seatNumber?: string; // Make it optional with ?
}

const GuestSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  verifiedAt: { type: Date },
  seatNumber: { type: String } // No required: true, so it's optional
});

// Add index for better query performance
GuestSchema.index({ otp: 1 });
GuestSchema.index({ email: 1 });
GuestSchema.index({ isVerified: 1 });
GuestSchema.index({ seatNumber: 1 }); // Optional: add index if you'll query by seatNumber

export default mongoose.models.Guest || mongoose.model<IGuest>('Guest', GuestSchema);