import dotenv from "dotenv";
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// ... (Other necessary imports and setup)

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const analyzeWithGeminiApi = async (jobDesc: any, resumeJson: any) => {
  // ... (Prepare the prompt using jobDesc and resumeJson)
  // console.log(typeof jobDesc.data);
  // console.log(typeof resumeJson);
  // console.log("----printing jobDesc .data---");
  // // console.log(jobDesc.data);
  const jobDescText: string = JSON.stringify(jobDesc.data.data);
  console.log(typeof jobDesc.data);
  // console.log("----printing jobDesc .data.data---");
  // console.log(jobDesc.data.data);

  const analysisResults: any[] = [];

  const generationConfig = {
    temperature: "0.3",
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro",
    generationConfig,
  });
  // console.log("---printing resumejson----");
  // console.log(resumeJson);

  for (const resume of resumeJson) {
    const textResume = JSON.stringify(resume);
    // console.log("---printing Resume---");
    // console.log(resume);
    // console.log("---printing textResume---");
    // console.log(textResume);

    const prompt = `
      Given the job requirements and bonus requirements listed below, analyze the attached resume. For each requirement and bonus requirement, determine if it is satisfied by the information in the resume. Provide *strictly JSON* response indicating whether each requirement is met (true/false) and explain why the AI made that choice. The explanation should be concise and relevant to the requirement.
      
      Job Description: ${jobDescText}
      
      Attached Resume: ${textResume}
    
     Please provide the analysis in the following JSON format:
     {
      "name": "Name of the candidate provided JSON resume attached, if not N/A",
        "requirements": [
          {
            "requirement": "Proficient in Python programming",
            "satisfied": true/false,
            "explanation": "The AI's reasoning..."
          },
          ...
        ],
        "bonus_requirements": [
          {
            "requirement": "Familiarity with cloud services",
            "satisfied": true/false,
            "explanation": "The AI's reasoning..."
          },
          ...
        ]
      }
      `;

    console.log("-------------Printing prompt------------");
    console.log(prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("-------------Printing response------------");
    // console.log(response.text());
    const text = response.text();
    const jsonText = text.replace(/^`{3}json\n|\n`{3}$/gi, "");
    const jsonObj = JSON.parse(jsonText);
    analysisResults.push(jsonObj);
    console.log(jsonObj);
    console.log("ninnni");
    await sleep(1000);
  }

  return analysisResults;
  // console.log('-Printing resumeItem-')
  // console.log(resumeItem)
  // const textResume = JSON.stringify(resumeItem);
  // console.log(typeof textResume)
};

// Send the prompt to the Gemini API
// ...
// };

// export default analyzeWithGeminiApi;
