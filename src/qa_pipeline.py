from langchain.chat_models import ChatGooglePalm
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

llm = ChatGoogleGenerativeAI(
    model = "gemini-2.0-flash",
    google_api_key = GOOGLE_API_KEY,
    temperature=0.3
)

summary_prompt = PromptTemplate(
    input_variables = ["text"],
    template = """
    You are a smart research assistant.
    Summarize this research content in concise points:

    {text}.

    """
)

qa_prompt = PromptTemplate(
    input_variables = ["summary", "question"],
    template = """
    Using the following summary, 

    {summary}

    Answer the question:

    {question}

    """
)

summary_chain = LLMChain(
    llm = llm,
    prompt = summary_prompt
)

qa_chain = LLMChain(
    llm = llm,
    prompt = qa_prompt
)

def summarize_chunks(chunks):
    summaries = []
    for doc in chunks:
        # invoke returns a dict, get the actual string from the output key
        result = summary_chain.invoke({"text": doc.page_content})
        summaries.append(result['text'])  # <-- extract the string
    return summaries

def answer_query(summaries, query):
    combined_summary = " ".join(summaries)
    # Pass a dict with keys matching qa_prompt's input_variables
    answer = qa_chain.invoke({"summary": combined_summary, "question": query})
    return answer
