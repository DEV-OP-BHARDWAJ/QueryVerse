import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "./components/Header";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "QueryVerse | A Developer's Hub",
  description: "A community-driven Q&A platform for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {/* FIX: Added padding-top to the main content area to prevent
              it from being hidden behind the fixed-position navbar.
              pt-28 gives enough space for the navbar which is top-10.
          */}
          <main className="pt-28">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
