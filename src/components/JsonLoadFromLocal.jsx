import { useState, useEffect } from "react";

function JsonLoadFromLocal({ onLoad }) {
  const [savedSongs, setSavedSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState("");

  // Load list of saved songs from localStorage
  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.endsWith("_JSON")
    );
    const songNames = keys.map((key) => key.replace("_JSON", ""));
    setSavedSongs(songNames);
  }, []);

  function handleLoad() {
    if (!selectedSong) {
      alert("Please select a song to load");
      return;
    }

    try {
      const dataString = localStorage.getItem(`${selectedSong}_JSON`);

      if (!dataString) {
        alert("Song not found");
        return;
      }

      const data = JSON.parse(dataString);

      // Validate
      if (!data.songText) {
        alert("Invalid song: missing songText");
        return;
      }

      // Call the onLoad callback with the songText
      if (onLoad) {
        onLoad(data.songText);
      }

      alert("Song loaded successfully!");
    } catch (err) {
      console.error("Error loading:", err);
      alert("Failed");
    }
  }

  function refreshList() {
    const keys = Object.keys(localStorage).filter((key) =>
      key.endsWith("_JSON")
    );
    const songNames = keys.map((key) => key.replace("_JSON", ""));
    setSavedSongs(songNames);
  }

  return (
    <div className="d-flex gap-2 align-items-center">
      <select
        className="form-select"
        value={selectedSong}
        onChange={(e) => setSelectedSong(e.target.value)}
        style={{ maxWidth: "200px" }}
      >
        <option value="">Select a song...</option>
        {savedSongs.map((song) => (
          <option key={song} value={song}>
            {song}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" onClick={handleLoad}>
        Load
      </button>
      <button
        className="btn btn-secondary"
        onClick={refreshList}
        title="Refresh list"
      >
        Reload
      </button>
    </div>
  );
}

export default JsonLoadFromLocal;
