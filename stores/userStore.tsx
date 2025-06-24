import { LoginResType } from "@/schemaValidations/auth.schema";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserDataType = LoginResType["data"]["account"] | null;

interface UserState {
  user: UserDataType;
  setUser: (value: UserDataType) => void;
}

const notPersistStates: string[] = [];

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (value) => set({ user: value }),
      }),
      {
        name: "user",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !notPersistStates.includes(key)
            )
          ),
      }
    )
  )
);
