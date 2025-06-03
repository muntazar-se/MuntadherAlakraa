import React, { useState } from "react";

const UploadCv = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("❌ Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    setStatus("📤 Uploading...");

    try {
      const uploadRes = await fetch("http://localhost:4000/api/cv/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        setStatus(`❌ Upload failed: ${uploadData.error}`);
        return;
      }

      const key = encodeURIComponent(uploadData.key);
      const presignRes = await fetch(
        `http://localhost:4000/api/cv/presigned/${key}`
      );
      const presignData = await presignRes.json();

      if (!presignRes.ok) {
        setStatus(`❌ Failed to get download URL: ${presignData.error}`);
        return;
      }

      setDownloadUrl(presignData.url);
      setStatus("✅ Upload successful!");
    } catch (err) {
      setStatus("❌ Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Upload Your CV
      </h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition"
        >
          Upload CV
        </button>
      </form>

      {status && (
        <div className="mt-4 text-center text-sm">
          {status.includes("successful") ? (
            <div className="text-green-600">
              {status}
              <div className="mt-2">
                <button
                  onClick={() => {
                    if (!downloadUrl) return;
                    const a = document.createElement("a");
                    a.href = downloadUrl;
                    a.download = file ? file.name : "cv.pdf";
                    a.click();
                  }}
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  ⬇ Download CV
                </button>
              </div>
            </div>
          ) : status.includes("Uploading") ? (
            <div className="text-blue-600 animate-pulse">{status}</div>
          ) : (
            <div className="text-red-600">{status}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadCv;
