"use client";

import "@/app/globals.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/utils";
import { Inter } from "next/font/google";
import { AuthProvider, useAuth } from "@/contexts/AuthProvider";
import AuthModal from "@/components/AuthModal";
import BottomNavbar from "@/components/BottomNavbar";
import { usePathname } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const AppContent = ({ children }: { children: React.ReactNode }) => {
  const { showAuthModal, closeAuthModal } = useAuth();
  const pathname = usePathname();

  // Hide regular bottom navbar on hotel detail pages
  const isHotelDetailPage =
    pathname?.includes("/hotels/") && pathname.split("/").length > 2;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div>{children}</div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} />
      {!isHotelDetailPage && <BottomNavbar />}
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>Hotel Booking</title>
      </head>
      <body>
        <div id="root" className="max-w-screen-sm mx-auto">
          <AuthProvider>
            <AppContent>{children}</AppContent>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
