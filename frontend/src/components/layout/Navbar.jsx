import { Bell, Search, ChevronDown, Zap, AlertCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const pageTitles = {
  "/": { title: "Dashboard", sub: "AI Governance Intelligence Overview" },
  "/complaints": { title: "Complaints", sub: "Manage and track citizen complaints" },
  "/analysis": { title: "AI Analysis", sub: "Machine learning insights and predictions" },
  "/heatmap": { title: "Heatmap", sub: "Geographic complaint distribution" },
  "/reports": { title: "Reports", sub: "Analytics, exports and summaries" },
  "/settings": { title: "Settings", sub: "Platform configuration and preferences" },
};

export default function Navbar() {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const page = pageTitles[location.pathname] || pageTitles["/"];

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
      {/* Page Title */}
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-foreground leading-tight">{page.title}</h2>
        <p className="text-xs text-muted-foreground leading-tight">{page.sub}</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* AI Status Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">AI Online · 94.2%</span>
        </div>

        {/* Alert Badge */}
        <button className="relative p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
          <AlertCircle size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Notifications */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
        >
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-border mx-1" />

        {/* User */}
        <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors">
          <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
            GO
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-medium text-foreground leading-none">Gov. Officer</p>
          </div>
          <ChevronDown size={12} className="text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}