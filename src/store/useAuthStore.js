import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSignInUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    console.log(set);
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("checkAuth response", res.data);
      set({ authUser: res.data.user });
    } catch (error) {
      console.log("showing error", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSignInUp: true });

    try {
      const res = await axiosInstance.post("/auth/register", data);
      console.log("Sing in user : ", res.data);
      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      console.log("sign up error: ", error);
      set({ authUser: null });
    } finally {
      set({ isSignInUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log("Login data", res.data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Login error: ", error);
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Logout error :", error);
      toast.error("Error logging out");
    }
  },
}));
