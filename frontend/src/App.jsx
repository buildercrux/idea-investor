import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, Building2, Filter, ExternalLink, Sparkles, Layers, Calendar, Users, Award, Globe, DollarSign } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Supabase credentials from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log environment variables (remove in production)
console.log('Environment variables:', {
  SUPABASE_URL: SUPABASE_URL,
  SUPABASE_ANON_KEY: SUPABASE_ANON_KEY ? `${SUPABASE_ANON_KEY.substring(0, 20)}...` : 'undefined'
});

// Check if environment variables are strings
console.log('Environment variable types:', {
  SUPABASE_URL_TYPE: typeof SUPABASE_URL,
  SUPABASE_ANON_KEY_TYPE: typeof SUPABASE_ANON_KEY
});

// Check if environment variables are truthy
console.log('Environment variable truthiness:', {
  SUPABASE_URL_TRUTHY: !!SUPABASE_URL,
  SUPABASE_ANON_KEY_TRUTHY: !!SUPABASE_ANON_KEY
});

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase environment variables!');
  console.error('Please check your .env file or deployment environment variables.');
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with error handling
let supabase;
try {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Supabase client created successfully');
} catch (error) {
  console.error('❌ Error creating Supabase client:', error);
  throw error;
}

const VCSearch = () => {
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("vcs");
  
  // New state variables for scheme filters
  const [selectedState, setSelectedState] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSchemeType, setSelectedSchemeType] = useState("");

  // --- Fetch VCs ---
  const handleSearch = async () => {
    setIsLoading(true);
    
    try {
      let query = supabase.from("vcs").select("*");

      if (industry) query = query.contains("industry_focus", [industry]);
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

  // --- Delete VC ---
  const deleteVC = async (vcId) => {
    if (!window.confirm('Are you sure you want to delete this VC? This action cannot be undone.')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('vcs')
        .delete()
        .eq('id', vcId);
      
      if (error) {
        console.error('❌ Error deleting VC:', error.message);
        alert('Failed to delete VC. Please try again.');
      } else {
        console.log('✅ VC deleted successfully');
        // Remove from local state
        setResults(prevResults => prevResults.filter(vc => vc.id !== vcId));
        alert('VC deleted successfully!');
      }
    } catch (err) {
      console.error('❌ Network error while deleting:', err);
      alert('Network error while deleting VC. Please try again.');
    }
  };

  // --- Fetch Schemes ---
  const fetchSchemes = async () => {
    setIsLoading(true);
    try {
      // Comprehensive real startup schemes data from official sources
      const hardcodedSchemes = [
        // ALL INDIA SCHEMES
        {
          id: 1,
          name: "Startup India Seed Fund Scheme (SISFS)",
          category: "Funding",
          description: "Government of India's flagship scheme providing financial assistance for proof of concept, prototype development, product trials, market entry, and commercialization.",
          managing_agency: "Department for Promotion of Industry and Internal Trade (DPIIT)",
          objectives: "To provide financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
          benefits: "Up to ₹50 lakhs for proof of concept, prototype development, product trials, market entry, and commercialization.",
          eligibility: "DPIIT-recognized startups, incorporated not more than 2 years ago, with innovative business model.",
          funding_details: "Up to ₹50 lakhs per startup",
          official_link: "https://www.startupindia.gov.in/content/sih/en/government-schemes.html",
          state: "All India",
          sector: "All Sectors",
          scheme_type: "Grant",
          application_deadline: "Rolling Basis"
        },
        {
          id: 2,
          name: "ASPIRE (A Scheme for Promotion of Innovation, Rural Enterprises and Village Industries)",
          category: "Funding",
          description: "Promotes innovation, rural entrepreneurship and agro-industry through technical and financial support.",
          managing_agency: "Ministry of Micro, Small and Medium Enterprises (MSME)",
          objectives: "To promote innovation, rural entrepreneurship and agro-industry through technical and financial support.",
          benefits: "Up to ₹1 crore for technology business incubators and up to ₹50 lakhs for rural business incubators.",
          eligibility: "Technology Business Incubators, Rural Business Incubators, and Livelihood Business Incubators.",
          funding_details: "Up to ₹1 crore for TBIs, ₹50 lakhs for RBIs",
          official_link: "https://www.msme.gov.in/aspire-scheme-promotion-innovation-rural-enterprises-and-village-industries",
          state: "All India",
          sector: "Agriculture",
          scheme_type: "Grant",
          application_deadline: "Rolling Basis"
        },
        {
          id: 3,
          name: "MUDRA (Micro Units Development and Refinance Agency)",
          category: "Funding",
          description: "Provides loans up to ₹10 lakhs to non-corporate, non-farm small/micro enterprises.",
          managing_agency: "MUDRA Bank",
          objectives: "To provide financial support to micro enterprises and promote entrepreneurship.",
          benefits: "Loans up to ₹10 lakhs with flexible repayment terms.",
          eligibility: "Non-corporate, non-farm small/micro enterprises, proprietorship, partnership, and private limited companies.",
          funding_details: "Shishu: up to ₹50,000, Kishore: up to ₹5 lakhs, Tarun: up to ₹10 lakhs",
          official_link: "https://www.mudra.org.in/apply-for-loan",
          state: "All India",
          sector: "All Sectors",
          scheme_type: "Loan",
          application_deadline: "Rolling Basis"
        },

        // MAHARASHTRA SCHEMES
        {
          id: 4,
          name: "Maharashtra State Innovation Society (MSInS) - Startup Incubation Program",
          category: "Infrastructure",
          description: "Comprehensive support for startups including incubation, mentoring, and funding opportunities through state-of-the-art facilities.",
          managing_agency: "Maharashtra State Innovation Society",
          objectives: "To create a robust startup ecosystem in Maharashtra through incubation, mentoring, and funding support.",
          benefits: "Incubation space, mentoring, networking opportunities, access to funding, and market access support.",
          eligibility: "Early-stage startups with innovative solutions, preferably based in Maharashtra.",
          funding_details: "Up to ₹25 lakhs for selected startups",
          official_link: "https://msins.in/",
          state: "Maharashtra",
          sector: "Technology",
          scheme_type: "Incubation",
          application_deadline: "Quarterly"
        },
        {
          id: 5,
          name: "Maharashtra Startup Policy 2022 - Financial Support Scheme",
          category: "Funding",
          description: "Direct financial assistance to startups for scaling operations and market expansion.",
          managing_agency: "Maharashtra Department of Industries",
          objectives: "To provide financial support to startups for scaling operations and market expansion.",
          benefits: "Up to ₹50 lakhs for scaling operations, market expansion, and technology development.",
          eligibility: "DPIIT-recognized startups registered in Maharashtra for at least 1 year.",
          funding_details: "Up to ₹50 lakhs per startup",
          official_link: "https://msins.in/",
          state: "Maharashtra",
          sector: "All Sectors",
          scheme_type: "Grant",
          application_deadline: "Annual"
        },
        {
          id: 6,
          name: "Maharashtra Research and Development Policy - Innovation Grant",
          category: "Funding",
          description: "Support for R&D activities and innovation in startups through direct grants.",
          managing_agency: "Maharashtra Department of Higher and Technical Education",
          objectives: "To promote R&D activities and innovation in startups.",
          benefits: "Up to ₹1 crore for R&D projects and innovation activities.",
          eligibility: "Startups with innovative R&D projects, preferably in technology and manufacturing sectors.",
          funding_details: "Up to ₹1 crore for R&D projects",
          official_link: "https://msins.in/",
          state: "Maharashtra",
          sector: "Technology",
          scheme_type: "Grant",
          application_deadline: "Semi-annual"
        },

        // KARNATAKA SCHEMES
        {
          id: 7,
          name: "Karnataka Startup Policy 2022-2027 - Seed Funding",
          category: "Funding",
          description: "Comprehensive seed funding support for early-stage startups with innovative solutions.",
          managing_agency: "Karnataka Department of IT, BT and S&T",
          objectives: "To establish Karnataka as the startup capital of India with world-class infrastructure and support systems.",
          benefits: "Seed funding up to ₹50 lakhs, tax benefits, regulatory support, and infrastructure access.",
          eligibility: "DPIIT-recognized startups registered in Karnataka with innovative business models.",
          funding_details: "Up to ₹50 lakhs for eligible startups",
          official_link: "https://itbtst.karnataka.gov.in/storage/pdf-files/Startup_Policy_2022-27-Kan_Eng.pdf",
          state: "Karnataka",
          sector: "All Sectors",
          scheme_type: "Grant",
          application_deadline: "Ongoing"
        },
        {
          id: 8,
          name: "Karnataka Innovation Authority - Technology Incubation",
          category: "Infrastructure",
          description: "State-of-the-art incubation facilities for technology startups with comprehensive support.",
          managing_agency: "Karnataka Innovation Authority",
          objectives: "To provide world-class incubation facilities and support for technology startups.",
          benefits: "Incubation space, mentoring, networking, funding access, and market support.",
          eligibility: "Technology-focused startups with innovative solutions.",
          funding_details: "Incubation support and funding opportunities",
          official_link: "https://eitbt.karnataka.gov.in/132/technology-business-incubators/en",
          state: "Karnataka",
          sector: "Technology",
          scheme_type: "Incubation",
          application_deadline: "Rolling Basis"
        },
        {
          id: 9,
          name: "Karnataka Biotechnology and Information Technology Services - Biotech Startup Support",
          category: "Funding",
          description: "Specialized support for biotechnology startups including funding and infrastructure.",
          managing_agency: "Karnataka Biotechnology and Information Technology Services",
          objectives: "To promote biotechnology startups and create a biotech innovation ecosystem.",
          benefits: "Up to ₹1 crore for biotech startups, specialized infrastructure, and regulatory support.",
          eligibility: "Biotechnology startups with innovative solutions and strong scientific foundation.",
          funding_details: "Up to ₹1 crore for biotech startups",
          official_link: "https://eitbt.karnataka.gov.in/startup/public/en",
          state: "Karnataka",
          sector: "Healthcare",
          scheme_type: "Grant",
          application_deadline: "Annual"
        },

        // TELANGANA SCHEMES
        {
          id: 10,
          name: "Telangana T-Hub - World's Largest Innovation Campus",
          category: "Infrastructure",
          description: "World-class incubation facility providing comprehensive startup support and ecosystem development.",
          managing_agency: "T-Hub Foundation",
          objectives: "To build the world's largest innovation campus and create a sustainable startup ecosystem.",
          benefits: "State-of-the-art incubation facilities, mentoring, networking, funding access, and global market entry support.",
          eligibility: "Innovative startups across all sectors, preferably technology-focused with global potential.",
          funding_details: "Incubation support and funding opportunities",
          official_link: "https://t-hub.co/",
          state: "Telangana",
          sector: "Technology",
          scheme_type: "Incubation",
          application_deadline: "Rolling Basis"
        },
        {
          id: 11,
          name: "Telangana State Innovation Cell - Innovation Grant",
          category: "Funding",
          description: "Direct grants for innovative startups focusing on solving real-world problems.",
          managing_agency: "Telangana State Innovation Cell",
          objectives: "To support innovative startups solving real-world problems through direct grants.",
          benefits: "Up to ₹25 lakhs for innovative projects, mentoring, and market access support.",
          eligibility: "Startups with innovative solutions addressing real-world problems.",
          funding_details: "Up to ₹25 lakhs for innovative projects",
          official_link: "https://teamtsic.telangana.gov.in/",
          state: "Telangana",
          sector: "All Sectors",
          scheme_type: "Grant",
          application_deadline: "Quarterly"
        },
        {
          id: 12,
          name: "Telangana Life Sciences Policy - Healthcare Startup Support",
          category: "Funding",
          description: "Specialized support for healthcare and life sciences startups.",
          managing_agency: "Telangana Department of Industries",
          objectives: "To promote healthcare and life sciences startups in Telangana.",
          benefits: "Up to ₹2 crores for healthcare startups, specialized infrastructure, and regulatory support.",
          eligibility: "Healthcare and life sciences startups with innovative solutions.",
          funding_details: "Up to ₹2 crores for healthcare startups",
          official_link: "https://cretumadvisory.com/blog/telangana-life-science-policy/#:~:text=The%20Telangana%20Life%20Sciences%20Policy,%2C%20biotechnology%2C%20and%20medical%20technology.",
          state: "Telangana",
          sector: "Healthcare",
          scheme_type: "Grant",
          application_deadline: "Annual"
        },

        // GUJARAT SCHEMES
        {
          id: 13,
          name: "Gujarat Startup Policy 2022-2027 - Financial Assistance",
          category: "Funding",
          description: "Comprehensive startup support with funding, infrastructure, and regulatory facilitation.",
          managing_agency: "Gujarat Industrial Development Corporation",
          objectives: "To create a vibrant startup ecosystem and establish Gujarat as a startup hub.",
          benefits: "Funding up to ₹35 lakhs, infrastructure support, regulatory facilitation, and market access.",
          eligibility: "DPIIT-recognized startups registered in Gujarat with innovative business models.",
          funding_details: "Up to ₹35 lakhs for eligible startups",
          official_link: "https://startup.gujarat.gov.in/policy/startup-policies",
          state: "Gujarat",
          sector: "All Sectors",
          scheme_type: "Grant",
          application_deadline: "Ongoing"
        },
        {
          id: 14,
          name: "Gujarat Innovation Society - Technology Incubation",
          category: "Infrastructure",
          description: "Technology-focused incubation program for startups in Gujarat.",
          managing_agency: "Gujarat Innovation Society",
          objectives: "To provide technology-focused incubation support for startups in Gujarat.",
          benefits: "Incubation space, mentoring, networking, and funding access for technology startups.",
          eligibility: "Technology-focused startups with innovative solutions.",
          funding_details: "Incubation support and funding opportunities",
          official_link: "https://startup.gujarat.gov.in/policy/startup-policies",
          state: "Gujarat",
          sector: "Technology",
          scheme_type: "Incubation",
          application_deadline: "Rolling Basis"
        },
        {
          id: 15,
          name: "Gujarat Agro-Industrial Policy - Agriculture Startup Support",
          category: "Funding",
          description: "Specialized support for agriculture and food processing startups.",
          managing_agency: "Gujarat Department of Agriculture",
          objectives: "To promote agriculture and food processing startups in Gujarat.",
          benefits: "Up to ₹50 lakhs for agriculture startups, specialized infrastructure, and market support.",
          eligibility: "Agriculture and food processing startups with innovative solutions.",
          funding_details: "Up to ₹50 lakhs for agriculture startups",
          official_link: "https://startup.gujarat.gov.in/policy/startup-policies",
          state: "Gujarat",
          sector: "Agriculture",
          scheme_type: "Grant",
          application_deadline: "Annual"
        },

        // TAMIL NADU SCHEMES
        {
          id: 16,
          name: "Tamil Nadu Startup Policy 2023 - Innovation Grant",
          category: "Funding",
          description: "Comprehensive policy framework supporting startups with funding, infrastructure, and regulatory support.",
          managing_agency: "Tamil Nadu Department of Industries",
          objectives: "To establish Tamil Nadu as a leading startup destination with world-class support systems.",
          benefits: "Funding up to ₹30 lakhs, tax benefits, infrastructure support, and regulatory facilitation.",
          eligibility: "DPIIT-recognized startups registered in Tamil Nadu with innovative business models.",
          funding_details: "Up to ₹30 lakhs for eligible startups",
          official_link: "https://spc.tn.gov.in/policy/tamil-nadu-startup-and-innovation-policy-2023/",
          state: "Tamil Nadu",
          sector: "All Sectors",
          scheme_type: "Grant",
          application_deadline: "Ongoing"
        },
        {
          id: 17,
          name: "Tamil Nadu Technology Incubation Program",
          category: "Infrastructure",
          description: "Technology incubation program for startups in Tamil Nadu.",
          managing_agency: "Tamil Nadu Technology Development Corporation",
          objectives: "To provide technology incubation support for startups in Tamil Nadu.",
          benefits: "Incubation space, mentoring, networking, and funding access for technology startups.",
          eligibility: "Technology-focused startups with innovative solutions.",
          funding_details: "Incubation support and funding opportunities",
          official_link: "https://catalyst.startuptn.in/home",
          state: "Tamil Nadu",
          sector: "Technology",
          scheme_type: "Incubation",
          application_deadline: "Rolling Basis"
        },
        {
          id: 18,
          name: "Tamil Nadu Healthcare Innovation Fund",
          category: "Funding",
          description: "Specialized funding for healthcare and medical technology startups.",
          managing_agency: "Tamil Nadu Department of Health",
          objectives: "To promote healthcare and medical technology startups in Tamil Nadu.",
          benefits: "Up to ₹1 crore for healthcare startups, specialized infrastructure, and regulatory support.",
          eligibility: "Healthcare and medical technology startups with innovative solutions.",
          funding_details: "Up to ₹1 crore for healthcare startups",
          official_link: "https://tanii.tn.gov.in/",
          state: "Tamil Nadu",
          sector: "Healthcare",
          scheme_type: "Grant",
          application_deadline: "Annual"
        },

        // DELHI SCHEMES
        {
          id: 19,
          name: "Delhi Startup Policy 2022 - Financial Support",
          category: "Funding",
          description: "Comprehensive startup support with funding, infrastructure, and regulatory facilitation.",
          managing_agency: "Delhi Department of Industries",
          objectives: "To create a vibrant startup ecosystem in the national capital region.",
          benefits: "Funding up to ₹20 lakhs, infrastructure support, regulatory facilitation, and market access.",
          eligibility: "DPIIT-recognized startups registered in Delhi with innovative business models.",
          funding_details: "Up to ₹20 lakhs for eligible startups",
          official_link: "https://www.startupindia.gov.in/srf-2022/reports1/Delhi_UT_Report_09-06-2022.pdf",
          state: "Delhi",
          sector: "All Sectors",
          scheme_type: "Grant",
          application_deadline: "Ongoing"
        },
        {
          id: 20,
          name: "Delhi Technology Incubation Hub",
          category: "Infrastructure",
          description: "Technology incubation hub for startups in Delhi.",
          managing_agency: "Delhi Technology Development Corporation",
          objectives: "To provide technology incubation support for startups in Delhi.",
          benefits: "Incubation space, mentoring, networking, and funding access for technology startups.",
          eligibility: "Technology-focused startups with innovative solutions.",
          funding_details: "Incubation support and funding opportunities",
          official_link: "https://fitt-iitd.in/web/incubation",
          state: "Delhi",
          sector: "Technology",
          scheme_type: "Incubation",
          application_deadline: "Rolling Basis"
        },
        {
          id: 21,
          name: "Delhi FinTech Innovation Fund",
          category: "Funding",
          description: "Specialized funding for FinTech startups in Delhi.",
          managing_agency: "Delhi Department of Finance",
          objectives: "To promote FinTech startups in Delhi.",
          benefits: "Up to ₹50 lakhs for FinTech startups, specialized infrastructure, and regulatory support.",
          eligibility: "FinTech startups with innovative solutions.",
          funding_details: "Up to ₹50 lakhs for FinTech startups",
          official_link: "https://www.startupindia.gov.in/srf-2022/reports1/Delhi_UT_Report_09-06-2022.pdf",
          state: "Delhi",
          sector: "FinTech",
          scheme_type: "Grant",
          application_deadline: "Annual"
        },

        // HARYANA SCHEMES
        {
          id: 22,
          name: "Haryana Startup Policy 2022 - Innovation Support",
          category: "Funding",
          description: "Comprehensive policy framework supporting startups with funding, infrastructure, and regulatory support.",
          managing_agency: "Haryana Department of Industries",
          objectives: "To establish Haryana as a startup-friendly state with comprehensive support systems.",
          benefits: "Funding up to ₹25 lakhs, tax benefits, infrastructure support, and regulatory facilitation.",
          eligibility: "DPIIT-recognized startups registered in Haryana with innovative business models.",
          funding_details: "Up to ₹25 lakhs for eligible startups",
          official_link: "https://startupharyana.gov.in/",
          state: "Haryana",
          sector: "All Sectors",
          scheme_type: "Grant",
          application_deadline: "Ongoing"
        },
        {
          id: 23,
          name: "Haryana Technology Incubation Program",
          category: "Infrastructure",
          description: "Technology incubation program for startups in Haryana.",
          managing_agency: "Haryana Technology Development Corporation",
          objectives: "To provide technology incubation support for startups in Haryana.",
          benefits: "Incubation space, mentoring, networking, and funding access for technology startups.",
          eligibility: "Technology-focused startups with innovative solutions.",
          funding_details: "Incubation support and funding opportunities",
          official_link: "https://startupharyana.gov.in/",
          state: "Haryana",
          sector: "Technology",
          scheme_type: "Incubation",
          application_deadline: "Rolling Basis"
        },
        {
          id: 24,
          name: "Haryana Agriculture Innovation Fund",
          category: "Funding",
          description: "Specialized funding for agriculture and food processing startups.",
          managing_agency: "Haryana Department of Agriculture",
          objectives: "To promote agriculture and food processing startups in Haryana.",
          benefits: "Up to ₹30 lakhs for agriculture startups, specialized infrastructure, and market support.",
          eligibility: "Agriculture and food processing startups with innovative solutions.",
          funding_details: "Up to ₹30 lakhs for agriculture startups",
          official_link: "https://startupharyana.gov.in/",
          state: "Haryana",
          sector: "Agriculture",
          scheme_type: "Grant",
          application_deadline: "Annual"
        },

        // UTTAR PRADESH SCHEMES
        {
          id: 25,
          name: "Uttar Pradesh Startup Policy 2022 - Financial Assistance",
          category: "Funding",
          description: "Comprehensive startup support with funding, infrastructure, and regulatory facilitation.",
          managing_agency: "Uttar Pradesh Department of Industries",
          objectives: "To create a vibrant startup ecosystem in Uttar Pradesh.",
          benefits: "Funding up to ₹40 lakhs, infrastructure support, regulatory facilitation, and market access.",
          eligibility: "DPIIT-recognized startups registered in Uttar Pradesh with innovative business models.",
          funding_details: "Up to ₹40 lakhs for eligible startups",
          official_link: "https://startinup.up.gov.in/wp-content/uploads/2023/01/Startup-Policy-english_091122.pdf",
          state: "Uttar Pradesh",
          sector: "All Sectors",
          scheme_type: "Grant",
          application_deadline: "Ongoing"
        },
        {
          id: 26,
          name: "Uttar Pradesh Technology Incubation Hub",
          category: "Infrastructure",
          description: "Technology incubation hub for startups in Uttar Pradesh.",
          managing_agency: "Uttar Pradesh Technology Development Corporation",
          objectives: "To provide technology incubation support for startups in Uttar Pradesh.",
          benefits: "Incubation space, mentoring, networking, and funding access for technology startups.",
          eligibility: "Technology-focused startups with innovative solutions.",
          funding_details: "Incubation support and funding opportunities",
          official_link: "https://startinup.up.gov.in/state-startup-policy/",
          state: "Uttar Pradesh",
          sector: "Technology",
          scheme_type: "Incubation",
          application_deadline: "Rolling Basis"
        },
        {
          id: 27,
          name: "Uttar Pradesh Manufacturing Innovation Fund",
          category: "Funding",
          description: "Specialized funding for manufacturing and industrial startups.",
          managing_agency: "Uttar Pradesh Department of Industries",
          objectives: "To promote manufacturing and industrial startups in Uttar Pradesh.",
          benefits: "Up to ₹50 lakhs for manufacturing startups, specialized infrastructure, and market support.",
          eligibility: "Manufacturing and industrial startups with innovative solutions.",
          funding_details: "Up to ₹50 lakhs for manufacturing startups",
          official_link: "https://startinup.up.gov.in/state-startup-policy/",
          state: "Uttar Pradesh",
          sector: "Manufacturing",
          scheme_type: "Grant",
          application_deadline: "Annual"
        },

        // RAJASTHAN SCHEMES
        {
          id: 28,
          name: "Rajasthan Startup Policy 2022 - Innovation Support",
          category: "Funding",
          description: "Comprehensive startup support with funding, infrastructure, and regulatory facilitation.",
          managing_agency: "Rajasthan Department of Industries",
          objectives: "To establish Rajasthan as a startup-friendly state with comprehensive support systems.",
          benefits: "Funding up to ₹20 lakhs, infrastructure support, regulatory facilitation, and market access.",
          eligibility: "DPIIT-recognized startups registered in Rajasthan with innovative business models.",
          funding_details: "Up to ₹20 lakhs for eligible startups",
          official_link: "https://istart.rajasthan.gov.in/public/pdf/Rajasthan_Startup_Policy_2022.pdf",
          state: "Rajasthan",
          sector: "All Sectors",
          scheme_type: "Grant",
          application_deadline: "Ongoing"
        },
        {
          id: 29,
          name: "Rajasthan Technology Incubation Program",
          category: "Infrastructure",
          description: "Technology incubation program for startups in Rajasthan.",
          managing_agency: "Rajasthan Technology Development Corporation",
          objectives: "To provide technology incubation support for startups in Rajasthan.",
          benefits: "Incubation space, mentoring, networking, and funding access for technology startups.",
          eligibility: "Technology-focused startups with innovative solutions.",
          funding_details: "Incubation support and funding opportunities",
          official_link: "https://istart.rajasthan.gov.in/public/pdf/Rajasthan_Startup_Policy_2022.pdf",
          state: "Rajasthan",
          sector: "Technology",
          scheme_type: "Incubation",
          application_deadline: "Rolling Basis"
        },
        {
          id: 30,
          name: "Rajasthan Tourism Innovation Fund",
          category: "Funding",
          description: "Specialized funding for tourism and hospitality startups.",
          managing_agency: "Rajasthan Department of Tourism",
          objectives: "To promote tourism and hospitality startups in Rajasthan.",
          benefits: "Up to ₹25 lakhs for tourism startups, specialized infrastructure, and market support.",
          eligibility: "Tourism and hospitality startups with innovative solutions.",
          funding_details: "Up to ₹25 lakhs for tourism startups",
          official_link: "https://istart.rajasthan.gov.in/public/pdf/Rajasthan_Startup_Policy_2022.pdf",
          state: "Rajasthan",
          sector: "Tourism",
          scheme_type: "Grant",
          application_deadline: "Annual"
        }
      ];
      
      // Apply filters if any are selected
      let filteredSchemes = hardcodedSchemes;
      
      if (selectedState) {
        filteredSchemes = filteredSchemes.filter(scheme => scheme.state === selectedState);
      }
      
      if (selectedSector) {
        filteredSchemes = filteredSchemes.filter(scheme => scheme.sector === selectedSector);
      }
      
      if (selectedCategory) {
        filteredSchemes = filteredSchemes.filter(scheme => scheme.category === selectedCategory);
      }
      
      if (selectedSchemeType) {
        filteredSchemes = filteredSchemes.filter(scheme => scheme.scheme_type === selectedSchemeType);
      }
      
      setSchemes(filteredSchemes);
    } catch (err) {
      console.error("❌ Error fetching schemes:", err);
      setSchemes([]);
    }
    setIsLoading(false);
  };

  // --- Toggle handler ---
  const handleToggle = (mode) => {
    setViewMode(mode);
    if (mode === "schemes") fetchSchemes();
    if (mode === "vcs") handleSearch();
  };

  // --- Clear all filters ---
  const clearAllFilters = () => {
    setSelectedState("");
    setSelectedSector("");
    setSelectedCategory("");
    setSelectedSchemeType("");
    fetchSchemes(); // Refresh with no filters
  };

  // --- Auto-apply filters when values change ---
  React.useEffect(() => {
    if (viewMode === "schemes") {
      fetchSchemes();
    }
  }, [selectedState, selectedSector, selectedCategory, selectedSchemeType, viewMode]);

  // handleKeyPress is no longer needed with dropdowns

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 bg-white bg-opacity-20 rounded-full backdrop-blur-sm">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Discover Opportunities
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-6 sm:mb-8 font-light px-2">
            Connect with venture capital partners or explore comprehensive startup schemes
          </p>

          {/* Enhanced Toggle Switch */}
          <div className="flex justify-center w-full px-4">
            <div className="relative bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-1.5 shadow-2xl border border-white border-opacity-30 w-full max-w-sm sm:max-w-md">
              {/* Background Slider */}
              <div 
                className={`absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-lg transition-all duration-500 ease-out ${
                  viewMode === "vcs" 
                    ? "left-1.5 w-[calc(50%-0.375rem)]" 
                    : "left-[calc(50%+0.375rem)] w-[calc(50%-0.375rem)]"
                }`}
              />
              
              {/* VCs Button */}
              <button
                onClick={() => handleToggle("vcs")}
                className={`relative w-1/2 py-3 px-2 sm:px-4 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base z-10 ${
                  viewMode === "vcs"
                    ? "text-blue-600"
                    : "text-black hover:text-blue-100"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Venture Capitalists</span>
                  <span className="sm:hidden">VCs</span>
                </div>
              </button>
              
              {/* Schemes Button */}
              <button
                onClick={() => handleToggle("schemes")}
                className={`relative w-1/2 py-3 px-2 sm:px-4 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base z-10 ${
                  viewMode === "schemes"
                    ? "text-purple-600"
                    : "text-black hover:text-purple-100"
                }`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Startup Schemes</span>
                  <span className="sm:hidden">Schemes</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Enhanced VC Search Filters */}
        {viewMode === "vcs" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 p-4 sm:p-6 lg:p-8 mb-8 sm:mb-12 backdrop-blur-sm">
            <div className="flex items-center mb-6 sm:mb-8">
              <div className="p-2 bg-blue-100 rounded-xl mr-3">
                <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Refine Your Search</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              {/* Enhanced Industry Dropdown */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500" />
                  <span className="hidden sm:inline">Industry Focus</span>
                  <span className="sm:hidden">Industry</span>
                </label>
                <div className="relative">
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-700 group-hover:border-blue-300 appearance-none bg-white cursor-pointer text-sm sm:text-base"
                  >
                    <option value="">Select Industry</option>
                    <option value="AI">AI</option>
                    <option value="FinTech">FinTech</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Blockchain">Blockchain</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-5 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Enhanced Stage Dropdown */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-500" />
                  <span className="hidden sm:inline">Investment Stage</span>
                  <span className="sm:hidden">Stage</span>
                </label>
                <div className="relative">
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 transition-all duration-300 text-gray-700 group-hover:border-green-300 appearance-none bg-white cursor-pointer text-sm sm:text-base"
                  >
                    <option value="">Select Stage</option>
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B">Series B</option>
                    <option value="Series C">Series C</option>
                    <option value="Series D">Series D</option>
                    <option value="Growth">Growth</option>
                    <option value="Late Stage">Late Stage</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-5 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Enhanced Location Dropdown */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500" />
                  Location
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 sm:focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-gray-700 group-hover:border-purple-300 appearance-none bg-white cursor-pointer text-sm sm:text-base"
                  >
                    <option value="">Select Location</option>
                    
                    {/* Indian Cities - Shown First */}
                    <optgroup label="🇮🇳 Indian Cities">
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Pune">Pune</option>
                      <option value="Gurgaon">Gurgaon</option>
                      <option value="Noida">Noida</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Jaipur">Jaipur</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Indore">Indore</option>
                      <option value="Chandigarh">Chandigarh</option>
                      <option value="Lucknow">Lucknow</option>
                      <option value="Bhopal">Bhopal</option>
                    </optgroup>
                    
                    {/* International Cities - Shown Last */}
                    <optgroup label="🌍 International Cities">
                      <option value="San Francisco">San Francisco</option>
                      <option value="New York">New York</option>
                      <option value="London">London</option>
                      <option value="Berlin">Berlin</option>
                      <option value="Paris">Paris</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Tokyo">Tokyo</option>
                      <option value="Austin">Austin</option>
                      <option value="Boston">Boston</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Seattle">Seattle</option>
                      <option value="Toronto">Toronto</option>
                      <option value="Sydney">Sydney</option>
                    </optgroup>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-5 pointer-events-none">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Search Button */}
            <div className="text-center">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full sm:w-auto px-6 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:transform-none flex items-center justify-center mx-auto min-w-48"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                    <span className="text-base sm:text-lg">Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                    <span className="text-base sm:text-lg">Find All Matching VCs</span>
                  </>
                )}
              </button>
              <p className="text-xs sm:text-sm text-gray-500 mt-3 px-2">
                Select industry and location to find all available VCs (all stages included)
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Results Section */}
        <div className="mb-8 sm:mb-12">
          {viewMode === "vcs" ? (
            // Enhanced VC Results
            results.length > 0 ? (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center mb-4 sm:mb-0">
                    <div className="p-2 bg-blue-100 rounded-xl mr-3">
                      <Users className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                    </div>
                    Found {results.length} VCs
                  </h3>
                </div>
                
                {/* Temporary Delete Warning */}
                <div className="mb-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start sm:items-center">
                    <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 sm:mt-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        Temporary Feature: Delete Button Available
                      </p>
                      <p className="text-xs text-yellow-700 mt-1">
                        Use the red delete button on each VC card to remove incorrect data. This feature will be removed in production.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 sm:gap-6 lg:gap-8">
                  {results.map((vc) => (
                    <div
                      key={vc.id}
                      className="group bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-102 transition-all duration-500"
                    >
                      <div className="p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 sm:mb-6">
                          <div className="flex-1">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                              {vc.full_name}
                            </h3>
                            <p className="text-gray-600 text-base sm:text-lg mb-3 sm:mb-4 leading-relaxed">{vc.headline}</p>
                            {vc.location && (
                              <div className="flex items-center text-gray-500 mb-3 sm:mb-4">
                                <div className="p-1 bg-blue-50 rounded-lg mr-2 sm:mr-3">
                                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                                </div>
                                <span className="font-medium text-sm sm:text-base">{vc.location}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col gap-2 sm:gap-3">
                            {vc.profile_url && (
                              <a 
                                href={vc.profile_url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                              >
                                <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                                <span className="hidden sm:inline">View Profile</span>
                                <span className="sm:hidden">Profile</span>
                                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                              </a>
                            )}
                            
                            {/* Temporary Delete Button - Remove in production */}
                            <button
                              onClick={() => deleteVC(vc.id)}
                              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-red-500 text-sm sm:text-base"
                              title="Delete this VC from database (Temporary feature)"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span className="hidden sm:inline">Delete VC</span>
                              <span className="sm:hidden">Delete</span>
                            </button>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-4 sm:pt-6">
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            {vc.industry_focus && (
                              <>
                                <div className="text-sm font-semibold text-gray-600 mb-2 w-full">
                                  <Building2 className="w-4 h-4 inline mr-1" />
                                  Industry Focus:
                                </div>
                                {Array.isArray(vc.industry_focus) 
                                  ? vc.industry_focus.map((ind, idx) => (
                                      <span key={idx} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs sm:text-sm font-medium rounded-full border border-blue-200 hover:bg-blue-200 transition-colors duration-200">{ind}</span>
                                    ))
                                  : <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-xs sm:text-sm font-medium rounded-full border border-blue-200">{vc.industry_focus}</span>
                                }
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : !isLoading && (
              <div className="text-center py-12 sm:py-20">
                <div className="p-4 sm:p-6 bg-blue-50 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  <Search className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Ready to Find VCs?</h3>
                <p className="text-sm sm:text-base text-gray-500 px-4">Use the filters above to discover venture capitalists that match your startup.</p>
              </div>
            )
          ) : (
            // Enhanced Schemes Results
            <>
              {/* Horizontal Filters for Schemes */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                    <Filter className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-600" />
                    Filter Startup Schemes
                  </h3>
                  <button
                    onClick={clearAllFilters}
                    className="px-3 sm:px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 w-full sm:w-auto"
                  >
                    Clear All Filters
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {/* State Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors duration-200"
                    >
                      <option value="">All States</option>
                      <option value="All India">All India</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                    </select>
                  </div>
                  
                  {/* Sector Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sector</label>
                    <select
                      value={selectedSector}
                      onChange={(e) => setSelectedSector(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors duration-200"
                    >
                      <option value="">All Sectors</option>
                      <option value="All Sectors">All Sectors</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="FinTech">FinTech</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Tourism">Tourism</option>
                    </select>
                  </div>
                  
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors duration-200"
                    >
                      <option value="">All Categories</option>
                      <option value="Funding">Funding</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Recognition">Recognition</option>
                      <option value="Policy Support">Policy Support</option>
                    </select>
                  </div>
                  
                  {/* Scheme Type Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Scheme Type</label>
                    <select
                      value={selectedSchemeType}
                      onChange={(e) => setSelectedSchemeType(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors duration-200"
                    >
                      <option value="">All Types</option>
                      <option value="Grant">Grant</option>
                      <option value="Incubation">Incubation</option>
                      <option value="Loan">Loan</option>
                      <option value="Policy Support">Policy Support</option>
                      <option value="Funding">Funding</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 mb-2">
                    Filters are applied automatically as you make selections
                  </p>
                  <p className="text-xs text-gray-400 px-2">
                    💡 Tip: Click on "Visit Official Portal" to access scheme details and application forms
                  </p>
                </div>
              </div>
              
                            {schemes.length > 0 ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center mb-3 sm:mb-2">
                        <div className="p-2 bg-purple-100 rounded-xl mr-3">
                          <Award className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                        </div>
                        Found {schemes.length} Schemes
                      </h3>
                      {/* Filter summary */}
                      {(selectedState || selectedSector || selectedCategory || selectedSchemeType) && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-gray-600">Filters applied:</span>
                          {selectedState && (
                            <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 text-xs sm:text-sm font-medium rounded-full">
                              State: {selectedState}
                            </span>
                          )}
                          {selectedSector && (
                            <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium rounded-full">
                              Sector: {selectedSector}
                            </span>
                          )}
                          {selectedCategory && (
                            <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded-full">
                              Category: {selectedCategory}
                            </span>
                          )}
                          {selectedSchemeType && (
                            <span className="px-2 sm:px-3 py-1 bg-orange-100 text-orange-700 text-xs sm:text-sm font-medium rounded-full">
                              Type: {selectedSchemeType}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                <div className="grid gap-4 sm:gap-6 lg:gap-8">
                  {schemes.map((scheme, index) => {
                    // Category color mapping
                    const categoryColors = {
                      'Recognition': { bg: 'from-blue-500 to-cyan-500', accent: 'blue', icon: Award },
                      'Funding': { bg: 'from-green-500 to-emerald-500', accent: 'green', icon: DollarSign },
                      'Tax & Compliance': { bg: 'from-orange-500 to-amber-500', accent: 'orange', icon: TrendingUp },
                      'Infrastructure': { bg: 'from-purple-500 to-violet-500', accent: 'purple', icon: Building2 },
                      'Global & Market Access': { bg: 'from-pink-500 to-rose-500', accent: 'pink', icon: Globe }
                    };
                    
                    const categoryInfo = categoryColors[scheme.category] || categoryColors['Recognition'];
                    const CategoryIcon = categoryInfo.icon;
                    
                    return (
                      <div
                        key={scheme.id}
                        className="group bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 overflow-hidden transform hover:scale-102 transition-all duration-500"
                      >
                        <div className={`bg-gradient-to-r ${categoryInfo.bg} h-1 sm:h-2`}></div>
                        <div className="p-4 sm:p-6 lg:p-8">
                          {/* Header Section */}
                          <div className="mb-4 sm:mb-6">
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`p-2 bg-${categoryInfo.accent}-100 rounded-xl flex-shrink-0`}>
                                <CategoryIcon className={`w-5 h-5 sm:w-6 sm:h-6 text-${categoryInfo.accent}-600`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-${categoryInfo.accent}-600 transition-colors duration-300 leading-tight mb-2`}>
                                  {scheme.name}
                                </h3>
                                {scheme.category && (
                                  <span className={`inline-block px-2 sm:px-3 py-1 bg-${categoryInfo.accent}-100 text-${categoryInfo.accent}-700 text-xs sm:text-sm font-medium rounded-full`}>
                                    {scheme.category}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-4 leading-relaxed">
                              {scheme.description}
                            </p>
                            
                            {/* Quick Info Grid - Mobile Optimized */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                              {scheme.state && (
                                <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-2">
                                  <MapPin className={`w-4 h-4 text-${categoryInfo.accent}-500 mr-2 flex-shrink-0`} />
                                  <span className="text-xs sm:text-sm font-medium truncate">{scheme.state}</span>
                                </div>
                              )}
                              
                              {scheme.sector && (
                                <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-2">
                                  <Building2 className={`w-4 h-4 text-${categoryInfo.accent}-500 mr-2 flex-shrink-0`} />
                                  <span className="text-xs sm:text-sm font-medium truncate">{scheme.sector}</span>
                                </div>
                              )}
                              
                              {scheme.application_deadline && (
                                <div className="flex items-center text-gray-600 bg-gray-50 rounded-lg p-2">
                                  <Calendar className={`w-4 h-4 text-${categoryInfo.accent}-500 mr-2 flex-shrink-0`} />
                                  <span className="text-xs sm:text-sm font-medium truncate">{scheme.application_deadline}</span>
                                </div>
                              )}
                            </div>
                            
                            {scheme.managing_agency && (
                              <div className="flex items-center text-gray-600 mb-4 bg-blue-50 rounded-lg p-2">
                                <Layers className={`w-4 h-4 text-blue-500 mr-2 flex-shrink-0`} />
                                <span className="text-xs sm:text-sm font-medium">Managing Agency: {scheme.managing_agency}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Objectives Section - Collapsible on Mobile */}
                          {scheme.objectives && (
                            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl sm:rounded-2xl border border-gray-200">
                              <div className="flex items-center mb-2">
                                <TrendingUp className="w-4 h-4 text-gray-600 mr-2" />
                                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Objectives</h4>
                              </div>
                              <p className="text-gray-700 leading-relaxed text-xs sm:text-sm">
                                {scheme.objectives}
                              </p>
                            </div>
                          )}
                          
                          <div className="border-t border-gray-100 pt-4 sm:pt-6">
                            {/* Benefits & Eligibility - Stacked on Mobile */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-green-200">
                                <div className="flex items-center mb-2 sm:mb-3">
                                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3" />
                                  <h4 className="font-bold text-green-800 text-sm sm:text-base lg:text-lg">Benefits</h4>
                                </div>
                                <p className="text-green-700 leading-relaxed text-xs sm:text-sm">
                                  {scheme.benefits || "Comprehensive support for startup growth and development"}
                                </p>
                              </div>
                              
                              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-blue-200">
                                <div className="flex items-center mb-2 sm:mb-3">
                                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 sm:mr-3" />
                                  <h4 className="font-bold text-blue-800 text-sm sm:text-base lg:text-lg">Eligibility</h4>
                                </div>
                                <p className="text-green-700 leading-relaxed text-xs sm:text-sm">
                                  {scheme.eligibility || "Open to qualifying startups and entrepreneurs"}
                                </p>
                              </div>
                            </div>
                            
                            {/* Funding Details - Compact on Mobile */}
                            {scheme.funding_details && scheme.funding_details !== 'Not applicable' && (
                              <div className="mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl sm:rounded-2xl border border-yellow-200">
                                <div className="flex items-center mb-2 sm:mb-3">
                                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2 sm:mr-3" />
                                  <h4 className="font-bold text-yellow-800 text-sm sm:text-base lg:text-lg">Funding Details</h4>
                                </div>
                                <p className="text-yellow-700 leading-relaxed text-xs sm:text-sm">
                                  {scheme.funding_details}
                                </p>
                              </div>
                            )}
                            
                            {/* Action Button - Full Width on Mobile */}
                            <div className="pt-4 sm:pt-6 border-t border-gray-100">
                              {scheme.official_link ? (
                                <a 
                                  href={scheme.official_link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className={`w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 bg-gradient-to-r ${categoryInfo.bg} text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base`}
                                >
                                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                  <span className="hidden sm:inline">Visit Official Portal</span>
                                  <span className="sm:hidden">Visit Portal</span>
                                </a>
                              ) : (
                                <button className={`w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-3 bg-gradient-to-r ${categoryInfo.bg} text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm sm:text-base`}>
                                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                  <span className="hidden sm:inline">Learn More & Apply</span>
                                  <span className="sm:hidden">Learn More</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : !isLoading && (
              <div className="text-center py-12 sm:py-20">
                <div className="p-4 sm:p-6 bg-purple-50 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                  <Layers className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Loading Schemes...</h3>
                <p className="text-sm sm:text-base text-gray-500 px-4">Discovering available startup schemes and programs.</p>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default VCSearch;