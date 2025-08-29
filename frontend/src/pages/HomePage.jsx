import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, Building2, Filter, ExternalLink, Sparkles, Layers, Calendar, Users, Award, Globe, DollarSign, ArrowRight, CheckCircle, Star, Zap, Target, Shield, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Idea Investor
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/findvc"
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/findvc"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-4">
              <div className="flex flex-col space-y-3">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors py-2">Features</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors py-2">How it Works</a>
                <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors py-2">About</a>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/findvc"
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/findvc"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Sparkles className="w-10 h-10 text-yellow-300" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent leading-tight">
              Connect with VCs &
              <br />
              <span className="text-yellow-300">Discover Opportunities</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Find the perfect venture capital partners and explore government schemes designed to fuel your startup's growth journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/findvc"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg flex items-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Find VCs Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/findvc"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 text-lg flex items-center"
              >
                <Award className="w-5 h-5 mr-2" />
                Explore Schemes
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-4 h-4 bg-yellow-300 rounded-full opacity-60"></div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <div className="w-6 h-6 bg-blue-300 rounded-full opacity-40"></div>
        </div>
        <div className="absolute bottom-20 left-20 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-3 h-3 bg-purple-300 rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Scale Your Startup
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From finding the right investors to accessing government support, we've got you covered at every stage of your startup journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* VC Discovery */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="p-3 bg-blue-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">VC Discovery</h3>
              <p className="text-gray-600 mb-6">
                Find venture capitalists that match your industry, location, and investment stage. Get detailed profiles and direct contact information.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Industry-specific matching
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Location-based filtering
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  Investment stage alignment
                </li>
              </ul>
            </div>

            {/* Government Schemes */}
            <div className="group p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="p-3 bg-purple-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Startup Schemes</h3>
              <p className="text-gray-600 mb-6">
                Explore government grants, funding programs, and support initiatives designed specifically for startups and entrepreneurs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                  Funding opportunities
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                  Incubation programs
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-2 flex-shrink-0" />
                  Regulatory support
                </li>
              </ul>
            </div>

            {/* Smart Matching */}
            <div className="group p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="p-3 bg-green-600 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Matching</h3>
              <p className="text-gray-600 mb-6">
                Our intelligent algorithm matches you with the most relevant VCs and schemes based on your startup's specific needs and criteria.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  AI-powered recommendations
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  Personalized results
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  Real-time updates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in just three simple steps and unlock a world of opportunities for your startup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  1
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-200 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Path</h3>
              <p className="text-gray-600">
                Select whether you want to find VCs or explore startup schemes. Our toggle makes it easy to switch between both options.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  2
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-purple-200 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Set Your Filters</h3>
              <p className="text-gray-600">
                Refine your search using industry, location, and other relevant criteria to get the most accurate results.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connect & Apply</h3>
              <p className="text-gray-600">
                Review detailed profiles, access contact information, and apply to schemes that match your startup's needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Active VCs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Startup Schemes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Industries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Successful Matches</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-200">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Take Your Startup to the Next Level?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have already discovered their perfect VC partners and unlocked government support through our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/findvc"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg flex items-center justify-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/findvc"
                className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Idea Investor</span>
              </div>
              <p className="text-gray-400">
                Connecting startups with the right investors and opportunities to fuel growth and innovation.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">VC Discovery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Startup Schemes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Idea Investor. All rights reserved. Empowering startups to reach their full potential.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
