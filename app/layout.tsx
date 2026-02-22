import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/components/providers/store.provider";
import AuthProvider from "@/components/providers/auth.provider";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-spaceGrotesk",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Learning Management System",
    template: "%s | LMS",
  },
  description:
    "Learning Management System for students and instructors. Learn and teach online.",
  icons: {
    icon: "https://www.sammi.ac/logo.svg",
    apple: "https://www.sammi.ac/logo.svg",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={spaceGrotesk.className} suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${spaceGrotesk.className}`}>
        <StoreProvider>
          <AuthProvider>
            <Provider>
              <Toaster />
              <main>{children}</main>
            </Provider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
