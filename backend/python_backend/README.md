

# Python Backend for Resume Analysis Platform

This backend component of the Resume Analysis Platform is developed using Python, featuring FastAPI for handling API requests and integrating a Named Entity Recognition (NER) model built with spaCy. The backend serves to scrape web data, extract relevant information using the NER model, and provide this processed data to the frontend or other parts of the system.

## Technology Stack

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
- **spaCy**: An open-source software library for advanced Natural Language Processing (NLP), used here primarily for named entity recognition.
- **Beautiful Soup**: A Python library for pulling data out of HTML and XML files, used in conjunction with `httpx` to scrape web pages.

## Getting Started

### Prerequisites

- Python 3.7+
- pip (Python package installer)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/BhaskarKapri07/ResumeRover.git
   cd ResumeRover/backend/python_backend
   ```

2. **Set up a virtual environment** :
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```


### Running the Server

To start the FastAPI server, run:

```bash
uvicorn main:app --reload  # The --reload option makes the server restart after code changes
```

This command starts the server on `http://localhost:8000` by default.

## API Usage

- **Endpoint `/scrape-and-extract/`**:
  - **Method**: POST
  - **Description**: Receives a URL via JSON payload, scrapes the web page at that URL, and extracts data using the NER model.
  - **Payload**:
    ```json
    {
      "url": "http://example.com"
    }
    ```

### Testing
- The `requests.rest` file can be used directly in VS Code with the REST Client extension to test API endpoints.
