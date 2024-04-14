import httpx
from bs4 import BeautifulSoup
import spacy

async def scrape_and_extract(url: str) :
    model_path = 'app/Spacy_NER_model'
    nlp = spacy.load(model_path)

    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        text_content = soup.get_text(separator=' ', strip=True)
        doc = nlp(text_content)

    title = ""
    requirements = []
    bonus_requirements = []

    for ent in doc.ents:
        if ent.label_ == "title":
            title = ent.text
        elif ent.label_ == "Requirement":
            requirements.append(ent.text)
        elif ent.label_ == "Bonus Requirement":
            bonus_requirements.append(ent.text)

    # Construct the JSON object
    job_posting_json = {
        "title": title,
        "requirements": requirements,
        "bonus_requirements": bonus_requirements
    }


    return job_posting_json