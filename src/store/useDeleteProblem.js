import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useDeleteProblemStore = create((set) => ({
  isDelete: false,

  deleteProblem: async (problemId) => {
    try {
      set({ isDelete: true });
      const res = await axiosInstance.delete(
        `/problems/delete-problem/${problemId}`
      );
      set({ isDelete: false });
      toast.success(res.data.message || "Problem deleted successfully");
    } catch (error) {
      console.error("Error deleting problem:", error);
      toast.error("Error deleting problem");
    } finally {
      set({ isDelete: false });
    }
  },
}));
