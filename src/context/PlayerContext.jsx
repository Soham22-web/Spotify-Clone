import React, { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(); // reference to audio element
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  // Play audio
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  // Pause audio
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
  }

  // ✅ Seek when user clicks on seekBg
  const handleSeek = (e) => {
    if (!audioRef.current.duration) return;

    const rect = seekBg.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // position where user clicked
    const width = rect.width;
    const newTime = (clickX / width) * audioRef.current.duration;

    audioRef.current.currentTime = newTime; // jump audio
  };

  const previous = async () => {
    if (track.id>0) {
        await setTrack(songsData[track.id-1]);
        await audioRef.current.play();
        setPlayStatus(true);
    }
  }

  const next = async () => {
    if (track.id < songsData.length-1 ) {
        await setTrack(songsData[track.id+1]);
        await audioRef.current.play();
        setPlayStatus(true);
    }
  }

  // ✅ Update seek bar and time on every frame
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.ontimeupdate = () => {
      if (!audioRef.current.duration) return; // prevent NaN

      // Update seek bar width
      if (seekBar.current) {
        const progress =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        seekBar.current.style.width = `${progress}%`;
      }

      // Update time state
      setTime({
        currentTime: {
          second: Math.floor(audioRef.current.currentTime % 60),
          minute: Math.floor(audioRef.current.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audioRef.current.duration % 60),
          minute: Math.floor(audioRef.current.duration / 60),
        },
      });
    };
  }, []);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    handleSeek, // 👈 expose this function to Player
    playWithId,
    previous,
    next
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
