"use client";

import { useState, useRef, useEffect } from "react";
import { RetroButton } from "./RetroButton";

interface Track {
  name: string;
  notes: number[];
  tempo: number;
}

type PlayMode = "sequential" | "repeat-one" | "shuffle";

export const RetroMidiPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playMode, setPlayMode] = useState<PlayMode>("sequential");
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playModeRef = useRef<PlayMode>("sequential");

  const tracks: Track[] = [
    {
      name: "BGM001.mid",
      notes: [
        698.46, 698.46, 0, 698.46, 0, 554.37, 698.46, 0,
        830.61, 0, 0, 0, 415.30, 0, 0, 0,
        554.37, 0, 0, 415.30, 0, 0, 349.23, 0,
        466.16, 0, 622.25, 0, 587.33, 554.37, 0, 698.46,
      ],
      tempo: 200
    },
    {
      name: "BGM002.mid",
      notes: [
        698.46, 523.25, 554.37, 622.25, 554.37, 523.25, 466.16, 466.16,
        554.37, 698.46, 622.25, 554.37, 523.25, 554.37, 622.25, 698.46,
        554.37, 466.16, 466.16, 0, 622.25, 554.37, 523.25, 466.16,
        554.37, 698.46, 622.25, 554.37, 523.25, 554.37, 622.25, 698.46,
      ],
      tempo: 280
    },
    {
      name: "BGM003.mid",
      notes: [
        311.13, 349.23, 392.00, 466.16, 415.30, 392.00, 349.23, 311.13,
        349.23, 392.00, 415.30, 466.16, 415.30, 392.00, 349.23, 311.13,
        311.13, 349.23, 415.30, 466.16, 415.30, 466.16, 523.25, 622.25,
        523.25, 466.16, 415.30, 349.23, 392.00, 466.16, 415.30, 349.23,
      ],
      tempo: 340
    },
    {
      name: "BGM004.mid",
      notes: [
        277.18, 311.13, 349.23, 415.30, 554.37, 415.30, 349.23, 311.13,
        277.18, 311.13, 349.23, 415.30, 554.37, 698.46, 554.37, 415.30,
        698.46, 830.61, 698.46, 554.37, 415.30, 349.23, 311.13, 277.18,
        311.13, 349.23, 415.30, 554.37, 698.46, 554.37, 415.30, 349.23,
      ],
      tempo: 200
    },
    {
      name: "BGM005.mid",
      notes: [
        493.88, 0, 369.99, 493.88, 493.88, 554.37, 622.25, 659.26,
        739.99, 0, 739.99, 659.26, 622.25, 554.37, 493.88, 0,
        493.88, 0, 369.99, 493.88, 493.88, 554.37, 622.25, 659.26,
        739.99, 659.26, 622.25, 554.37, 493.88, 554.37, 622.25, 493.88,
      ],
      tempo: 300
    },
    {
      name: "BGM006.mid",
      notes: [
        698.46, 698.46, 659.26, 698.46, 523.25, 0, 698.46, 698.46,
        659.26, 698.46, 523.25, 466.16, 523.25, 554.37, 466.16, 0,
        698.46, 698.46, 659.26, 698.46, 523.25, 622.25, 554.37, 523.25,
        466.16, 523.25, 554.37, 622.25, 698.46, 622.25, 554.37, 523.25,
      ],
      tempo: 220
    },
    {
      name: "BGM007.mid",
      notes: [
        554.37, 698.46, 830.61, 698.46, 554.37, 622.25, 698.46, 739.99,
        698.46, 622.25, 554.37, 0, 554.37, 622.25, 698.46, 830.61,
        830.61, 698.46, 554.37, 622.25, 698.46, 739.99, 698.46, 622.25,
        554.37, 622.25, 698.46, 830.61, 698.46, 622.25, 554.37, 0,
      ],
      tempo: 260
    },
    {
      name: "BGM008.mid",
      notes: [
        466.16, 466.16, 466.16, 415.30, 466.16, 554.37, 466.16, 415.30,
        349.23, 415.30, 466.16, 0, 554.37, 554.37, 466.16, 415.30,
        466.16, 554.37, 466.16, 415.30, 349.23, 415.30, 466.16, 554.37,
        622.25, 554.37, 466.16, 415.30, 466.16, 554.37, 466.16, 0,
      ],
      tempo: 180
    },
    {
      name: "BGM009.mid",
      notes: [
        311.13, 466.16, 622.25, 587.33, 622.25, 466.16, 415.30, 392.00,
        415.30, 466.16, 311.13, 0, 311.13, 392.00, 466.16, 622.25,
        622.25, 466.16, 415.30, 392.00, 415.30, 466.16, 622.25, 587.33,
        622.25, 466.16, 415.30, 392.00, 349.23, 392.00, 415.30, 466.16,
      ],
      tempo: 400
    },
    {
      name: "BGM010.mid",
      notes: [
        277.18, 277.18, 277.18, 0, 277.18, 0, 277.18, 311.13,
        0, 277.18, 0, 246.94, 0, 277.18, 311.13, 349.23,
        311.13, 277.18, 0, 277.18, 277.18, 277.18, 0, 277.18,
        0, 207.65, 0, 277.18, 0, 0, 0, 0,
      ],
      tempo: 180
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

  const getNextTrackIndex = (currentIndex: number): number => {
    const mode = playModeRef.current;
    if (mode === "repeat-one") return currentIndex;
    if (mode === "shuffle") {
      if (tracks.length <= 1) return 0;
      let next: number;
      do {
        next = Math.floor(Math.random() * tracks.length);
      } while (next === currentIndex);
      return next;
    }
    return currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
  };

  const startPlayback = (trackIndex: number) => {
    const track = tracks[trackIndex];
    let noteIndex = 0;
    let loopCount = 0;
    const maxLoops = 2;

    intervalRef.current = setInterval(() => {
      if (noteIndex < track.notes.length) {
        const note = track.notes[noteIndex];
        if (note > 0) playNote(note);
        noteIndex++;
      } else {
        loopCount++;
        if (loopCount >= maxLoops) {
          const nextIndex = getNextTrackIndex(trackIndex);
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setCurrentTrackIndex(nextIndex);
          startPlayback(nextIndex);
        } else {
          noteIndex = 0;
        }
      }
    }, track.tempo);
  };

  const handlePlay = async () => {
    if (!isPlaying) {
      const audioContext = createAudioContext();
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      setIsPlaying(true);
      startPlayback(currentTrackIndex);
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

  const cyclePlayMode = () => {
    const modes: PlayMode[] = ["sequential", "repeat-one", "shuffle"];
    const nextMode = modes[(modes.indexOf(playMode) + 1) % modes.length];
    setPlayMode(nextMode);
    playModeRef.current = nextMode;
  };

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
        <RetroButton
          size="small"
          variant="secondary"
          onClick={cyclePlayMode}
        >
          {playMode === "repeat-one" ? "🔂" : playMode === "shuffle" ? "🔀" : "🔁"}
        </RetroButton>
      </div>

      <div className="text-xs text-gray-400 text-center">
        {isPlaying ? "♪♫♪ 再生中... ♪♫♪" : "停止中"}
      </div>
    </div>
  );
};