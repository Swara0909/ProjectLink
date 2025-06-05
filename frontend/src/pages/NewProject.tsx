import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AVAILABLE_SKILLS } from '../types/skills';
import { Project } from '../types/project';

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Project>>({
    skills: [],
    type: 'solo',
    status: 'not-started',
    requiredLevel: 'beginner'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate all required fields
    if (!formData.title?.trim()) {
      setError('Project title is required');
      return;
    }

    if (!formData.description?.trim()) {
      setError('Project description is required');
      return;
    }

    if (!formData.skills?.length) {
      setError('Please select at least one required skill');
      return;
    }

    if (!formData.type) {
      setError('Please select a project type');
      return;
    }

    if (!formData.requiredLevel) {
      setError('Please select required experience level');
      return;
    }

    const projectsStr = localStorage.getItem('projects');
    const projects = projectsStr ? JSON.parse(projectsStr) : [];

    const newProject: Project = {
      ...formData,
      id: `project-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      skills: formData.skills || [],
      type: formData.type || 'solo',
      status: 'not-started',
      requiredLevel: formData.requiredLevel || 'beginner',
      title: formData.title.trim(),
      description: formData.description.trim()
    };

    localStorage.setItem('projects', JSON.stringify([...projects, newProject]));
    navigate(`/projects/${newProject.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Basic Info */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                required
                placeholder="Enter a descriptive title for your project"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.title || ''}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                required
                rows={4}
                placeholder="Describe your project, its goals, and what you're looking to achieve"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.description || ''}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {(['solo', 'group'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type }))}
                    className={`p-4 rounded-xl text-left transition-colors ${
                      formData.type === type
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900 capitalize">{type}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {type === 'solo' ? 'Work independently' : 'Collaborate with others'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills <span className="text-red-500">*</span>
                <span className="text-sm text-gray-500 ml-2">(Select at least one)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {AVAILABLE_SKILLS.map(skill => (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        skills: prev.skills?.includes(skill.id)
                          ? prev.skills.filter(id => id !== skill.id)
                          : [...(prev.skills || []), skill.id]
                      }));
                    }}
                    className={`p-4 rounded-xl text-left transition-colors ${
                      formData.skills?.includes(skill.id)
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{skill.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{skill.category}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Experience Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, requiredLevel: level }))}
                    className={`p-4 rounded-xl text-left transition-colors ${
                      formData.requiredLevel === level
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900 capitalize">{level}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/projects')}
                className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formData.title || !formData.description || !formData.skills?.length}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Project
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NewProject; 