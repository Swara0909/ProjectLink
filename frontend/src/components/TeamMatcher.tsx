import React, { useState } from 'react';
import { AVAILABLE_SKILLS } from '../types/skills';

interface TeamMember {
  id: string;
  name: string;
  skills: string[];
  experience: 'beginner' | 'intermediate' | 'advanced';
  availability: string;
  bio: string;
  interests: string[];
}

// Sample team members data (in a real app, this would come from a backend)
const SAMPLE_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    skills: ['1', '2'], // Python, Web Development
    experience: 'intermediate',
    availability: 'Evenings & Weekends',
    bio: 'Full-stack developer passionate about building innovative solutions.',
    interests: ['AI', 'Web Apps'],
  },
  {
    id: '2',
    name: 'Maria Garcia',
    skills: ['2', '4'], // Web Development, UI/UX Design
    experience: 'advanced',
    availability: 'Flexible',
    bio: 'UX designer with strong frontend development skills.',
    interests: ['Design Systems', 'User Experience'],
  },
  {
    id: '3',
    name: 'David Kim',
    skills: ['1', '3'], // Python, AI/ML
    experience: 'intermediate',
    availability: 'Weekends',
    bio: 'Machine learning enthusiast with experience in Python.',
    interests: ['Machine Learning', 'Data Science'],
  },
  {
    id: '4',
    name: 'Sarah Chen',
    skills: ['2', '5'], // Web Development, Graphic Design
    experience: 'beginner',
    availability: 'Evenings',
    bio: 'Creative developer focusing on frontend and design.',
    interests: ['Web Design', 'Animation'],
  },
  {
    id: '5',
    name: 'James Wilson',
    skills: ['1', '2', '3'], // Python, Web Development, AI/ML
    experience: 'advanced',
    availability: 'Flexible',
    bio: 'Senior developer with expertise in AI and web applications.',
    interests: ['AI Applications', 'Full-stack Development'],
  },
];

interface TeamMatcherProps {
  projectId: string;
  requiredSkills: string[];
  projectTitle: string;
}

const TeamMatcher: React.FC<TeamMatcherProps> = ({ projectId, requiredSkills, projectTitle }) => {
  const [invitedMembers, setInvitedMembers] = useState<Set<string>>(new Set());

  const matchedMembers = SAMPLE_TEAM_MEMBERS.filter(member => 
    member.skills.some(skill => requiredSkills.includes(skill))
  );

  const handleInvite = (memberId: string) => {
    setInvitedMembers(prev => {
      const newSet = new Set(prev);
      newSet.add(memberId);
      return newSet;
    });
    // In a real app, you would send an invitation to the backend
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Potential Team Members for {projectTitle}</h3>
      <p className="text-gray-600 mb-6">These members match the skills needed for your project:</p>

      <div className="space-y-4">
        {matchedMembers.map(member => (
          <div key={member.id} className="border-2 border-transparent hover:border-blue-500 rounded-lg p-4 transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-medium">{member.name}</h4>
              <span className="text-sm text-gray-500">{member.experience} level</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {member.skills.map(skillId => {
                const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
                return skill ? (
                  <span
                    key={skill.id}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    {skill.name}
                  </span>
                ) : null;
              })}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Available: {member.availability}</span>
              <button
                onClick={() => handleInvite(member.id)}
                disabled={invitedMembers.has(member.id)}
                className={`px-4 py-1 rounded text-sm ${
                  invitedMembers.has(member.id)
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {invitedMembers.has(member.id) ? 'Invited' : 'Invite to Team'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {matchedMembers.length === 0 && (
        <p className="text-gray-600 text-center py-4">
          No matching team members found. Try adjusting your project requirements.
        </p>
      )}
    </div>
  );
};

export default TeamMatcher; 