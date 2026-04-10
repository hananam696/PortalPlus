"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calculator, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function MyRentalsPage() {
  const [activeTab, setActiveTab] = useState("pending");
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const allRequests = JSON.parse(localStorage.getItem("rental_requests") || "[]");
    
    // Filter requests where user is the renter
    const userRentals = allRequests.filter(req => req.renterEmail === user.email);
    setRentals(userRentals);
    setLoading(false);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { color: "bg-yellow-100 text-yellow-700", icon: <Clock size={14} />, text: "Pending" },
      approved: { color: "bg-green-100 text-green-700", icon: <CheckCircle size={14} />, text: "Approved" },
      active: { color: "bg-blue-100 text-blue-700", icon: <CheckCircle size={14} />, text: "Active" },
      completed: { color: "bg-gray-100 text-gray-700", icon: <CheckCircle size={14} />, text: "Completed" },
      declined: { color: "bg-red-100 text-red-700", icon: <XCircle size={14} />, text: "Declined" },
    };
    return badges[status] || badges.pending;
  };

  const filteredRentals = rentals.filter(r => {
    if (activeTab === "pending") return r.status === "pending";
    if (activeTab === "active") return r.status === "active" || r.status === "approved";
    if (activeTab === "completed") return r.status === "completed";
    if (activeTab === "declined") return r.status === "declined";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/rental-hub" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={16} />
            Back to Rental Hub
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
          <p className="text-gray-500 mt-1">Track all your rental requests and active rentals</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b mb-6">
          {["pending", "active", "completed", "declined"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 font-medium text-sm rounded-t-lg transition ${
                activeTab === tab
                  ? "bg-emerald-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-600">
                {rentals.filter(r => {
                  if (tab === "pending") return r.status === "pending";
                  if (tab === "active") return r.status === "active" || r.status === "approved";
                  if (tab === "completed") return r.status === "completed";
                  if (tab === "declined") return r.status === "declined";
                  return false;
                }).length}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading your rentals...</p>
          </div>
        ) : filteredRentals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No {activeTab} rentals</h3>
            <p className="text-gray-500 mb-4">
              {activeTab === "pending" 
                ? "You haven't sent any rental requests yet" 
                : activeTab === "active" 
                ? "You don't have any active rentals" 
                : "No completed rentals yet"}
            </p>
            <Link href="/rental-hub/books" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
              Browse Items
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRentals.map((rental) => {
              const status = getStatusBadge(rental.status);
              return (
                <div key={rental.id} className="bg-white rounded-xl shadow-sm border p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{rental.itemTitle}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${status.color}`}>
                          {status.icon}
                          {status.text}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Owner: {rental.ownerName}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Pickup:</span>
                          <p className="font-medium">{new Date(rental.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Return:</span>
                          <p className="font-medium">{new Date(rental.endDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <p className="font-medium">{rental.duration === "1week" ? "1 week" : rental.duration === "2weeks" ? "2 weeks" : "3 weeks"}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Total:</span>
                          <p className="font-medium text-emerald-600">{rental.totalPrice} QAR</p>
                        </div>
                      </div>
                      {rental.message && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Your message:</p>
                          <p className="text-sm text-gray-700">{rental.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {rental.status === "pending" && (
                    <div className="mt-4 pt-4 border-t flex gap-3">
                      <button className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 text-sm">
                        Cancel Request
                      </button>
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm">
                        Message Owner
                      </button>
                    </div>
                  )}
                  
                  {rental.status === "approved" && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="bg-green-50 p-3 rounded-lg flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle size={16} />
                        Your request has been approved! Contact the owner to arrange pickup.
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}