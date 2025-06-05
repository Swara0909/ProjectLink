import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AVAILABLE_SKILLS } from '../types/skills';
import Chat from '../components/Chat';

interface Peer {
  id: string;
  name: string;
  skills: string[];
  bio: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface ChatSession {
  peerId: string;
  peerName: string;
}

const Connect: React.FC = () => {
  const [peers, setPeers] = useState<Peer[]>([]);
  const [filters, setFilters] = useState({
    skills: [] as string[],
    experienceLevel: 'all',
    minSkillMatch: 1,
    skillSearchTerm: ''
  });
  const [activeChatSession, setActiveChatSession] = useState<ChatSession | null>(null);
  const [minimizedChats, setMinimizedChats] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Mock peer data
    const mockPeers: Peer[] = [
      {
        id: 'p1',
        name: 'Alex Johnson',
        skills: ['react', 'typescript', 'node'],
        bio: 'Frontend developer passionate about React and TypeScript.',
        experienceLevel: 'intermediate'
      },
      {
        id: 'p2',
        name: 'Sarah Chen',
        skills: ['python', 'machine-learning', 'data-science'],
        bio: 'ML enthusiast working on deep learning projects.',
        experienceLevel: 'advanced'
      },
      {
        id: 'p3',
        name: 'Mike Brown',
        skills: ['javascript', 'react', 'css'],
        bio: 'Web developer learning modern frontend technologies.',
        experienceLevel: 'beginner'
      },
      {
        id: 'p4',
        name: 'Emily Zhang',
        skills: ['ui-design', 'react', 'figma'],
        bio: 'UI/UX designer with coding experience in React.',
        experienceLevel: 'intermediate'
      },
      {
        id: 'p5',
        name: 'David Kim',
        skills: ['python', 'django', 'postgresql'],
        bio: 'Backend developer specializing in Python and Django.',
        experienceLevel: 'advanced'
      },
      {
        id: 'p6',
        name: 'Lisa Wang',
        skills: ['vue', 'javascript', 'node'],
        bio: 'Full-stack developer with focus on Vue.js ecosystem.',
        experienceLevel: 'intermediate'
      },
      {
        id: 'p7',
        name: 'James Wilson',
        skills: ['react-native', 'typescript', 'mobile-dev'],
        bio: 'Mobile app developer creating cross-platform applications.',
        experienceLevel: 'advanced'
      },
      {
        id: 'p8',
        name: 'Sophia Martinez',
        skills: ['java', 'spring', 'microservices'],
        bio: 'Backend developer working with Java and microservices.',
        experienceLevel: 'intermediate'
      },
      {
        id: 'p9',
        name: 'Ryan Taylor',
        skills: ['html', 'css', 'javascript'],
        bio: 'Web development enthusiast learning the fundamentals.',
        experienceLevel: 'beginner'
      },
      {
        id: 'p10',
        name: 'Aisha Patel',
        skills: ['angular', 'typescript', 'rxjs'],
        bio: 'Frontend specialist with expertise in Angular.',
        experienceLevel: 'advanced'
      },
      {
        id: 'p11',
        name: 'Tom Anderson',
        skills: ['devops', 'aws', 'docker'],
        bio: 'DevOps engineer passionate about automation.',
        experienceLevel: 'intermediate'
      },
      {
        id: 'p12',
        name: 'Nina Rodriguez',
        skills: ['blockchain', 'solidity', 'web3'],
        bio: 'Blockchain developer working on DeFi projects.',
        experienceLevel: 'advanced'
      }
    ];

    setPeers(mockPeers);
  }, []);

  const handleStartChat = (peer: Peer) => {
    setActiveChatSession({
      peerId: peer.id,
      peerName: peer.name
    });
  };

  const handleCloseChat = () => {
    setActiveChatSession(null);
  };

  const handleMinimizeChat = (peerId: string) => {
    setMinimizedChats(prev => {
      const next = new Set(prev);
      next.add(peerId);
      return next;
    });
  };

  const handleMaximizeChat = (peerId: string) => {
    setMinimizedChats(prev => {
      const next = new Set(prev);
      next.delete(peerId);
      return next;
    });
  };

  const toggleSkillFilter = (skillId: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter(id => id !== skillId)
        : [...prev.skills, skillId]
    }));
  };

  const filteredSkills = AVAILABLE_SKILLS.filter(skill =>
    skill.name.toLowerCase().includes(filters.skillSearchTerm.toLowerCase())
  );

  const filteredPeers = peers.filter(peer => {
    // Filter by experience level
    if (filters.experienceLevel !== 'all' && peer.experienceLevel !== filters.experienceLevel) {
      return false;
    }
    
    // Filter by skills
    if (filters.skills.length > 0) {
      const matchingSkills = peer.skills.filter(skill => filters.skills.includes(skill));
      if (matchingSkills.length < filters.minSkillMatch) return false;
    }
    
    return true;
  });

  const calculateSkillMatch = (peerSkills: string[]) => {
    if (filters.skills.length === 0) return 100;
    const matchingSkills = peerSkills.filter(skill => filters.skills.includes(skill));
    return Math.round((matchingSkills.length / filters.skills.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Connect with Peers</h1>
          <p className="text-gray-600 mb-6">
            Find and connect with other developers who share your interests and skills.
          </p>
          <div className="flex flex-wrap gap-4">
            {/* Filters */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_SKILLS.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => toggleSkillFilter(skill.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      filters.skills.includes(skill.id)
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-200'
                        : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPeers.map(peer => (
            <motion.div
              key={peer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-blue-600">
                      {peer.name[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{peer.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{peer.experienceLevel} Developer</p>
                  </div>
                </div>
                <button
                  onClick={() => handleStartChat(peer)}
                  className="p-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                  title="Start chat"
                >
                  <svg
                    className="w-6 h-6"
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

              <p className="text-gray-600 text-base mb-6 leading-relaxed">{peer.bio}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {peer.skills.map(skillId => {
                  const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
                  return skill && (
                    <span
                      key={skillId}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm ${
                        filters.skills.includes(skillId)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {skill.name}
                    </span>
                  );
                })}
              </div>

              {filters.skills.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Skill Match</span>
                    <span className="text-sm font-semibold text-blue-600">
                      {calculateSkillMatch(peer.skills)}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${calculateSkillMatch(peer.skills)}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Active Chat */}
        {activeChatSession && (
          <Chat
            peerId={activeChatSession.peerId}
            peerName={activeChatSession.peerName}
            peerType="peer"
            onClose={handleCloseChat}
            onMinimize={() => handleMinimizeChat(activeChatSession.peerId)}
          />
        )}

        {/* Minimized Chat Icons */}
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
          {Array.from(minimizedChats).map(peerId => {
            const peer = peers.find(p => p.id === peerId);
            if (!peer) return null;

            return (
              <motion.button
                key={peerId}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => handleMaximizeChat(peerId)}
                className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg"
                title={`Chat with ${peer.name}`}
              >
                {peer.name[0].toUpperCase()}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connect; 