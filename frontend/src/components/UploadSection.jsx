import { useState } from "react";
import API from "../services/api";

function UploadSection({ setSummary, setResults }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const summaryResponse =
        await API.post("/summary", formData);

      setSummary(summaryResponse.data);

      const formData2 = new FormData();
      formData2.append("file", file);

      const uploadResponse =
        await API.post("/upload", formData2);

      setResults(uploadResponse.data);

    } catch (error) {
      console.error(error);
      alert("Failed to analyze dataset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        {/* Left Side */}

        <div className="max-w-2xl">

          <p className="text-sm uppercase tracking-widest text-blue-400 font-medium">
            Dataset Upload
          </p>

          <h2 className="text-3xl font-bold mt-3">
            Analyze Transaction Records
          </h2>

          <p className="text-slate-400 mt-3 leading-relaxed">
            Upload transaction data and generate
            risk scores, account classifications,
            and investigation-ready insights.
          </p>

        </div>

        {/* Right Side */}

        <div className="w-full lg:w-[420px]">

          <div
            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-950/50
              p-6
            "
          >

            <label
              className="
                flex
                flex-col
                items-center
                justify-center
                border-2
                border-dashed
                border-slate-700
                rounded-2xl
                p-8
                cursor-pointer
                hover:border-blue-500
                transition-all
              "
            >

              <span className="text-lg font-medium">
                Select Dataset
              </span>

              <span className="text-sm text-slate-400 mt-2">
                CSV format supported
              </span>

              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />

            </label>

            {file && (
              <div
                className="
                  mt-5
                  rounded-xl
                  bg-slate-900
                  border
                  border-slate-800
                  p-4
                "
              >
                <p className="text-sm text-slate-400">
                  Selected File
                </p>

                <p className="mt-1 font-medium truncate">
                  {file.name}
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="
                w-full
                mt-5
                rounded-2xl
                bg-blue-600
                py-4
                font-semibold
                transition-all
                hover:bg-blue-500
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Analyzing Dataset..."
                : "Analyze Dataset"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UploadSection;