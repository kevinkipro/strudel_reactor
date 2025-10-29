function DJ_Controls() {
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
        />
      </div>
      <label htmlFor="volume_range" className="form-label">
        Volume
      </label>
      <input
        type="range"
        className="form-range"
        min="0"
        max="1"
        step="0.01"
        id="volume_range"
      />

      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="s1" />
        <label className="form-check-label" htmlFor="s1">
          s1
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="d1" />
        <label className="form-check-label" htmlFor="d1">
          d1
        </label>
      </div>

      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="d2" />
        <label className="form-check-label" for="d2">
          d2
        </label>
      </div>
    </>
  );
}

export default DJ_Controls;
