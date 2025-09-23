// Mock data for mentors
export const mockMentors = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Senior Software Engineer",
    company: "Tech Corp",
    status: "available",
    bio: "Passionate about mentoring students and helping them navigate their career journey in tech.",
    rating: 4.8,
    sessions: 25,
    experience: "4+ years",
    domains: ["Software Engineering", "Web Development"],
    skills: ["React", "Node.js", "AWS", "Leadership"],
    image: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "Mike Johnson",
    role: "Lead Data Scientist",
    company: "Data Solutions",
    status: "available",
    bio: "Helping students break into data science with practical insights and industry knowledge.",
    rating: 4.9,
    sessions: 32,
    experience: "6+ years",
    domains: ["Data Science", "Machine Learning"],
    skills: ["Python", "TensorFlow", "SQL", "Statistics"],
    image: "/api/placeholder/100/100"
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Product Manager",
    company: "Innovate Inc",
    status: "available",
    bio: "Guiding students through product management careers with real-world case studies and frameworks.",
    rating: 4.7,
    sessions: 18,
    experience: "5+ years",
    domains: ["Product Management", "UX Design"],
    skills: ["Agile", "User Research", "Prototyping", "Analytics"],
    image: "/api/placeholder/100/100"
  },
  {
    id: 4,
    name: "Robert Chen",
    role: "DevOps Engineer",
    company: "Cloud Systems",
    status: "busy",
    bio: "Specializing in cloud infrastructure and automation. Helping students master modern deployment practices.",
    rating: 4.6,
    sessions: 15,
    experience: "7+ years",
    domains: ["DevOps", "Cloud Computing"],
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    image: "/api/placeholder/100/100"
  },
  {
    id: 5,
    name: "Priya Sharma",
    role: "UX Designer",
    company: "Design Studio",
    status: "available",
    bio: "Passionate about user-centered design and helping students build impactful design portfolios.",
    rating: 4.9,
    sessions: 22,
    experience: "6+ years",
    domains: ["UX Design", "UI Design"],
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    image: "/api/placeholder/100/100"
  }
];

// Mock data for resources
export const mockResources = [
  {
    id: 1,
    title: "Complete React Developer Guide",
    author: "Tech Academy",
    type: "course",
    description: "Comprehensive course covering React fundamentals to advanced concepts.",
    rating: 4.7,
    date: "about 1 month ago",
    categories: ["Web Development", "React", "JavaScript", "Frontend"],
    image: "/api/placeholder/100/100"
  },
  {
    id: 2,
    title: "Machine Learning Interview Prep",
    author: "Jane Doe",
    type: "article",
    description: "Essential questions and concepts for ML engineering interviews.",
    rating: 4.5,
    date: "15 days ago",
    categories: ["Career Guidance", "Machine Learning", "Interview", "Career"],
    image: "/api/placeholder/100/100"
  },
  {
    id: 3,
    title: "Building Scalable Microservices",
    author: "Mike Johnson",
    type: "ebook",
    description: "Architectural patterns and best practices for designing microservices.",
    rating: 4.8,
    date: "3 days ago",
    categories: ["Backend", "Architecture", "DevOps", "Cloud"],
    image: "/api/placeholder/100/100"
  },
  {
    id: 4,
    title: "UX Design Portfolio Tips",
    author: "Priya Sharma",
    type: "video",
    description: "How to create a compelling UX design portfolio that gets you noticed.",
    rating: 4.6,
    date: "1 week ago",
    categories: ["UX Design", "Portfolio", "Career", "Design"],
    image: "/api/placeholder/100/100"
  },
  {
    id: 5,
    title: "Data Science Career Roadmap",
    author: "Robert Chen",
    type: "guide",
    description: "Step-by-step guide to building a career in data science from zero to hero.",
    rating: 4.9,
    date: "2 weeks ago",
    categories: ["Data Science", "Career", "Learning Path", "Analytics"],
    image: "/api/placeholder/100/100"
  },
  {
    id: 6,
    title: "Product Management Fundamentals",
    author: "Sarah Williams",
    type: "course",
    description: "Master the core skills needed to excel in product management roles.",
    rating: 4.7,
    date: "5 days ago",
    categories: ["Product Management", "Strategy", "Leadership", "Business"],
    image: "/api/placeholder/100/100"
  }
];

