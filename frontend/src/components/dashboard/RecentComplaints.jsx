import { complaints } from "@/data/mockData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const statusVariant = {
  Critical: "critical",
  "In Progress": "info",
  Pending: "warning",
  Resolved: "success",
};

const priorityVariant = {
  Critical: "critical",
  High: "high",
  Medium: "medium",
  Low: "low",
};

export default function RecentComplaints() {
  const recent = complaints.slice(0, 8);

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={15} className="text-primary" />
            <CardTitle className="text-sm">Recent Complaints</CardTitle>
          </div>
          <Link
            to="/complaints"
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-24">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden lg:table-cell">Area</TableHead>
              <TableHead className="hidden md:table-cell">Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{c.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="text-xs font-medium text-foreground truncate max-w-[160px]">{c.title}</p>
                    <p className="text-[10px] text-muted-foreground">{c.category}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">{c.area}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline" className="text-[10px]">{c.department}</Badge>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
