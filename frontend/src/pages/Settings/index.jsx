import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  User, Bell, Palette, Brain, Shield, Key,
  Save, Mail, Phone, Building2, Globe, Moon,
  Sun, Monitor, Check, AlertTriangle, Lock,
} from "lucide-react";

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <div className="ml-4 shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        enabled ? "bg-primary" : "bg-secondary"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${
          enabled ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

const APPEARANCE_OPTIONS = [
  { id: "dark", label: "Dark", icon: Moon },
  { id: "light", label: "Light", icon: Sun },
  { id: "system", label: "System", icon: Monitor },
];

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Government Officer",
    email: "officer@bbmp.gov.in",
    phone: "+91 98765 43210",
    department: "BBMP",
    city: "Bengaluru",
    role: "Senior Administrator",
  });
  const [notifications, setNotifications] = useState({
    critical: true, highPriority: true, dailyReport: true,
    weeklyReport: false, aiInsights: true, emailAlerts: true,
    smsAlerts: false, duplicateDetected: true,
  });
  const [appearance, setAppearance] = useState("dark");
  const [aiPrefs, setAiPrefs] = useState({
    autoClassify: true, autoMerge: false, sentimentAnalysis: true,
    predictiveAlerts: true, routingOptimization: true, minConfidence: 80,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Settings</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage your account, preferences, and platform configuration
            </p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              saved
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                : "bg-primary text-primary-foreground hover:bg-primary/80"
            }`}
          >
            {saved ? <Check size={13} /> : <Save size={13} />}
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="bg-muted/50 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="profile" className="flex items-center gap-1.5 text-xs">
              <User size={12} /> Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1.5 text-xs">
              <Bell size={12} /> Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-1.5 text-xs">
              <Palette size={12} /> Appearance
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-1.5 text-xs">
              <Brain size={12} /> AI Preferences
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1.5 text-xs">
              <Shield size={12} /> Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="mt-4 space-y-4">
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User size={14} className="text-primary" /> Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-5 p-4 rounded-xl bg-card border border-border">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 border-2 border-primary/30 flex items-center justify-center text-xl font-bold text-primary">
                      GO
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{profile.name}</p>
                      <p className="text-sm text-muted-foreground">{profile.role}</p>
                      <Badge variant="info" className="text-[10px] mt-1">{profile.department}</Badge>
                    </div>
                    <button className="ml-auto text-xs text-primary hover:text-primary/80 border border-primary/20 rounded-lg px-3 py-1.5 transition-colors hover:bg-primary/10">
                      Change Photo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Full Name", field: "name", icon: User },
                      { label: "Email Address", field: "email", icon: Mail },
                      { label: "Phone Number", field: "phone", icon: Phone },
                      { label: "Department", field: "department", icon: Building2 },
                      { label: "City", field: "city", icon: Globe },
                      { label: "Role", field: "role", icon: User },
                    ].map(({ label, field, icon: Icon }) => (
                      <div key={field}>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                          <span className="flex items-center gap-1"><Icon size={11} /> {label}</span>
                        </label>
                        <Input
                          value={profile[field]}
                          onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
                          className="h-9 text-sm bg-background"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="mt-4 space-y-4">
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Bell size={14} className="text-primary" /> Alert Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 divide-y divide-border">
                  {[
                    { key: "critical", label: "Critical Complaints", desc: "Immediate alert for Critical priority complaints" },
                    { key: "highPriority", label: "High Priority Alerts", desc: "Notify when new High priority complaints arrive" },
                    { key: "aiInsights", label: "AI Insights", desc: "Get notified when AI detects important patterns" },
                    { key: "duplicateDetected", label: "Duplicate Detection", desc: "Alert when AI merges duplicate complaints" },
                    { key: "dailyReport", label: "Daily Report", desc: "Receive daily summary every morning" },
                    { key: "weeklyReport", label: "Weekly Report", desc: "Receive weekly analytics digest on Mondays" },
                  ].map(({ key, label, desc }) => (
                    <SettingRow key={key} label={label} description={desc}>
                      <Toggle
                        enabled={notifications[key]}
                        onChange={(v) => setNotifications({ ...notifications, [key]: v })}
                      />
                    </SettingRow>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Mail size={14} className="text-primary" /> Delivery Channels
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 divide-y divide-border">
                  {[
                    { key: "emailAlerts", label: "Email Notifications", desc: "officer@bbmp.gov.in" },
                    { key: "smsAlerts", label: "SMS Notifications", desc: "+91 98765 43210" },
                  ].map(({ key, label, desc }) => (
                    <SettingRow key={key} label={label} description={desc}>
                      <Toggle
                        enabled={notifications[key]}
                        onChange={(v) => setNotifications({ ...notifications, [key]: v })}
                      />
                    </SettingRow>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <div className="mt-4">
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Palette size={14} className="text-primary" /> Theme
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {APPEARANCE_OPTIONS.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setAppearance(id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          appearance === id
                            ? "border-primary bg-primary/10"
                            : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <Icon size={22} className={appearance === id ? "text-primary" : "text-muted-foreground"} />
                        <span className={`text-xs font-medium ${appearance === id ? "text-primary" : "text-muted-foreground"}`}>
                          {label}
                        </span>
                        {appearance === id && (
                          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <Check size={10} className="text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <SettingRow label="Compact Mode" description="Reduce spacing for denser information display">
                    <Toggle enabled={false} onChange={() => {}} />
                  </SettingRow>
                  <SettingRow label="Animations" description="Enable smooth transitions and micro-animations">
                    <Toggle enabled={true} onChange={() => {}} />
                  </SettingRow>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Preferences Tab */}
          <TabsContent value="ai">
            <div className="mt-4 space-y-4">
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Brain size={14} className="text-primary" /> AI Engine Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 divide-y divide-border">
                  {[
                    { key: "autoClassify", label: "Auto-Classification", desc: "Automatically classify incoming complaints using AI" },
                    { key: "autoMerge", label: "Auto-Merge Duplicates", desc: "Automatically merge detected duplicate complaints" },
                    { key: "sentimentAnalysis", label: "Sentiment Analysis", desc: "Analyze citizen tone and emotional urgency" },
                    { key: "predictiveAlerts", label: "Predictive Risk Alerts", desc: "Generate alerts for predicted complaint surges" },
                    { key: "routingOptimization", label: "Smart Department Routing", desc: "AI-optimized complaint-to-department routing" },
                  ].map(({ key, label, desc }) => (
                    <SettingRow key={key} label={label} description={desc}>
                      <Toggle
                        enabled={aiPrefs[key]}
                        onChange={(v) => setAiPrefs({ ...aiPrefs, [key]: v })}
                      />
                    </SettingRow>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Minimum AI Confidence Threshold</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Only act on predictions above:</span>
                    <span className="text-sm font-bold text-primary">{aiPrefs.minConfidence}%</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={99}
                    value={aiPrefs.minConfidence}
                    onChange={(e) => setAiPrefs({ ...aiPrefs, minConfidence: +e.target.value })}
                    className="w-full accent-[oklch(0.6_0.22_264)] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                    <span>50%</span><span>75%</span><span>99%</span>
                  </div>
                  <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-[11px] text-muted-foreground">
                      Current setting: AI will only classify and act on complaints where its confidence score is{" "}
                      <span className="text-primary font-medium">≥ {aiPrefs.minConfidence}%</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="mt-4 space-y-4">
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lock size={14} className="text-primary" /> Password
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
                      <Input type="password" placeholder="••••••••" className="h-9 bg-background" />
                    </div>
                  ))}
                  <button className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/80 transition-colors">
                    Update Password
                  </button>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield size={14} className="text-primary" /> Two-Factor Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 divide-y divide-border">
                  <SettingRow label="Enable 2FA" description="Add an extra layer of security to your account">
                    <Toggle enabled={false} onChange={() => {}} />
                  </SettingRow>
                  <SettingRow label="Login Notifications" description="Get notified on every new login">
                    <Toggle enabled={true} onChange={() => {}} />
                  </SettingRow>
                </CardContent>
              </Card>

              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                    <AlertTriangle size={14} /> Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground mb-3">
                    These actions are irreversible. Proceed with caution.
                  </p>
                  <button className="text-xs px-4 py-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors">
                    Deactivate Account
                  </button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}