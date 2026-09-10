"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { contentPipeline as initialContent } from "@/lib/dummy-data";
import { Video, Calendar, Users, GripVertical } from "lucide-react";

const stages = [
  { id: "idea", name: "Idea", color: "bg-gray-500" },
  { id: "brief", name: "Brief", color: "bg-blue-500" },
  { id: "script", name: "Script", color: "bg-indigo-500" },
  { id: "shoot", name: "Shoot", color: "bg-purple-500" },
  { id: "editing", name: "Editing", color: "bg-pink-500" },
  { id: "internal-review", name: "Internal Review", color: "bg-orange-500" },
  { id: "client-review", name: "Client Review", color: "bg-yellow-500" },
  { id: "revision", name: "Revision", color: "bg-red-500" },
  { id: "approved", name: "Approved", color: "bg-green-500" },
  { id: "scheduled", name: "Scheduled", color: "bg-teal-500" },
];

const platformColors: Record<string, string> = {
  "Instagram": "bg-pink-100 text-pink-700",
  "YouTube": "bg-red-100 text-red-700",
  "LinkedIn": "bg-blue-100 text-blue-700",
  "Facebook": "bg-indigo-100 text-indigo-700",
};

export default function ContentPipeline() {
  const [contentData, setContentData] = useState(initialContent);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedContent = contentData.map((content) => {
      if (content.id === draggableId) {
        return { ...content, stage: destination.droppableId };
      }
      return content;
    });

    setContentData(updatedContent);
  };
  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Content Production Pipeline</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Track content from idea to publication</p>
        </div>
        <button className="px-4 md:px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm md:text-base whitespace-nowrap">
          + New Content
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
          <div className="flex items-center gap-2 mb-1">
            <Video className="w-3 h-3 md:w-4 md:h-4 text-indigo-500" />
            <p className="text-gray-600 text-xs md:text-sm">Total Content</p>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">48</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm mb-1">In Production</p>
          <p className="text-xl md:text-2xl font-bold text-blue-600">12</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm mb-1">Client Review</p>
          <p className="text-xl md:text-2xl font-bold text-orange-600">9</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm mb-1">Approved</p>
          <p className="text-xl md:text-2xl font-bold text-green-600">15</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-3 md:p-4">
          <p className="text-gray-600 text-xs md:text-sm mb-1">Published</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">32</p>
        </div>
      </div>

      {/* Kanban Board with Drag & Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.slice(0, 6).map((stage) => {
            const stageContent = contentData.filter(content => content.stage === stage.id);

            return (
              <div key={stage.id} className="flex-shrink-0 w-72 md:w-80">
                {/* Column Header */}
                <div className={`${stage.color} text-white rounded-t-lg p-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">{stage.name}</h3>
                    <span className="bg-white/20 px-2 py-1 rounded text-sm font-medium">
                      {stageContent.length}
                    </span>
                  </div>
                </div>

                {/* Droppable Cards Container */}
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`bg-gray-100 rounded-b-lg p-4 min-h-[600px] transition-colors ${
                        snapshot.isDraggingOver ? "bg-gray-200" : ""
                      }`}
                    >
                      {stageContent.map((content, index) => (
                        <Draggable key={content.id} draggableId={content.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all mb-3 ${
                                snapshot.isDragging ? "shadow-xl rotate-2 scale-105" : ""
                              }`}
                            >
                              {/* Platform Badge with Drag Handle */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    platformColors[content.platform] || "bg-gray-100 text-gray-700"
                                  }`}>
                                    {content.platform}
                                  </span>
                                </div>
                                <Video className="w-4 h-4 text-gray-400" />
                              </div>

                              {/* Title */}
                              <h4 className="font-bold text-gray-900 mb-2">{content.title}</h4>

                              {/* Client */}
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                <Users className="w-4 h-4" />
                                <span>{content.client}</span>
                              </div>

                              {/* Deadline */}
                              <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t">
                                <Calendar className="w-3 h-3" />
                                <span>Due: {new Date(content.deadline).toLocaleDateString('en-IN')}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {/* Empty State */}
                      {stageContent.length === 0 && (
                        <div className="text-center text-gray-400 py-8">
                          <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Drop content here</p>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
