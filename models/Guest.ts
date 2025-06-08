import mongoose, { Schema, Document } from 'mongoose';

export interface IGuest extends Document {
  fullName: string;
  email: string;
  otp: string;
  isVerified: boolean;
  createdAt: Date;
  verifiedAt?: Date;
}

const GuestSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  verifiedAt: { type: Date }
});

// Add index for better query performance
GuestSchema.index({ otp: 1 });
GuestSchema.index({ email: 1 });
GuestSchema.index({ isVerified: 1 });

export default mongoose.models.Guest || mongoose.model<IGuest>('Guest', GuestSchema);