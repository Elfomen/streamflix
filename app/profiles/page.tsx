"use client";

import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import { Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilesPage() {
  const router = useRouter();
  const { selectProfile, profiles, currentProfile } = useProfile();

  const handleSelectProfile = (profileId: string) => {
    const profile = profiles.find((p) => p.id === profileId);
    if (profile) {
      selectProfile(profile);
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-medium text-foreground mb-8">
          Who&apos;s watching?
        </h1>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleSelectProfile(profile.id)}
              className="group"
            >
              <div
                className={cn(
                  "relative w-24 h-24 md:w-36 md:h-36 rounded overflow-hidden mb-3 transition-all",
                  "border-2 border-transparent group-hover:border-foreground",
                  currentProfile?.id === profile.id && "border-primary",
                )}
              >
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                {profile.isKids && (
                  <div className="absolute bottom-0 left-0 right-0 bg-yellow-500 text-yellow-950 text-xs font-bold py-1 text-center">
                    KIDS
                  </div>
                )}
              </div>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                {profile.name}
              </p>
            </button>
          ))}

          <button className="group">
            <div className="w-24 h-24 md:w-36 md:h-36 rounded bg-card border-2 border-transparent hover:border-foreground flex items-center justify-center mb-3 transition-all">
              <Plus className="h-12 w-12 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <p className="text-muted-foreground group-hover:text-foreground transition-colors">
              Add Profile
            </p>
          </button>
        </div>

        <button className="px-6 py-2 border border-muted-foreground text-muted-foreground hover:border-foreground hover:text-foreground transition-colors flex items-center gap-2 mx-auto">
          <Pencil className="h-4 w-4" />
          Manage Profiles
        </button>
      </div>
    </main>
  );
}
