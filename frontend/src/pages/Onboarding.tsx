import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OnboardingForm from '../components/OnboardingForm';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user exists and hasn't completed onboarding
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/signin');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (user.onboardingCompleted) {
        navigate('/home');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Welcome to ProjectLink
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Let's get to know you better to help you find the perfect projects and peers
            </p>
          </div>
          
          <OnboardingForm />
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding; 