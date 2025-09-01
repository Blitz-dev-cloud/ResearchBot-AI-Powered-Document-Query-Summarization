from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import auth, chat, docs, embeddings

app = FastAPI(title="Research Bot API")

# CORS middleware - CRITICAL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Your routes
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"]) 
app.include_router(docs.router, prefix="/docs", tags=["Documents"])
app.include_router(embeddings.router, prefix="/embeddings", tags=["Embeddings"])

@app.get("/")
def root():
    return {"msg": "Research Bot API is running 🚀"}