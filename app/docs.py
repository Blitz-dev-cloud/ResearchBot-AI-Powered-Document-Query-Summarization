from fastapi import APIRouter, UploadFile, File
import os

router = APIRouter()
DATA_DIR = "data"

@router.post("/upload")
def upload(file: UploadFile = File(...)):
    os.makedirs(DATA_DIR, exist_ok=True)
    filepath = os.path.join(DATA_DIR, file.filename)
    with open(filepath, "wb") as f:
        f.write(file.file.read())
    return {"msg": f"File {file.filename} uploaded"}
