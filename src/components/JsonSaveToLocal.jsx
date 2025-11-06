import { useState } from "react";

function JsonSaveToLocal({ songText }) {
  const [filename, setFilename] = useState("song");

  function handleSave() {
    try {
      // Create the data object.
      const data = {
        songText: songText,
        savedAt: new Date().toISOString(),
        version: "1.0",
      };

      // Save to localStorage with the filename.
      const dataString = JSON.stringify(data);
      localStorage.setItem(`${filename}_JSON`, dataString);

      alert(`Song saved as "${filename}"!`);
    } catch (err) {
      console.error("Error saving:", err);
      alert("Failed to save tune");
    }
  }

  return (
    <div className="d-flex gap-2 align-items-center">
      <input
        type="text"
        className="form-control"
        placeholder="Filename"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        style={{ maxWidth: "200px" }}
      />
      <button className="btn btn-success" onClick={handleSave}>
        Save
      </button>
    </div>
  );
}

export default JsonSaveToLocal;
