function PlayButtons({ onPlay, onStop }) {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="btn-group"
        role="group"
        aria-label="Basic mixed styles example"
      >
        <button
          id="play"
          className="btn btn-outline-warning btn-dj-control flex-grow-1"
          onClick={onPlay}
        >
          Play
        </button>
        <button
          id="stop"
          className="btn btn-outline-danger btn-dj-control flex-grow-1"
          onClick={onStop}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default PlayButtons;
