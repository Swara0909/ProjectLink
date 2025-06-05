import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types/project';
import { AVAILABLE_SKILLS } from '../types/skills';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const projectsStr = localStorage.getItem('projects');
    if (!projectsStr) {
      navigate('/projects');
      return;
    }

    try {
      const projects = JSON.parse(projectsStr);
      const foundProject = projects.find((p: Project) => p.id === id);
      if (!foundProject) {
        navigate('/projects');
        return;
      }
      setProject(foundProject);
    } catch (error) {
      console.error('Error loading project:', error);
      navigate('/projects');
    }
  }, [id, navigate]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {project.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    project.type === 'solo'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {project.type === 'solo' ? 'Solo Project' : 'Group Project'}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-5">
            <div className="prose max-w-none">
              <p className="text-gray-600">{project.description}</p>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-3">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map(skillId => {
                  const skill = AVAILABLE_SKILLS.find(s => s.id === skillId);
                  return skill && (
                    <span
                      key={skill.id}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Experience Level */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-3">Required Experience</h2>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 capitalize">
                {project.requiredLevel}
              </span>
            </div>

            {/* Mentors */}
            {project.mentors && project.mentors.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 mb-3">Project Mentors</h2>
                <div className="space-y-3">
                  {project.mentors.map(mentor => (
                    <div
                      key={mentor.id}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{mentor.name}</div>
                        <div className="text-sm text-gray-500">Mentor</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => navigate('/projects')}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Back to Projects
              </button>
              {project.status === 'not-started' && (
                <button
                  onClick={() => {
                    // Handle join project logic
                    console.log('Join project:', project.id);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Join Project
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails; 