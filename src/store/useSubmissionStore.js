import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,

  
  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/submission/get-all-submissions");
      set({ submissions: res.data.submissions });
      set({ isLoading: false });
      toast.success(res.data.message || "Submissions fetched successfully");
    } catch (error) {
      console.error("Error fetching submissions:", error);
      toast.error("Error fetching submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/submission/get-submission/${problemId}`);
      set({ submission: res.data.submission });
      set({ isLoading: false });
      toast.success(res.data.message || "Submission fetched successfully");
    } catch (error) {
      console.error("Error fetching submission for problem:", error);
      toast.error("Error fetching submission for problem");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/submission/get-submission-count/${problemId}`);
      set({ submissionCount: res.data.count });
      set({ isLoading: false });
      toast.success(res.data.message || "Submission count fetched successfully");
    } catch (error) {
      console.error("Error fetching submission count for problem:", error);
      toast.error("Error fetching submission count for problem");
    } finally {
      set({ isLoading: false });
    }
  },
}));
