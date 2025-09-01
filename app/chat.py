from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

chat_history = []

class ChatRequest(BaseModel):
    query: str  # Changed from 'message' to 'query'

@router.post("/query")  # Changed from "/" to "/query"
def chat(req: ChatRequest):
    # TODO: connect with src.qa_pipeline for real answers
    chat_history.append(("user", req.query))
    response = f"Echo: {req.query}"
    chat_history.append(("bot", response))
    return {"answer": response}  # Changed from 'reply' to 'answer'

@router.get("/history")
def get_history():
    return {"history": chat_history}