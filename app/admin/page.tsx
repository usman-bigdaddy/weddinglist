"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RSVPListPanel() {
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "verified" | "pending">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSeatModal, setShowSeatModal] = useState(false);
  const [currentRsvp, setCurrentRsvp] = useState<any>(null);
  const [seatNumber, setSeatNumber] = useState("");
  const router = useRouter();

  const fetchRsvps = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/rsvps?filter=${filter}&search=${searchTerm}`
      );
      const data = await response.json();
      setRsvps(data);
    } catch (error) {
      console.error("Failed to fetch RSVPs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRsvps();
  }, [filter, searchTerm]);

  const handleRefresh = () => {
    fetchRsvps();
    router.refresh();
  };

  const openSeatModal = (rsvp: any) => {
    setCurrentRsvp(rsvp);
    setSeatNumber(rsvp.seatNumber || "");
    setShowSeatModal(true);
  };

  const handleSaveSeatNumber = async () => {
    if (!currentRsvp) return;

    try {
      const response = await fetch("/api/seat", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentRsvp._id,
          seatNumber: seatNumber.trim(),
        }),
      });

      if (response.ok) {
        fetchRsvps(); // Refresh the list
        setShowSeatModal(false);
      } else {
        console.error("Failed to update seat number");
      }
    } catch (error) {
      console.error("Error updating seat number:", error);
    }
  };

  const filteredRsvps = rsvps.filter((rsvp) => {
    if (filter === "verified") return rsvp.isVerified;
    if (filter === "pending") return !rsvp.isVerified;
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-pink-200">
      {/* Seat Number Modal */}
      {showSeatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-medium mb-4 text-pink-800">
              Set Seat Number for {currentRsvp?.fullName}
            </h3>
            <input
              type="text"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value)}
              placeholder="Enter seat number"
              className="w-full px-4 py-2 border border-pink-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500 text-black"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSeatModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSeatNumber}
                className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-pink-700 p-4 text-center">
        <h2 className="text-xl font-serif text-pink-100">RSVP Management</h2>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${
                filter === "all"
                  ? "bg-pink-600 text-white"
                  : "bg-pink-100 text-pink-800"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("verified")}
              className={`px-4 py-2 rounded-md ${
                filter === "verified"
                  ? "bg-pink-600 text-white"
                  : "bg-pink-100 text-pink-800"
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-md ${
                filter === "pending"
                  ? "bg-pink-600 text-white"
                  : "bg-pink-100 text-pink-800"
              }`}
            >
              Pending
            </button>
          </div>

          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-black placeholder-black"
            />
          </div>

          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <p className="text-black">{rsvps.length} RSVPs found</p>
            <table className="min-w-full bg-pink-50 rounded-lg overflow-hidden">
              <thead className="bg-pink-100">
                <tr>
                  <th className="px-4 py-3 text-left text-pink-900">Name</th>
                  <th className="px-4 py-3 text-left text-pink-900">Email</th>
                  <th className="px-4 py-3 text-left text-pink-900">OTP</th>
                  <th className="px-4 py-3 text-left text-pink-900">Status</th>
                  <th className="px-4 py-3 text-left text-pink-900">
                    RSVP Date
                  </th>
                  <th className="px-4 py-3 text-left text-pink-900">
                    Verified At
                  </th>
                  {/* <th className="px-4 py-3 text-left text-pink-900">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredRsvps.map((rsvp) => (
                  <tr
                    key={rsvp._id}
                    className="border-b border-pink-200 hover:bg-pink-100"
                  >
                    <td className="px-4 py-3 text-pink-900">{rsvp.fullName}</td>
                    <td className="px-4 py-3 text-pink-900">{rsvp.email}</td>
                    <td className="px-4 py-3 text-pink-900 font-mono">
                      {rsvp.otp}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          rsvp.isVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {rsvp.isVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-pink-900 text-sm">
                      {new Date(rsvp.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-pink-900 text-sm">
                      {rsvp.verifiedAt
                        ? new Date(rsvp.verifiedAt).toLocaleString()
                        : "--"}
                    </td>
                    {/* <td className="px-4 py-3">
                      <button
                        onClick={() => openSeatModal(rsvp)}
                        className="px-3 py-1 bg-pink-600 text-white rounded-md text-sm hover:bg-pink-700 transition-colors"
                      >
                        Set Seat
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRsvps.length === 0 && (
              <div className="text-center p-8 text-pink-700">
                No RSVPs found matching your criteria
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
