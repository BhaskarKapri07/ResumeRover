import { readPdf } from "./lib/parse-resume-from-pdf/read-pdf";
import { groupTextItemsIntoLines } from "./lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "./lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "./lib";
import { Resume } from "./lib/redux/types";

// import fs from "fs";

// const pdfFileUrl = "C:/Users/Administrator/Downloads/Resume/Bhaskar_Kapri.pdf";

export const parseResumes = async (
  resumeBuffers: Buffer[]
): Promise<Resume[]> => {
  const parsedResumes = [];

  for (const buffer of resumeBuffers) {
    try {
      const textItems = await readPdf(buffer);
      // console.log(textItems);
      // console.log("**********");
      const lines = groupTextItemsIntoLines(textItems);
      // console.log(lines);
      // console.log("**********");
      const sections = groupLinesIntoSections(lines);
      // console.log(sections)
      const resume = extractResumeFromSections(sections);
      parsedResumes.push(resume);

      // Convert the resume object to a JSON string
      // const resumeJson = JSON.stringify(resume, null, 2); // The '2' argument here adds indentation for readability
    } catch (error) {
      console.error("Error parsing resume:", error);
    }
  }
  return parsedResumes;
};

//   try {
//     const textItems = await readPdf(pdfFileUrl);
//     // console.log(textItems);
//     // console.log("**********");
//     const lines = groupTextItemsIntoLines(textItems);
//     // console.log(lines);
//     // console.log("**********");
//     const sections = groupLinesIntoSections(lines);
//     // console.log(sections)
//     const resume = extractResumeFromSections(sections);
//     console.log(resume);

//     // Convert the resume object to a JSON string
//     const resumeJson = JSON.stringify(resume, null, 2); // The '2' argument here adds indentation for readability

//     // Define the path and filename for the output JSON file
//     const outputPath = "C:/Users/Administrator/Downloads/BhaskarResume.json";

//     // Asynchronously write the JSON string to a file
//     fs.writeFile(outputPath, resumeJson, "utf8", (err) => {
//       if (err) {
//         console.error(
//           "An error occurred while writing JSON Object to File.",
//           err
//         );
//       } else {
//         console.log("JSON file has been saved.");
//       }
//     });
//   } catch (error) {
//     console.error("Error reading PDF:", error);
//   }
// }
// }