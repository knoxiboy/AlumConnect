const colleges = [
  // Jaypee Universities (User's Background)
  {
    id: "juet-guna",
    name: "Jaypee University of Engineering and Technology, Guna",
    desc: "A leading private university in Madhya Pradesh known for engineering excellence and innovation, established by Jaypee Group.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1974&auto=format&fit=crop", // Engineering campus
    location: "Guna, Madhya Pradesh",
    established: 2010,
    type: "university",
    alumniCount: "8,500+",
    rating: 4.2
  },
  {
    id: "jiit-noida",
    name: "Jaypee Institute of Information Technology, Noida",
    desc: "Premier private deemed university specializing in engineering, management and applied sciences with strong industry connections.",
    image: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=1974&auto=format&fit=crop", // Modern university campus
    location: "Noida, Uttar Pradesh",
    established: 2001,
    type: "institute",
    alumniCount: "15,000+",
    rating: 4.3
  },
  {
    id: "juit-solan",
    name: "Jaypee University of Information Technology, Solan",
    desc: "Scenic hill university in Himachal Pradesh offering world-class education in technology and applied sciences.",
    image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=1974&auto=format&fit=crop", // University in hills
    location: "Solan, Himachal Pradesh",
    established: 2002,
    type: "university",
    alumniCount: "12,000+",
    rating: 4.1
  },

  // Premier Engineering & Technology Institutes
  {
    id: "bits-pilani",
    name: "Birla Institute of Technology and Science, Pilani",
    desc: "Renowned private deemed university in engineering and sciences with multiple campuses across India.",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1974&auto=format&fit=crop", // University entrance gate
    location: "Pilani, Rajasthan",
    established: 1964,
    type: "institute",
    alumniCount: "45,000+",
    rating: 4.6
  },
  {
    id: "nit-trichy",
    name: "National Institute of Technology, Tiruchirappalli",
    desc: "Top-tier government engineering institute known for academic excellence and research contributions.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1974&auto=format&fit=crop", // Modern technical building
    location: "Tiruchirappalli, Tamil Nadu",
    established: 1964,
    type: "institute",
    alumniCount: "35,000+",
    rating: 4.5
  },
  {
    id: "vit-vellore",
    name: "Vellore Institute of Technology",
    desc: "Leading private university offering diverse programs in engineering, management, and applied sciences.",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop", // Large university campus
    location: "Vellore, Tamil Nadu",
    established: 1984,
    type: "university",
    alumniCount: "40,000+",
    rating: 4.3
  },

  // Management & Business Schools
  {
    id: "iim-bangalore",
    name: "Indian Institute of Management, Bangalore",
    desc: "Premier management school in Asia, located in India's Silicon Valley with excellent industry connections.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1974&auto=format&fit=crop", // Business school building
    location: "Bangalore, Karnataka",
    established: 1973,
    type: "institute",
    alumniCount: "20,000+",
    rating: 4.9
  },
  {
    id: "iim-ahmedabad",
    name: "Indian Institute of Management, Ahmedabad",
    desc: "India's first IIM and a globally recognized business school known for its rigorous academic programs.",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop", // Management institute
    location: "Ahmedabad, Gujarat",
    established: 1961,
    type: "institute",
    alumniCount: "25,000+",
    rating: 4.9
  },

  // Medical Institutions
  {
    id: "aiims-delhi",
    name: "All India Institute of Medical Sciences, Delhi",
    desc: "Premier medical college and research university, globally recognized for healthcare education and innovation.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=1974&auto=format&fit=crop", // Hospital/medical college building
    location: "New Delhi, Delhi",
    established: 1956,
    type: "institute",
    alumniCount: "30,000+",
    rating: 4.7
  },
  {
    id: "cmc-vellore",
    name: "Christian Medical College, Vellore",
    desc: "Prestigious private medical college known for excellence in medical education, research, and healthcare.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1974&auto=format&fit=crop", // Medical college building
    location: "Vellore, Tamil Nadu",
    established: 1900,
    type: "college",
    alumniCount: "28,000+",
    rating: 4.6
  },

  // Central Universities
  {
    id: "du",
    name: "University of Delhi",
    desc: "Premier central university offering diverse undergraduate and postgraduate programs across multiple disciplines.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1974&auto=format&fit=crop", // Classic university architecture
    location: "New Delhi, Delhi",
    established: 1922,
    type: "university",
    alumniCount: "500,000+",
    rating: 4.4
  },
  {
    id: "jnu-delhi",
    name: "Jawaharlal Nehru University, Delhi",
    desc: "Renowned public university known for social sciences, languages, and research excellence.",
    image: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?q=80&w=1974&auto=format&fit=crop", // University campus with greenery
    location: "New Delhi, Delhi",
    established: 1969,
    type: "university",
    alumniCount: "150,000+",
    rating: 4.5
  },

  // State Universities & Colleges
  {
    id: "anna-university",
    name: "Anna University, Chennai",
    desc: "Leading state technical university in Tamil Nadu, known for engineering and technology programs.",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1974&auto=format&fit=crop", // Technical university
    location: "Chennai, Tamil Nadu",
    established: 1978,
    type: "university",
    alumniCount: "300,000+",
    rating: 4.2
  },
  {
    id: "pune-university",
    name: "University of Pune (Savitribai Phule Pune University)",
    desc: "Major state university in Maharashtra offering diverse academic programs and research opportunities.",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1974&auto=format&fit=crop", // Large university campus
    location: "Pune, Maharashtra",
    established: 1949,
    type: "university",
    alumniCount: "400,000+",
    rating: 4.1
  },

  // Private Universities
  {
    id: "manipal-university",
    name: "Manipal Academy of Higher Education",
    desc: "Multi-disciplinary private university with global presence, known for medical, engineering, and management programs.",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop", // University building
    location: "Manipal, Karnataka",
    established: 1953,
    type: "university",
    alumniCount: "200,000+",
    rating: 4.3
  },
  {
    id: "amity-university",
    name: "Amity University, Noida",
    desc: "Leading private university offering comprehensive education across multiple disciplines with modern infrastructure.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1974&auto=format&fit=crop", // Modern university campus
    location: "Noida, Uttar Pradesh",
    established: 2005,
    type: "university",
    alumniCount: "100,000+",
    rating: 4.0
  },

  // Regional Excellence
  {
    id: "jadavpur-university",
    name: "Jadavpur University, Kolkata",
    desc: "Prestigious state university in West Bengal, renowned for engineering, arts, and sciences programs.",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1974&auto=format&fit=crop", // University entrance
    location: "Kolkata, West Bengal",
    established: 1955,
    type: "university",
    alumniCount: "180,000+",
    rating: 4.4
  },
  {
    id: "iiit-hyderabad",
    name: "International Institute of Information Technology, Hyderabad",
    desc: "Premier research-focused institute specializing in information technology and computer sciences.",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1974&auto=format&fit=crop", // IT institute building
    location: "Hyderabad, Telangana",
    established: 1998,
    type: "institute",
    alumniCount: "12,000+",
    rating: 4.6
  },

  // Emerging Universities
  {
    id: "bennett-university",
    name: "Bennett University, Greater Noida",
    desc: "Modern private university by The Times Group, focusing on innovation and industry-ready education.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1974&auto=format&fit=crop", // Modern university building
    location: "Greater Noida, Uttar Pradesh",
    established: 2016,
    type: "university",
    alumniCount: "5,000+",
    rating: 4.1
  },
  {
    id: "shiv-nadar-university",
    name: "Shiv Nadar University, Delhi NCR",
    desc: "Research-intensive multidisciplinary university committed to academic excellence and innovation.",
    image: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?q=80&w=1974&auto=format&fit=crop", // University with landscape
    location: "Greater Noida, Uttar Pradesh",
    established: 2011,
    type: "university",
    alumniCount: "8,000+",
    rating: 4.2
  }
];

export default colleges;
