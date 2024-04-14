import dotenv from "dotenv";

dotenv.config();

const axios = require("axios");
const baseURL = process.env.JOB_DESCRIPTION_SERVICE_URL;

export const parseJobDescription = async (jobUrl: string) => {
  try {
    const response = await axios.post(`${baseURL}/scrape-and-extract/ `, {
      url: jobUrl,
      contentType: "application/json",
    });
    return response;
  } catch (error) {
    console.error("Error calling parseJobDescription:", error);
    throw error;
  }
};
