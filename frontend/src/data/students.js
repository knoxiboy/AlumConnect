export const studentProfiles = [
  {
    id: "student_1",
    name: "Saurav",
    email: "saurav@example.com",
    studentId: "19BCE1234",
    year: "Final Year",
    degree: "B.Tech Computer Science",
    specialization: "Artificial Intelligence",
    cgpa: "8.9",
    location: "Guna, Madhya Pradesh",
    bio: "Final year CS student passionate about AI/ML and web development. Looking for internship opportunities in tech companies.",
    skills: ["Python", "Machine Learning", "React", "Django", "SQL"],
    interests: ["AI/ML", "Web Development", "Data Science", "Competitive Programming"],
    profileImage: "/api/placeholder/150/150",
    projects: [
      {
        title: "Smart Traffic Management System",
        description: "AI-powered system to optimize traffic flow using computer vision",
        technologies: ["Python", "OpenCV", "TensorFlow", "Flask"],
        githubLink: "https://github.com/neha/traffic-system"
      },
      {
        title: "E-commerce Website",
        description: "Full-stack e-commerce platform with payment integration", 
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        githubLink: "https://github.com/neha/ecommerce-app"
      }
    ],
    achievements: [
      "Winner - Smart India Hackathon 2024",
      "Published research paper on ML algorithms",
      "Google Code-in Finalist 2023"
    ],
    internships: [
      {
        company: "TCS",
        role: "Software Development Intern",
        duration: "Summer 2024",
        description: "Worked on web application development using React and Spring Boot"
      }
    ],
    lookingFor: ["Full-time opportunities", "Mentorship", "Internships"],
    graduationDate: "May 2025"
  },
  {
    id: "student_2", 
    name: "Ishaan Mehta",
    email: "ishaan.mehta@example.com",
    studentId: "21BCE0456",
    year: "Third Year",
    degree: "B.Tech Electronics",
    specialization: "VLSI Design",
    cgpa: "8.5",
    location: "Guna, Madhya Pradesh",
    bio: "Electronics engineering student with passion for hardware design and embedded systems. Interested in IoT and robotics applications.",
    skills: ["Verilog", "VHDL", "Embedded C", "Arduino", "PCB Design"],
    interests: ["VLSI Design", "IoT", "Robotics", "Embedded Systems"],
    profileImage: "/api/placeholder/150/150", 
    projects: [
      {
        title: "IoT-based Smart Home System",
        description: "Complete home automation system using ESP32 and mobile app",
        technologies: ["Arduino", "ESP32", "Flutter", "Firebase"],
        githubLink: "https://github.com/ishaan/smart-home"
      },
      {
        title: "RISC-V Processor Design",
        description: "32-bit RISC-V processor implementation in Verilog",
        technologies: ["Verilog", "Xilinx Vivado", "FPGA"],
        githubLink: "https://github.com/ishaan/riscv-processor"
      }
    ],
    achievements: [
      "1st Prize - National Level Project Competition",
      "IEEE Student Member",
      "Participated in Google Summer of Code"
    ],
    internships: [],
    lookingFor: ["Internships", "Research opportunities", "Mentorship"],
    graduationDate: "May 2026"
  },
  {
  id: "student_3",
  name: "Ritika Sharma",
  email: "ritika.sharma@example.com",
  studentId: "20BIT1023",
  year: "3rd Year",
  degree: "B.Tech Information Technology",
  specialization: "Cybersecurity",
  cgpa: "9.1",
  location: "Pune, Maharashtra",
  bio: "Enthusiastic IT student exploring ethical hacking and network security. Passionate about building secure systems.",
  skills: ["C++", "Python", "Linux", "Networking", "Kali Linux"],
  interests: ["Cybersecurity", "Bug Bounty", "Ethical Hacking", "IoT Security"],
  profileImage: "/api/placeholder/150/150",
  projects: [
    {
      title: "Network Intrusion Detection System",
      description: "Implemented a system to detect suspicious activities in real-time using ML.",
      technologies: ["Python", "Scikit-learn", "Wireshark"],
      githubLink: "https://github.com/ritika/nids"
    },
    {
      title: "Secure Chat Application",
      description: "Encrypted messaging app with end-to-end security protocols.",
      technologies: ["Java", "Spring Boot", "AES Encryption"],
      githubLink: "https://github.com/ritika/secure-chat"
    }
  ],
  achievements: [
    "1st Place - Cybersecurity Hackathon 2024",
    "Certified Ethical Hacker (CEH)",
    "Internship at Indian Cyber Cell"
  ],
  internships: [
    {
      company: "Infosys",
      role: "Cybersecurity Intern",
      duration: "Winter 2024",
      description: "Worked on penetration testing and vulnerability assessments."
    }
  ],
  lookingFor: ["Internships", "Research Collaborations"],
  graduationDate: "May 2026"
},
{
  id: "student_4",
  name: "Aditya Verma",
  email: "aditya.verma@example.com",
  studentId: "21BCE2341",
  year: "2nd Year",
  degree: "B.Tech Computer Science",
  specialization: "Data Science",
  cgpa: "8.5",
  location: "Lucknow, Uttar Pradesh",
  bio: "Second-year CS student interested in analytics and predictive modeling. Loves Kaggle competitions.",
  skills: ["Python", "R", "Pandas", "SQL", "TensorFlow"],
  interests: ["Data Science", "Business Analytics", "Statistics"],
  profileImage: "/api/placeholder/150/150",
  projects: [
    {
      title: "Stock Price Prediction",
      description: "Time-series prediction of stock market trends using LSTMs.",
      technologies: ["Python", "TensorFlow", "Matplotlib"],
      githubLink: "https://github.com/aditya/stock-predict"
    },
    {
      title: "Covid-19 Data Dashboard",
      description: "Interactive visualization of global Covid trends.",
      technologies: ["R", "Shiny", "Plotly"],
      githubLink: "https://github.com/aditya/covid-dashboard"
    }
  ],
  achievements: [
    "Top 10 - Kaggle Student Competition 2024",
    "Data Science Society Core Member"
  ],
  internships: [],
  lookingFor: ["Data Science Internships", "Hackathons"],
  graduationDate: "May 2027"
},
{
  id: "student_5",
  name: "Priya Nair",
  email: "priya.nair@example.com",
  studentId: "19ECE3321",
  year: "Final Year",
  degree: "B.Tech Electronics and Communication",
  specialization: "IoT",
  cgpa: "8.7",
  location: "Kochi, Kerala",
  bio: "Electronics enthusiast working on IoT and embedded systems. Keen on developing smart devices.",
  skills: ["Arduino", "Raspberry Pi", "C", "Python", "IoT Protocols"],
  interests: ["IoT", "Embedded Systems", "Robotics"],
  profileImage: "/api/placeholder/150/150",
  projects: [
    {
      title: "Smart Home Automation",
      description: "Developed a system to control appliances using IoT sensors and mobile app.",
      technologies: ["Arduino", "Firebase", "Flutter"],
      githubLink: "https://github.com/priya/smart-home"
    },
    {
      title: "Health Monitoring Wearable",
      description: "Wearable device to track vitals and send alerts.",
      technologies: ["Raspberry Pi", "Python", "Bluetooth"],
      githubLink: "https://github.com/priya/health-wearable"
    }
  ],
  achievements: [
    "Best IoT Project Award - TechFest 2024",
    "Internship at Bosch IoT Lab"
  ],
  internships: [
    {
      company: "Bosch",
      role: "IoT Intern",
      duration: "Summer 2024",
      description: "Worked on prototype design of smart industrial sensors."
    }
  ],
  lookingFor: ["Full-time IoT roles", "Mentorship"],
  graduationDate: "May 2025"
},
{
  id: "student_6",
  name: "Arjun Mehta",
  email: "arjun.mehta@example.com",
  studentId: "22BBA5678",
  year: "1st Year",
  degree: "BBA",
  specialization: "Marketing",
  cgpa: "8.0",
  location: "Ahmedabad, Gujarat",
  bio: "Business student fascinated with digital marketing and brand management. Exploring internships to gain industry exposure.",
  skills: ["SEO", "Content Writing", "MS Excel", "Google Analytics"],
  interests: ["Digital Marketing", "Entrepreneurship", "Public Speaking"],
  profileImage: "/api/placeholder/150/150",
  projects: [
    {
      title: "Social Media Campaign Analysis",
      description: "Analyzed ad campaigns of top brands and provided insights.",
      technologies: ["Google Analytics", "Excel"],
      githubLink: "https://github.com/arjun/social-campaign"
    }
  ],
  achievements: [
    "Winner - Inter-college Debate 2024"
  ],
  internships: [],
  lookingFor: ["Marketing Internships", "Networking Opportunities"],
  graduationDate: "May 2028"
},
{
  id: "student_7",
  name: "Megha Kapoor",
  email: "megha.kapoor@example.com",
  studentId: "20BDS9091",
  year: "3rd Year",
  degree: "B.Des",
  specialization: "UI/UX Design",
  cgpa: "9.0",
  location: "Delhi, India",
  bio: "Creative design student skilled in user-centered design. Passionate about building intuitive products.",
  skills: ["Figma", "Adobe XD", "Sketch", "HTML", "CSS"],
  interests: ["UI/UX", "Graphic Design", "Product Design"],
  profileImage: "/api/placeholder/150/150",
  projects: [
    {
      title: "E-learning App Redesign",
      description: "Redesigned user experience for an online learning platform.",
      technologies: ["Figma", "Adobe XD"],
      githubLink: "https://github.com/megha/elearning-redesign"
    },
    {
      title: "Travel Booking Website",
      description: "Designed intuitive UI for travel website with responsive features.",
      technologies: ["Sketch", "CSS"],
      githubLink: "https://github.com/megha/travel-ui"
    }
  ],
  achievements: [
    "Winner - National Design Challenge 2024",
    "Internship with Zomato Design Team"
  ],
  internships: [
    {
      company: "Zomato",
      role: "UI/UX Design Intern",
      duration: "Summer 2024",
      description: "Worked on improving the user journey for Zomato Gold app."
    }
  ],
  lookingFor: ["Design Internships", "Full-time UI/UX roles"],
  graduationDate: "May 2026"
},
{
  id: "student_8",
  name: "Rahul Khanna",
  email: "rahul.khanna@example.com",
  studentId: "19BME8765",
  year: "Final Year",
  degree: "B.Tech Mechanical Engineering",
  specialization: "Automotive Engineering",
  cgpa: "8.3",
  location: "Indore, Madhya Pradesh",
  bio: "Mechanical engineering student passionate about automotive design and manufacturing processes.",
  skills: ["AutoCAD", "SolidWorks", "MATLAB", "ANSYS"],
  interests: ["Automobiles", "CAD Design", "Robotics"],
  profileImage: "/api/placeholder/150/150",
  projects: [
    {
      title: "Electric Vehicle Prototype",
      description: "Built a working prototype of a low-cost electric bike.",
      technologies: ["SolidWorks", "Lithium Battery Tech"],
      githubLink: "https://github.com/rahul/ev-bike"
    },
    {
      title: "3D Printed Engine Parts",
      description: "Designed and fabricated lightweight engine parts using 3D printing.",
      technologies: ["AutoCAD", "3D Printing"],
      githubLink: "https://github.com/rahul/3d-engine"
    }
  ],
  achievements: [
    "Finalist - SAE India Baja 2024",
    "Research paper on Electric Mobility Solutions"
  ],
  internships: [
    {
      company: "Mahindra & Mahindra",
      role: "Automotive Intern",
      duration: "Winter 2024",
      description: "Worked on design improvements in EV transmission systems."
    }
  ],
  lookingFor: ["Full-time Mechanical/Automotive roles"],
  graduationDate: "May 2025"
}

];