// Mock data for startups
export const mockStartups = [
  {
    id: 1,
    name: "EcoTech Solutions",
    description: "Sustainable technology solutions for environmental challenges.",
    industry: "CleanTech",
    stage: "growth",
    logo: "/api/placeholder/100/100"
  },
  {
    id: 2,
    name: "HealthAI Innovations",
    description: "AI-powered healthcare solutions for early disease detection.",
    industry: "HealthTech",
    stage: "seed",
    logo: "/api/placeholder/100/100"
  },
  {
    id: 3,
    name: "FinEdge Technologies",
    description: "Fintech solutions for underbanked populations in emerging markets.",
    industry: "FinTech",
    stage: "series-a",
    logo: "/api/placeholder/100/100"
  },
  {
    id: 4,
    name: "EduFuture",
    description: "Personalized learning platform using adaptive AI technologies.",
    industry: "EdTech",
    stage: "series-b",
    logo: "/api/placeholder/100/100"
  },
  {
    id: 5,
    name: "LogiChain",
    description: "Supply chain optimization using blockchain and IoT technologies.",
    industry: "Logistics",
    stage: "seed",
    logo: "/api/placeholder/100/100"
  },
  {
    id: 6,
    name: "AgriSmart",
    description: "Precision agriculture solutions using satellite data and machine learning.",
    industry: "AgriTech",
    stage: "growth",
    logo: "/api/placeholder/100/100"
  }
];

// Mock data for projects
export const mockProjects = [
  {
    id: 1,
    title: "Alumni Network Mobile App",
    description: "React Native app for the alumni network platform with offline capabilities.",
    technologies: ["React Native", "TypeScript", "Firebase", "Redux"],
    teamSize: 5,
    currentMembers: 3,
    difficulty: "Intermediate",
    category: "Mobile Development",
    image: "/api/placeholder/100/100"
  },
  {
    id: 2,
    title: "AI Resume Analyzer",
    description: "Machine learning model to analyze resumes and provide optimization suggestions.",
    technologies: ["Python", "TensorFlow", "NLP", "Flask"],
    teamSize: 4,
    currentMembers: 2,
    difficulty: "Advanced",
    category: "AI/ML",
    image: "/api/placeholder/100/100"
  },
  {
    id: 3,
    title: "Campus Event Platform",
    description: "Full-stack platform for managing and promoting campus events with real-time updates.",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    teamSize: 6,
    currentMembers: 4,
    difficulty: "Intermediate",
    category: "Web Development",
    image: "/api/placeholder/100/100"
  },
  {
    id: 4,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for visualizing complex datasets with customizable charts.",
    technologies: ["D3.js", "Vue.js", "Express", "PostgreSQL"],
    teamSize: 3,
    currentMembers: 1,
    difficulty: "Intermediate",
    category: "Data Visualization",
    image: "/api/placeholder/100/100"
  },
  {
    id: 5,
    title: "Sustainable City Planner",
    description: "Urban planning tool using GIS data to optimize city infrastructure for sustainability.",
    technologies: ["Python", "PostGIS", "Leaflet", "Django"],
    teamSize: 5,
    currentMembers: 3,
    difficulty: "Advanced",
    category: "GIS",
    image: "/api/placeholder/100/100"
  },
  {
    id: 6,
    title: "Blockchain Voting System",
    description: "Secure and transparent voting system using blockchain technology for student elections.",
    technologies: ["Solidity", "Ethereum", "React", "Web3.js"],
    teamSize: 4,
    currentMembers: 2,
    difficulty: "Advanced",
    category: "Blockchain",
    image: "/api/placeholder/100/100"
  }
];