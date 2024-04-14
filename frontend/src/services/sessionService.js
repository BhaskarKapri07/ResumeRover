import customAxios from "../api/axios";

export const createAnalysisSession = async () => {
  try {
    const response = await customAxios.post("/sessions/create");
    return response.data.sessionId; // Make sure the backend returns { sessionId: "..." }
  } catch (error) {
    console.error("Failed to create analysis session:", error);
    // Consider how to handle this error in the UI, possibly with user feedback
    return null;
  }
};
