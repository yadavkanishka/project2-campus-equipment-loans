import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// Configure the application font.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Website title and description.
export const metadata: Metadata = {
  title: "Campus AV & Equipment Loans",
  description:
    "A campus equipment loan management system for requesting, approving, and tracking equipment loans.",
};

// Root layout shared by all application pages.
export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
