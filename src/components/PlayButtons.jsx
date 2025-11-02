function PlayButtons({ onPlay, onStop }) {
  return (
    <>
      <div
        className="btn-group"
        role="group"
        ariel-label="Basic mixed styles example"
      >
        <button
          id="play"
          className="btn btn-outline-warning btn-dj-control flex-grow-1j"
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
    </>
  );
}

export default PlayButtons;
