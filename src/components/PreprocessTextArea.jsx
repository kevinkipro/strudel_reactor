function PreprocessTextArea({ defaultValue, onChange }) {
  return (
    <>
      <div className="dj-label-container mb-3 text-white">
        Text to Preprocess
      </div>

      <textarea
        className="form-control"
        rows="15"
        defaultValue={defaultValue}
        onChange={onChange}
        id="proc"
      ></textarea>
    </>
  );
}

export default PreprocessTextArea;
