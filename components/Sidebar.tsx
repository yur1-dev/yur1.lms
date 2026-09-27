"use client";

import {
  DashboardIcon,
  CoursesIcon,
  ProgressIcon,
  SettingsIcon,
} from "./icons";

type View = "dashboard" | "courses" | "progress" | "settings";

export default function Sidebar({
  active,
  onNavigate,
}: {
  active: View;
  onNavigate: (v: View) => void;
}) {
  const items: { key: View; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { key: "courses", label: "My Courses", icon: <CoursesIcon /> },
    { key: "progress", label: "Progress", icon: <ProgressIcon /> },
    { key: "settings", label: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <div className="w-[230px] shrink-0 bg-card border-r border-white/[0.06] p-6 flex flex-col gap-1.5">
      <div className="font-bold text-lg mb-6 px-2">
        yur1<span className="text-accent">.lms</span>
      </div>
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <div
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-colors ${
              isActive
                ? "bg-accent/10 text-accent font-semibold"
                : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        );
      })}
    </div>
  );
}
