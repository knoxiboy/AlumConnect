# AlumConnect - Portal Navigation Mapping

## Student Portal Navbar Items and File Names:

1. **Dashboard** -> `/student/dashboard` -> `StudentDashboard.jsx`
2. **Directory** -> `/student/explore` -> `StudentExplore.jsx`
3. **Networking Hub** -> `/student/network` -> `StudentNetwork.jsx`
4. **Career** -> `/student/jobs` -> `StudentJobs.jsx`
5. **Events** -> `/student/events` -> `StudentEvents.jsx`
6. **Profile** -> `/student/profile` -> `StudentProfile.jsx`

## Alumni Portal Navbar Items and File Names:

1. **Dashboard** -> `/alumni/dashboard` -> `AlumniDashboard.jsx`
2. **Directory** -> `/alumni/explore` -> `AlumniExplore.jsx`
3. **Networking Hub** -> `/alumni/network` -> `AlumniNetwork.jsx`
4. **Career Center** -> `/alumni/career-center` -> `AlumniCareerCenter.jsx`
5. **Events** -> `/alumni/events` -> `AlumniEvents.jsx`
6. **Profile** -> `/alumni/profile` -> `AlumniProfile.jsx`

## Naming Analysis:

### Consistencies:
- All files follow the pattern `[Role][PageName].jsx`
- Dashboard, Profile, Events pages are consistently named
- Directory pages are named as `Explore` in both portals

### Inconsistencies:
- Student portal uses "Career" in navbar but file is `StudentJobs.jsx`
- Alumni portal uses "Career Center" in navbar but file is `AlumniCareerCenter.jsx`
- Student portal "Networking Hub" maps to `StudentNetwork.jsx`
- Alumni portal "Networking Hub" maps to `AlumniNetwork.jsx`

## Recommendations:

The naming is mostly consistent with the pattern. The main inconsistency is that the navbar label "Career" for students maps to a file named `StudentJobs.jsx`. For better consistency, this could be renamed to `StudentCareerCenter.jsx` to match the alumni portal pattern.

However, since the routing and functionality is working correctly, renaming files might introduce breaking changes. It would be better to maintain the current naming for compatibility.