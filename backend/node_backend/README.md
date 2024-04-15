
# Node/Express Backend for Resume Analysis Platform
The backend of the Resume Analysis Platform is built using Node.js with the Express framework. It manages user authentication, data processing, and interactions with the MongoDB database, providing robust API endpoints for the frontend to perform operations like user registration, resume uploads, job description processing, and analysis retrieval.

## Technology Stack

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, ideal for building fast, scalable network applications.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **MongoDB**: A NoSQL database used to store application data flexibly and efficiently.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js that manages relationships between data, provides schema validation, and is used to translate between objects in code and their representation in MongoDB.
- **JWT (JSON Web Tokens)**: Used for securing backend endpoints by providing a method for authentication and token verification.

## Getting Started

### Prerequisites

- Node.js (preferably the latest LTS version)
- MongoDB (local installation or cloud instance via MongoDB Atlas)
- npm (Node package manager)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BhaskarKapri07/ResumeRover.git
   cd ResumeRover/backend/node_backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root of the backend directory and populate it with necessary environment variables:

```plaintext
MONGODB_URI=mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

Adjust the `MONGODB_URI` to point to your MongoDB instance.

### Running the Server

To start the server, run:

```bash
npm start
```

This will start the Node.js server typically on `http://localhost:3000`, unless configured differently in your environment variables.

---


### Testing

Detailed example requests and responses for each API endpoint can be found in the provided `requests.http` file.

