import { useCallback, useEffect } from "react";

function Keycap({power, sound, setSoundName}) {

  const playSound = useCallback((sound) => {
    const track = document.getElementById(sound.key);
    track.currentTime = 0;
    track.play();
    setSoundName(sound.name);
    const btn = document.getElementById(`${sound.key}-btn`);
    btn.classList.add(`${sound.key.toLowerCase()}-key-color`);
    setTimeout(() => {
      btn.classList.remove(`${sound.key.toLowerCase()}-key-color`);
    }, 200);
  }, [setSoundName]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (power && event.key.toUpperCase() === sound.key) {
        playSound(sound);
      };
    };
    document.addEventListener('keydown', handleKeydown)
    return () => {document.removeEventListener('keydown', handleKeydown)}
  }, [power, playSound, sound]);

  return (
    <button id={`${sound.key}-btn`}
      className="drum-pad russo-one-regular"
      onClick={() => {playSound(sound)}}
      disabled={!power}
    >
      {sound.key}
      <audio
        id={sound.key}
        className="clip"
        src={sound.audio}
        preload="auto"
      />
    </button>
  );
};

export default Keycap;
