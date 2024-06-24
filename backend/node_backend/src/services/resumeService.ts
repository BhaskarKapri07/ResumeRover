import { Resume } from "../models/ResumeModel";

export const fetchResumes = async (
  userId?: string,
  sessionId?: string
): Promise<Buffer[]> => {
  // Fetch all resume documents; consider adding pagination or filtering as necessary
  const resumes = await Resume.find({ userId: userId, sessionId: sessionId });
  // Assuming the resumes are stored with their data in a field named `data` as a Buffer
  // console.log(resumes.map((resume) => Buffer.from(resume.data.toString(), "base64")));

  return resumes.map((resume) => resume.data);
  // return resumes.map((resume) => Buffer.from(resume.data.toString(), "base64"));
  // return resumes.map((resume) =>{
  //   const base64Data = resume.data.toString();
  //   return Buffer.from(base64Data, 'base64');
  // })
};
