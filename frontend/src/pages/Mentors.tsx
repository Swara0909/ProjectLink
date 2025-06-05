import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AVAILABLE_SKILLS } from '../types/skills';
import Chat from '../components/Chat';

interface Mentor {
  id: string;
  name: string;
  skills: string[];
  bio: string;
  yearsOfExperience: number;
  specialization: string;
  availability: string;
}

interface ChatSession {
  mentorId: string;
  mentorName: string;
}

const Mentors: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filters, setFilters] = useState({
    specialization: 'all',
    skills: [] as string[],
    availability: 'all'
  });
  const [activeChatSession, setActiveChatSession] = useState<ChatSession | null>(null);
  const [minimizedChats, setMinimizedChats] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Simulated mentor data - In a real app, this would come from an API
    const mockMentors: Mentor[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        skills: ['react', 'typescript', 'node'],
        bio: 'Senior Software Engineer with 8 years of experience in full-stack development.',
        yearsOfExperience: 8,
        specialization: 'Full Stack Development',
        availability: 'Weekends'
      },
      {
        id: '2',
        name: 'Michael Chen',
        skills: ['python', 'machine-learning', 'data-science'],
        bio: 'AI/ML expert with experience in building scalable data solutions.',
        yearsOfExperience: 6,
        specialization: 'Machine Learning',
        availability: 'Weekdays'
      },
      // Add more mock mentors as needed
    ];

    setMentors(mockMentors);
  }, []);

  const handleStartChat = (mentor: Mentor) => {
    setActiveChatSession({
      mentorId: mentor.id,
      mentorName: mentor.name
    });
  };

  const handleCloseChat = () => {
    setActiveChatSession(null);
  };

  const handleMinimizeChat = (mentorId: string) => {
    setMinimizedChats(prev => {
      const next = new Set(prev);
      next.add(mentorId);
      return next;
    });
  };

  const handleMaximizeChat = (mentorId: string) => {
    setMinimizedChats(prev => {
      const next = new Set(prev);
      next.delete(mentorId);
      return next;
    });
  };

  const filteredMentors = mentors.filter(mentor => {
    if (filters.specialization !== 'all' && mentor.specialization !== filters.specialization) {
      return false;
    }
    if (filters.availability !== 'all' && mentor.availability !== filters.availability) {
      return false;
    }
    if (filters.skills.length > 0) {
      const hasMatchingSkill = mentor.skills.some(skill => filters.skills.includes(skill));
      if (!hasMatchingSkill) return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find a Mentor</h1>
        <p className="text-gray-600">
          Connect with experienced mentors who can guide you in your development journey.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialization
            </label>
            <select
              value={filters.specialization}
              onChange={(e) => setFilters(prev => ({ ...prev, specialization: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Specializations</option>
              <option value="Full Stack Development">Full Stack Development</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="DevOps">DevOps</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Availability
            </label>
            <select
              value={filters.availability}
              onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Any Time</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_SKILLS.map(skill => (
                <label key={skill.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.skills.includes(skill.id)}
                    onChange={(e) => {
                      setFilters(prev => ({
                        ...prev,
                        skills: e.target.checked
                          ? [...prev.skills, skill.id]
                          : prev.skills.filter(id => id !== skill.id)
                      }));
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{skill.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map(mentor => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.specialization}</p>
                <p className="text-sm text-gray-500">{mentor.yearsOfExperience} years of experience</p>
                <p className="text-sm text-gray-500">Available: {mentor.availability}</p>
              </div>
              <button
                onClick={() => handleStartChat(mentor)}
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                title="Start chat with mentor"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-4">{mentor.bio}</p>

            <div className="flex flex-wrap gap-2">
              {mentor.skills.map(skillId => {
                const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
                return skill ? (
                  <span
                    key={skill.id}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {skill.name}
                  </span>
                ) : null;
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chat Window */}
      {activeChatSession && (
        <Chat
          peerId={activeChatSession.mentorId}
          peerName={activeChatSession.mentorName}
          peerType="mentor"
          onClose={handleCloseChat}
          onMinimize={() => handleMinimizeChat(activeChatSession.mentorId)}
        />
      )}

      {/* Minimized Chat Icons */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
        {Array.from(minimizedChats).map(mentorId => {
          const mentor = mentors.find(m => m.id === mentorId);
          if (!mentor) return null;
          return (
            <motion.button
              key={mentorId}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => handleMaximizeChat(mentorId)}
              className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
              title={`Chat with ${mentor.name}`}
            >
              {mentor.name[0].toUpperCase()}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default Mentors; 