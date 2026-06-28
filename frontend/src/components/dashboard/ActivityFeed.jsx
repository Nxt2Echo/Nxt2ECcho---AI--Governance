import { activityFeed } from "@/data/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, Brain, AlertTriangle, CheckCircle2, FileBarChart, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const typeConfig = {
  escalation: { icon: ArrowUp, color: "text-amber-400", bg: "bg-amber-500/10" },
  resolved: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ai: { icon: Brain, color: "text-purple-400", bg: "bg-purple-500/10" },
  critical: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
  report: { icon: FileBarChart, color: "text-blue-400", bg: "bg-blue-500/10" },
};

export default function ActivityFeed() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Activity size={15} className="text-primary" />
          <CardTitle className="text-sm">Activity Feed</CardTitle>
          <span className="ml-auto text-[10px] text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-3">
            {activityFeed.map((item, index) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;
              return (
                <div key={item.id} className="flex items-start gap-3 relative">
                  <div className={cn(
                    "relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                    config.bg
                  )}>
                    <Icon size={12} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <p className="text-[11px] text-foreground font-medium leading-snug">{item.action}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground">{item.actor}</span>
                      <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
