import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
function RootLayout() {
  return (
    <div className="min-h-screen">
      <Toaster />
      <Navbar />
      <main className="mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;