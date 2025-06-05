import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AVAILABLE_SKILLS } from '../types/skills';
import { motion } from 'framer-motion';

const OnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    skills: [] as string[],
    experience: 'beginner',
    interests: [] as string[],
    goals: '',
    availability: 'part-time',
    needsMentor: false
  });

  const handleSkillToggle = (skillId: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save user data to localStorage
    const userData = {
      ...formData,
      onboardingCompleted: true,
      id: `user-${Date.now()}` // Ensure user has an ID
    };
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Navigate to home page
    navigate('/home');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                What's your name?
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.name}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What are your primary skills? (Select at least one)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AVAILABLE_SKILLS.map(skill => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => handleSkillToggle(skill.id)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      formData.skills.includes(skill.id)
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                        : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={formData.skills.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What's your experience level?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['beginner', 'intermediate', 'advanced'].map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, experience: level }))}
                    className={`p-3 rounded-lg text-sm font-medium capitalize transition-all ${
                      formData.experience === level
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                        : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What are you interested in? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Web Development',
                  'Mobile Development',
                  'Data Science',
                  'Machine Learning',
                  'UI/UX Design',
                  'DevOps',
                  'Cloud Computing',
                  'Cybersecurity',
                  'Game Development'
                ].map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      formData.interests.includes(interest)
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                        : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(5)}
                disabled={formData.interests.length === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                What are your learning goals?
              </label>
              <textarea
                id="goals"
                value={formData.goals}
                onChange={(e) => setFormData(prev => ({ ...prev, goals: e.target.value }))}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us what you want to achieve..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                How much time can you commit?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['part-time', 'full-time'].map(availability => (
                  <button
                    key={availability}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, availability }))}
                    className={`p-3 rounded-lg text-sm font-medium capitalize transition-all ${
                      formData.availability === availability
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                        : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {availability.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Would you like to connect with a mentor?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: true, label: 'Yes, I need guidance' },
                  { value: false, label: 'No, I\'m good for now' }
                ].map(option => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, needsMentor: option.value }))}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      formData.needsMentor === option.value
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                        : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!formData.goals}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Setup
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`flex-1 h-2 mx-1 rounded-full ${
              stepNumber === step
                ? 'bg-blue-600'
                : stepNumber < step
                ? 'bg-blue-200'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {renderStep()}
    </form>
  );
};

export default OnboardingForm; 