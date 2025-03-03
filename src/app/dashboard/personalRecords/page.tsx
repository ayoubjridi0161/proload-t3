import { andika } from "~/components/ui/font"
import PersonalRecords from "~/components/ui/userDashboard/PR"

const page = () => {
  return (
    <section className={`${andika.className} w-full space-y-5 p-5 text-[#707877]`}>
        <div>
            <h1 className="text-lg font-bold">Personal Records</h1>
            <p className="text-sm">Track progress and plan workouts for peak performance</p>
        </div>
        <PersonalRecords />

    </section>
)
}

export default page