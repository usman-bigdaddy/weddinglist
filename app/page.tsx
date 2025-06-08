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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
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
        // Swal.fire({
        //   title: "Success!",
        //   text: "Your RSVP has been confirmed",
        //   icon: "success",
        //   confirmButtonColor: "#831843",
        //   background: "#fff1f2",
        //   iconColor: "#831843",
        // });
      } else {
        Swal.fire({
          title: "Something went wrong!",
          text: data.error || 'Registration failed. Please try again.',
          icon: "error",
          confirmButtonColor: "#831843",
          background: "#fff1f2",
          iconColor: "#831843",
        });
      }
    } catch (error) {
      console.error('Registration failed:', error);
      Swal.fire({
        title: "Connection Error",
        text: "Could not submit your RSVP. Please check your connection and try again.",
        icon: "error",
        confirmButtonColor: "#831843",
        background: "#fff1f2",
        iconColor: "#831843",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4 bg-[url('/images/wedding-pattern.png')] bg-opacity-20">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-rose-200/50">
        {/* Wedding Header */}
        <div className="bg-gradient-to-r from-rose-700 to-rose-900 p-6 text-center relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400"></div>
          <h1 className="text-3xl font-cormorant font-bold text-rose-50 tracking-wider">
            Usman & Fatima
          </h1>
          
          <div className="mt-4 pt-4 border-t border-rose-300/30">
            <p className="text-rose-100 font-medium">Reception Celebration</p>
            <p className="text-rose-50 font-cormorant text-lg">
              June 28, 2025 • 2:00 PM
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
                  Please respond by June 20, 2025
                </p>
              </div>
              
              <div>
                <label className="block text-rose-900 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 text-gray-900 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  placeholder="Your full name"
                  disabled={isLoading}
                />
              </div>
              
              <div>
                <label className="block text-rose-900 mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 text-gray-900 border border-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                  placeholder="Your email address"
                  disabled={isLoading}
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg mt-6 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Confirm Attendance
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="mb-4">
                <h2 className="text-2xl font-cormorant text-rose-900 font-medium">
                  Thank You!
                </h2>
              </div>
              
              <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                
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
    For any changes to your RSVP, please contact the wedding planner at{' '}
    <a href="tel:07039350125" className="underline text-rose-700 font-medium">
      07039350125
    </a>
  </p>
</div>

      </div>
    </div>
  );
}