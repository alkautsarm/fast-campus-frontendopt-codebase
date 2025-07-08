"use client";

import { useAuth } from "@/contexts/AuthProvider";
import { LogOut, Eye, EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { changeUserPassword } from "@/utils/api";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Define the form data type
interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfilePage = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const router = useRouter();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<PasswordChangeForm>({
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Watch newPassword to validate confirmPassword
  const newPassword = watch("newPassword");

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
      reset(); // Reset form using React Hook Form
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

  const onSubmit = (data: PasswordChangeForm) => {
    passwordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  if (!isAuthenticated && !loading) {
    return null;
  }

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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  {...register("currentPassword", {
                    required: "Current password is required",
                    minLength: {
                      value: 1,
                      message: "Please enter your current password",
                    },
                  })}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.currentPassword
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
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
              {errors.currentPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    validate: (value) => {
                      if (value.length < 6) {
                        return "Password must be at least 6 characters";
                      }
                      return true;
                    },
                  })}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.newPassword
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
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
              {errors.newPassword ? (
                <p className="text-xs text-red-500 mt-1">
                  {errors.newPassword.message}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 6 characters
                </p>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) => {
                    if (value !== newPassword) {
                      return "Passwords do not match";
                    }
                    return true;
                  },
                })}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
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
              disabled={!isValid || passwordMutation.isPending}
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
