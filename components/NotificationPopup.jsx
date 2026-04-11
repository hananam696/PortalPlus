"use client";

import { useEffect, useState } from "react";
import { Bell, X, CheckCircle, Clock, AlertCircle, Inbox, Mail } from "lucide-react";
import Link from "next/link";

export default function NotificationPopup({ message, type, onClose, link }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "info":
        return <Bell className="w-5 h-5 text-emerald-500" />;
      default:
        return <Mail className="w-5 h-5 text-emerald-500" />;
    }
  };

  const bgColor = {
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200",
    info: "bg-emerald-50 border-emerald-200",
  }[type] || "bg-emerald-50 border-emerald-200";

  const iconColor = {
    success: "text-green-500",
    warning: "text-yellow-500",
    error: "text-red-500",
    info: "text-emerald-500",
  }[type] || "text-emerald-500";

  return (
    <div className={`${bgColor} border rounded-xl shadow-lg animate-slide-in w-80`}>
      <div className="p-3">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-700 break-words">
              {message}
            </p>
            {link && (
              <Link
                href={link}
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="mt-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 inline-block"
              >
                View Details →
              </Link>
            )}
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}