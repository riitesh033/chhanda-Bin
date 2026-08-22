import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-parchment text-ink transition-colors duration-200">
      <Navbar
        onMenuClick={() =>
          setSidebarOpen((value) => !value)
        }
      />

      <div className="flex">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-h-[calc(100vh-4rem)] flex-1 bg-parchment p-4 text-ink transition-colors duration-200 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}