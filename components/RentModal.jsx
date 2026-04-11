"use client";

import { useState } from "react";
import { X, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function RentModal({ item, onClose, onRentRequest }) {
  const [duration, setDuration] = useState("1week");
  const [startDate, setStartDate] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const getEndDate = (start, duration) => {
    if (!start) return "";
    const date = new Date(start);
    if (duration === "1week") date.setDate(date.getDate() + 7);
    if (duration === "2weeks") date.setDate(date.getDate() + 14);
    if (duration === "3weeks") date.setDate(date.getDate() + 21);
    return date.toISOString().split('T')[0];
  };

  const weeklyPrice = item.rentPrice || 40;
  const prices = {
    "1week": weeklyPrice,
    "2weeks": weeklyPrice * 2,
    "3weeks": weeklyPrice * 3,
  };
  const total = prices[duration];
  const endDate = getEndDate(startDate, duration);

  const handleSubmit = async () => {
    if (!startDate) {
      alert("Please select a pickup date");
      return;
    }

    setSubmitting(true);
    
    const rentalRequest = {
      id: Date.now().toString(),
      itemId: item.id,
      itemTitle: item.title,
      itemType: item.type || "book",
      ownerId: item.ownerId,
      ownerName: item.ownerName,
      ownerEmail: item.ownerEmail,
      duration: duration,
      startDate: startDate,
      endDate: endDate,
      totalPrice: total,
      weeklyPrice: weeklyPrice,
      message: message,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    
    // Save to localStorage
    const existingRequests = JSON.parse(localStorage.getItem("rental_requests") || "[]");
    existingRequests.push(rentalRequest);
    localStorage.setItem("rental_requests", JSON.stringify(existingRequests));
    
    // Also add to user's sent requests
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const myRequests = JSON.parse(localStorage.getItem(`my_requests_${user.email}`) || "[]");
    myRequests.push(rentalRequest);
    localStorage.setItem(`my_requests_${user.email}`, JSON.stringify(myRequests));
    
    setTimeout(() => {
      setSubmitting(false);
      if (onRentRequest) onRentRequest(rentalRequest);
      onClose();
      alert("Rental request sent to owner! They will contact you soon.");
    }, 1000);
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Request to Rent</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Item Info */}
          <div className="bg-emerald-50 p-4 rounded-xl">
            <p className="font-semibold text-gray-900">{item.title}</p>
            <p className="text-sm text-gray-600 mt-1">
              {item.ownerName} • {item.condition || "Good Condition"}
            </p>
            <p className="text-emerald-600 font-bold mt-2">{weeklyPrice} QAR/week</p>
          </div>

          {/* Rental Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rental Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["1week", "2weeks", "3weeks"].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`py-2.5 rounded-lg border text-sm font-medium transition ${
                    duration === d
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white border-gray-200 text-gray-700 hover:border-emerald-300"
                  }`}
                >
                  {d === "1week" ? "1 week" : d === "2weeks" ? "2 weeks" : "3 weeks"}
                </button>
              ))}
            </div>
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={minDate}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            {endDate && (
              <p className="text-xs text-gray-500 mt-1">
                Return by: {endDate}
              </p>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Price ({duration === "1week" ? "1 week" : duration === "2weeks" ? "2 weeks" : "3 weeks"})</span>
              <span className="font-semibold">{total} QAR</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-emerald-600">{total} QAR</span>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message to Owner (Optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g., I need this for my upcoming exam. When are you available for pickup?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Tips */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-start gap-2 text-sm text-blue-700">
              <Clock size={14} className="mt-0.5 flex-shrink-0" />
              <span>Pickup tip: Meet in a public campus area like the library or student center</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-blue-700 mt-2">
              <CheckCircle size={14} className="mt-0.5 flex-shrink-0" />
              <span>Return on time and in good condition</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || !startDate}
            className="flex-1 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition disabled:opacity-50 font-medium"
          >
            {submitting ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}