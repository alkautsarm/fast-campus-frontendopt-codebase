"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { LogOut, Eye, EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { changeUserPassword } from "@/utils/api";
import { useState } from "react";

const ProfilePage = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  const passwordMutation = useMutation({
    mutationFn: async ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => {
      if (!user) throw new Error("User not authenticated");
      return changeUserPassword(user, currentPassword, newPassword);
    },
    onSuccess: () => {
      setPasswordChangeSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordChangeSuccess(false), 3000);
    },
    onError: (error) => {
      console.error("Password change error:", error);
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return;
    }

    if (newPassword.length < 6) {
      return;
    }

    passwordMutation.mutate({ currentPassword, newPassword });
  };

  if (!isAuthenticated && !loading) {
    return null;
  }

  const isPasswordFormValid =
    currentPassword.length > 0 &&
    newPassword.length >= 6 &&
    newPassword === confirmPassword;

  return (
    <div className="min-h-screen py-10 border-l border-r border-gray-100">
      <div className="px-4">
        <div className="rounded-lg mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-medium">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.displayName || "User"}
              </h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg mb-6 p-4 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Change Password
          </h3>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 6 characters
              </p>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Success Message */}
            {passwordChangeSuccess && (
              <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
                Password changed successfully!
              </div>
            )}

            {/* Error Message */}
            {passwordMutation.error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                {passwordMutation.error.message || "Failed to change password"}
              </div>
            )}

            <button
              type="submit"
              disabled={!isPasswordFormValid || passwordMutation.isPending}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {passwordMutation.isPending
                ? "Changing Password..."
                : "Change Password"}
            </button>
          </form>
        </div>

        {/* Logout Button */}
        <div className="rounded-lg mb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 p-4 text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
