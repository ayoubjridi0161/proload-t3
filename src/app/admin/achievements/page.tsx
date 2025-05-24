
import AchievementsList from "~/app/admin/achievements/AchievementsList";
import AchievementForm from "~/app/admin/achievements/AchievementForm";
export default function page() {
  // const achievements = await getAllAchievements();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Achievements</h1>
      
      {/* Add Achievement Form */}
      <AchievementForm />
      
      {/* Achievements List */}
      {/* <AchievementsList achievements={achievements ?? []} /> */}
    </div>
  );
}