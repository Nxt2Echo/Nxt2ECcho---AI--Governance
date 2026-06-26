import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

      <div className="flex items-center gap-3 bg-slate-800 rounded-lg px-4 py-2 w-96">

        <Search size={18} />

        <input
          placeholder="Search complaints..."
          className="bg-transparent outline-none w-full text-white"
        />

      </div>

      <div className="flex items-center gap-5">

        <Bell className="cursor-pointer text-slate-300" />

        <UserCircle2
          size={34}
          className="cursor-pointer text-blue-400"
        />

      </div>
    </header>
  );
}