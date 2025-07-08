import { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Hotel Booking",
    default: "Hotel Booking - Find Your Perfect Stay",
  },
  description:
    "Discover and book unique hotels, cabins, and accommodations worldwide. Find the perfect place to stay for your next adventure.",
  keywords: [
    "hotel booking",
    "accommodation",
    "travel",
    "vacation rental",
    "hotels",
    "cabins",
    "unique stays",
  ],
  authors: [{ name: "Hotel Booking Team" }],
  creator: "Hotel Booking",
  publisher: "Hotel Booking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div id="root" className="max-w-screen-sm mx-auto">
          <ClientLayout>{children}</ClientLayout>
        </div>
      </body>
    </html>
  );
}
