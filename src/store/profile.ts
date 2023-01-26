import { CustomProfile } from 'types/db-type-mappings';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type Profile = {
  profile: CustomProfile | null;
  setProfile: (profile: CustomProfile) => void;
  resetProfile: () => void;
};

export const useProfileStore = create<Profile>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      resetProfile: () => set({ profile: null }),
    }),
    {
      name: 'profile-storage',
    }
  )
);
