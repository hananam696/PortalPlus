"use client";

import {
  Leaf,
  Heart,
  Users,
  Target,
  Award,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Rocket,
  Shield,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  const team = [
    {
      name: "Maryam Mahboob",
      role: "Frontend Developer",
      bio: "Creating beautiful and responsive user interfaces",
      initials: "MM",
      color: "emerald",
    },
    {
      name: "Rawana Poovathingal",
      role: "UI/UX Designer",
      bio: "Designing intuitive student experiences",
      initials: "RP",
      color: "blue",
    },
    {
      name: "Hanan Ahmed Moosa",
      role: "Backend Developer",
      bio: "Building robust server-side solutions",
      initials: "HM",
      color: "purple",
    },
    {
      name: "Aisha Uddin",
      role: "Database Specialist",
      bio: "Managing data architecture and security",
      initials: "AU",
      color: "amber",
    },
    {
      name: "Asma Roma",
      role: "Sustainability Lead",
      bio: "Integrating eco-friendly features",
      initials: "AR",
      color: "rose",
    },
    {
      name: "Rabiya Ishaq",
      role: "Lead Developer",
      bio: "Full-stack developer & project coordinator",
      initials: "RI",
      color: "indigo",
    },
  ];

  const supervisor = {
    name: "Mostafa Hamadi",
    role: "Project Supervisor",
    bio: "Guiding the team towards excellence",
    initials: "MH",
    color: "emerald",
  };

  const stats = [
    { label: "Active Students", value: "2,500+", icon: <Users /> },
    { label: "Eco Points Earned", value: "85K", icon: <Leaf /> },
    { label: "Items Shared", value: "1,200+", icon: <Heart /> },
    { label: "Certificates", value: "3,500+", icon: <Award /> },
  ];

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Student First",
      description: "Everything we build starts with student needs",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Sustainability",
      description: "Promoting eco-friendly practices on campus",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy & Security",
      description: "Your data is always protected",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Innovation",
      description: "Pushing boundaries in student services",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} />
              <span className="text-sm">Built by UDST students, for UDST students</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              About <span className="text-emerald-200">PortalPlus</span>
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              We're dedicated to enhancing student life at UDST by providing tools that promote productivity, sustainability and academic success.
            </p>
          </motion.div>
        </div>

        {/* Stats Section (floating over hero) */}
        <div className="max-w-7xl mx-auto px-6 relative -mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-emerald-600 flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-emerald-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                To create an all-in-one platform designed for UDST students to manage their academic life, access campus resources, stay organized and connect with campus opportunities. Built by students for students.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-600">Simplify access to campus resources</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-600">Promote sustainable practices</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-600">Foster student community & collaboration</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">What is PortalPlus?</h3>
                <p className="text-emerald-100 mb-6">
                  An all-in-one platform designed for UDST students to manage their academic life, access campus resources, stay organized and connect with campus opportunities. Built by students for students.
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf size={16} />
                    <span>Eco-friendly design</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-emerald-600">Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Supervisor Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Project <span className="text-emerald-600">Supervisor</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border-4 border-white/50">
                  <Crown size={40} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-1">{supervisor.name}</h3>
                <p className="text-emerald-100 mb-3">{supervisor.role}</p>
                <p className="text-white/90 text-sm max-w-sm mx-auto">{supervisor.bio}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet the <span className="text-emerald-600">Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate students behind PortalPlus
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => {
              const colors = {
                emerald: "bg-emerald-100 text-emerald-600",
                blue: "bg-blue-100 text-blue-600",
                purple: "bg-purple-100 text-purple-600",
                amber: "bg-amber-100 text-amber-600",
                rose: "bg-rose-100 text-rose-600",
                indigo: "bg-indigo-100 text-indigo-600",
              };
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden group"
                >
                  <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                  </div>
                  <div className="relative px-6 pb-6">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                      <div className={`w-20 h-20 rounded-2xl ${colors[member.color]} flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-white`}>
                        {member.initials}
                      </div>
                    </div>
                    <div className="pt-12 text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-sm text-emerald-600 font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-gray-500 mb-4">{member.bio}</p>
                      <div className="flex justify-center gap-3">
                        <Link href="#" className="text-gray-400 hover:text-emerald-600 transition">
                          <Linkedin size={16} />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-emerald-600 transition">
                          <Twitter size={16} />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-emerald-600 transition">
                          <Github size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Get in <span className="text-emerald-600">Touch</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions or suggestions? We'd love to hear from you!
              </p>

              <div className="space-y-4">
                <ContactItem icon={<Mail />} label="Email" value="support@portalplus.qa" />
                <ContactItem icon={<Phone />} label="Phone" value="+974 1234 5678" />
                <ContactItem icon={<MapPin />} label="Address" value="UDST Main Campus, Doha, Qatar" />
                <ContactItem icon={<Globe />} label="Website" value="www.portalplus.qa" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Send us a message</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-500">
          <p>PortalPlus Version 1.0</p>
          <p className="text-sm mt-2">© 2024 UDST Student Hub. Built with ❤️ by UDST students</p>
        </div>
      </div>
    </div>
  );
}

// Contact Item Component
function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-gray-900 font-medium">{value}</p>
      </div>
    </div>
  );
}