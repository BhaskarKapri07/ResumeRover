from fastapi import FastAPI, HTTPException
from .scraper import scrape_and_extract
from pydantic import BaseModel

class UrlModel(BaseModel):
    url: str

app = FastAPI()

@app.post("/scrape-and-extract/")
async def scrape_extract(urlmodel: UrlModel):
    url = urlmodel.url
    try:
        data = await scrape_and_extract(url)
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
