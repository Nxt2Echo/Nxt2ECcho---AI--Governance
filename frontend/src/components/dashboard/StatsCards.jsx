import { dashboardStats } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Brain,
  Timer,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const stats = [
  {
    label: "Total Complaints",
    value: "4,827",
    change: "+12.3%",
    trend: "up",
    icon: FileText,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    sub: "All time",
  },
  {
    label: "Pending",
    value: "1,243",
    change: "+5.2%",
    trend: "up",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    sub: "Awaiting action",
  },
  {
    label: "Resolved",
    value: "3,284",
    change: "+18.7%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    sub: "This month",
  },
  {
    label: "Critical Issues",
    value: "89",
    change: "-3.1%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    sub: "Needs immediate action",
  },
  {
    label: "AI Confidence",
    value: "94.2%",
    change: "+1.8%",
    trend: "up",
    icon: Brain,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    sub: "Model accuracy",
  },
  {
    label: "Avg. Resolution",
    value: "3.7d",
    change: "-0.8d",
    trend: "down",
    icon: Timer,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    sub: "Faster than last month",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor =
          stat.label === "Critical Issues"
            ? stat.trend === "down" ? "text-emerald-400" : "text-red-400"
            : stat.label === "Avg. Resolution"
            ? stat.trend === "down" ? "text-emerald-400" : "text-red-400"
            : stat.trend === "up" ? "text-emerald-400" : "text-red-400";

        return (
          <Card
            key={stat.label}
            className={`border ${stat.border} bg-card hover:bg-accent/20 transition-all duration-200 cursor-default group`}
          >
            <CardContent className="p-4">
              <div className={`inline-flex p-2 rounded-lg ${stat.bg} ${stat.border} border mb-3`}>
                <Icon size={14} className={stat.color} />
              </div>
              <p className="text-xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 mb-2">{stat.label}</p>
              <div className="flex items-center gap-1">
                <TrendIcon size={10} className={trendColor} />
                <span className={`text-[10px] font-medium ${trendColor}`}>{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
