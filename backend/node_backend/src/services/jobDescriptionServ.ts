const axios = require('axios');
const cheerio = require('cheerio');
import dotenv from "dotenv";
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export const scrapeAndExtract = async (url:string) => {
    try {
        console.log('in scrapeAndExtract')
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const textContent = $('body').text().trim();
        console.log('textContent : ', textContent)

        const generationConfig = {
            temperature: "0.5",
        };
        const model = genAI.getGenerativeModel({
            model: "gemini-1.0-pro",
            generationConfig,
        });

        const prompt = `
            Extract the title, requirements and bonus requirements needed for the job from the following text:
            ${textContent}

            Provide the output in the following JSON format:
            {
                "title": "Title of the job post",
                "requirements": ["Requirement 1", "Requirement 2", ...],
                "bonus_requirements": ["Bonus Requirement 1", "Bonus Requirement 2", ...]
            }
        `;

        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();
        const jsonResponse = responseText.replace(/^`{3}json\n|\n`{3}$/gi, "");
        const jsonObj = JSON.parse(jsonResponse);
        console.log('jsonObj : ', jsonObj)

        return jsonObj;
    } catch (error:any) {
        throw new Error('Failed to scrape and extract data: ' + error.message);
    }
};
// scrapeAndExtract('https://jobs.lever.co/turingvideo/d76d4b30-84ed-4a5d-90c4-1a436a79c298')
