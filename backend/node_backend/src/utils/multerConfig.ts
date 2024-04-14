import multer from "multer";

// Configure multer to store files in memory
const storage = multer.memoryStorage();

// Initialize multer with the memory storage configuration
export const upload = multer({ storage: storage });
