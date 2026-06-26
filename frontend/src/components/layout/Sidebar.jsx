import {
  LayoutDashboard,
  FileText,
  Brain,
  Map,
  BarChart3,
  Settings,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Complaints", path: "/complaints", icon: FileText },
  { name: "AI Analysis", path: "/analysis", icon: Brain },
  { name: "Heatmap", path: "/heatmap", icon: Map },
  { name: "Reports", path: "/reports", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          Nxt2Echo
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          AI Governance
        </p>
      </div>

      <nav className="flex-1 mt-6 px-3">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active = location.pathname === item.path;

          return (

            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all
              ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />

              {item.name}

            </Link>

          );
        })}

      </nav>

      <div className="p-5 border-t border-slate-800">

        <p className="text-xs text-slate-500">

          Nxt2Echo v1.0

        </p>

      </div>

    </aside>
  );
}