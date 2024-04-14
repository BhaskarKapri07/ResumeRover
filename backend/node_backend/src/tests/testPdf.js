const fs = require("fs");

// Replace this with the actual base64 string you want to test.
const base64String =
  "JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9DcmVhdG9yIChDaHJvbWl1bSkKL1Byb2R1Y2VyIChTa2lhL1BERiBtMTE0KQovQ3Jl…";

const binaryData = Buffer.from(base64String, "base64");
fs.writeFileSync("outputTestPdf.pdf", binaryData);


