"use client";

import { useState, useRef, useEffect } from "react";

interface Track {
  name: string;
  notes: number[];
  tempo: number;
}

const tracks: Track[] = [
  {
    name: "BGM001.mid",
    notes: [
      698.46, 698.46, 0, 698.46, 0, 554.37, 698.46, 0,
      830.61, 0, 0, 0, 415.30, 0, 0, 0,
      554.37, 0, 0, 415.30, 0, 0, 349.23, 0,
      466.16, 0, 622.25, 0, 587.33, 554.37, 0, 698.46,
      0, 830.61, 0, 880.00, 0, 739.99, 830.61, 0,
      739.99, 0, 554.37, 0, 622.25, 466.16, 0, 415.30,
      349.23, 0, 0, 554.37, 0, 0, 415.30, 0,
      0, 349.23, 0, 466.16, 0, 622.25, 0, 0,
    ],
    tempo: 200,
  },
  {
    name: "BGM002.mid",
    notes: [
      698.46, 523.25, 554.37, 622.25, 554.37, 523.25, 466.16, 466.16,
      554.37, 698.46, 622.25, 554.37, 523.25, 554.37, 622.25, 698.46,
      554.37, 466.16, 466.16, 0, 622.25, 554.37, 523.25, 466.16,
      554.37, 698.46, 622.25, 554.37, 523.25, 554.37, 622.25, 698.46,
    ],
    tempo: 280,
  },
  {
    name: "BGM003.mid",
    notes: [
      311.13, 349.23, 392.00, 466.16, 415.30, 392.00, 349.23, 311.13,
      349.23, 392.00, 415.30, 466.16, 415.30, 392.00, 349.23, 311.13,
      311.13, 349.23, 415.30, 466.16, 415.30, 466.16, 523.25, 622.25,
      523.25, 466.16, 415.30, 349.23, 392.00, 466.16, 415.30, 349.23,
    ],
    tempo: 340,
  },
  {
    name: "BGM004.mid",
    notes: [
      277.18, 311.13, 349.23, 415.30, 554.37, 415.30, 349.23, 311.13,
      277.18, 311.13, 349.23, 415.30, 554.37, 698.46, 554.37, 415.30,
      698.46, 830.61, 698.46, 554.37, 415.30, 349.23, 311.13, 277.18,
      311.13, 349.23, 415.30, 554.37, 698.46, 554.37, 415.30, 349.23,
    ],
    tempo: 200,
  },
  {
    name: "BGM005.mid",
    notes: [
      493.88, 0, 369.99, 493.88, 493.88, 554.37, 622.25, 659.26,
      739.99, 0, 739.99, 659.26, 622.25, 554.37, 493.88, 0,
      493.88, 0, 369.99, 493.88, 493.88, 554.37, 622.25, 659.26,
      739.99, 659.26, 622.25, 554.37, 493.88, 554.37, 622.25, 493.88,
    ],
    tempo: 300,
  },
  {
    name: "BGM006.mid",
    notes: [
      698.46, 698.46, 659.26, 698.46, 523.25, 0, 698.46, 698.46,
      659.26, 698.46, 523.25, 466.16, 523.25, 554.37, 466.16, 0,
      698.46, 698.46, 659.26, 698.46, 523.25, 622.25, 554.37, 523.25,
      466.16, 523.25, 554.37, 622.25, 698.46, 622.25, 554.37, 523.25,
    ],
    tempo: 220,
  },
  {
    name: "BGM007.mid",
    notes: [
      554.37, 698.46, 830.61, 698.46, 554.37, 622.25, 698.46, 739.99,
      698.46, 622.25, 554.37, 0, 554.37, 622.25, 698.46, 830.61,
      830.61, 698.46, 554.37, 622.25, 698.46, 739.99, 698.46, 622.25,
      554.37, 622.25, 698.46, 830.61, 698.46, 622.25, 554.37, 0,
    ],
    tempo: 260,
  },
  {
    name: "BGM008.mid",
    notes: [
      466.16, 466.16, 466.16, 415.30, 466.16, 554.37, 466.16, 415.30,
      349.23, 415.30, 466.16, 0, 554.37, 554.37, 466.16, 415.30,
      466.16, 554.37, 466.16, 415.30, 349.23, 415.30, 466.16, 554.37,
      622.25, 554.37, 466.16, 415.30, 466.16, 554.37, 466.16, 0,
    ],
    tempo: 180,
  },
  {
    name: "BGM009.mid",
    notes: [
      311.13, 466.16, 622.25, 587.33, 622.25, 466.16, 415.30, 392.00,
      415.30, 466.16, 311.13, 0, 311.13, 392.00, 466.16, 622.25,
      622.25, 466.16, 415.30, 392.00, 415.30, 466.16, 622.25, 587.33,
      622.25, 466.16, 415.30, 392.00, 349.23, 392.00, 415.30, 466.16,
    ],
    tempo: 400,
  },
  {
    name: "BGM010.mid",
    notes: [
      277.18, 277.18, 277.18, 0, 277.18, 0, 277.18, 311.13,
      0, 277.18, 0, 246.94, 0, 277.18, 311.13, 349.23,
      311.13, 277.18, 0, 277.18, 277.18, 277.18, 0, 277.18,
      0, 207.65, 0, 277.18, 0, 0, 0, 0,
    ],
    tempo: 180,
  },
];

