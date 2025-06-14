"use client";

import { useState, useRef, useEffect } from "react";
import { RetroButton } from "./RetroButton";

interface Track {
  name: string;
  notes: number[];
  tempo: number;
}

export const RetroMidiPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const tracks: Track[] = [
    {
      name: "BGM001.mid",
      notes: [277.18, 311.13, 369.99, 415.30, 277.18, 311.13, 369.99, 415.30, 277.18, 369.99, 415.30, 466.16, 415.30, 369.99, 311.13], // Rockman inspired melody (shifted +1 semitone)
      tempo: 300
    },
    {
      name: "BGM002.mid", 
      notes: [277.18, 277.18, 0, 277.18, 0, 261.63, 277.18, 0, 311.13, 0, 0, 0, 155.56, 0, 0, 0], // Super Mario Bros inspired (shifted +1 semitone, 0 = rest)
      tempo: 200
    },
    {
      name: "BGM003.mid",
      notes: [311.13, 369.99, 415.30, 466.16, 415.30, 369.99, 311.13, 261.63, 293.66, 329.63, 369.99, 415.30, 369.99, 329.63, 293.66, 261.63], // Dragon Quest inspired overture (shifted +1 semitone)
      tempo: 350
    },
    {
      name: "BGM004.mid",
      notes: [261.63, 293.66, 311.13, 349.23, 329.63, 369.99, 415.30, 466.16, 415.30, 369.99, 329.63, 311.13], // FF prelude inspired (shifted +1 semitone)
      tempo: 450
    },
    {
      name: "BGM005.mid",
      notes: [369.99, 415.30, 466.16, 369.99, 415.30, 466.16, 369.99, 415.30, 466.16, 523.25, 466.16, 415.30, 369.99], // Zelda main theme inspired (shifted +1 semitone)
      tempo: 280
    }
  ];

  const createAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playNote = (frequency: number, duration: number = 0.2) => {
    const audioContext = createAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'square'; // 8-bit style sound
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  const handlePlay = async () => {
    if (!isPlaying) {
      const audioContext = createAudioContext();
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      setIsPlaying(true);
      const currentTrack = tracks[currentTrackIndex];
      let noteIndex = 0;

      intervalRef.current = setInterval(() => {
        if (noteIndex < currentTrack.notes.length) {
          const note = currentTrack.notes[noteIndex];
          if (note > 0) { // Only play if not a rest (0)
            playNote(note);
          }
          noteIndex++;
        } else {
          noteIndex = 0; // Loop the track
        }
      }, currentTrack.tempo);
    } else {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handlePrevTrack = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    setCurrentTrackIndex(currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1);
  };

  const handleNextTrack = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    setCurrentTrackIndex(currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0);
  };

  return (
    <div className="bg-gray-800 border-2 border-gray-400 p-3 text-white max-w-xs">
      <div className="text-center font-bold mb-2 text-cyan-400">🎵 MIDI Player 🎵</div>
      
      <div className="bg-black border border-gray-600 p-2 mb-2 text-center">
        <div className="text-green-400 text-sm font-mono">Now Playing:</div>
        <div className="text-yellow-300 text-xs">{tracks[currentTrackIndex].name}</div>
      </div>

      <div className="flex justify-center gap-2 mb-2">
        <RetroButton 
          size="small" 
          variant="secondary"
          onClick={handlePrevTrack}
        >
          ⏮
        </RetroButton>
        <RetroButton 
          size="small" 
          variant="secondary"
          onClick={handlePlay}
        >
          {isPlaying ? "⏸" : "▶"}
        </RetroButton>
        <RetroButton 
          size="small" 
          variant="secondary"
          onClick={handleNextTrack}
        >
          ⏭
        </RetroButton>
      </div>

      <div className="text-xs text-gray-400 text-center">
        {isPlaying ? "♪♫♪ 再生中... ♪♫♪" : "停止中"}
      </div>
    </div>
  );
};