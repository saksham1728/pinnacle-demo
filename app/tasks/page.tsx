"use client";

import { useState } from "react";
import { CheckCircle2, Clock, AlertCircle, User, Calendar, Paperclip } from "lucide-react";

const tasks = [
  {
    id: "1",
    title: "Edit ABC Corp brand video",
    project: "Q4 Brand Campaign",
    assignedTo: "Karthik",
    priority: "high",
    status: "in-progress",
    deadline: "2026-09-10",
    progress: 60,
  },
  {
    id: "2",
    title: "Create social media graphics",
    project: "XYZ Brand Launch",
    assignedTo: "Priya",
    priority: "medium",
    status: "todo",
    deadline: "2026-09-12",
    progress: 0,
  },
  {
    id: "3",
    title: "Client review meeting preparation",
    project: "Fitness Hub Content",
    assignedTo: "Saksham",
    priority: "high",
    status: "in-progress",
    deadline: "2026-09-09",
    progress: 80,
  },
  {
    id: "4",
    title: "Script writing for tutorial series",
    project: "EduTech Academy",
    assignedTo: "Rahul",
    priority: "medium",
    status: "todo",
    deadline: "2026-09-15",
    progress: 0,
  },
  {
    id: "5",
    title: "Final deliverable upload",
    project: "Fashion Forward Campaign",
    assignedTo: "Neha",
    priority: "low",
    status: "review",
    deadline: "2026-09-11",
    progress: 90,
  },
  {
    id: "6",
    title: "Equipment checklist for shoot",
    project: "Luxury Stays Testimonials",
    assignedTo: "Amit",
    priority: "high",
    status: "todo",
    deadline: "2026-09-09",
    progress: 0,
  },
];

const statusConfig: Record<string, { label: string; bg: string; text: string }> = {
  todo: { label: "To Do", bg: "bg-gray-100", text: "text-gray-700" },
  "in-progress": { label: "In Progress", bg: "bg-blue-100", text: "text-blue-700" },
  review: { label: "Review", bg: "bg-yellow-100", text: "text-yellow-700" },
  done: { label: "Done", bg: "bg-green-100", text: "text-green-700" },
};

export default function Tasks() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const filteredTasks = tasks.filter((task) => {
    if (selectedStatus !== "all" && task.status !== selectedStatus) return false;
    if (selectedPriority !== "all" && task.priority !== selectedPriority) return false;
    return true;
  });

  const todoTasks = tasks.filter((t) => t.status === "todo").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length;
  const reviewTasks = tasks.filter((t) => t.status === "review").length;
  const overdueTasks = tasks.filter(
    (t) => new Date(t.deadline) < new Date() && t.status !== "done"
  ).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all team tasks</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg">
          + New Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-gray-600 text-sm">To Do</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{todoTasks}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-gray-600 text-sm">In Progress</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{inProgressTasks}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-gray-600 text-sm">In Review</span>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{reviewTasks}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-gray-600 text-sm">Overdue</span>
          </div>
          <p className="text-3xl font-bold text-red-600">{overdueTasks}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const status = statusConfig[task.status];
          const isOverdue = new Date(task.deadline) < new Date() && task.status !== "done";

          return (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">Project: {task.project}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-bold text-indigo-600">{task.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all"
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              {/* Task Meta */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{task.assignedTo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className={isOverdue ? "text-red-600 font-semibold" : ""}>
                    {new Date(task.deadline).toLocaleDateString("en-IN")}
                    {isOverdue && " (Overdue)"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4" />
                  <span>3 files</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-4 border-t flex gap-3">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Update Status
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
