"use client";

import { FileText, Eye, CheckCircle, Clock, XCircle, Download, Send } from "lucide-react";

const proposals = [
  {
    id: "PROP-001",
    client: "TechStart Solutions",
    title: "Q4 Video Production Package",
    value: 500000,
    status: "sent",
    sentDate: "2026-09-05",
    expiryDate: "2026-09-20",
    viewCount: 3,
  },
  {
    id: "PROP-002",
    client: "Fitness Hub",
    title: "Social Media Management - 3 Months",
    value: 250000,
    status: "viewed",
    sentDate: "2026-09-03",
    expiryDate: "2026-09-18",
    viewCount: 5,
  },
  {
    id: "PROP-003",
    client: "Fashion Forward",
    title: "Brand Campaign Production",
    value: 800000,
    status: "accepted",
    sentDate: "2026-09-01",
    expiryDate: "2026-09-16",
    viewCount: 7,
  },
  {
    id: "PROP-004",
    client: "Urban Cafe",
    title: "Menu Photography & Videos",
    value: 150000,
    status: "draft",
    sentDate: "",
    expiryDate: "",
    viewCount: 0,
  },
  {
    id: "PROP-005",
    client: "EduTech Academy",
    title: "Educational Video Series",
    value: 350000,
    status: "expired",
    sentDate: "2026-08-15",
    expiryDate: "2026-08-30",
    viewCount: 1,
  },
];

const statusConfig: Record<string, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  draft: {
    label: "Draft",
    bg: "bg-gray-100",
    text: "text-gray-700",
    icon: <FileText className="w-4 h-4" />,
  },
  sent: {
    label: "Sent",
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: <Send className="w-4 h-4" />,
  },
  viewed: {
    label: "Viewed",
    bg: "bg-purple-100",
    text: "text-purple-700",
    icon: <Eye className="w-4 h-4" />,
  },
  accepted: {
    label: "Accepted",
    bg: "bg-green-100",
    text: "text-green-700",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  expired: {
    label: "Expired",
    bg: "bg-red-100",
    text: "text-red-700",
    icon: <XCircle className="w-4 h-4" />,
  },
};

export default function Proposals() {
  const totalValue = proposals.reduce((sum, p) => sum + p.value, 0);
  const acceptedValue = proposals
    .filter((p) => p.status === "accepted")
    .reduce((sum, p) => sum + p.value, 0);
  const pendingCount = proposals.filter((p) => ["sent", "viewed"].includes(p.status)).length;
  const conversionRate = ((proposals.filter((p) => p.status === "accepted").length / proposals.length) * 100).toFixed(0);

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Proposals & Quotations</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Create and track proposals with e-signatures</p>
        </div>
        <button className="px-4 md:px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg text-sm md:text-base whitespace-nowrap">
          + Create Proposal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm opacity-90">Total Value</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold">₹{(totalValue / 100000).toFixed(1)}L</p>
          <p className="text-xs md:text-sm opacity-75 mt-1">{proposals.length} proposals</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm opacity-90">Accepted</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold">₹{(acceptedValue / 100000).toFixed(1)}L</p>
          <p className="text-xs md:text-sm opacity-75 mt-1">{conversionRate}% conversion</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm opacity-90">Pending</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold">{pendingCount}</p>
          <p className="text-xs md:text-sm opacity-75 mt-1">Awaiting response</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-4 md:p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm opacity-90">Avg. Views</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold">
            {(proposals.reduce((sum, p) => sum + p.viewCount, 0) / proposals.length).toFixed(1)}
          </p>
          <p className="text-xs md:text-sm opacity-75 mt-1">Per proposal</p>
        </div>
      </div>

      {/* Proposals List */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">All Proposals</h2>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Proposal ID</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Client</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Title</th>
                  <th className="text-right py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Value</th>
                  <th className="text-center py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Views</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Sent Date</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Expiry</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Status</th>
                  <th className="text-left py-3 px-4 text-xs md:text-sm font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => {
                  const config = statusConfig[proposal.status];
                  return (
                    <tr key={proposal.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="font-mono text-sm font-medium text-gray-900">{proposal.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-900">{proposal.client}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-700">{proposal.title}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          ₹{(proposal.value / 100000).toFixed(1)}L
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-sm text-gray-700">{proposal.viewCount}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">
                          {proposal.sentDate ? new Date(proposal.sentDate).toLocaleDateString("en-IN") : "-"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-600">
                          {proposal.expiryDate ? new Date(proposal.expiryDate).toLocaleDateString("en-IN") : "-"}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
                        >
                          {config.icon}
                          {config.label}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}