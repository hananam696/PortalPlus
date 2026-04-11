"use client";

import "./globals.css";
import Navbar from "../components/Navbar";
import ChatWidget from "../components/ChatWidget";
import NotificationPopup from "../components/NotificationPopup";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbarPages = ["/login", "/signup"];
  const showNavbar = !hideNavbarPages.includes(pathname);
  
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  // Check for pending requests when user logs in or on interval
  useEffect(() => {
    const checkUserAndRequests = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);
          
          // Check for pending rental requests
          const allRequests = JSON.parse(localStorage.getItem("rental_requests") || "[]");
          const pendingRequests = allRequests.filter(
            req => req.ownerEmail === userData.email && req.status === "pending"
          );
          
          // Show notification for each pending request (only once per request)
          pendingRequests.forEach(request => {
            const notifiedRequests = JSON.parse(localStorage.getItem("notified_requests") || "[]");
            if (!notifiedRequests.includes(request.id)) {
              showNotification(
                `📚 New rental request for "${request.itemTitle}" from ${request.renterName}`,
                "info",
                "/rental-hub/incoming-requests"
              );
              
              // Mark as notified
              notifiedRequests.push(request.id);
              localStorage.setItem("notified_requests", JSON.stringify(notifiedRequests));
            }
          });
        } catch (e) {
          console.error("Error parsing user:", e);
        }
      }
    };
    
    // Initial check
    checkUserAndRequests();
    
    // Check every 10 seconds for new requests
    const interval = setInterval(checkUserAndRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (message, type = "info", link = null) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type, link }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  return (
    <html lang="en">
      <body className="bg-gray-50">
        {showNavbar && <Navbar />}
        {children}
        <ChatWidget />
        
        {/* Notification Container */}
        <div className="fixed top-20 right-4 z-50 space-y-2">
          {notifications.map(notif => (
            <NotificationPopup
              key={notif.id}
              message={notif.message}
              type={notif.type}
              link={notif.link}
              onClose={() => setNotifications(prev => prev.filter(n => n.id !== notif.id))}
            />
          ))}
        </div>
      </body>
    </html>
  );
}