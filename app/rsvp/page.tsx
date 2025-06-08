'use client';

import { useState } from 'react';
import BarcodeGenerator from '@/components/BarcodeGenerator';
    import Swal from "sweetalert2";

export default function RSVPPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setOtp(data.otp);
        setSubmitted(true);
      }
      else{
            Swal.fire({
      title:"Something went wrong!",
      text: data.error || 'Registration failed. Please try again.',
      icon: "error",
      confirmButtonColor: "#831843",
      background: "#fff1f2",
      iconColor: "#831843",
    });
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4 bg-[url('/images/wedding-pattern.png')] bg-opacity-20">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-rose-200 backdrop-blur-sm">
        {/* Wedding Header */}
        <div className="bg-gradient-to-r from-rose-700 to-rose-900 p-6 text-center relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold-500"></div>
          <h1 className="text-3xl font-cormorant font-bold text-rose-50 tracking-wider">
            Usman & Fatima
          </h1>
          <div className="mt-4 pt-4 border-t border-rose-300/30">
            <p className="text-rose-100 font-medium">Reception Celebration</p>
            <p className="text-rose-50 font-cormorant text-lg">
              June 28, 2025 • 4:00 PM
            </p>
            <p className="text-rose-200 text-sm mt-1">Arewa House, Kaduna</p>
          </div>
        </div>
        
        {/* Form Content */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-cormorant text-rose-900 font-medium">
                  Kindly RSVP
                </h2>
                <p className="text-rose-600 text-sm mt-1">
                  Please respond no later than June 20, 2025
                </p>
              </div>
              
              <div>
                <label className="block text-rose-900 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="text-black w-full px-4 py-3 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-rose-900 mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="text-black w-full px-4 py-3 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  placeholder="Your email address"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg mt-6"
              >
                Confirm Attendance
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="mb-4">
                <h2 className="text-2xl font-cormorant text-rose-900 font-medium">
                  RSVP Received!
                </h2>
                <p className="text-rose-700 mt-2">
                  Present your IV code at the venue.
                </p>
              </div>
              
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                <p className="text-rose-800 font-medium mb-2">Your Invitation Code:</p>
                <p className="text-2xl font-mono font-bold text-rose-900 mb-4">{otp}</p>
                
                <div className="flex justify-center">
                  <BarcodeGenerator otp={otp} />
                </div>
                
            
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-rose-100/50 p-4 text-center border-t border-rose-200">
          <p className="text-xs text-rose-600">
            For any changes to your RSVP, please contact the wedding planner
          </p>
        </div>
      </div>
    </div>
  );
}