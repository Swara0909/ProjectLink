import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Recommendations from '../components/Recommendations';
import { AVAILABLE_SKILLS } from '../types/skills';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [suggestedProjects, setSuggestedProjects] = useState<any[]>([]);

  useEffect(() => {
    // Check for user data in localStorage
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/signin');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      if (!userData || !userData.id) {
        // Invalid user data, redirect to sign in
        localStorage.removeItem('user');
        navigate('/signin');
        return;
      }
      
      setUser(userData);
      
      // Check if user has completed their profile
      const hasCompletedProfile = userData.skills && userData.skills.length > 0;
      setIsProfileComplete(hasCompletedProfile);

      // Generate project suggestions based on user's skills and interests
      if (hasCompletedProfile) {
        generateProjectSuggestions(userData);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      navigate('/signin');
    }
  }, [navigate]);

  const generateProjectSuggestions = (userData: any) => {
    const suggestions = [];
    const { skills, interests, experience } = userData;

    // Web Development Projects
    if (skills.some((skill: string) => ['react', 'javascript', 'typescript', 'node'].includes(skill))) {
      suggestions.push({
        id: 'web1',
        title: 'Personal Portfolio Website',
        description: 'Build a modern portfolio website using React and TypeScript. Showcase your projects and skills with a responsive design.',
        skills: ['react', 'typescript', 'css'],
        difficulty: experience,
        type: 'solo',
        estimatedTime: '2-3 weeks'
      });
    }

    // Data Science Projects
    if (skills.some((skill: string) => ['python', 'data-science', 'machine-learning'].includes(skill))) {
      suggestions.push({
        id: 'ds1',
        title: 'Data Analysis Dashboard',
        description: 'Create a data visualization dashboard using Python and popular data science libraries. Analyze and present insights from a dataset.',
        skills: ['python', 'data-science', 'machine-learning'],
        difficulty: experience,
        type: 'solo',
        estimatedTime: '3-4 weeks'
      });
    }

    // Full Stack Projects
    if (skills.some((skill: string) => ['react', 'node', 'mongodb'].includes(skill))) {
      suggestions.push({
        id: 'fs1',
        title: 'Task Management App',
        description: 'Develop a full-stack task management application with user authentication, real-time updates, and team collaboration features.',
        skills: ['react', 'node', 'mongodb'],
        difficulty: experience,
        type: 'group',
        estimatedTime: '4-6 weeks'
      });
    }

    // Mobile Development Projects
    if (skills.some((skill: string) => ['react-native', 'mobile-development'].includes(skill))) {
      suggestions.push({
        id: 'mobile1',
        title: 'Fitness Tracking App',
        description: 'Build a mobile app for tracking workouts and fitness goals. Include features like progress tracking and social sharing.',
        skills: ['react-native', 'mobile-development'],
        difficulty: experience,
        type: 'solo',
        estimatedTime: '3-5 weeks'
      });
    }

    setSuggestedProjects(suggestions);
  };

  if (!isProfileComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to ProjectLink! 🎉</h1>
            <p className="text-xl text-gray-600 mb-8">
              Let's set up your profile to help you find the perfect projects and collaborators.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Complete Your Profile</h2>
              <p className="text-gray-600 mb-6">
                Tell us about your skills, experience, and preferences to get personalized project recommendations.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/onboarding')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome Back{user?.name ? `, ${user.name}` : ''}! 👋
            </h1>
            <p className="text-xl text-gray-600">
              Here are some personalized recommendations based on your profile.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Suggested Projects for You</h2>
            <p className="text-gray-600 mb-6">Projects tailored to your skills and interests</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-blue-500"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skillId: string) => {
                      const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
                      return skill ? (
                        <span
                          key={skill.id}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs"
                        >
                          {skill.name}
                        </span>
                      ) : null;
                    })}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="capitalize">{project.difficulty} level</span>
                    <span>{project.estimatedTime}</span>
                  </div>

                  <div className="mt-4">
                    <Link
                      to={`/projects/new?template=${project.id}`}
                      className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Start This Project
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Peer Recommendations */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Peers</h2>
            <p className="text-gray-600 mb-6">Connect with developers who share your interests</p>
            {user && <Recommendations userProfile={user} type="peer" />}
          </div>

          {/* Mentor Recommendations */}
          {user?.needsMentor && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Mentors</h2>
              <p className="text-gray-600 mb-6">Find mentors who can guide you in your development journey</p>
              {user && <Recommendations userProfile={user} type="mentor" />}
            </div>
          )}
        </div>
      </div>

      {/* View More Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-white to-blue-50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Want to Explore More?</h2>
          <p className="text-gray-600 mt-2">Discover all available projects and connect with more peers</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/projects"
              className="block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Browse All Projects
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/connect"
              className="block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Find More Peers
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore Projects</h3>
            <p className="text-gray-600 mb-4">
              Browse through our curated list of projects that match your interests.
            </p>
            <Link
              to="/projects"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Projects →
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect with Peers</h3>
            <p className="text-gray-600 mb-4">
              Find and connect with other developers who share your interests.
            </p>
            <Link
              to="/connect"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Browse Connections →
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Mentorship</h3>
            <p className="text-gray-600 mb-4">
              Connect with experienced developers who can guide your journey.
            </p>
            <Link
              to="/mentorship"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Find a Mentor →
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home; 