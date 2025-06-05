import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AVAILABLE_SKILLS } from '../types/skills';
import TeamMatcher from './TeamMatcher';
import { Project } from '../types/project';
import { motion } from 'framer-motion';

interface ProjectSuggestionsProps {
  selectedSkills: string[];
  projectType: 'solo' | 'group';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  needMentor: boolean;
  onStartGroupChat?: (
    projectId: string,
    projectTitle: string,
    mentors: Array<{ id: string; name: string; role: 'mentor' }>
  ) => void;
}

const ProjectSuggestions: React.FC<ProjectSuggestionsProps> = ({
  selectedSkills,
  projectType,
  experienceLevel,
  needMentor,
  onStartGroupChat
}) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [joinedProjects, setJoinedProjects] = useState<string[]>(() => {
    const stored = localStorage.getItem('joinedProjects');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    // Load projects from localStorage
    const projectsStr = localStorage.getItem('projects');
    if (projectsStr) {
      try {
        const loadedProjects = JSON.parse(projectsStr);
        setProjects(loadedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }
  }, []);

  // Filter projects based on user preferences
  const filteredProjects = projects.filter(project => {
    // Match project type
    if (project.type !== projectType) return false;

    // Match experience level
    if (project.requiredLevel !== experienceLevel) return false;

    // Check for skill overlap
    const hasMatchingSkill = project.skills.some(skill => selectedSkills.includes(skill));
    if (!hasMatchingSkill) return false;

    // Check mentor requirement
    if (needMentor && !project.mentors?.length) return false;

    return true;
  });

  const handleMentorClick = (projectId: string, skills: string[]) => {
    localStorage.setItem('selectedProjectSkills', JSON.stringify(skills));
    navigate('/mentorship');
  };

  const handleJoinProject = (project: Project) => {
    // Update project status
    const updatedProject = {
      ...project,
      status: 'in-progress' as const
    };

    // Update projects in localStorage
    const updatedProjects = projects.map(p => 
      p.id === project.id ? updatedProject : p
    );
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);

    // Update joined projects
    const newJoinedProjects = [...joinedProjects, project.id];
    setJoinedProjects(newJoinedProjects);
    localStorage.setItem('joinedProjects', JSON.stringify(newJoinedProjects));

    // Start group chat if available and project has mentors
    if (onStartGroupChat && project.type === 'group' && project.mentors && project.mentors.length > 0) {
      onStartGroupChat(project.id, project.title, project.mentors);
    }
  };

  return (
    <div className="space-y-6">
      {filteredProjects.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No matching projects found. Try adjusting your preferences.</p>
          <Link
            to="/projects/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create a New Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-blue-500"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {project.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.type === 'solo'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {project.type === 'solo' ? 'Solo Project' : 'Group Project'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                {project.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map(skillId => {
                  const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
                  return skill ? (
                    <span
                      key={skill.id}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedSkills.includes(skillId)
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {skill.name}
                    </span>
                  ) : null;
                })}
              </div>

              {/* Project Info */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>2-3 weeks</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="capitalize">{project.requiredLevel}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {project.status === 'not-started' && !joinedProjects.includes(project.id) && (
                  <button
                    onClick={() => handleJoinProject(project)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Join Project
                  </button>
                )}
                {project.mentors && project.mentors.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-2 bg-blue-50 rounded-lg">
                    <span className="text-sm text-blue-600">
                      {project.mentors.length} mentor{project.mentors.length > 1 ? 's' : ''} available
                    </span>
                    <button
                      onClick={() => handleMentorClick(project.id, project.skills)}
                      className="text-blue-600 hover:text-blue-800"
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
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSuggestions; 