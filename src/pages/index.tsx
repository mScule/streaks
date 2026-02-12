import {StreakCreationForm} from "@/components/forms/streak-creation-form";
import {Logo} from "@/components/logo";
import {StreakCard} from "@/components/streak-card";
import {useQueryAllStreaks} from "@/react-query/hooks/streak/use-query-all-streaks";

export function Index() {
  const streaks = useQueryAllStreaks();

  return (
    <main className="flex flex-col items-center gap-5 py-4">
      <Logo />

      {streaks.data && (
        <div className="flex flex-col gap-5">
          {streaks.data.map(streak => (
            <StreakCard streak={streak} />
          ))}
        </div>
      )}

      <StreakCreationForm />
    </main>
  );
}
