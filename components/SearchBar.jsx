"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, BookOpen, Calculator, Award, Loader2, ChevronRight, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [groupedResults, setGroupedResults] = useState({ rental: [], certificates: [] });
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const searchRef = useRef(null);
  const router = useRouter();
  
  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  // Debounced search
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        performSearch();
      } else {
        setResults([]);
        setGroupedResults({ rental: [], certificates: [] });
        setShowResults(false);
      }
    }, 300);
    
    return () => clearTimeout(delayDebounce);
  }, [query]);
  
  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.results);
        setGroupedResults(data.grouped || { rental: [], certificates: [] });
        setShowResults(data.results.length > 0);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };
  
  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };
  
  const getTypeIcon = (type, category) => {
    if (type === "rental") {
      if (category === "books") return <BookOpen size={14} className="text-blue-500" />;
      if (category === "calculators") return <Calculator size={14} className="text-purple-500" />;
      return <BookOpen size={14} className="text-blue-500" />;
    }
    return <Award size={14} className="text-green-500" />;
  };
  
  const getTypeBadge = (item) => {
    if (item.type === "rental") {
      return (
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
          {item.category === "books" ? "Book" : "Calculator"}
        </span>
      );
    }
    return (
      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
        Certificate
      </span>
    );
  };
  
  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && results.length > 0 && setShowResults(true)}
            placeholder="Search books, calculators, certificates, or sustainability topics..."
            className="w-full pl-12 pr-24 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-32 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition text-sm font-medium"
          >
            Search
          </button>
        </div>
      </form>
      
      {/* Search Info Message */}
          <div className="mt-3 text-center text-s text-gray-500">
              <span className="inline-flex items-center gap-2 flex-wrap justify-center">
                  <span>🔍 Search PortalPlus:</span>
                  <span>📚 Books</span>
                  <span>🧮 Calculators</span>
                  <span>🎓 Certificates</span>
                  <span className="text-emerald-500 font-medium">✨ + more coming soon!</span>
              </span>
          </div>
      
      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="animate-spin mx-auto text-gray-400" size={24} />
              <p className="text-gray-500 text-sm mt-2">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <Search className="mx-auto text-gray-300 mb-2" size={32} />
              <p className="text-gray-500">No results found for "{query}"</p>
              <p className="text-gray-400 text-sm mt-1">Try different keywords</p>
            </div>
          ) : (
            <div>
              {/* Rental Items Section */}
              {groupedResults.rental.length > 0 && (
                <div className="border-b border-gray-100">
                  <div className="px-4 py-2 bg-gray-50">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Rental Items</h4>
                  </div>
                  {groupedResults.rental.map((item, index) => (
                    <ResultItem 
                      key={`rental-${item.id}-${index}`}
                      item={item}
                      icon={getTypeIcon(item.type, item.category)}
                      badge={getTypeBadge(item)}
                      onClose={() => setShowResults(false)}
                      query={query}
                    />
                  ))}
                </div>
              )}
              
              {/* Certificates Section */}
              {groupedResults.certificates.length > 0 && (
                <div>
                  <div className="px-4 py-2 bg-gray-50">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase">Certificates</h4>
                  </div>
                  {groupedResults.certificates.map((item, index) => (
                    <ResultItem 
                      key={`cert-${item.id}-${index}`}
                      item={item}
                      icon={getTypeIcon(item.type)}
                      badge={getTypeBadge(item)}
                      onClose={() => setShowResults(false)}
                      query={query}
                    />
                  ))}
                </div>
              )}
              
              {/* View All Link */}
              <div className="border-t border-gray-100 p-3 bg-gray-50">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  className="flex items-center justify-between text-sm text-green-600 hover:text-green-700"
                  onClick={() => setShowResults(false)}
                >
                  <span>View all results ({results.length})</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Result Item Component
function ResultItem({ item, icon, badge, onClose, query }) {
  const getHighlightedText = (text) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-yellow-200 text-gray-900 no-underline">{part}</mark> : part
    );
  };
  
  return (
    <Link
      href={item.url}
      onClick={onClose}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
    >
      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            {getHighlightedText(item.title)}
          </p>
          {badge}
        </div>
        <p className="text-xs text-gray-500">
          {item.type === "rental" ? item.course : item.date}
        </p>
      </div>
      <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
    </Link>
  );
}