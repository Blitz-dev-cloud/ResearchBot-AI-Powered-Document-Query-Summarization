from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import your routers
from . import auth, chat, docs, embeddings

# Initialize FastAPI app
app = FastAPI(title="Research Bot API")

# -----------------------------
# CORS configuration
# -----------------------------
# For production, replace ["*"] with your frontend URL for security
origins = [
    "https://research-bot-ai-powered-document-qu.vercel.app",
    # "http://localhost:3000"  # Optional: for local dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # Allowed origins
    allow_credentials=True,     # Allow cookies/auth headers
    allow_methods=["*"],        # Allow GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],        # Allow custom headers
)

# -----------------------------
# Include API routers
# -----------------------------
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(docs.router, prefix="/docs", tags=["Documents"])
app.include_router(embeddings.router, prefix="/embeddings", tags=["Embeddings"])

# -----------------------------
# Root endpoint
# -----------------------------
@app.get("/")
def root():
    return {"msg": "Research Bot API is running 🚀"}
