from langchain.text_splitter import RecursiveCharacterTextSplitter

def chunk_documents(documents, chunk_size = 1000, overlap = 100):
    """Split documents into chunks for embedding"""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size = chunk_size,
        chunk_overlap = overlap
    )
    return splitter.split_documents(documents)

# Splits the documents into chunks 