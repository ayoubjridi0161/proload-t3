import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Button } from "~/components/ui/button";

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
      <body>
        <nav className="flex justify-between p-5">
          <h1 className="text-3xl">Create T3 App</h1>
          <Button className="">hello world</Button>

        </nav>
        {children}
        </body>
    </html>
  );
}
