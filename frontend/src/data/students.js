export const studentProfiles = [
  {
    id: "student_1",
    name: "Abya Rao",
    email: "abya.rao@example.com",
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
  }
];
