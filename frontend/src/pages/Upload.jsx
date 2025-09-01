import React, { useState } from "react";
import {
  Upload as UploadIcon,
  FileText,
  Loader2,
  CheckCircle,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { uploadDocument } from "../api/docs";

const Upload = () => {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );

    if (droppedFiles.length > 0) {
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );

    if (selectedFiles.length > 0) {
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setError("");
    const newUploadedFiles = [];

    for (const file of files) {
      try {
        const response = await uploadDocument(file);
        newUploadedFiles.push({
          name: file.name,
          status: "success",
          message: response.message || "Uploaded successfully",
        });
      } catch (err) {
        newUploadedFiles.push({
          name: file.name,
          status: "error",
          message: err.detail || "Upload failed",
        });
      }
    }

    setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
    setFiles([]);
    setUploading(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Upload Documents
            </h1>
            <p className="text-gray-600 mb-8">
              Upload PDF files to add them to your knowledge base
            </p>

            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver
                  ? "border-blue-400 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop PDF files here, or click to select
              </h3>
              <p className="text-gray-500 mb-4">
                Upload multiple PDF files at once
              </p>

              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Select Files
              </button>
            </div>

            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Selected Files
                </h3>
                <div className="space-y-3">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-red-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500"
                        disabled={uploading}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      `Upload ${files.length} file${
                        files.length !== 1 ? "s" : ""
                      }`
                    )}
                  </button>
                </div>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Upload Results
                </h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-red-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {file.name}
                          </p>
                          <p
                            className={`text-sm ${
                              file.status === "success"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {file.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {file.status === "success" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">
                Upload Guidelines
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li>• Only PDF files are supported</li>
                <li>• Maximum file size: 10MB per file</li>
                <li>• Text-based PDFs work best (avoid image-only PDFs)</li>
                <li>• Files are processed and indexed automatically</li>
                <li>• You can upload multiple files at once</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Upload;
