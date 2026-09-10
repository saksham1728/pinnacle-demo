"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { leads as initialLeads } from "@/lib/dummy-data";
import { Phone, Mail, Calendar, DollarSign, GripVertical } from "lucide-react";
import AddLeadModal from "@/components/AddLeadModal";

const stages = [
  { id: "new", name: "New", color: "bg-gray-500" },
  { id: "contacted", name: "Contacted", color: "bg-blue-500" },
  { id: "qualified", name: "Qualified", color: "bg-indigo-500" },
  { id: "meeting", name: "Meeting", color: "bg-purple-500" },
  { id: "proposal", name: "Proposal", color: "bg-orange-500" },
  { id: "negotiation", name: "Negotiation", color: "bg-yellow-500" },
];

export default function CRM() {
  const [leadData, setLeadData] = useState(initialLeads);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Dropped in same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Update lead stage
    const updatedLeads = leadData.map((lead) => {
      if (lead.id === draggableId) {
        return { ...lead, stage: destination.droppableId };
      }
      return lead;
    });

    setLeadData(updatedLeads);
  };

  const handleAddLead = (newLead: any) => {
    setLeadData([...leadData, newLead]);
  };

  return (
    <div className="p-8">
      {/* Add Lead Modal */}
      <AddLeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddLead}
      />

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-gray-600 mt-1">Visual Kanban board for lead management</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
        >
          + Add New Lead
        </button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Total Leads</p>
          <p className="text-2xl font-bold text-gray-900">{leadData.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Pipeline Value</p>
          <p className="text-2xl font-bold text-green-600">₹{(leadData.reduce((sum, l) => sum + l.value, 0) / 100000).toFixed(1)}L</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">High Priority</p>
          <p className="text-2xl font-bold text-red-600">{leadData.filter(l => l.priority === "high").length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <p className="text-gray-600 text-sm">Conversion Rate</p>
          <p className="text-2xl font-bold text-indigo-600">24%</p>
        </div>
      </div>

      {/* Kanban Board with Drag & Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageLeads = leadData.filter(lead => lead.stage === stage.id);
            const stageValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);

            return (
              <div key={stage.id} className="flex-shrink-0 w-80">
                {/* Column Header */}
                <div className={`${stage.color} text-white rounded-t-lg p-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">{stage.name}</h3>
                    <span className="bg-white/20 px-2 py-1 rounded text-sm font-medium">
                      {stageLeads.length}
                    </span>
                  </div>
                  <p className="text-sm mt-1 opacity-90">
                    ₹{(stageValue / 100000).toFixed(1)}L
                  </p>
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
                      {stageLeads.map((lead, index) => (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all mb-3 ${
                                snapshot.isDragging ? "shadow-xl rotate-2 scale-105" : ""
                              }`}
                            >
                              {/* Drag Handle */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <GripVertical className="w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    lead.priority === "high" 
                                      ? "bg-red-100 text-red-700" 
                                      : "bg-blue-100 text-blue-700"
                                  }`}>
                                    {lead.priority.toUpperCase()}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500">{lead.source}</span>
                              </div>

                              {/* Company Name */}
                              <h4 className="font-bold text-gray-900 mb-2">{lead.company}</h4>

                              {/* Contact Info */}
                              <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Phone className="w-4 h-4" />
                                  <span>{lead.contact}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <DollarSign className="w-4 h-4" />
                                  <span className="font-semibold text-green-600">
                                    ₹{(lead.value / 100000).toFixed(1)}L
                                  </span>
                                </div>
                              </div>

                              {/* Next Follow Up */}
                              <div className="flex items-center gap-2 text-xs text-gray-500 pt-3 border-t">
                                <Calendar className="w-3 h-3" />
                                <span>Next: {new Date(lead.nextFollowUp).toLocaleDateString('en-IN')}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      
                      {/* Empty State */}
                      {stageLeads.length === 0 && (
                        <div className="text-center text-gray-400 py-8">
                          <p className="text-sm">Drop leads here</p>
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
