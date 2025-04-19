import { auth } from "auth";
import TooltipBox from "~/components/component/tooltipV0";
import { Home } from "~/components/ui/homePage/Home";

export default async function HomePage() {
  const session = await auth();
  // console.log(session)
  
  return (
    <Home />
  );
}
