import { Sidebar } from "@/components/Sidebar";
import { LogTable } from "@/components/LogTable";

export default function Home() {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 bg-secondary min-h-screen p-4">
        <LogTable />
      </div>
    </div>
  );
}
