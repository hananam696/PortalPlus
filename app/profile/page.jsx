"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Hash,
  BookOpen,
  Calendar,
  GraduationCap,
  Edit2,
  Save,
  X,
  LogOut,
  Trash2,
  Shield,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // User data state
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    program: "",
    year: "",
    graduation: "",
    phone: "",
  });

  const [editForm, setEditForm] = useState({ ...userData });

  // Load user from localStorage on mount
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    try {
      const user = JSON.parse(userStr);
      
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        studentId: user.studentId || "",
        program: user.program || "",
        year: user.year || "",
        graduation: user.graduation || "",
        phone: user.phone || "",
      });
      
      setEditForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        studentId: user.studentId || "",
        program: user.program || "",
        year: user.year || "",
        graduation: user.graduation || "",
        phone: user.phone || "",
      });
    } catch (error) {
      console.error("Error parsing user:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleEdit = () => {
    setEditForm({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update local state
    setUserData({ ...editForm });
    
    // Update localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      user.firstName = editForm.firstName;
      user.lastName = editForm.lastName;
      user.studentId = editForm.studentId;
      user.program = editForm.program;
      user.year = editForm.year;
      user.graduation = editForm.graduation;
      user.phone = editForm.phone;
      localStorage.setItem("user", JSON.stringify(user));
    }
    
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    handleLogout();
  };

  // Get full name for display
  const getFullName = () => {
    const firstName = userData.firstName || "";
    const lastName = userData.lastName || "";
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim();
    }
    return "Add Your Name";
  };

  // Get initials for avatar
  const getInitials = () => {
    const firstName = userData.firstName || "";
    const lastName = userData.lastName || "";
    if (firstName || lastName) {
      return `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();
    }
    return "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Profile Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Avatar */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border-4 border-white/50 shadow-xl">
                <span className="text-5xl font-bold text-white">
                  {getInitials()}
                </span>
              </div>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center md:text-left text-white"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {getFullName()}
              </h1>
              <p className="text-emerald-100 text-lg">{userData.email || "Add your email"}</p>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100L60 91.7C120 83.3 240 66.7 360 58.3C480 50 600 50 720 54.2C840 58.3 960 66.7 1080 70.8C1200 75 1320 75 1380 75L1440 75V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto pb-1">
          <TabButton
            label="Personal Info"
            icon={<User size={18} />}
            active={activeTab === "personal"}
            onClick={() => setActiveTab("personal")}
          />
          <TabButton
            label="Settings"
            icon={<Shield size={18} />}
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "personal" && (
            <PersonalInfoTab
              userData={userData}
              isEditing={isEditing}
              editForm={editForm}
              setEditForm={setEditForm}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
          {activeTab === "settings" && (
            <SettingsTab
              onDeleteClick={() => setShowDeleteConfirm(true)}
              onLogout={handleLogout}
            />
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}

// Tab Button Component
function TabButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 font-medium text-sm border-b-2 transition-all whitespace-nowrap ${
        active
          ? "border-emerald-600 text-emerald-600"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// Personal Info Tab
function PersonalInfoTab({ userData, isEditing, editForm, setEditForm, onEdit, onSave, onCancel }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition"
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <InfoField
              icon={<User size={18} />}
              label="First Name"
              value={userData.firstName}
              editing={isEditing}
              name="firstName"
              placeholder="Enter your first name"
              editValue={editForm.firstName}
              onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
            />
            <InfoField
              icon={<User size={18} />}
              label="Last Name"
              value={userData.lastName}
              editing={isEditing}
              name="lastName"
              placeholder="Enter your last name"
              editValue={editForm.lastName}
              onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
            />
          </div>
          
          <InfoField
            icon={<Mail size={18} />}
            label="Email Address"
            value={userData.email}
            editing={isEditing}
            name="email"
            type="email"
            placeholder="Enter your email"
            editValue={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
          />
          <InfoField
            icon={<Hash size={18} />}
            label="Student ID"
            value={userData.studentId || ""}
            editing={isEditing}
            name="studentId"
            placeholder="Enter your student ID"
            editValue={editForm.studentId}
            onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
          />
          <InfoField
            icon={<BookOpen size={18} />}
            label="Program"
            value={userData.program || ""}
            editing={isEditing}
            name="program"
            placeholder="e.g., Computer Science"
            editValue={editForm.program}
            onChange={(e) => setEditForm({ ...editForm, program: e.target.value })}
          />
          <InfoField
            icon={<Calendar size={18} />}
            label="Current Year"
            value={userData.year || ""}
            editing={isEditing}
            name="year"
            placeholder="e.g., 3rd Year"
            editValue={editForm.year}
            onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
          />
          <InfoField
            icon={<GraduationCap size={18} />}
            label="Expected Graduation"
            value={userData.graduation || ""}
            editing={isEditing}
            name="graduation"
            placeholder="e.g., May 2025"
            editValue={editForm.graduation}
            onChange={(e) => setEditForm({ ...editForm, graduation: e.target.value })}
          />
          <InfoField
            icon={<Phone size={18} />}
            label="Phone Number"
            value={userData.phone || ""}
            editing={isEditing}
            name="phone"
            placeholder="Enter your phone number"
            editValue={editForm.phone}
            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

// Info Field Component
function InfoField({ icon, label, value, editing, name, type = "text", placeholder, editValue, onChange }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        {icon}
        <span>{label}</span>
      </div>
      {editing ? (
        <input
          type={type}
          name={name}
          value={editValue}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      ) : (
        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
          {value || <span className="text-gray-400">Not set</span>}
        </p>
      )}
    </div>
  );
}

// Settings Tab
function SettingsTab({ onDeleteClick, onLogout }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Account</h2>
        </div>
        <div className="p-6">
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
        </div>
        <div className="p-6">
          <button
            onClick={onDeleteClick}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition"
          >
            <Trash2 size={18} />
            Delete Account
          </button>
          <p className="text-xs text-gray-500 mt-2">
            This action cannot be undone. All your data will be permanently removed.
          </p>
        </div>
      </div>
    </div>
  );
}

// Delete Confirmation Modal
function DeleteConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl max-w-md w-full overflow-hidden"
      >
        <div className="p-6">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trash2 size={32} className="text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-center mb-2">Delete Account</h2>
          <p className="text-gray-600 text-center mb-6">
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}