import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import '~/styles/bgPattern.css'
import { Button } from "~/components/ui/button";
import { inter } from "~/components/ui/font";
import Footer from "~/components/ui/footer";

export const metadata = {
  title: "ProloadT3",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className={`${inter.className} bg-white`} >
        
        {children}
        </body>
    </html>
  );
}
