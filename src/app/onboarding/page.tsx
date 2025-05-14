import { auth } from "auth"
import Onboarding from "~/components/onboarding/main"
export default async function OnboardingPage() {
  const session = await auth()
  return (
    <Onboarding image={session?.user?.image ?? null} name={session?.user?.name ?? ""}  />
  )
}
