"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CheckSquare,
  Video,
  Calendar,
  DollarSign,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "CRM / Leads", href: "/crm", icon: Users },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Content Pipeline", href: "/content", icon: Video },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Finance", href: "/finance", icon: DollarSign },
  { name: "Proposals", href: "/proposals", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
          Pinnacle Studio
        </h1>
        <p className="text-xs text-indigo-200 mt-1">Agency Management OS</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-white text-indigo-900 shadow-lg"
                  : "text-indigo-100 hover:bg-indigo-700/50"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="mt-auto pt-6 border-t border-indigo-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center font-bold">
            SK
          </div>
          <div>
            <p className="font-semibold text-sm">Saksham</p>
            <p className="text-xs text-indigo-200">Founder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
