import { changeCPMandVolumeValue, changeLpf, changeHpf } from "../App";

function DJ_Controls({ setSongText, keepOriginalText }) {
  const handleCPMChange = (e) => {
    changeCPMandVolumeValue(e.target.value, setSongText, keepOriginalText);
  };

  const handleVolumeChange = (e) => {
    changeCPMandVolumeValue(
      document.getElementById("cpm_text_input")?.value || "{CPM}",
      setSongText,
      keepOriginalText
    );
  };

  const handleLPFChange = (e) => {
    changeLpf(setSongText, keepOriginalText);
  };

  const handleHPFChange = (e) => {
    changeHpf(setSongText, keepOriginalText);
  };

  return (
    <>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="cpm_label">
            Set CPM
          </span>
        </div>
        <input
          id="cpm_text_input"
          type="text"
          className="form-control"
          placeholder="CPM"
          aria-label="cpm"
          aria-describedby="cpm_label"
          onChange={handleCPMChange}
        />
      </div>

      <label htmlFor="volume_range" className="form-label text-white">
        Volume
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="1"
        step="0.01"
        id="volume_range"
        onChange={handleVolumeChange}
      />
      {/* low-pass filter dj controls */}
      <label htmlFor="lpf_range" className="form-label text-white">
        low-pass filter
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="10000"
        step="100"
        id="lpf_range"
        onChange={handleLPFChange}
      />

      {/*  high-pass dj controls */}
      <label htmlFor="hpf_range" className="form-label text-white">
        High pass filter
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="10000"
        step="100"
        id="hpf_range"
        onChange={handleHPFChange}
      />
    </>
  );
}

export default DJ_Controls;
