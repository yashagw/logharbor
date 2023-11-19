import { Sidebar } from "@/components/Sidebar";
import { LogTable } from "@/components/LogTable";
import { FileCode2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex w-screen h-screen flex-col overflow-hidden">
      <div className="bg-primary text-primary-foreground w-full px-4 py-4">
        <div className="flex gap-2">
          <FileCode2 />
          <h1 className="text-lg">Query Interface</h1>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden w-full">
        <Sidebar />
        <div className="flex-1 bg-secondary min-h-screen p-4">
          <LogTable />
        </div>
      </div>
    </div>
  );
}
