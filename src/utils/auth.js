import { users } from '../data/users';

// Get current user from localStorage
export const getCurrentUser = () => {
  const userData = localStorage.getItem('alumconnect_user');
  return userData ? JSON.parse(userData) : null;
};

// Login function
export const login = (email, password, role) => {
  const user = users.find(u => 
    u.email === email && 
    u.password === password && 
    u.role === role &&
    u.isApproved
  );
  
  if (user) {
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    localStorage.setItem('alumconnect_user', JSON.stringify(userData));
    return userData;
  }
  return null;
};

// Logout function
export const logout = () => {
  localStorage.removeItem('alumconnect_user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// Check if user has specific role
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};
