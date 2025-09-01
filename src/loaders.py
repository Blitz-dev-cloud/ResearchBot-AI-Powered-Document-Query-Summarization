from langchain.document_loaders import PyPDFLoader
from pathlib import Path

def load_pdfs(pdf_folder: str):
    """Load all PDFs in a folder"""
    documents = []
    for pdf_file in Path(pdf_folder).glob("*.pdf"):
        loader = PyPDFLoader(str(pdf_file))
        docs = loader.load()
        for d in docs:
            d.metadata["source"] = str(pdf_file)
        documents.extend(docs)
    return documents

# Loads PDFs as LangChain Document objects, adds source metadata for later reference
