import { useState, useMemo } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { complaints } from "@/data/mockData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Search, Filter, FileText, ChevronLeft, ChevronRight,
  ArrowUpDown, MapPin, Building2, Calendar, Brain,
} from "lucide-react";

const statusVariant = {
  Critical: "critical", "In Progress": "info", Pending: "warning", Resolved: "success",
};
const priorityVariant = {
  Critical: "critical", High: "high", Medium: "medium", Low: "low",
};

const PAGE_SIZE = 10;

export default function Complaints() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  const categories = useMemo(() => ["All", ...new Set(complaints.map((c) => c.category))], []);

  const filtered = useMemo(() => {
    let data = [...complaints];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.area.toLowerCase().includes(q) ||
          c.department.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") data = data.filter((c) => c.status === statusFilter);
    if (priorityFilter !== "All") data = data.filter((c) => c.priority === priorityFilter);
    if (categoryFilter !== "All") data = data.filter((c) => c.category === categoryFilter);

    data.sort((a, b) => {
      let av = a[sortField], bv = b[sortField];
      if (typeof av === "string") av = av.toLowerCase(), bv = bv.toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [search, statusFilter, priorityFilter, categoryFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
    setPage(1);
  };

  const resetPage = () => setPage(1);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Complaint Management</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {filtered.length.toLocaleString()} complaints · AI-classified and prioritized
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-card border border-border rounded-lg px-3 py-2">
            <Brain size={12} className="text-primary" />
            AI Classification Active
          </div>
        </div>

        {/* Filters */}
        <Card className="border-border">
          <CardContent className="p-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-48">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, title, area, department..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); resetPage(); }}
                  className="pl-9 h-8 text-xs bg-background"
                />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                <Filter size={12} />
                <span>Filters:</span>
              </div>
              <div className="w-32">
                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); resetPage(); }}>
                  <SelectTrigger className="h-8 text-xs">{statusFilter}</SelectTrigger>
                  <SelectContent>
                    {["All", "Critical", "In Progress", "Pending", "Resolved"].map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-28">
                <Select value={priorityFilter} onValueChange={(v) => { setPriorityFilter(v); resetPage(); }}>
                  <SelectTrigger className="h-8 text-xs">{priorityFilter}</SelectTrigger>
                  <SelectContent>
                    {["All", "Critical", "High", "Medium", "Low"].map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-36">
                <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); resetPage(); }}>
                  <SelectTrigger className="h-8 text-xs">{categoryFilter}</SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="border-border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-24">
                  <button onClick={() => toggleSort("id")} className="flex items-center gap-1 hover:text-foreground">
                    ID <ArrowUpDown size={10} />
                  </button>
                </TableHead>
                <TableHead>
                  <button onClick={() => toggleSort("title")} className="flex items-center gap-1 hover:text-foreground">
                    Complaint <ArrowUpDown size={10} />
                  </button>
                </TableHead>
                <TableHead className="hidden md:table-cell">Area</TableHead>
                <TableHead className="hidden lg:table-cell">Department</TableHead>
                <TableHead className="hidden lg:table-cell">Category</TableHead>
                <TableHead>
                  <button onClick={() => toggleSort("status")} className="flex items-center gap-1 hover:text-foreground">
                    Status <ArrowUpDown size={10} />
                  </button>
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  <button onClick={() => toggleSort("priority")} className="flex items-center gap-1 hover:text-foreground">
                    Priority <ArrowUpDown size={10} />
                  </button>
                </TableHead>
                <TableHead className="hidden xl:table-cell">AI Score</TableHead>
                <TableHead className="hidden md:table-cell">
                  <button onClick={() => toggleSort("date")} className="flex items-center gap-1 hover:text-foreground">
                    Date <ArrowUpDown size={10} />
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12 text-muted-foreground text-sm">
                    No complaints match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                paged.map((c) => (
                  <TableRow key={c.id} className="cursor-pointer">
                    <TableCell className="font-mono text-xs text-muted-foreground">{c.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-xs font-medium text-foreground truncate max-w-[180px]">{c.title}</p>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">{c.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={10} />
                        {c.area}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-xs">
                        <Building2 size={10} className="text-muted-foreground" />
                        <Badge variant="outline" className="text-[10px]">{c.department}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="text-[10px] text-muted-foreground">{c.category}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[c.status] ?? "outline"} className="text-[10px]">
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={priorityVariant[c.priority] ?? "outline"} className="text-[10px]">
                        {c.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-12 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${c.aiScore}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{c.aiScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Calendar size={10} />
                        {c.date}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = i + 1;
                return (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`w-7 h-7 text-xs rounded transition-colors ${
                      page === pg ? "bg-primary text-primary-foreground" : "hover:bg-accent text-muted-foreground"
                    }`}
                  >
                    {pg}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}