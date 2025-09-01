# Entry point of our program
import os
from dotenv import load_dotenv
from loaders import load_pdfs
from chunker import chunk_documents
from embeddings_store import create_or_load_vectorstore
from retriever import get_retriever
from qa_pipeline import summarize_chunks, answer_query
from chat_db import init_db, save_chat, get_user_history
from auth import login_or_register

load_dotenv()

def main():
    init_db()
    user_id = login_or_register()
    
    pdf_folder = "../data/"
    print("Loading PDFs...")
    documents = load_pdfs(pdf_folder)

    print("Chunking documents...")
    chunks = chunk_documents(documents)
    
    print("Creating/loading vector store...")
    vector_store = create_or_load_vectorstore(chunks)

    retriever = get_retriever(vector_store)

    # Show past history
    history = get_user_history(user_id)
    if history:
        print("\n--- Your past chats ---")
        for q, r, t in history:
            print(f"[{t}] Q: {q}\nA: {r}\n")
        print("----------------------")

    while True:
        query = input("\nEnter your research query (or exit): ")
        if query.lower() == "exit":
            break

        relevant_docs = retriever.get_relevant_documents(query)
        summaries = summarize_chunks(relevant_docs)
        answer = answer_query(summaries, query)
        print("\nAnswer:\n", answer["text"])

        save_chat(user_id, query, answer["text"])

if __name__ == "__main__":
    main()

# Loads PDF -> Chunks -> Vector Embedding -> Store
# Retrieve relevant chunks -> Summarize -> Answer