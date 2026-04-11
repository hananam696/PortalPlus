"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Clock, Bell } from "lucide-react";

export default function IncomingRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    loadRequests();
    // Check for new requests every 5 seconds
    const interval = setInterval(loadRequests, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadRequests = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const allRequests = JSON.parse(localStorage.getItem("rental_requests") || "[]");
    
    // Filter requests where user is the owner
    const ownerRequests = allRequests.filter(req => req.ownerEmail === user.email);
    setRequests(ownerRequests);
    
    // Count pending requests (notifications)
    const pendingCount = ownerRequests.filter(req => req.status === "pending").length;
    setNotificationCount(pendingCount);
    
    setLoading(false);
  };

  const handleStatusUpdate = (requestId, newStatus) => {
    const allRequests = JSON.parse(localStorage.getItem("rental_requests") || "[]");
    const updatedRequests = allRequests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    localStorage.setItem("rental_requests", JSON.stringify(updatedRequests));
    
    // Show notification
    alert(`Request ${newStatus === "approved" ? "approved" : "declined"}!`);
    
    loadRequests();
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      active: "bg-blue-100 text-blue-700",
      completed: "bg-gray-100 text-gray-700",
      declined: "bg-red-100 text-red-700",
    };
    return badges[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/rental-hub" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={16} />
            Back to Rental Hub
          </Link>
          
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Incoming Requests</h1>
            {notificationCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Bell size={12} />
                {notificationCount} new
              </span>
            )}
          </div>
          <p className="text-gray-500 mt-1">Manage rental requests for your items</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No incoming requests</h3>
            <p className="text-gray-500">When students request to rent your items, they'll appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="bg-white rounded-xl shadow-sm border p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{request.itemTitle}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Renter: {request.renterName} • {request.renterEmail}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Pickup:</span>
                        <p className="font-medium">{new Date(request.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Return:</span>
                        <p className="font-medium">{new Date(request.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span>
                        <p className="font-medium">{request.weeks} week(s)</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Total:</span>
                        <p className="font-medium text-emerald-600">{request.totalPrice} QAR</p>
                      </div>
                    </div>
                    {request.message && (
                      <div className="p-3 bg-gray-50 rounded-lg mb-3">
                        <p className="text-xs text-gray-500 mb-1">Message from renter:</p>
                        <p className="text-sm text-gray-700">{request.message}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {request.status === "pending" && (
                  <div className="mt-4 pt-4 border-t flex gap-3">
                    <button
                      onClick={() => handleStatusUpdate(request.id, "approved")}
                      className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(request.id, "declined")}
                      className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                    >
                      <XCircle size={16} />
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}