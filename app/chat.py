from fastapi import APIRouter
from pydantic import BaseModel

from src.retriever import get_retriever
from src.qa_pipeline import summarize_chunks, answer_query
from src.embeddings_store import create_or_load_vectorstore
from src.loaders import load_pdfs
from src.chunker import chunk_documents

router = APIRouter()

# In-memory chat history (per server process)
chat_history = []

# Load documents and build retriever ONCE at startup
documents = load_pdfs("data/")       # make sure PDFs exist inside ./data/
chunks = chunk_documents(documents)
vector_store = create_or_load_vectorstore(chunks)
retriever = get_retriever(vector_store)

class ChatRequest(BaseModel):
    query: str

@router.post("/query")
def chat(req: ChatRequest):
    query = req.query
    chat_history.append(("user", query))

    # 🔥 Retrieve relevant docs
    relevant_docs = retriever.get_relevant_documents(query)

    # 🔥 Summarize chunks
    summaries = summarize_chunks(relevant_docs)

    # 🔥 Final answer
    answer = answer_query(summaries, query)
    final_answer = answer["text"]

    chat_history.append(("bot", final_answer))

    return {"answer": final_answer}

@router.get("/history")
def get_history():
    return {"history": chat_history}
