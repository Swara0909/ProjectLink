import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Welcome = () => {
  const [hasExistingAccount, setHasExistingAccount] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setHasExistingAccount(true);
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 relative"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-blue-600">
        ProjectLink
      </h1>
      
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-xl sm:max-w-2xl">
        💡 Connect with developers, find exciting projects, and grow your skills.
      </p>

      {hasExistingAccount && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md">
          <p className="text-blue-800">
            Welcome back! We noticed you already have an account. Please sign in to continue your journey.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md w-full">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1"
        >
          <Link
            to="/signup"
            className={`block w-full px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold
              ${hasExistingAccount 
                ? 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors'
                : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
              }`}
          >
            Sign Up
            <p className="text-sm font-normal mt-1 opacity-80">
              {hasExistingAccount ? 'Create another account' : 'New to ProjectLink? Get started here'}
            </p>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1"
        >
          <Link
            to="/signin"
            className={`block w-full px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold
              ${hasExistingAccount 
                ? 'bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                : 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors'
              }`}
          >
            Sign In
            <p className="text-sm font-normal mt-1 opacity-80">
              {hasExistingAccount ? 'Welcome back!' : 'Already have an account?'}
            </p>
          </Link>
        </motion.div>
      </div>

      {/* Feature highlights */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Projects</h3>
          <p className="text-gray-600">Discover exciting coding projects that match your skills and interests.</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect with Peers</h3>
          <p className="text-gray-600">Collaborate with like-minded developers and build your network.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Mentorship</h3>
          <p className="text-gray-600">Learn from experienced developers who guide your journey.</p>
        </div>
      </div>

      {/* Background decoration - visible on larger screens */}
      <div className="hidden lg:block absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </motion.div>
  );
};

export default Welcome; 