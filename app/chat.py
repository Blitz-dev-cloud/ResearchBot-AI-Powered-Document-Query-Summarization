from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

chat_history = []

class ChatRequest(BaseModel):
    user: str
    message: str

@router.post("/")
def chat(req: ChatRequest):
    # TODO: connect with src.qa_pipeline for real answers
    chat_history.append((req.user, req.message))
    return {"reply": f"Echo: {req.message}"}
