"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { isAuthenticated, openAuthModal, user, logout } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    openAuthModal();
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen py-10 border-l border-r border-gray-100">
      <div className="px-4 rounded-lg mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-600 text-white rounded-full flex items-center justify-center text-2xl font-medium">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-xl font-medium">{user?.email || "User"}</h2>
          </div>
        </div>
      </div>

      <div className="rounded-lg mb-6">
        <button className="w-full flex items-center gap-4 hover:bg-gray-50 p-4 border-b border-gray-100">
          <Settings className="w-6 h-6 text-gray-600" />
          <span className="text-left">Account Settings</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-4 gap-4 hover:bg-gray-50 text-red-600"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-left">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
