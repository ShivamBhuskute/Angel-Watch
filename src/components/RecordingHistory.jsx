import { useState, useEffect } from "react";
import { Trash, Download } from "lucide-react";
import "tailwindcss/tailwind.css";
import NavBar from "./Navbar";

export default function RecordingHistory() {
  const [recordings, setRecordings] = useState([]);

  // Fetch recordings from localStorage on component mount
  useEffect(() => {
    try {
      const savedRecordings = JSON.parse(localStorage.getItem("recordingHistory")) || [];
      setRecordings(savedRecordings);
    } catch (error) {
      console.error("Error fetching recordings from localStorage:", error);
    }
  }, []);

  // Handle deleting a recording
  const handleDelete = (index) => {
    const updatedRecordings = recordings.filter((_, i) => i !== index);
    setRecordings(updatedRecordings);
    localStorage.setItem("recordingHistory", JSON.stringify(updatedRecordings));
  };

  // Handle downloading a recording
  const handleDownload = (blobUrl, name) => {
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = name;
    a.click();
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-20">
        <h1 className="text-3xl font-semibold text-center mb-10 text-gray-800">Recording History</h1>

        {recordings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recordings.map((recording, index) => (
              <div
                key={recording.id || index}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between transition-all hover:shadow-xl"
              >
                <video
                  src={recording.blobUrl}
                  controls
                  className="w-full h-48 rounded-md mb-4 object-cover"
                  alt={`Recording ${index + 1}`}
                >
                  Your browser does not support video playback.
                </video>
                <div className="flex justify-between items-center mt-auto">
                  <button
                    onClick={() => handleDownload(recording.blobUrl, `recording-${index + 1}.webm`)}
                    className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
                    aria-label={`Download Recording ${index + 1}`}
                  >
                    <Download className="w-5 h-5 mr-1" /> Download
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800 flex items-center transition-colors"
                    aria-label={`Delete Recording ${index + 1}`}
                  >
                    <Trash className="w-5 h-5 mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">No recordings found.</p>
            <a
              href="/record"
              className="text-blue-600 hover:underline mt-4 inline-block"
            >
              Start recording now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
