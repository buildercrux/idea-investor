import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, Building2, Filter, ExternalLink, Sparkles } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase credentials
const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const VCSearch = () => {
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    
    try {
      let query = supabase.from("vcs").select("*");

      if (industry) query = query.contains("industry_focus", [industry]);
      if (stage) query = query.contains("stage_focus", [stage]);
      if (location) query = query.ilike("location", `%${location}%`);

      const { data, error } = await query;

      if (error) {
        console.error("❌ Error fetching data:", error.message);
        setResults([]);
      } else {
        setResults(data || []);
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      setResults([]);
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Discover VCs
            </h1>
          </div>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Find the perfect venture capital partners for your startup journey
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-xl border p-8 mb-8">
          <div className="flex items-center mb-6">
            <Filter className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Search Filters</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Industry Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Building2 className="w-4 h-4 mr-1" />
                Industry Focus
              </label>
              <input
                type="text"
                placeholder="e.g., AI, FinTech, Healthcare"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>

            {/* Stage Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                Investment Stage
              </label>
              <input
                type="text"
                placeholder="e.g., Pre-Seed, Series A"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>

            {/* Location Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Location
              </label>
              <input
                type="text"
                placeholder="e.g., San Francisco, New York"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-70 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Find VCs
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        <div className="mb-12">
          {results.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Found {results.length} VCs
                </h3>
                <div className="h-px bg-gradient-to-r from-blue-200 to-purple-200 flex-1 ml-6"></div>
              </div>
              
              <div className="grid gap-6">
                {results.map((vc) => (
                  <div
                    key={vc.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border overflow-hidden transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                            {vc.full_name}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-3">
                            {vc.headline}
                          </p>
                          {vc.location && (
                            <div className="flex items-center text-gray-500 mb-4">
                              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                              {vc.location}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2 flex-wrap">
                          {vc.industry_focus && (
                            Array.isArray(vc.industry_focus) 
                              ? vc.industry_focus.map((industry, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-1">
                                    {industry}
                                  </span>
                                ))
                              : <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-1">
                                  {vc.industry_focus}
                                </span>
                          )}
                          {vc.stage_focus && (
                            Array.isArray(vc.stage_focus) 
                              ? vc.stage_focus.map((stage, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full mb-1">
                                    {stage}
                                  </span>
                                ))
                              : <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full mb-1">
                                  {vc.stage_focus}
                                </span>
                          )}
                        </div>
                        
                        {vc.profile_url && (
                          <a
                            href={vc.profile_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          >
                            View Profile
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : !isLoading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <Search className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Ready to find your perfect VC match?
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Use the filters above to search for venture capital firms that align with your startup's industry, stage, and location.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VCSearch;