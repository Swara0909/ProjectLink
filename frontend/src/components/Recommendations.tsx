import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AVAILABLE_SKILLS } from '../types/skills';
import { UserProfile } from '../types/user';

interface RecommendationsProps {
  userProfile: UserProfile;
  onStartChat?: (userId: string, userName: string, type: 'peer' | 'mentor') => void;
  type: 'peer' | 'mentor' | 'project';
}

interface Recommendation {
  id: string;
  name?: string;
  title?: string;
  skills: string[];
  bio?: string;
  description?: string;
  experienceLevel?: string;
  type?: 'solo' | 'group';
  status?: string;
}

const Recommendations: React.FC<RecommendationsProps> = ({ userProfile, onStartChat, type }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    // Clear localStorage for testing
    // localStorage.clear();

    // Initialize data from localStorage
    let data: Recommendation[] = [];
    
    if (type === 'peer') {
      const peersStr = localStorage.getItem('peers');
      if (peersStr) {
        const peers = JSON.parse(peersStr);
        data = peers.filter((peer: any) => 
          peer.id !== userProfile.id &&
          !peer.isMentor &&
          peer.skills.some((skill: string) => userProfile.skills.includes(skill))
        );
      }
    } else if (type === 'mentor') {
      const mentorsStr = localStorage.getItem('mentors');
      if (mentorsStr) {
        const mentors = JSON.parse(mentorsStr);
        data = mentors.filter((mentor: any) =>
          mentor.isMentor &&
          mentor.skills.some((skill: string) => userProfile.skills.includes(skill))
        );
      }
    } else if (type === 'project') {
      const projectsStr = localStorage.getItem('projects');
      if (projectsStr) {
        const projects = JSON.parse(projectsStr);
        data = projects.filter((project: any) =>
          project.skills.some((skill: string) => userProfile.skills.includes(skill)) &&
          project.requiredLevel === userProfile.experienceLevel
        );
      }
    }

    // Sort by number of matching skills
    data.sort((a, b) => {
      const matchingSkillsA = a.skills.filter(skill => userProfile.skills.includes(skill)).length;
      const matchingSkillsB = b.skills.filter(skill => userProfile.skills.includes(skill)).length;
      return matchingSkillsB - matchingSkillsA;
    });

    console.log(`${type} recommendations:`, data); // Debug log
    setRecommendations(data.slice(0, 3)); // Show top 3 matches
  }, [userProfile, type]);

  if (!userProfile || recommendations.length === 0) {
    return (
      <p className="text-gray-500 text-sm py-2">No recommendations available</p>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-blue-500"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {type === 'project' ? item.title : item.name}
              </h3>
              {type !== 'project' && item.experienceLevel && (
                <p className="text-sm text-gray-600 capitalize">
                  {item.experienceLevel} {type === 'mentor' ? 'Mentor' : 'Developer'}
                </p>
              )}
            </div>
            {onStartChat && type !== 'project' && item.name && (
              <button
                onClick={() => {
                  if (item.name) {
                    onStartChat(item.id, item.name, type);
                  }
                }}
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                title="Start chat"
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
            )}
          </div>

          <p className="text-sm text-gray-600 mt-2">
            {type === 'project' ? item.description : item.bio}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {item.skills.map(skillId => {
              const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
              return skill && (
                <span
                  key={skillId}
                  className={`px-2 py-1 text-xs rounded-full ${
                    userProfile.skills.includes(skillId)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {skill.name}
                </span>
              );
            })}
          </div>

          {type === 'project' && item.type && (
            <div className="mt-3">
              <span className={`text-xs px-2 py-1 rounded-full ${
                item.type === 'solo'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {item.type === 'solo' ? 'Solo Project' : 'Group Project'}
              </span>
              {item.status && (
                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {item.status}
                </span>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Recommendations; 