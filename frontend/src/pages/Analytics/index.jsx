import DashboardLayout from "@/layouts/DashboardLayout";
import { aiInsights, complaints, categoryData } from "@/data/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Brain, Copy, AlertTriangle, TrendingUp, Network, CheckCircle2,
  Smile, Meh, Frown, ShieldAlert, Zap, Activity, BarChart2,
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from "recharts";

const sentimentData = complaints.slice(0, 8).map((c) => ({
  id: c.id,
  title: c.title.slice(0, 30) + "…",
  sentiment: c.sentiment,
  score: c.aiScore,
  risk: c.risk,
}));

const radarData = [
  { subject: "Accuracy", A: 94 },
  { subject: "Speed", A: 88 },
  { subject: "Coverage", A: 91 },
  { subject: "Deduplication", A: 96 },
  { subject: "Routing", A: 87 },
  { subject: "Prediction", A: 82 },
];

const duplicateClusters = [
  { group: "Cluster A — Pothole issues MG Road", count: 23, merged: 19, similarity: 97 },
  { group: "Cluster B — Water shortage Whitefield", count: 17, merged: 14, similarity: 94 },
  { group: "Cluster C — Garbage BTM Layout", count: 12, merged: 10, similarity: 91 },
  { group: "Cluster D — Street lights Jayanagar", count: 9, merged: 8, similarity: 89 },
  { group: "Cluster E — Sewage HSR Layout", count: 8, merged: 7, similarity: 93 },
];

