"use client";

import { useRouter } from "next/navigation";
import { Calendar, DollarSign, Users, CheckCircle2, Clock, FileText, MessageSquare, ArrowLeft } from "lucide-react";

// Mock data - in real app, this would come from params
const projectDetail = {
  id: "1",
  name: "Q4 Brand Campaign",
  client: "ABC Corporation",
  status: "in-production",
  progress: 65,
  deadline: "2026-09-20",
  budget: 500000,
  spent: 325000,
  team: [
    { name: "Karthik", role: "Editor", avatar: "K" },
    { name: "Priya", role: "Designer", avatar: "P" },
    { name: "Amit", role: "Camera", avatar: "A" },
  ],
  tasks: [
    { id: 1, title: "Script finalization", status: "completed", assignee: "Saksham" },
    { id: 2, title: "Location scouting", status: "completed", assignee: "Amit" },
    { id: 3, title: "Shoot Day 1", status: "in-progress", assignee: "Amit" },
    { id: 4, title: "Raw footage editing", status: "in-progress", assignee: "Karthik" },
    { id: 5, title: "Graphics & VFX", status: "pending", assignee: "Priya" },
    { id: 6, title: "Client review", status: "pending", assignee: "Saksham" },
  ],
  deliverables: [
    { name: "Brand Video (60 sec)", status: "in-progress" },
    { name: "Social Media Cuts (15 sec)", status: "pending" },
    { name: "Behind the Scenes", status: "pending" },
  ],
  timeline: [
    { date: "2026-09-01", event: "Project Kickoff", user: "Saksham" },
    { date: "2026-09-05", event: "Script Approved", user: "Karthik" },
    { date: "2026-09-08", event: "Shoot Completed", user: "Amit" },
    { date: "2026-09-10", event: "Editing Started", user: "Karthik" },
  ],
};

const statusColors: Record<string, string> = {
  "planning": "bg-gray-100 text-gray-700",
  "in-production": "bg-blue-100 text-blue-700",
  "editing": "bg-purple-100 text-purple-700",
  "client-review": "bg-orange-100 text-orange-700",
  "revision": "bg-yellow-100 text-yellow-700",
  "approved": "bg-green-100 text-green-700",
  "completed": "bg-gray-200 text-gray-800",
};

export default function ProjectDetailPage() {
  const router = useRouter();

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Projects</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{projectDetail.name}</h1>
            <p className="text-xl text-gray-600">{projectDetail.client}</p>
          </div>
          <span className={`px-4 py-2 rounded-lg font-medium ${statusColors[projectDetail.status]}`}>
            {projectDetail.status.replace("-", " ").toUpperCase()}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-lg font-bold text-indigo-600">{projectDetail.progress}%</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{ width: `${projectDetail.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-600">Deadline</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {new Date(projectDetail.deadline).toLocaleDateString("en-IN")}
          </p>
          <p className="text-sm text-gray-500 mt-1">10 days remaining</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">Budget</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{(projectDetail.budget / 100000).toFixed(1)}L</p>
          <p className="text-sm text-gray-500 mt-1">₹{(projectDetail.spent / 100000).toFixed(1)}L spent</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Tasks</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {projectDetail.tasks.filter((t) => t.status === "completed").length}/{projectDetail.tasks.length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Completed</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">Team</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{projectDetail.team.length}</p>
          <p className="text-sm text-gray-500 mt-1">Members</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tasks & Deliverables */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tasks */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tasks</h2>
            <div className="space-y-3">
              {projectDetail.tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        task.status === "completed"
                          ? "bg-green-500"
                          : task.status === "in-progress"
                          ? "bg-blue-500"
                          : "bg-gray-300"
                      }`}
                    >
                      {task.status === "completed" && <CheckCircle2 className="w-3 h-3 text-white" />}
                      {task.status === "in-progress" && <Clock className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-500">Assigned to: {task.assignee}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "in-progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {task.status.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Deliverables</h2>
            <div className="space-y-3">
              {projectDetail.deliverables.map((deliverable, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium text-gray-900">{deliverable.name}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      deliverable.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : deliverable.status === "in-progress"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {deliverable.status.replace("-", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Team & Timeline */}
        <div className="space-y-6">
          {/* Team Members */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Team Members</h2>
            <div className="space-y-3">
              {projectDetail.team.map((member, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {member.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-600 transition-colors font-medium">
                + Add Member
              </button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Timeline</h2>
            <div className="space-y-4">
              {projectDetail.timeline.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-500" />
                    {idx < projectDetail.timeline.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-gray-900">{item.event}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString("en-IN")} • {item.user}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
