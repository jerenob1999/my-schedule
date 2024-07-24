import type { Metadata } from "next";
import { Toaster } from "@/components/atoms/toaster";
import "./globals.css";
import Navigation from "@/components/molecules/navigation";

export const metadata: Metadata = {
  title: "My-schedule 📅",
  description: "Simplified version of Google Calendar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen">
        <Navigation />
        <main className="flex h-full mt-4">
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
