const colleges = [
  //Srm Universities
  {
    id: "srm-ap",
    name: "SRM University, Andhra Pradesh",
    desc: "A prominent private university offering diverse programs in engineering, management, and sciences with a focus on research and innovation.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/SRM_University_board_and_Entry_of_SRM_University_Amaravati.jpg/640px-SRM_University_board_and_Entry_of_SRM_University_Amaravati.jpg",
    location: "Amaravati, Andhra Pradesh",
    established: 2017,
    type: "university",
    alumniCount: "5,000+",
    rating: 4.5,
    url: "https://srmap.edu.in/"
    },
  {
    id: "srm-ktr",
    name: "SRM Institute of Science and Technology, Kattankulathur",
    desc: "The flagship campus of SRMIST near Chennai, offering a wide range of programs in engineering, medicine, management, law, and sciences with strong global collaborations.",
    image: "https://img.collegepravesh.com/2021/03/SRM-University.jpg",
    location: "Kattankulathur, Tamil Nadu",
    established: 1985,
    type: "university",
    alumniCount: "1,00,000+",
    rating: 4.7,
    url: "https://www.srmist.edu.in/"
  },
  {
    id: "srm-ramapuram",
    name: "SRM Institute of Science and Technology, Ramapuram",
    desc: "A constituent campus of SRMIST in Chennai known for programs in engineering, management, dental sciences, and architecture with a focus on urban innovation.",
    image: "https://media.licdn.com/dms/image/v2/C561BAQHMjapoDg0RZw/company-background_10000/company-background_10000/0/1594792726610/srm_ramapuram_campus_chennai_cover?e=2147483647&v=beta&t=tjMVnCPQBjzml3oVjlLZsN-oysccYl9EHRA9qADJ6VQ",
    location: "Ramapuram, Chennai, Tamil Nadu",
    established: 2002,
    type: "university",
    alumniCount: "20,000+",
    rating: 4.3,
    url:"https://srmrmp.edu.in/"
  },
  {
    id: "srm-vadapalani",
    name: "SRM Institute of Science and Technology, Vadapalani",
    desc: "A city campus of SRMIST situated in Chennai, offering programs in engineering, management, science, and humanities with strong industry linkages.",
    image: "https://images.shiksha.com/mediadata/images/1531829743phpBEOidp.jpeg",
    location: "Vadapalani, Chennai, Tamil Nadu",
    established: 2011,
    type: "university",
    alumniCount: "10,000+",
    rating: 4.2,
    url: "//srmistvdp.edu.in"
  },
  {
    id: "srm-ncr",
    name: "SRM Institute of Science and Technology, NCR Campus",
    desc: "SRMIST’s campus in Delhi-NCR region offering programs in engineering, management, law, and commerce with a metropolitan advantage.",
    image: "https://www.srmup.in/images/campus_srm.jpg",
    location: "Modinagar, Ghaziabad, Uttar Pradesh",
    established: 1997,
    type: "university",
    alumniCount: "30,000+",
    rating: 4.4,
    url: "https://www.srmup.in/"
  },
  {
    id: "srm-haryana",
    name: "SRM University, Haryana",
    desc: "A private university in Haryana focusing on multidisciplinary education and research with programs across engineering, law, management, and sciences.",
    image: "https://srmuniversity.ac.in/admissions/international/img/slides/slide-3.webp",
    location: "Sonipat, Haryana",
    established: 2013,
    type: "university",
    alumniCount: "8,000+",
    rating: 4.1,
    url: "https://www.srmuniversity.ac.in/"
  },
  {
    id: "srm-sikkim",
    name: "SRM University, Sikkim",
    desc: "A private university situated in the northeast, offering programs in management, hospitality, IT, and social sciences with a focus on regional development.",
    image: "https://image-static.collegedunia.com/public/college_data/images/campusimage/1506507591Capture.JPG",
    location: "Gangtok, Sikkim",
    established: 2013,
    type: "university",
    alumniCount: "5,000+",
    rating: 4.0,
    url: "https://srmus.ac.in/"
  },

  // Jaypee University
  {
    id: "juet-guna",
    name: "Jaypee University of Engineering and Technology, Guna",
    desc: "A leading private university in Madhya Pradesh known for engineering excellence and innovation, established by Jaypee Group.",
    image: "https://images.shiksha.com/mediadata/images/1555907787phpd7leW7.png",
    location: "Guna, Madhya Pradesh",
    established: 2010,
    type: "university",
    alumniCount: "8,500+",
    rating: 4.2,
    url: "https://www.juet.ac.in/"
  },
  
  {
    id: "iit-delhi",
    name: "Indian Institute of Technology, Delhi",
    desc: "One of the premier engineering institutes in India, known for its cutting-edge research and innovation.",
    image: "https://c.ndtvimg.com/2024-11/pv86pggg_iit-delhi-source-iitdacin_625x300_12_November_24.jpeg?im=FeatureCrop,algorithm=dnn,width=1200,height=738", // IIT Delhi main building
    location: "New Delhi",
    established: 1961,
    type: "institute",
    alumniCount: "50,000+",
    rating: 4.8,
    url: "https://home.iitd.ac.in/"
  },

  //iit bombay
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology, Bombay",
    desc: "Renowned for its excellence in engineering education and research, IIT Bombay is a top choice for aspiring engineers.",
    image: "https://static.theprint.in/wp-content/uploads/2023/08/IITB-696x392.jpg?compress=true&quality=80&w=376&dpr=2.6", // IIT Bombay aerial view
    location: "Mumbai, Maharashtra",
    established: 1958,
    type: "institute",
    alumniCount: "60,000+",
    rating: 4.9,
    url: "https://www.iitb.ac.in/"
  },

  // du
  {
    id: "du",
    name: "University of Delhi",
    desc: "One of India's largest and most prestigious universities, offering a wide range of programs across various disciplines.",
    image: "https://stage-api.iirfranking.com/admin/upload/upload__1620898513258.webp", // Historic university building
    location: "New Delhi",
    established: 1922,
    type: "university",
    alumniCount: "1,00,000+",
    rating: 4.4,
    url: "https://www.du.ac.in/"
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
    rating: 4.6,
    url: "https://www.bits-pilani.ac.in/"
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
    rating: 4.5,
    url: "https://www.nitt.edu/"
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
    rating: 4.3,
    url: "https://www.vit.ac.in/"
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
    rating: 4.6,
    url: "https://www.iiit.ac.in/"
  },

];

export default colleges;
