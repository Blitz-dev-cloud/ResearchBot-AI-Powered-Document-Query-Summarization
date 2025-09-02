from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Add this import
from . import auth, chat, docs, embeddings

app = FastAPI(title="Research Bot API")

# Add CORS middleware - ADD THIS SECTION
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for now
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Register routers (your existing code)
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(docs.router, prefix="/docs", tags=["Documents"])
app.include_router(embeddings.router, prefix="/embeddings", tags=["Embeddings"])

@app.get("/")
def root():
    return {"msg": "Research Bot API is running 🚀"}