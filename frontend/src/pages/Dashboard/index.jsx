import DashboardLayout from "@/layouts/DashboardLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import ComplaintTrend from "@/components/dashboard/ComplaintTrend";
import CategoryChart from "@/components/dashboard/CategoryChart";
import DepartmentPerformance from "@/components/dashboard/DepartmentPerformance";
import RecentComplaints from "@/components/dashboard/RecentComplaints";
import AIInsights from "@/components/dashboard/AIInsights";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { Brain, RefreshCw } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Governance Intelligence Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Real-time overview of citizen complaints and AI-powered insights · Bengaluru, KA
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
              <Brain size={12} />
              AI Engine Active
            </div>
            <button className="p-1.5 rounded-lg hover:bg-accent border border-border transition-colors text-muted-foreground hover:text-foreground">
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsCards />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ComplaintTrend />
          </div>
          <CategoryChart />
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2">
            <RecentComplaints />
          </div>
          <DepartmentPerformance />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AIInsights />
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  );
}