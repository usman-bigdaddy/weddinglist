"use client";

import { useState, useEffect } from "react";
import BarcodeGenerator from "@/components/BarcodeGenerator";
import Swal from "sweetalert2";

export default function RSVPPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deadlinePassed, setDeadlinePassed] = useState(false);

  useEffect(() => {
    // Check if current date is after August 23, 2025
    const rsvpDeadline = new Date("2025-08-23T23:59:59");
    const currentDate = new Date();
    setDeadlinePassed(currentDate > rsvpDeadline);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deadlinePassed) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setOtp(data.otp);
        setSubmitted(true);
      } else {
        Swal.fire({
          title: "Something went wrong!",
          text: data.error || "Registration failed. Please try again.",
          icon: "error",
          confirmButtonColor: "#B8860B",
          background: "#FFF8E1",
          iconColor: "#D4AF37",
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        title: "Connection Error",
        text: "Could not submit your RSVP. Please check your connection and try again.",
        icon: "error",
        confirmButtonColor: "#B8860B",
        background: "#FFF8E1",
        iconColor: "#D4AF37",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (deadlinePassed) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 bg-[url('/images/wedding-pattern-gold.png')] bg-opacity-20">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-amber-200/50">
          {/* Wedding Header */}
          <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-6 text-center relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400"></div>
            <h1 className="text-xl md:text-2xl font-cormorant font-bold text-amber-50 tracking-wide text-center whitespace-nowrap overflow-hidden text-ellipsis [font-size:4vw] sm:[font-size:2vw] md:text-2xl">
              Farida & Najib
            </h1>
            <div className="mt-2 pt-2 border-t border-amber-300/30">
              <p className="text-amber-100 font-medium">Wedding Celebration</p>
              <p className="text-amber-50 font-cormorant text-lg">
                August 24, 2025 • 2:00 PM
              </p>
              <p className="text-amber-200 text-sm mt-1">
                <a
                  href="https://www.google.com/maps?q=Merry+Makers+Event+Centre,+Plot+702+Kashim+Ibrahim+Way+wuse+2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-200 text-sm mt-1 underline hover:text-amber-100 transition-colors"
                >
                  Merry Makers Event Centre, Plot 702 Kashim Ibrahim Way wuse 2
                </a>
              </p>
            </div>
          </div>

          {/* Deadline Message */}
          <div className="p-8 text-center">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-cormorant text-amber-900 font-semibold mb-4">
              Thank You for Your Interest
            </h2>
            <p className="text-amber-700 mb-6">
              The RSVP period for our wedding has now closed as of August 23,
              2025.
            </p>
            {/* <p className="text-amber-600">
              For any inquiries, please contact the wedding planner at{" "}
              <a
                href="tel:07039350125"
                className="underline text-amber-700 font-medium"
              >
                07039350125
              </a>
            </p> */}
          </div>

          {/* Footer */}
          <div className="bg-amber-100/50 p-4 text-center border-t border-amber-200">
            <p className="text-xs text-amber-600">
              We look forward to celebrating with you!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4 bg-[url('/images/wedding-pattern-gold.png')] bg-opacity-20">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-amber-200/50">
        {/* Wedding Header */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-6 text-center relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400"></div>
          <h1 className="text-xl md:text-2xl font-cormorant font-bold text-amber-50 tracking-wide text-center whitespace-nowrap overflow-hidden text-ellipsis [font-size:4vw] sm:[font-size:2vw] md:text-2xl">
            Farida & Najib
          </h1>
          <div className="mt-2 pt-2 border-t border-amber-300/30">
            <p className="text-amber-100 font-medium">Wedding Celebration</p>
            <p className="text-amber-50 font-cormorant text-lg">
              August 24, 2025 • 2:00 PM
            </p>
            <p className="text-amber-200 text-sm mt-1">
              <a
                href="https://www.google.com/maps?q=Merry+Makers+Event+Centre,+Plot+702+Kashim+Ibrahim+Way+wuse+2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 text-sm mt-1 underline hover:text-amber-100 transition-colors"
              >
                Merry Makers Event Centre, Plot 702 Kashim Ibrahim Way wuse 2
              </a>
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-2 px-4 py-5 bg-amber-50 border border-amber-200 rounded-lg shadow-sm">
                <h2 className="font-cormorant text-amber-900 font-semibold">
                  Kindly RSVP on or before{" "}
                  <span className="text-amber-700 underline">
                    August 23, 2025
                  </span>
                </h2>
              </div>

              <div>
                <label className="block text-amber-900 mb-1 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-4 py-3 text-gray-900 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                  placeholder="Your full name"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-amber-900 mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 text-gray-900 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                  placeholder="Your email address"
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg mt-6 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Confirm Attendance
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="mb-4">
                <h2 className="text-2xl font-cormorant text-amber-900 font-medium">
                  Thank You!
                </h2>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex justify-center">
                  <BarcodeGenerator otp={otp} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {/* <div className="bg-amber-100/50 p-4 text-center border-t border-amber-200">
          <p className="text-xs text-amber-600">
            For any changes to your RSVP, please contact the wedding planner at{" "}
            <a
              href="tel:07039350125"
              className="underline text-amber-700 font-medium"
            >
              07039350125
            </a>
          </p>
        </div> */}
      </div>
    </div>
  );
}
