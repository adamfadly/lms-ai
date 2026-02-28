import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conversational Learning - AI Learning Companions",
  description:
    "Learn smarter with AI-powered companions tailored to your style, pace, and interests. Explore subjects through real voice conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bricolage.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClerkProvider appearance={{ variables: { colorPrimary: "#fe5933" } }}>{children}</ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
