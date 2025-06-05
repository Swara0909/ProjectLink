import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, PROJECTS } from '../data/projects';
import { AVAILABLE_SKILLS } from '../types/skills';
import { motion } from 'framer-motion';

const Projects = () => {
  const navigate = useNavigate();
  const [joinedProjects, setJoinedProjects] = useState<string[]>(() => {
    const stored = localStorage.getItem('joinedProjects');
    return stored ? JSON.parse(stored) : [];
  });

  const [filters, setFilters] = useState({
    type: 'all',
    level: 'all',
    hasMentor: 'all'
  });

  const filteredProjects = PROJECTS.filter(project => {
    // Filter by type
    if (filters.type !== 'all' && project.type !== filters.type) return false;

    // Filter by level
    if (filters.level !== 'all' && project.requiredLevel !== filters.level) return false;

    // Filter by mentor availability
    if (filters.hasMentor !== 'all' && project.hasMentor !== (filters.hasMentor === 'yes')) return false;

    return true;
  });

  const handleJoinProject = (projectId: string) => {
    const newJoinedProjects = joinedProjects.includes(projectId)
      ? joinedProjects.filter(id => id !== projectId)
      : [...joinedProjects, projectId];

    setJoinedProjects(newJoinedProjects);

    // Save to localStorage
    const projectsToStore = PROJECTS
      .filter(p => newJoinedProjects.includes(p.id))
      .map(p => ({
        id: p.id,
        title: p.title,
        type: p.type,
        skills: p.skills
      }));

    localStorage.setItem('joinedProjects', JSON.stringify(newJoinedProjects));
    localStorage.setItem('joinedProjectsDetails', JSON.stringify(projectsToStore));
  };

  const handleMentorClick = (projectId: string, skills: string[]) => {
    localStorage.setItem('selectedProjectSkills', JSON.stringify(skills));
    navigate('/mentorship');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="solo">Solo Projects</option>
                <option value="group">Group Projects</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={filters.level}
                onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mentor Available
              </label>
              <select
                value={filters.hasMentor}
                onChange={(e) => setFilters(prev => ({ ...prev, hasMentor: e.target.value }))}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Projects</option>
                <option value="yes">With Mentor</option>
                <option value="no">Without Mentor</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border-2 border-gray-200 hover:border-blue-500 group"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{project.title}</h2>
                <div className="flex gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    project.type === 'solo'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}>
                    {project.type === 'solo' ? 'Solo' : 'Group'}
                  </span>
                  <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    project.requiredLevel === 'beginner' 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : project.requiredLevel === 'intermediate' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {project.requiredLevel}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-base mb-6 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.skills.map(skillId => {
                  const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
                  return skill ? (
                    <span
                      key={skill.id}
                      className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm border border-gray-200 hover:bg-gray-200 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ) : null;
                })}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {project.estimatedDuration}
                </div>
                <button
                  onClick={() => handleJoinProject(project.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    joinedProjects.includes(project.id)
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {joinedProjects.includes(project.id) ? 'Leave Project' : 'Join Project'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-600 mt-8">
            No projects match your filters. Try adjusting your search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects; 