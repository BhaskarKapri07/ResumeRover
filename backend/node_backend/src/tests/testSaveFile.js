const mongoose = require("mongoose");
const fs = require("fs");
const Schema = require("mongoose").Schema;
const pdfjs = require("pdfjs-dist");

// const Resume = require('../../dist/services/resumeService')
const ResumeSchema = new Schema(
  {
    filename: { type: String, required: true },
    contentType: { type: String, required: true }, // MIME type (e.g., application/pdf)
    data: { type: Buffer, required: true }, // Resume file data
    uploadedAt: { type: Date, default: Date.now }, // Timestamp of upload
  },
  { collection: "resumes" }
);

// MongoDB connection URI
const mongoURI =
"write your URI"

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const Resume = mongoose.model("Resume", ResumeSchema);
async function saveResumesToFiles() {
  try {
    const resumes = await Resume.find({}); // Fetch all resumes
    console.log(resumes)

    resumes.forEach(async (resume, index) => {
      if (resume.data && resume.filename) {
        // Construct file path
        const filePath = `./output/${
          resume.filename || `Resume${index + 1}.pdf`
        }`;

        const base64String = resume.data.toString();
        console.log('base64String: ', base64String)
        // console.log(resume.data)
        // Write the binary data to a PDF file
        console.log(Buffer.isBuffer(resume.data));
        const pdfFile = resume.data
        fs.writeFileSync(filePath, pdfFile);
        console.log(`Saved resume to ${filePath}`);
        const uint8Array = new Uint8Array(resume.data);
        const pdfDoc = await pdfjs.getDocument(uint8Array).promise;
        const page = await pdfDoc.getPage(1);
        const textContent = await page.getTextContent();
        console.log(textContent);
      }
    });

    console.log("Finished saving all resumes.");
  } catch (error) {
    console.error("Error fetching or saving resumes:", error);
  } finally {
    mongoose.disconnect(); // Properly disconnect from MongoDB once done
  }
}

saveResumesToFiles();