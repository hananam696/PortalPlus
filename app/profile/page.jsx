"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Hash,
  BookOpen,
  Calendar,
  Award,
  Edit2,
  Save,
  X,
  LogOut,
  Trash2,
  Leaf,
  GraduationCap,
  MapPin,
  Phone,
  Download,
  Shield,
  Bell,
  Moon,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  // Demo user data
  const [userData, setUserData] = useState({
    name: "Rabiya Ishaq",
    email: "rabiya.ishaq@udst.edu.qa",
    studentId: "202012345",
    program: "Computer Science",
    year: "3rd Year",
    graduation: "May 2025",
    gpa: "3.75",
    department: "College of Engineering",
    campus: "Main Campus",
    phone: "+974 1234 5678",
    bio: "Passionate about sustainability and technology. Working on making UDST greener!",
    ecoPoints: 355,
    ecoLevel: "Forest",
    badges: 4,
    joinDate: "September 2020",
  });

  const [editForm, setEditForm] = useState({ ...userData });

  const handleEdit = () => {
    setEditForm({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({ ...editForm });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    // Add delete account logic here
    setShowDeleteConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Profile Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
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
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </motion.div>

            {/* Profile Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center md:text-left text-white"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{userData.name}</h1>
              <p className="text-emerald-100 text-lg mb-3">{userData.program}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Leaf size={16} />
                  <span>{userData.ecoPoints} Eco Points</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Award size={16} />
                  <span>{userData.badges} Badges</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar size={16} />
                  <span>Joined {userData.joinDate}</span>
                </div>
              </div>
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Profile Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto pb-1">
          <TabButton
            label="Personal Info"
            icon={<User size={18} />}
            active={activeTab === "personal"}
            onClick={() => setActiveTab("personal")}
          />
          <TabButton
            label="Academic"
            icon={<GraduationCap size={18} />}
            active={activeTab === "academic"}
            onClick={() => setActiveTab("academic")}
          />
          <TabButton
            label="Settings"
            icon={<Shield size={18} />}
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          />
          <TabButton
            label="Privacy"
            icon={<Lock size={18} />}
            active={activeTab === "privacy"}
            onClick={() => setActiveTab("privacy")}
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
          {activeTab === "academic" && <AcademicTab userData={userData} />}
          {activeTab === "settings" && (
            <SettingsTab
              onDeleteClick={() => setShowDeleteConfirm(true)}
            />
          )}
          {activeTab === "privacy" && <PrivacyTab />}
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
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <InfoField
              icon={<User size={18} />}
              label="Full Name"
              value={userData.name}
              editing={isEditing}
              name="name"
              editValue={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            />
            <InfoField
              icon={<Mail size={18} />}
              label="Email Address"
              value={userData.email}
              editing={isEditing}
              name="email"
              type="email"
              editValue={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            />
            <InfoField
              icon={<Hash size={18} />}
              label="Student ID"
              value={userData.studentId}
              editing={isEditing}
              name="studentId"
              editValue={editForm.studentId}
              onChange={(e) => setEditForm({ ...editForm, studentId: e.target.value })}
            />
            <InfoField
              icon={<BookOpen size={18} />}
              label="Program"
              value={userData.program}
              editing={isEditing}
              name="program"
              editValue={editForm.program}
              onChange={(e) => setEditForm({ ...editForm, program: e.target.value })}
            />
          </div>

          <div className="space-y-6">
            <InfoField
              icon={<MapPin size={18} />}
              label="Campus"
              value={userData.campus}
              editing={isEditing}
              name="campus"
              editValue={editForm.campus}
              onChange={(e) => setEditForm({ ...editForm, campus: e.target.value })}
            />
            <InfoField
              icon={<Phone size={18} />}
              label="Phone"
              value={userData.phone}
              editing={isEditing}
              name="phone"
              editValue={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            />
            <div>
              <label className="block text-sm text-gray-500 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              ) : (
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{userData.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Info Field Component
function InfoField({ icon, label, value, editing, name, type = "text", editValue, onChange }) {
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
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      ) : (
        <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{value}</p>
      )}
    </div>
  );
}

// Academic Tab
function AcademicTab({ userData }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Academic Information</h2>
      </div>
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <AcademicCard
            icon={<Calendar size={24} />}
            label="Current Year"
            value={userData.year}
            color="emerald"
          />
          <AcademicCard
            icon={<GraduationCap size={24} />}
            label="Expected Graduation"
            value={userData.graduation}
            color="blue"
          />
          <AcademicCard
            icon={<Award size={24} />}
            label="Current GPA"
            value={userData.gpa}
            color="purple"
          />
        </div>

        <div className="mt-8">
          <h3 className="font-semibold text-gray-900 mb-4">Course Progress</h3>
          <div className="space-y-4">
            <ProgressBar label="Core Courses" progress={85} />
            <ProgressBar label="Electives" progress={60} />
            <ProgressBar label="Project Work" progress={40} />
          </div>
        </div>

        <div className="mt-8 p-4 bg-emerald-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Download size={20} className="text-emerald-600" />
            <span className="text-sm text-gray-700">Download Academic Transcript</span>
            <button className="ml-auto text-emerald-600 hover:text-emerald-700 font-medium text-sm">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Academic Card Component
function AcademicCard({ icon, label, value, color }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className={`w-12 h-12 ${colors[color]} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

// Progress Bar Component
function ProgressBar({ label, progress }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab({ onDeleteClick }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Preferences</h2>
        </div>
        <div className="p-6 space-y-4">
          <SettingToggle icon={<Bell size={18} />} label="Email Notifications" defaultChecked />
          <SettingToggle icon={<Moon size={18} />} label="Dark Mode" />
          <SettingToggle icon={<Globe size={18} />} label="Language" type="select" value="English" />
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

// Setting Toggle Component
function SettingToggle({ icon, label, defaultChecked, type = "toggle", value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className="text-gray-500">{icon}</div>
        <span className="text-gray-700">{label}</span>
      </div>
      {type === "toggle" ? (
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
        </label>
      ) : (
        <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
          <option>{value}</option>
        </select>
      )}
    </div>
  );
}

// Privacy Tab
function PrivacyTab() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Privacy Settings</h2>
      </div>
      <div className="p-6 space-y-4">
        <PrivacyOption
          title="Profile Visibility"
          description="Who can see your profile"
          options={["Public", "Students Only", "Private"]}
          default="Students Only"
        />
        <PrivacyOption
          title="Show Email"
          description="Display your email on profile"
          type="toggle"
          defaultChecked={false}
        />
        <PrivacyOption
          title="Activity Status"
          description="Show when you're online"
          type="toggle"
          defaultChecked={true}
        />
        <PrivacyOption
          title="Data Sharing"
          description="Allow anonymous usage data collection"
          type="toggle"
          defaultChecked={false}
        />
      </div>
    </div>
  );
}

// Privacy Option Component
function PrivacyOption({ title, description, type = "select", options, default: defaultValue, defaultChecked }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {type === "select" ? (
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
          {options?.map((opt) => (
            <option key={opt} selected={opt === defaultValue}>{opt}</option>
          ))}
        </select>
      ) : (
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
        </label>
      )}
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