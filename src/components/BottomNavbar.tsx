"use client";

import { useRouter, usePathname } from "next/navigation";
import { Home, Heart, MapPin, FileText, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";

const BottomNavbar = () => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      name: "Explore",
      icon: Home,
      href: "/",
      active: pathname === "/",
      requiresAuth: false,
    },
    {
      name: "Wishlist",
      icon: Heart,
      href: "/wishlist",
      active: pathname === "/wishlist",
      requiresAuth: true,
    },
    {
      name: "Trips",
      icon: MapPin,
      href: "/trips",
      active: pathname === "/trips",
      requiresAuth: true,
    },
    {
      name: "Articles",
      icon: FileText,
      href: "/articles",
      active: pathname === "/articles",
      requiresAuth: false,
    },
    {
      name: "Profile",
      icon: User,
      href: "/profile",
      active: pathname === "/profile",
      requiresAuth: true,
    },
  ];

  const handleNavClick = (href: string, requiresAuth: boolean) => {
    if (requiresAuth && !isAuthenticated) {
      openAuthModal();
      return;
    }
    router.push(href);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-sm bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href, item.requiresAuth)}
              className={`flex flex-col items-center py-2 px-4 min-w-0 flex-1 ${
                item.active ? "text-black" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon
                className={`w-6 h-6 mb-1 ${
                  item.active ? "fill-black stroke-black" : ""
                }`}
              />
              <span className="text-xs font-medium truncate">{item.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