type PlayMode = "sequential" | "repeat-one" | "shuffle";

export const AudioPlayerWindow = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playMode, setPlayMode] = useState<PlayMode>("sequential");
  const [visualizerBars, setVisualizerBars] = useState<number[]>(Array(12).fill(2));
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const vizIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const playModeRef = useRef<PlayMode>("sequential");

  const createAudioContext = () => {
    if (!audioContextRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playNote = (frequency: number, duration = 0.2) => {
    const ctx = createAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.type = "square";
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
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
    const maxLoops = 1;

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

    vizIntervalRef.current = setInterval(() => {
      setVisualizerBars(Array.from({ length: 12 }, () => Math.floor(Math.random() * 16) + 2));
    }, 100);
  };

  const handlePlay = async () => {
    if (!isPlaying) {
      const ctx = createAudioContext();
      if (ctx.state === "suspended") await ctx.resume();
      setIsPlaying(true);
      startPlayback(currentTrackIndex);
    } else {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (vizIntervalRef.current) clearInterval(vizIntervalRef.current);
      intervalRef.current = null;
      vizIntervalRef.current = null;
      setVisualizerBars(Array(12).fill(2));
    }
  };

  const cyclePlayMode = () => {
    const modes: PlayMode[] = ["sequential", "repeat-one", "shuffle"];
    const nextMode = modes[(modes.indexOf(playMode) + 1) % modes.length];
    setPlayMode(nextMode);
    playModeRef.current = nextMode;
  };

  const playModeIcon = playMode === "repeat-one" ? "\uD83D\uDD02" : playMode === "shuffle" ? "\uD83D\uDD00" : "\uD83D\uDD01";

  const stopAndSwitch = (next: number) => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (vizIntervalRef.current) clearInterval(vizIntervalRef.current);
      intervalRef.current = null;
      vizIntervalRef.current = null;
      setVisualizerBars(Array(12).fill(2));
    }
    setCurrentTrackIndex(next);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (vizIntervalRef.current) clearInterval(vizIntervalRef.current);
    };
  }, []);

  return (
    <div className="os-audio-player">
      <div className="os-audio-display">
        <div className="os-audio-track-name">
          Now Playing: {tracks[currentTrackIndex].name}
        </div>
        <div className="os-audio-visualizer">
          {visualizerBars.map((h, i) => (
            <div
              key={i}
              className="os-audio-bar"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>
      <div className="os-audio-controls">
        <button
          className="os-audio-btn"
          onClick={() => stopAndSwitch(currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1)}
        >
          &#9198;
        </button>
        <button className="os-audio-btn os-audio-btn-play" onClick={handlePlay}>
          {isPlaying ? "\u23F8" : "\u25B6"}
        </button>
        <button
          className="os-audio-btn"
          onClick={() => stopAndSwitch(currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0)}
        >
          &#9197;
        </button>
        <button
          className="os-audio-btn"
          onClick={cyclePlayMode}
          title={playMode === "repeat-one" ? "1曲リピート" : playMode === "shuffle" ? "シャッフル" : "順次再生"}
        >
          {playModeIcon}
        </button>
      </div>
    </div>
  );
};
