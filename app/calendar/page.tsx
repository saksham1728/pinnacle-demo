"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const contentSchedule = [
  { date: 9, title: "ABC Corp - Brand Video", client: "ABC Corp", platform: "Instagram", status: "scheduled" },
  { date: 10, title: "XYZ Brand - Product Launch", client: "XYZ Brand", platform: "YouTube", status: "scheduled" },
  { date: 11, title: "Fitness Hub - Workout Reel", client: "Fitness Hub", platform: "Instagram", status: "published" },
  { date: 12, title: "Fashion Forward - Collection Post", client: "Fashion Forward", platform: "Instagram", status: "scheduled" },
  { date: 13, title: "EduTech - Tutorial Series", client: "EduTech", platform: "YouTube", status: "scheduled" },
  { date: 15, title: "Luxury Stays - Testimonial", client: "Luxury Stays", platform: "LinkedIn", status: "draft" },
  { date: 16, title: "ABC Corp - Behind the Scenes", client: "ABC Corp", platform: "Instagram", status: "scheduled" },
  { date: 18, title: "XYZ Brand - Customer Story", client: "XYZ Brand", platform: "Facebook", status: "draft" },
];

const platformColors: Record<string, string> = {
  Instagram: "bg-pink-500",
  YouTube: "bg-red-500",
  LinkedIn: "bg-blue-600",
  Facebook: "bg-indigo-600",
};

const statusColors: Record<string, string> = {
  scheduled: "border-green-500",
  published: "border-gray-400",
  draft: "border-yellow-500",
};

export default function Calendar() {
  const [currentMonth] = useState(8); // September (0-indexed)
  const [currentYear] = useState(2026);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, () => null);

  const getContentForDate = (date: number) => {
    return contentSchedule.filter((content) => content.date === date);
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Content Calendar</h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">Visual calendar with all scheduled content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm">Total Scheduled</p>
          <p className="text-xl md:text-2xl font-bold text-green-600">
            {contentSchedule.filter((c) => c.status === "scheduled").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm">Published</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            {contentSchedule.filter((c) => c.status === "published").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm">Drafts</p>
          <p className="text-xl md:text-2xl font-bold text-yellow-600">
            {contentSchedule.filter((c) => c.status === "draft").length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm">This Week</p>
          <p className="text-xl md:text-2xl font-bold text-indigo-600">5</p>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button className="px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-indigo-700">
              Today
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-700 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for first week */}
          {emptyDays.map((_, idx) => (
            <div key={`empty-${idx}`} className="min-h-32 border border-gray-200 rounded-lg bg-gray-50" />
          ))}

          {/* Calendar Days */}
          {days.map((date) => {
            const content = getContentForDate(date);
            const isToday = date === 9;

            return (
              <div
                key={date}
                className={`min-h-32 border-2 rounded-lg p-2 hover:shadow-md transition-shadow ${
                  isToday ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"
                }`}
              >
                <div className={`text-sm font-semibold mb-2 ${isToday ? "text-indigo-600" : "text-gray-900"}`}>
                  {date}
                </div>
                <div className="space-y-1">
                  {content.map((item, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-2 rounded border-l-4 ${statusColors[item.status]} bg-white cursor-pointer hover:shadow-sm transition-shadow`}
                    >
                      <div className={`w-2 h-2 rounded-full ${platformColors[item.platform]} inline-block mr-1`} />
                      <span className="font-medium truncate block">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-pink-500" />
            <span className="text-sm text-gray-700">Instagram</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-sm text-gray-700">YouTube</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-600" />
            <span className="text-sm text-gray-700">LinkedIn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-indigo-600" />
            <span className="text-sm text-gray-700">Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
}
