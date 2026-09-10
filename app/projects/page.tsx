"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { projects as initialProjects } from "@/lib/dummy-data";
import { Calendar, Users, DollarSign, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import AddProjectModal from "@/components/AddProjectModal";
import UpdateStatusModal from "@/components/UpdateStatusModal";

const statusColors: Record<string, string> = {
  "planning": "bg-gray-100 text-gray-700",
  "in-production": "bg-blue-100 text-blue-700",
  "editing": "bg-purple-100 text-purple-700",
  "client-review": "bg-orange-100 text-orange-700",
  "revision": "bg-yellow-100 text-yellow-700",
  "approved": "bg-green-100 text-green-700",
  "completed": "bg-gray-200 text-gray-800",
};

export default function Projects() {
  const router = useRouter();
  const [projectsData, setProjectsData] = useState(initialProjects);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleAddProject = (newProject: any) => {
    setProjectsData([...projectsData, newProject]);
  };

  const handleUpdateStatus = (projectId: string, newStatus: string, progress: number) => {
    setProjectsData(
      projectsData.map((p) =>
        p.id === projectId ? { ...p, status: newStatus, progress } : p
      )
    );
  };

  const openStatusModal = (project: any) => {
    setSelectedProject(project);
    setIsStatusModalOpen(true);
  };

  const handleViewDetails = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };
  return (
    <div className="p-4 md:p-8">
      {/* Modals */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProject}
      />
      
      {selectedProject && (
        <UpdateStatusModal
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          currentStatus={selectedProject.status}
          projectName={selectedProject.name}
          onUpdate={(newStatus, progress) => {
            handleUpdateStatus(selectedProject.id, newStatus, progress);
            setIsStatusModalOpen(false);
          }}
        />
      )}

      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Manage all client projects and deliverables</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 md:px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl text-sm md:text-base whitespace-nowrap"
        >
          + New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-gray-600 text-sm">Active Projects</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">18</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-gray-600 text-sm">Team Members</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">12</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-gray-600 text-sm">Due This Week</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">5</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-gray-600 text-sm">Delayed</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">3</p>
        </div>
      </div>

      {/* Projects List */}
      <div className="grid gap-6">
        {projectsData.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">{project.name}</h3>
                <p className="text-gray-600 text-sm md:text-base">{project.client}</p>
              </div>
              <span className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm whitespace-nowrap ${
                statusColors[project.status] || "bg-gray-100 text-gray-700"
              }`}>
                {project.status.replace("-", " ").toUpperCase()}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-bold text-indigo-600">{project.progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Project Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Deadline</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(project.deadline).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Budget</p>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{(project.budget / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Tasks</p>
                  <p className="text-sm font-medium text-gray-900">
                    {project.tasksCompleted}/{project.tasksTotal}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Team</p>
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, idx) => (
                      <div 
                        key={idx}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                      >
                        {member[0]}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleViewDetails(project.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                View Details
              </button>
              <button
                onClick={() => openStatusModal(project)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
