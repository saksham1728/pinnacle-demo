"use client";

import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

interface UpdateStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  projectName: string;
  onUpdate: (newStatus: string, progress: number) => void;
}

const statuses = [
  { value: "planning", label: "Planning", color: "bg-gray-500", progress: 10 },
  { value: "in-production", label: "In Production", color: "bg-blue-500", progress: 40 },
  { value: "editing", label: "Editing", color: "bg-purple-500", progress: 60 },
  { value: "client-review", label: "Client Review", color: "bg-orange-500", progress: 80 },
  { value: "revision", label: "Revision", color: "bg-yellow-500", progress: 70 },
  { value: "approved", label: "Approved", color: "bg-green-500", progress: 95 },
  { value: "completed", label: "Completed", color: "bg-gray-800", progress: 100 },
];

export default function UpdateStatusModal({
  isOpen,
  onClose,
  currentStatus,
  projectName,
  onUpdate,
}: UpdateStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [customProgress, setCustomProgress] = useState(
    statuses.find((s) => s.value === currentStatus)?.progress || 0
  );

  if (!isOpen) return null;

  const handleSubmit = () => {
    onUpdate(selectedStatus, customProgress);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl m-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-xl font-bold">Update Project Status</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <p className="text-sm text-gray-600 mb-1">Project:</p>
            <p className="font-bold text-gray-900">{projectName}</p>
          </div>

          {/* Status Selection - 2 Column Grid */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select New Status
            </label>
            <div className="grid grid-cols-2 gap-3">
              {statuses.map((status) => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => {
                    setSelectedStatus(status.value);
                    setCustomProgress(status.progress);
                  }}
                  className={`flex items-center justify-between p-3 border-2 rounded-lg transition-all ${
                    selectedStatus === status.value
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${status.color}`} />
                    <span className="font-medium text-gray-900 text-sm">{status.label}</span>
                  </div>
                  {selectedStatus === status.value && (
                    <CheckCircle className="w-4 h-4 text-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Progress: {customProgress}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={customProgress}
              onChange={(e) => setCustomProgress(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Update Status
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
