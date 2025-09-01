def get_retriever(vector_store, k = 5):
    """Return a retriever for RAG queries"""
    return vector_store.as_retriever(search_type = "similarity", search_kwargs = {"k": k})