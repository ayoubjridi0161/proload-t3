import { auth } from "auth";
import HeaderNav from "~/components/ui/homePage/HeaderNav";

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
    <div className=" bg-login-image bg-cover bg-bottom h-screen overflow-hidden">
        <div className="bg-black/35">
        <HeaderNav />
        <main>
          {children}
          </main>
        </div>
      </div>
    )
  }
  