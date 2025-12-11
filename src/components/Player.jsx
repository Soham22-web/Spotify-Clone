import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    handleSeek, // 👈 imported from context
    previous,next
  } = useContext(PlayerContext);

  // ✅ Format numbers like 1:05 instead of 1:5
  const formatTime = (minute, second) => {
    return `${minute}:${second.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* Track Info */}
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      {/* Controls + Seek Bar */}
      <div className="flex flex-col items-center gap-1 m-auto">
        {/* Control Buttons */}
        <div className="flex gap-4">
          <img className="w-4 cursor-pointer" src={assets.shuffle_icon} />
          <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} />

          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
            />
          )}

          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} />
        </div>

        {/* Seek Bar */}
        <div className="flex items-center gap-5 w-full">
          {/* Current Time */}
          <p>{formatTime(time.currentTime.minute, time.currentTime.second)}</p>

          {/* Progress Bar */}
          <div
            ref={seekBg}
            onClick={handleSeek} // 👈 allow click-to-seek
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer h-1"
          >
            <div
              ref={seekBar}
              className="h-1 bg-green-500 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>

          {/* Total Time */}
          <p>{formatTime(time.totalTime.minute, time.totalTime.second)}</p>
        </div>
      </div>

      {/* Extra Player Options */}
      <div className="hidden lg:flex items-center gap-3 opacity-75">
        <img className="w-4" src={assets.plays_icon} />
        <img className="w-4" src={assets.mic_icon} />
        <img className="w-4" src={assets.queue_icon} />
        <img className="w-4" src={assets.speaker_icon} />
        <img className="w-4" src={assets.volume_icon} />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img className="w-4" src={assets.mini_player_icon} />
        <img className="w-4" src={assets.zoom_icon} />
      </div>
    </div>
  );
};

export default Player;
