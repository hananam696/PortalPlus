"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, BookOpen, Calculator, Award, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState([]);
  const [groupedResults, setGroupedResults] = useState({ rental: [], certificates: [] });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (query) {
      fetchResults();
    } else {
      setLoading(false);
    }
  }, [query]);
  
  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.success) {
        setResults(data.results);
        setGroupedResults(data.grouped || { rental: [], certificates: [] });
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const getTypeIcon = (item) => {
    if (item.type === "rental") {
      if (item.category === "books") return <BookOpen size={20} className="text-blue-500" />;
      return <Calculator size={20} className="text-purple-500" />;
    }
    return <Award size={20} className="text-green-500" />;
  };
  
  const getHighlightedText = (text) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-yellow-200 text-gray-900">{part}</mark> : part
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>
          
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-green-100">
            {loading ? "Searching..." : `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
          </p>
        </div>
      </div>
      
      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="animate-spin mx-auto text-green-600 mb-4" size={40} />
            <p className="text-gray-500">Searching for "{query}"...</p>
          </div>
        ) : results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Search className="mx-auto text-gray-300 mb-4" size={64} />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No results found</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find anything matching "{query}". Try different keywords or browse our categories.
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Link href="/rental-hub" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                Browse Rental Hub
              </Link>
              <Link href="/certificates" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Browse Certificates
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* Rental Items Section */}
            {groupedResults.rental.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-600" />
                  Rental Items ({groupedResults.rental.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedResults.rental.map((item, index) => (
                    <ResultCard 
                      key={`rental-${item.id}-${index}`}
                      item={item}
                      icon={getTypeIcon(item)}
                      query={query}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Certificates Section */}
            {groupedResults.certificates.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Award size={20} className="text-green-600" />
                  Certificates ({groupedResults.certificates.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedResults.certificates.map((item, index) => (
                    <ResultCard 
                      key={`cert-${item.id}-${index}`}
                      item={item}
                      icon={getTypeIcon(item)}
                      query={query}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({ item, icon, query }) {
  const getHighlightedText = (text) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-yellow-200 text-gray-900">{part}</mark> : part
    );
  };
  
  return (
    <Link href={item.url}>
      <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border border-gray-100 cursor-pointer">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              {getHighlightedText(item.title)}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {item.type === "rental" ? item.course : item.date}
            </p>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                item.type === "rental" 
                  ? item.status === "Available" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {item.type === "rental" ? item.status : item.type}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {item.type === "rental" ? item.category : "Certificate"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}