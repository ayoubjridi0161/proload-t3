import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import '~/styles/bgPattern.css'
import { inter } from "~/components/ui/font";
import SessionWrapper from "~/lib/SessionWrapper";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/theme-provider";
import QueryProvider from "~/lib/queryProvider";
export const metadata = {
  title: "ProloadT3",
  description: "Generated by create-t3-app",
  icons: [
    {
      rel: "icon",
      url: "/proloadV2.png",
      type: "image/png",
      sizes: "32x32 48x48 96x96 128x128 256x256"
    }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
     <QueryProvider>
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} bg-white`} >
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <main>
        {children}
        </main>
        <Toaster />
        </ThemeProvider>
        </body>
        
    </html>
    </QueryProvider>
    </SessionWrapper>
  );
}
