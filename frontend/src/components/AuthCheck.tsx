import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    
    // Allow access to public routes without user data
    if (location.pathname === '/' || location.pathname === '/signin' || location.pathname === '/signup') {
      // If user is already logged in and tries to access public routes, redirect to dashboard
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user.onboardingCompleted) {
          navigate('/dashboard');
          return;
        }
      }
      setIsChecking(false);
      return;
    }
    
    // Check for protected routes
    if (!userStr) {
      // No user data, redirect to landing page
      navigate('/');
      return;
    }

    const user = JSON.parse(userStr);

    // Check if onboarding is completed
    if (!user.onboardingCompleted && location.pathname !== '/onboarding') {
      navigate('/onboarding');
      return;
    }

    // If onboarding is completed and user is on onboarding page, redirect to dashboard
    if (user.onboardingCompleted && location.pathname === '/onboarding') {
      navigate('/dashboard');
      return;
    }

    setIsChecking(false);
  }, [navigate, location.pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthCheck; 