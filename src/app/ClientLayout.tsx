"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/utils";
import { AuthProvider, useAuth } from "@/contexts/AuthProvider";
import AuthModal from "@/components/AuthModal";
import BottomNavbar from "@/components/BottomNavbar";
import { usePathname } from "next/navigation";

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

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AppContent>{children}</AppContent>
    </AuthProvider>
  );
}
