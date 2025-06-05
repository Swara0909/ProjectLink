import React from 'react';
import { AVAILABLE_SKILLS } from '../types/skills';
import { motion } from 'framer-motion';

interface Mentor {
  id: string;
  name: string;
  role: string;
  experience: string;
  skills: string[];
  availability: string;
  bio: string;
}

const MENTORS: Mentor[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Software Engineer',
    experience: '8+ years',
    skills: ['1', '2', '3'], // Python, Web Development, AI/ML
    availability: 'Evenings & Weekends',
    bio: 'Full-stack developer specializing in AI/ML applications. Previously worked at Google and Microsoft.',
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'UI/UX Design Lead',
    experience: '6+ years',
    skills: ['4', '5'], // UI/UX Design, Graphic Design
    availability: 'Weekdays',
    bio: 'Design leader with experience in creating user-centric digital products. Currently leading design at a Fortune 500 company.',
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    role: 'AI Research Scientist',
    experience: '10+ years',
    skills: ['1', '3'], // Python, AI/ML
    availability: 'Flexible Hours',
    bio: 'PhD in Machine Learning, specialized in computer vision and natural language processing.',
  },
  {
    id: '4',
    name: 'Alex Kim',
    role: 'Frontend Developer',
    experience: '5+ years',
    skills: ['2'], // Web Development
    availability: 'Weekends',
    bio: 'React specialist with a passion for building accessible and performant web applications.',
  },
  {
    id: '5',
    name: 'Lisa Patel',
    role: 'Product Designer',
    experience: '7+ years',
    skills: ['4', '5'], // UI/UX Design, Graphic Design
    availability: 'Weekday Evenings',
    bio: 'Expert in design systems and brand identity. Previously designed products used by millions.',
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Full Stack Developer',
    experience: '12+ years',
    skills: ['1', '2'], // Python, Web Development
    availability: 'Flexible Hours',
    bio: 'Experienced in building scalable web applications and mentoring junior developers.',
  },
  {
    id: '7',
    name: 'David Park',
    role: 'Cloud Solutions Architect',
    experience: '9+ years',
    skills: ['1', '2'], // Python, Web Development
    availability: 'Weekday Mornings',
    bio: 'Expert in cloud architecture and scalable systems. Previously worked at AWS and helped startups scale.',
  },
  {
    id: '8',
    name: 'Rachel Martinez',
    role: 'Mobile App Developer',
    experience: '6+ years',
    skills: ['2', '4'], // Web Development, UI/UX Design
    availability: 'Weekends',
    bio: 'Specialized in React Native and mobile UX. Created apps with millions of downloads.',
  },
  {
    id: '9',
    name: 'Thomas Zhang',
    role: 'Data Science Lead',
    experience: '8+ years',
    skills: ['1', '3'], // Python, AI/ML
    availability: 'Flexible Hours',
    bio: 'Expert in data analytics and machine learning. Led data science teams at Fortune 100 companies.',
  },
  {
    id: '10',
    name: 'Sophia Anderson',
    role: 'DevOps Engineer',
    experience: '7+ years',
    skills: ['1', '2'], // Python, Web Development
    availability: 'Weekday Evenings',
    bio: 'Specializes in CI/CD pipelines and infrastructure automation. Strong advocate for DevOps best practices.',
  },
  {
    id: '11',
    name: 'Aisha Khan',
    role: 'Security Engineer',
    experience: '10+ years',
    skills: ['1', '2'], // Python, Web Development
    availability: 'Flexible Hours',
    bio: 'Cybersecurity expert with focus on web application security. CISSP certified with extensive pentesting experience.',
  },
  {
    id: '12',
    name: 'Marcus Johnson',
    role: 'Blockchain Developer',
    experience: '5+ years',
    skills: ['1', '2'], // Python, Web Development
    availability: 'Weekends',
    bio: 'Experienced in smart contract development and decentralized applications. Active contributor to major blockchain projects.',
  }
];

const Mentorship = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Find a Mentor</h1>
      <p className="text-gray-600 mb-8">Connect with experienced mentors who can guide you through your projects and career growth.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MENTORS.map(mentor => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{mentor.name}</h2>
                <p className="text-gray-700 font-medium mb-1">{mentor.role}</p>
                <p className="text-gray-600 text-sm mb-4">{mentor.experience} experience</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xl font-semibold text-blue-600">
                  {mentor.name[0].toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.skills.map(skillId => {
                const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
                return skill ? (
                  <span
                    key={skill.id}
                    className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm"
                  >
                    {skill.name}
                  </span>
                ) : null;
              })}
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{mentor.bio}</p>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                Available: {mentor.availability}
              </span>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
              Request Mentorship
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Mentorship; 