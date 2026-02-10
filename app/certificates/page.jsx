"use client";

import { useState, useRef } from "react";
import { FileText, Upload, Search, X, Loader2, CheckCircle, Download, Eye } from "lucide-react";

export default function CertificatesPage() {
  const [query, setQuery] = useState("");
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: "Sustainability Workshop",
      type: "Workshop",
      date: "2024-03-12",
      url: null, 
      fileName: "sustainability-workshop.pdf",
      size: 1024000, // 1MB in bytes
    },
    {
      id: 2,
      title: "Internship Completion",
      type: "Internship",
      date: "2023-08-30",
      url: null,
      fileName: "internship-completion.pdf",
      size: 2048000, // 2MB in bytes
    },
  ]);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    type: "Workshop",
    file: null,
  });
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const filtered = certificates.filter((c) =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.type.toLowerCase().includes(query.toLowerCase())
  );

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Auto-fill title from filename if empty
      const title = uploadData.title || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      
      setUploadData({
        ...uploadData,
        file: file,
        title: title
      });
    }
  };

  const handleUpload = async () => {
    if (!uploadData.file) {
      alert("Please select a file first");
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append("file", uploadData.file);
    formData.append("title", uploadData.title);
    formData.append("type", uploadData.type);

    try {
      const response = await fetch("/api/upload-certificate", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus({
          type: "success",
          message: "Certificate uploaded successfully!",
        });

        // Add new certificate to the list with Vercel Blob URL
        const newCertificate = {
          id: Date.now(),
          title: result.title || uploadData.title,
          type: result.type || uploadData.type,
          date: result.date || new Date().toISOString().split('T')[0],
          url: result.url, // Vercel Blob URL
          fileName: result.originalName || uploadData.file.name,
          size: result.size || uploadData.file.size,
        };

        setCertificates([newCertificate, ...certificates]);

        // Reset form
        setUploadData({
          title: "",
          type: "Workshop",
          file: null,
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadStatus(null);
        }, 2000);
      } else {
        setUploadStatus({
          type: "error",
          message: result.error || "Upload failed",
        });
      }
    } catch (error) {
      setUploadStatus({
        type: "error",
        message: "Network error. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleViewCertificate = (certificate) => {
    // Try Vercel Blob URL first, then fallback to local file
    if (certificate.url) {
      window.open(certificate.url, '_blank');
    } else if (certificate.fileName) {
      window.open(`/uploads/certificates/${certificate.fileName}`, '_blank');
    } else {
      alert("Certificate file not available");
    }
  };

  const handleDownloadCertificate = (certificate, e) => {
    e.stopPropagation();
    
    if (certificate.url) {
      // For Vercel Blob URLs
      const link = document.createElement('a');
      link.href = certificate.url;
      link.download = certificate.fileName || 'certificate.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (certificate.fileName) {
      // For local files
      window.open(`/uploads/certificates/${certificate.fileName}`, '_download');
    } else {
      alert("Certificate file not available for download");
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Certificate Repository
          </h1>
          <p className="text-gray-600 text-lg">
            Store and manage your academic and extracurricular certificates securely in the cloud
          </p>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <CheckCircle size={16} />
            <span>Files are stored securely using Vercel Blob Storage</span>
          </div>
        </div>

        {/* Search + Upload */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search certificates by title or type..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
          >
            <Upload size={20} />
            <span className="font-medium">Upload Certificate</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <p className="text-gray-500 text-sm">Total Certificates</p>
            <p className="text-3xl font-bold text-gray-800">{certificates.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <p className="text-gray-500 text-sm">Storage Used</p>
            <p className="text-3xl font-bold text-gray-800">
              {formatFileSize(certificates.reduce((sum, cert) => sum + (cert.size || 0), 0))}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border">
            <p className="text-gray-500 text-sm">Types</p>
            <p className="text-3xl font-bold text-gray-800">
              {[...new Set(certificates.map(c => c.type))].length}
            </p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <FileText className="text-green-600" size={24} />
                  </div>
                  <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                    cert.type === 'Workshop' ? 'bg-blue-100 text-blue-700' :
                    cert.type === 'Internship' ? 'bg-purple-100 text-purple-700' :
                    cert.type === 'Course' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {cert.type}
                  </span>
                </div>

                <h2 className="font-bold text-gray-800 mb-2 line-clamp-2 h-14">
                  {cert.title}
                </h2>
                
                <div className="space-y-2 mb-5">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-24">Date:</span>
                    <span className="font-medium">{cert.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-24">Size:</span>
                    <span className="font-medium">{formatFileSize(cert.size || 0)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-24">Storage:</span>
                    <span className={`font-medium ${cert.url ? 'text-green-600' : 'text-gray-600'}`}>
                      {cert.url ? 'Cloud' : 'Local'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewCertificate(cert)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition group/view"
                  >
                    <Eye size={16} />
                    <span className="font-medium">View</span>
                  </button>
                  <button
                    onClick={(e) => handleDownloadCertificate(cert, e)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <FileText className="text-gray-300" size={48} />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-3">
              {query ? 'No certificates found' : 'No certificates yet'}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              {query 
                ? "Try adjusting your search terms or upload a new certificate."
                : "Start building your certificate portfolio by uploading your first achievement."
              }
            </p>
            {!query && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                <Upload size={18} />
                Upload Your First Certificate
              </button>
            )}
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden animate-popup">
              {/* Header */}
              <div className="px-6 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Upload Certificate</h2>
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setUploadStatus(null);
                      setUploadData({ title: "", type: "Workshop", file: null });
                    }}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-green-100 text-sm mt-1">
                  Files are securely stored in Vercel Blob Storage
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Upload Status */}
                {uploadStatus && (
                  <div className={`mb-5 p-4 rounded-xl ${
                    uploadStatus.type === "success" 
                      ? "bg-green-50 border border-green-200 text-green-700" 
                      : "bg-red-50 border border-red-200 text-red-700"
                  }`}>
                    <div className="flex items-center gap-3">
                      {uploadStatus.type === "success" ? (
                        <CheckCircle size={20} className="flex-shrink-0" />
                      ) : (
                        <X size={20} className="flex-shrink-0" />
                      )}
                      <span className="font-medium">{uploadStatus.message}</span>
                    </div>
                  </div>
                )}

                {/* Form */}
                <div className="space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate Title *
                    </label>
                    <input
                      type="text"
                      value={uploadData.title}
                      onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                      placeholder="e.g., Advanced Web Development Workshop"
                      className="w-full p-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate Type *
                    </label>
                    <select
                      value={uploadData.type}
                      onChange={(e) => setUploadData({ ...uploadData, type: e.target.value })}
                      className="w-full p-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="Workshop">Workshop</option>
                      <option value="Internship">Internship</option>
                      <option value="Course">Course</option>
                      <option value="Competition">Competition</option>
                      <option value="Volunteer">Volunteer</option>
                      <option value="Achievement">Achievement</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certificate File *
                    </label>
                    <div
                      onClick={() => fileInputRef.current.click()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                        uploadData.file 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                      }`}
                    >
                      {uploadData.file ? (
                        <div className="space-y-3">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                            <FileText className="text-green-600" size={28} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{uploadData.file.name}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatFileSize(uploadData.file.size)} • {uploadData.file.type.split('/')[1].toUpperCase()}
                            </p>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setUploadData({ ...uploadData, file: null });
                              }}
                              className="text-red-600 text-sm mt-2 hover:text-red-700 font-medium"
                            >
                              Remove file
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Upload className="text-gray-400" size={28} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-700 mb-1">Click to select file</p>
                            <p className="text-sm text-gray-500">
                              PDF, JPG, PNG up to 5MB
                            </p>
                          </div>
                        </>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Supported formats: PDF, JPEG, PNG. Maximum file size: 5MB
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setShowUploadModal(false);
                        setUploadStatus(null);
                        setUploadData({ title: "", type: "Workshop", file: null });
                      }}
                      disabled={uploading}
                      className="flex-1 py-3.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={uploading || !uploadData.file}
                      className="flex-1 py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                      {uploading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="animate-spin" size={18} />
                          Uploading...
                        </div>
                      ) : (
                        "Upload to Cloud"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}