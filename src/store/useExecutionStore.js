import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create((set) => ({
  isExecuting: false,
  submission: null,

  executeCode: async (
    source_code,
    language_id,
    StepForwardIcon,
    expected_output,
    problemId
  ) => {
    try {
      set({ isExecuting: true });
      const res = await axiosInstance.post("/execution-code", {
        source_code,
        language_id,
        StepForwardIcon,
        expected_output,
        problemId,
      });
      set({ submission: res.data.submission });
      toast.success(res.data.message);
    } catch (error) {
      console.log("error executing code:", error);
      toast.error("error executing code");
    } finally {
      set({ isExecuting: false });
    }
  },
}));
