// Sidebar.tsx
"use client"
import React from 'react';
import { Button } from "@/components/ui/button";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] p-4">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <i className="fas fa-chart-line"></i>
          Dashboard
        </Button>
        <Button variant="secondary" className="w-full justify-start gap-3">
          <i className="fas fa-building"></i>
          Recruiters
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <i className="fas fa-user-graduate"></i>
          Students
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <i className="fas fa-chart-bar"></i>
          Analytics
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3">
          <i className="fas fa-briefcase"></i>
          Job Requests
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;