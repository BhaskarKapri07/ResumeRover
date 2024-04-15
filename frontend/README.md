

# Frontend for Resume Analysis Platform

The frontend of the Resume Analysis Platform is designed to provide a seamless user experience for uploading resumes, entering job descriptions, and viewing detailed analysis results. Built with React, this part of the application offers a dynamic and responsive interface that efficiently interacts with the backend to fetch and display data.

## Technology Stack

- **React**: Utilized for building the user interface with a component-based architecture, allowing for reusable components and efficient data management through states and props.
- **React Router**: Handles in-app navigation, ensuring that users can seamlessly move between different parts of the application without full page reloads.
- **Axios**: Used for making HTTP requests to the backend API, handling both data fetching and posting.
- **Sass/CSS**: Styles the application, providing a clean and modern look and feel.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version recommended)
- npm 

### Installation

To set up the frontend locally, follow these steps:

1. **Clone the repository** (if not already done for the entire project):
   ```bash
   git clone https://github.com/BhaskarKapri07/ResumeRover.git
   cd ResumeRover/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   - Create a `.env` file in the root of the frontend directory.
   - Add necessary environment variables such as the backend API URL:
     ```plaintext
     REACT_APP_API_URL=http://localhost:3000/api
     ```

### Running the Project

To run the frontend on your local machine:

```bash
npm start
```

This will start the development server and open the application in your default web browser. By default, the frontend runs on `http://localhost:3000`.

## Usage

Navigate through the application to:
- **Register/Login**: Access user-specific functionalities.
- **Upload Resumes and Job Descriptions**: Submit files and data required for analysis.
- **View Analysis Results**: See detailed comparisons and assessments based on the uploaded data.

