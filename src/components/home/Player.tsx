import React, { Ref } from 'react';

interface IProps {
  audioRef: Ref<HTMLAudioElement>;
}

const Player = ({ audioRef }: IProps) => {
  return (
    <div className="hidden">
      <audio ref={audioRef} src="/sounds/cowbell.mp3" />
    </div>
  );
};

export default Player;
