from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import auth, chat, docs, embeddings

app = FastAPI(title="Research Bot API")

# Define allowed origins explicitly
origins = [
    "https://research-bot-ai-powered-document-qu.vercel.app",  # Vercel frontend
    "http://localhost:5173",  # Vite local dev
]

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Routers
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(docs.router, prefix="/docs", tags=["Documents"])
app.include_router(embeddings.router, prefix="/embeddings", tags=["Embeddings"])

@app.get("/")
def root():
    return {"msg": "Research Bot API is running 🚀"}
