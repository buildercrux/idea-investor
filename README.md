# 🚀 Idea Investor - VC Discovery & Startup Schemes Platform

A comprehensive platform that helps startups discover venture capitalists and explore government schemes. Built with React, Supabase, and modern web technologies.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [How FindVC.jsx Works](#how-findvcjsx-works)
- [Technology Stack](#technology-stack)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## 🌟 Overview

Idea Investor is a platform designed to bridge the gap between startups and venture capitalists. It provides:

- **VC Discovery**: Find venture capitalists based on industry, location, and investment stage
- **Startup Schemes**: Explore government schemes, grants, and support programs
- **Smart Matching**: Intelligent filtering and search capabilities
- **Responsive Design**: Mobile-first approach for all devices

## ✨ Features

### 🎯 VC Discovery
- Industry-based filtering (AI, FinTech, HealthTech, SaaS, Blockchain, D2C, B2B Marketplaces)
- Location-based search (Indian cities prioritized, international cities)
- Investment stage filtering
- Detailed VC profiles with LinkedIn links
- Industry focus tags

### 🏛️ Startup Schemes
- Government schemes from various Indian states
- Multiple filtering options (State, Sector, Category, Scheme Type)
- Comprehensive scheme details (benefits, eligibility, funding)
- Direct links to official portals
- Real-time filtering

### 🎨 User Experience
- Toggle between VC search and Schemes
- Responsive design for all screen sizes
- Modern UI with smooth animations
- Intuitive filtering system
- Real-time search results

## 🏗️ Project Structure

```
idea-investor/
├── frontend/                          # React frontend application
│   ├── src/
│   │   ├── pages/                    # Page components
│   │   │   ├── HomePage.jsx         # Landing page
│   │   │   └── FindVC.jsx          # Main VC/Schemes page
│   │   ├── App.jsx                  # Main app with routing
│   │   └── main.jsx                 # Entry point
│   ├── package.json
│   └── vite.config.js
├── backend_linkedin_scraper/         # Backend scripts
│   ├── script.js                     # VC data import script
│   ├── .env                         # Environment variables
│   └── package.json
└── README.md                         # This file
```

## 🔧 How FindVC.jsx Works

The `FindVC.jsx` component is the core of the application, providing a unified interface for both VC discovery and startup schemes exploration.

### 🎛️ Component Architecture

```jsx
const FindVC = () => {
  // State Management
  const [viewMode, setViewMode] = useState("vcs");        // Toggle between "vcs" and "schemes"
  const [industry, setIndustry] = useState("");           // Selected industry for VC search
  const [location, setLocation] = useState("");           // Selected location for VC search
  const [vcResults, setVcResults] = useState([]);         // VC search results
  const [schemes, setSchemes] = useState([]);             // Scheme search results
  
  // Scheme filter states
  const [selectedState, setSelectedState] = useState("");     // State filter
  const [selectedSector, setSelectedSector] = useState("");  // Sector filter
  const [selectedCategory, setSelectedCategory] = useState(""); // Category filter
  const [selectedSchemeType, setSelectedSchemeType] = useState(""); // Scheme type filter
}
```

### 🔍 VC Search Functionality

```jsx
const handleSearch = async () => {
  setIsLoading(true);
  
  try {
    let query = supabase.from("vcs").select("*");
    
    // Apply industry filter
    if (industry) query = query.contains("industry_focus", [industry]);
    
    // Apply location filter
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
```

**Key Features:**
- **Industry Filtering**: Uses Supabase's `contains` operator to search within `industry_focus` arrays
- **Location Search**: Uses `ilike` for case-insensitive location matching
- **Real-time Results**: Updates UI immediately after search
- **Error Handling**: Graceful fallback for network or database errors

### 🏛️ Schemes Functionality

```jsx
const fetchSchemes = async () => {
  setIsLoading(true);
  try {
    let filteredSchemes = sampleSchemes; // Hardcoded schemes data
    
    // Apply filters
    if (selectedState) {
      filteredSchemes = filteredSchemes.filter(scheme => scheme.state === selectedState);
    }
    
    if (selectedSector) {
      filteredSchemes = filteredSchemes.filter(scheme => scheme.sector === selectedSector);
    }
    
    // Apply other filters...
    
    setSchemes(filteredSchemes);
  } catch (err) {
    console.error("❌ Error fetching schemes:", err);
    setSchemes([]);
  }
  setIsLoading(false);
};
```

**Key Features:**
- **Client-side Filtering**: All filtering happens in the browser for instant results
- **Multiple Filter Types**: State, Sector, Category, and Scheme Type
- **Auto-filtering**: Results update automatically as filters change
- **Comprehensive Data**: Includes benefits, eligibility, funding details, and official links

### 🎨 UI Components

#### Toggle Switch
```jsx
<div className="relative bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-1.5 shadow-2xl">
  {/* Background Slider */}
  <div className={`absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-lg transition-all duration-500 ease-out ${
    viewMode === "vcs" 
      ? "left-1.5 w-[calc(50%-0.375rem)]" 
      : "left-[calc(50%+0.375rem)] w-[calc(50%-0.375rem)]"
  }`} />
  
  {/* VCs Button */}
  <button onClick={() => handleToggle("vcs")}>Venture Capitalists</button>
  
  {/* Schemes Button */}
  <button onClick={() => handleToggle("schemes")}>Startup Schemes</button>
</div>
```

#### Search Filters
- **Industry Dropdown**: Predefined industry options with custom values
- **Location Dropdown**: Organized with Indian cities first, then international
- **Stage Dropdown**: Investment stages from Pre-Seed to Late Stage
- **Scheme Filters**: Multiple dropdowns for comprehensive scheme filtering

#### Results Display
- **VC Cards**: Profile information, location, industry focus, and LinkedIn links
- **Scheme Cards**: Detailed information with benefits, eligibility, and action buttons
- **Responsive Grid**: Adapts to different screen sizes
- **Loading States**: Spinner and placeholder content during searches

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Beautiful, customizable icons
- **React Router**: Client-side routing for SPA

### Backend
- **Supabase**: Open-source Firebase alternative
- **PostgreSQL**: Relational database
- **Node.js**: JavaScript runtime for backend scripts

### Development Tools
- **ESLint**: Code linting and formatting
- **Git**: Version control
- **Environment Variables**: Secure credential management

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend_linkedin_scraper
npm install
```

## 🔐 Environment Variables

### Frontend (.env)
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

**⚠️ Important**: Never commit `.env` files to version control!

## 📱 Usage

### 1. Landing Page
- Visit the home page to learn about the platform
- Click "Get Started" or "Find VCs" to access the main functionality

### 2. VC Search
- Toggle to "Venture Capitalists" mode
- Select industry focus (AI, FinTech, D2C, B2B Marketplaces, etc.)
- Choose location (Indian cities prioritized)
- Click "Find All Matching VCs" to search
- View results with detailed profiles and LinkedIn links

### 3. Startup Schemes
- Toggle to "Startup Schemes" mode
- Use filters to narrow down schemes:
  - **State**: All India, Maharashtra, Karnataka, etc.
  - **Sector**: Technology, Healthcare, Agriculture, etc.
  - **Category**: Funding, Infrastructure
  - **Scheme Type**: Grant, Incubation, Loan
- Click on scheme cards to view details
- Use "Visit Official Portal" to access application forms

## 🔌 API Endpoints

### Supabase Tables

#### `vcs` Table
```sql
CREATE TABLE vcs (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  location TEXT,
  headline TEXT,
  profile_url TEXT,
  email TEXT,
  industry_focus TEXT[],
  stage_focus TEXT[]
);
```

#### Queries Used
- **VC Search**: `supabase.from("vcs").select("*").contains("industry_focus", [industry]).ilike("location", %location%)`
- **Profile Update**: `supabase.from("vcs").update({industry_focus: newArray}).eq("id", vcId)`

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style
- Use functional components with hooks
- Follow React best practices
- Maintain responsive design principles
- Add proper error handling
- Include loading states

### Testing
- Test on multiple screen sizes
- Verify all filters work correctly
- Ensure error handling works
- Test with different data scenarios

## 📊 Performance Considerations

### Frontend Optimization
- **Lazy Loading**: Components load only when needed
- **Memoization**: Use React.memo for expensive components
- **Debounced Search**: Prevent excessive API calls
- **Virtual Scrolling**: For large result sets

### Backend Optimization
- **Database Indexing**: On frequently searched fields
- **Query Optimization**: Efficient Supabase queries
- **Caching**: Implement Redis for frequently accessed data

## 🔒 Security Features

- **Environment Variables**: Sensitive data not in source code
- **Supabase RLS**: Row Level Security for data access
- **Input Validation**: Sanitize user inputs
- **HTTPS**: Secure communication protocols

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend Deployment
```bash
# Set environment variables in your deployment platform
# Run script.js as needed for data updates
```

## 📈 Future Enhancements

- [ ] **AI-Powered Matching**: Machine learning for better VC-startup matching
- [ ] **Real-time Chat**: Direct communication between startups and VCs
- [ ] **Analytics Dashboard**: Insights and metrics for users
- [ ] **Mobile App**: Native mobile applications
- [ ] **Integration APIs**: Connect with other startup platforms
- [ ] **Advanced Filters**: More sophisticated search capabilities

## 📞 Support

For questions, issues, or contributions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the startup ecosystem**
