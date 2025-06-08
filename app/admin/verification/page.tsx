"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const BarcodeScanner = dynamic(() => import("@/components/BarcodeScanner"), {
  ssr: false,
});

export default function VerificationPanel() {
  const [otp, setOtp] = useState("");
  const [guest, setGuest] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const router = useRouter();

  const showErrorAlert = (title: string, message: string) => {
    Swal.fire({
      title,
      text: message,
      icon: "error",
      confirmButtonColor: "#831843",
      background: "#fff1f2",
      iconColor: "#831843",
    });
  };

  const showSuccessAlert = (title: string, message: string) => {
    Swal.fire({
      title,
      text: message,
      icon: "success",
      confirmButtonColor: "#831843",
      background: "#fff1f2",
      iconColor: "#831843",
    });
  };

  const fetchGuest = async (otp: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/guest?otp=${otp}`);
      const data = await response.json();

      if (data.success) {
        setGuest(data.guest);
      } else {
        setGuest(null);
        showErrorAlert("Guest Not Found", "No guest found with this invitation code");
      }
    } catch (error) {
      setGuest(null);
      showErrorAlert("Error", "Failed to fetch guest data");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (action: "approve" | "reject") => {
    if (!guest) return;

    setLoading(true);
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: guest.otp,
          action,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const message = action === "approve" 
          ? `${guest.fullName} has been verified`
          : `${guest.fullName}'s entry has been denied`;
        
        showSuccessAlert(
          action === "approve" ? "Entry Approved" : "Entry Denied",
          message
        );
        fetchGuest(guest.otp);
        router.refresh();
      } else {
        showErrorAlert(
          "Verification Failed", 
          data.error || "Could not complete verification"
        );
      }
    } catch (error) {
      showErrorAlert("Error", "Verification process failed");
    } finally {
      setOtp("");
      setLoading(false);
    }
  };

  const handleBarcodeScan = (scannedOtp: string) => {
    setOtp(scannedOtp);
    fetchGuest(scannedOtp);
    setScanMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-hidden border border-pink-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-700 to-pink-900 p-6 text-center relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400"></div>
          <h2 className="text-2xl font-cormorant font-bold text-pink-50 tracking-wider">
            Guest Verification
          </h2>
          <p className="text-pink-200 mt-1 text-sm">
            Verify guests for Usman & Fatima's Wedding
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {scanMode ? (
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium text-pink-900">Scan Guest QR Code</h3>
              <BarcodeScanner onScan={handleBarcodeScan} />
              <button
                onClick={() => setScanMode(false)}
                className="mt-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors"
              >
                Cancel Scan
              </button>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row gap-3 mb-6">
                <button
                  onClick={() => setScanMode(true)}
                  className="flex-1 px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 2H4v8h12V6zM8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Scan Barcode
                </button>
                <div className="flex items-center justify-center text-pink-600 font-medium">
                  OR
                </div>
                <div className="flex-1">
                  <label className="block text-pink-900 mb-1 font-medium">Enter OTP Manually</label>
                  <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter IV code"
                    className="w-full px-4 py-3 text-gray-900 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={() => fetchGuest(otp)}
                disabled={loading || otp.length !== 3}
                className="w-full px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    Find Guest
                  </>
                )}
              </button>

              {guest && (
                <div className="mt-6 p-5 bg-pink-50 rounded-xl border border-pink-200">
                  <h3 className="text-xl font-cormorant font-semibold text-pink-900 mb-3 border-b border-pink-200 pb-2">
                    Guest Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-pink-600">Full Name</p>
                      <p className="text-lg font-medium text-gray-900">{guest.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-pink-600">Email</p>
                      <p className="text-lg font-medium text-gray-900">{guest.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-pink-600">Verification Status</p>
                      <p className={`text-lg font-medium ${
                        guest.isVerified ? "text-green-600" : "text-amber-600"
                      }`}>
                        {guest.isVerified ? "Verified" : "Pending"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-pink-600">
                        {guest.isVerified ? "Verified At" : "RSVP Date"}
                      </p>
                      <p className="text-lg font-medium text-gray-900">
                        {guest.isVerified
                          ? new Date(guest.verifiedAt).toLocaleString()
                          : new Date(guest.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button
                      onClick={() => handleVerify("approve")}
                      disabled={guest.isVerified || loading}
                      className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                        guest.isVerified
                          ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      } flex items-center justify-center gap-2`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {guest.isVerified ? "Already Verified" : "Approve Entry"}
                    </button>
                    <button
                      onClick={() => handleVerify("reject")}
                      disabled={loading}
                      className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Deny Entry
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}