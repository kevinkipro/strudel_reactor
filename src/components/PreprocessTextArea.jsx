function PreprocessTextArea({ defaultValue, onChange }) {
  return (
    <>
      <div className="dj-label-container mb-2 text-center">
        <label
          htmlFor="exampleFormControlTextarea1"
          className="form-label text-white font-weight-bold fs-5 mb-0"
        >
          Text to Preprocess
        </label>
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