const sentimentIcon = { Angry: Frown, Frustrated: Frown, Outraged: Frown, Alarmed: AlertTriangle, Concerned: Meh, Annoyed: Meh, Disappointed: Meh, Fearful: AlertTriangle };
const sentimentColor = {
  Angry: "text-red-400", Frustrated: "text-orange-400", Outraged: "text-red-500",
  Alarmed: "text-red-400", Concerned: "text-amber-400", Annoyed: "text-amber-400",
  Disappointed: "text-yellow-400", Fearful: "text-red-300",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover p-2 shadow-xl text-xs">
      <p className="font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.dataKey}: {p.value}</p>
      ))}
    </div>
  );
};

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">AI Analysis Engine</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Machine learning insights, classification, and predictive intelligence
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
            <Brain size={14} className="text-primary" />
            <div>
              <p className="text-[10px] text-muted-foreground">Model Version</p>
              <p className="text-xs font-bold text-primary">NxtAI v2.4.1</p>
            </div>
          </div>
        </div>

        {/* Model Performance Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Classification Accuracy", value: "94.2%", icon: Brain, color: "text-primary", bg: "bg-primary/10" },
            { label: "Duplicates Detected", value: "312", icon: Copy, color: "text-purple-400", bg: "bg-purple-500/10" },
            { label: "Risk Alerts Generated", value: "47", icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10" },
            { label: "Dept. Routing Accuracy", value: "91.7%", icon: Zap, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <Card key={m.label} className="border-border">
                <CardContent className="p-4">
                  <div className={`inline-flex p-2 rounded-lg ${m.bg} mb-2`}>
                    <Icon size={14} className={m.color} />
                  </div>
                  <p className="text-xl font-bold text-foreground">{m.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="insights">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="duplicates">Duplicate Detection</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
            <TabsTrigger value="model">Model Performance</TabsTrigger>
          </TabsList>

          {/* Insights Tab */}
          <TabsContent value="insights">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              {aiInsights.map((insight) => (
                <Card key={insight.id} className="border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="info" className="text-[10px]">{insight.type}</Badge>
                      <Badge variant={insight.priority === "Critical" ? "critical" : insight.priority === "High" ? "high" : "medium"} className="text-[10px]">
                        {insight.priority}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{insight.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{insight.description}</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">AI Confidence</span>
                        <span className="font-medium text-primary">{insight.confidence}%</span>
                      </div>
                      <Progress value={insight.confidence} indicatorClassName="bg-primary" />
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Activity size={10} />
                        {insight.department}
                      </div>
                      <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                        {insight.action} →
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Duplicates Tab */}
          <TabsContent value="duplicates">
            <div className="mt-4 space-y-3">
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Copy size={14} className="text-purple-400" />
                    <CardTitle className="text-sm">Detected Duplicate Clusters</CardTitle>
                    <span className="text-[10px] ml-auto text-muted-foreground">312 duplicates → 47 unique issues</span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  {duplicateClusters.map((cluster, i) => (
                    <div key={i} className="p-3 rounded-lg border border-border bg-background/50">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-foreground">{cluster.group}</p>
                        <Badge variant="purple" className="text-[10px]">{cluster.count} complaints</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
                        <span>Merged: <span className="text-foreground font-medium">{cluster.merged}</span></span>
                        <span>Similarity: <span className="text-primary font-medium">{cluster.similarity}%</span></span>
                      </div>
                      <div className="mt-2">
                        <Progress value={cluster.similarity} indicatorClassName="bg-purple-500" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sentiment Tab */}
          <TabsContent value="sentiment">
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Smile size={14} className="text-primary" /> Sentiment Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    {[
                      { label: "Negative (Angry/Frustrated)", pct: 58, color: "bg-red-500" },
                      { label: "Neutral (Concerned/Disappointed)", pct: 31, color: "bg-amber-500" },
                      { label: "Positive (Satisfied)", pct: 11, color: "bg-emerald-500" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{s.label}</span>
                          <span className="font-medium text-foreground">{s.pct}%</span>
                        </div>
                        <Progress value={s.pct} indicatorClassName={s.color} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart2 size={14} className="text-primary" /> Risk Score by Complaint
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={sentimentData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" />
                      <XAxis dataKey="id" tick={{ fontSize: 9 }} />
                      <YAxis tick={{ fontSize: 9 }} domain={[0, 10]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="risk" radius={[3, 3, 0, 0]}>
                        {sentimentData.map((entry) => (
                          <Cell
                            key={entry.id}
                            fill={entry.risk >= 9 ? "#ef4444" : entry.risk >= 7 ? "#f97316" : "#22c55e"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="border-border lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Complaint-Level Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2">
                  {sentimentData.map((c) => {
                    const Icon = sentimentIcon[c.sentiment] ?? Meh;
                    const color = sentimentColor[c.sentiment] ?? "text-muted-foreground";
                    return (
                      <div key={c.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                        <Icon size={14} className={`shrink-0 ${color}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{c.title}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[11px] font-medium ${color}`}>{c.sentiment}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-muted-foreground">Risk:</span>
                            <span className={`text-[11px] font-bold ${c.risk >= 9 ? "text-red-400" : c.risk >= 7 ? "text-orange-400" : "text-emerald-400"}`}>
                              {c.risk}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Model Tab */}
          <TabsContent value="model">
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Brain size={14} className="text-primary" /> Model Capability Radar
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="oklch(1 0 0 / 8%)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "oklch(0.62 0.03 264)" }} />
                      <Radar name="Model" dataKey="A" stroke="oklch(0.6 0.22 264)" fill="oklch(0.6 0.22 264)" fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Department Routing Accuracy</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  {[
                    { dept: "BBMP", accuracy: 94, count: 1876 },
                    { dept: "BWSSB", accuracy: 89, count: 892 },
                    { dept: "BESCOM", accuracy: 97, count: 734 },
                    { dept: "PWD", accuracy: 87, count: 621 },
                    { dept: "KSPCB", accuracy: 91, count: 312 },
                  ].map((d) => (
                    <div key={d.dept}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-foreground">{d.dept}</span>
                        <span className="text-primary font-bold">{d.accuracy}%</span>
                      </div>
                      <Progress value={d.accuracy} indicatorClassName="bg-primary" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}