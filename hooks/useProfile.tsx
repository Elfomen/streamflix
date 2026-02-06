"use client";

import { useState } from "react";
import { Profile } from "@/lib/types";
import { profiles } from "@/lib/mockData";

const PROFILE_KEY = "netflix-profile";

export function useProfile() {
  const [currentProfile, setCurrentProfile] = useState(() => {
    // Check if we're in the browser
    if (typeof window === "undefined") {
      return null; // Return default value during SSR
    }

    const stored = localStorage.getItem(PROFILE_KEY);
    if (stored) {
      const profile = profiles.find((p) => p.id === stored);
      return profile || null;
    }
    return null;
  });

  const selectProfile = (profile: Profile) => {
    localStorage.setItem(PROFILE_KEY, profile.id);
    setCurrentProfile(profile);
  };

  const clearProfile = () => {
    localStorage.removeItem(PROFILE_KEY);
    setCurrentProfile(null);
  };

  return {
    currentProfile,
    selectProfile,
    clearProfile,
    isLoaded: true,
    profiles,
  };
}
