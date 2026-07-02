import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate login API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { id: '1', name: 'Gov Officer', email, role: 'OFFICER', avatar: null };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve({ success: true });
      }, 800);
    });
  };

  const register = async (name, email, password) => {
    // Simulate register API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { id: '1', name, email, role: 'CITIZEN', avatar: null };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve({ success: true });
      }, 800);
    });
  };
  
  const googleLogin = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = { id: '1', name: 'Google User', email: 'user@google.com', role: 'CITIZEN', avatar: null };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve({ success: true });
      }, 800);
    });
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (data) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout, updateUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
