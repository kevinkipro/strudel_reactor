function PlocButtons() {
  return (
    <>
      <div
        className="btn-group"
        role="group"
        ariel-label="Basic mixed styles example"
      >
        <button
          id="process"
          className="btn btn-outline-primary btn-dj-control flex-grow-1"
        >
          Preprocess
        </button>
        <button
          id="process_play"
          className="btn btn-outline-success btn-dj-control flex-grow-1"
        >
          Proc & Play
        </button>
      </div>
    </>
  );
}

export default PlocButtons;
