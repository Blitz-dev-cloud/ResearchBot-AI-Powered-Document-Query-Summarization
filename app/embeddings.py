from fastapi import APIRouter
router = APIRouter()

@router.get("/build")
def build_embeddings():
    # TODO: hook src.embeddings_store
    return {"msg": "Embeddings built"}

@router.get("/search")
def search(q: str):
    # TODO: hook src.retriever
    return {"results": [f"Mock result for query '{q}'"]}
