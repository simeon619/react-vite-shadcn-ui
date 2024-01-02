import { create } from "zustand";
import { generatedArray } from "./utils";
import { registerFormType } from "@/types/user";
import { typeArrayPosts } from "./api";

interface PostState {
  post: (typeArrayPosts)[0] | null;
  setPost: (post: (typeArrayPosts)[0]) => void;
}

export const usePostStore = create<PostState>()((set) => ({
  post: null,
  setPost: (post) => set(() => ({ post })),
}));

type  userType = {
  pseudo: string
  picture?: string
}


interface AuthState {
  account: null | undefined | userType,
  status: "Auth" | "Guest"
  setAccount: (account: null | undefined | userType) => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  account: undefined,
  status: "Guest",
  setAccount: (account) => set(() => ({ account , status: !!account?.pseudo ? "Auth" : "Guest"})),
}))