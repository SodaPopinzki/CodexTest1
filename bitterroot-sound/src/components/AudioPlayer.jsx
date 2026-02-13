import { useEffect, useMemo, useRef, useState } from 'react';
import { Howl } from 'howler';
import tracks from '../data/tracks.json';

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const durationToSeconds = (duration) => {
  const [mins, secs] = duration.split(':').map(Number);
  return mins * 60 + secs;
};

export default function AudioPlayer() {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const howlRef = useRef(null);
  const progressRef = useRef(null);

  const activeTrack = tracks[activeTrackIndex];
  const fallbackDuration = useMemo(
    () => durationToSeconds(activeTrack.duration),
    [activeTrack.duration]
  );

  const stopCurrentTrack = () => {
    if (howlRef.current) {
      howlRef.current.stop();
      howlRef.current.unload();
      howlRef.current = null;
    }
  };

  useEffect(() => {
    stopCurrentTrack();
    const howl = new Howl({
      src: [activeTrack.src],
      html5: true,
      volume,
      onend: () => {
        setIsPlaying(false);
        setCurrentTime(0);
      },
      onloaderror: () => {
        setIsPlaying(false);
      }
    });

    howlRef.current = howl;
    setCurrentTime(0);

    if (isPlaying) {
      howl.play();
    }

    return () => {
      stopCurrentTrack();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrackIndex]);

  useEffect(() => {
    const howl = howlRef.current;
    if (!howl) return;

    howl.volume(volume);
  }, [volume]);

  useEffect(() => {
    const howl = howlRef.current;
    if (!howl) return;

    if (isPlaying && !howl.playing()) {
      howl.play();
    }

    if (!isPlaying && howl.playing()) {
      howl.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    let frame;

    const updateProgress = () => {
      const howl = howlRef.current;
      if (howl && howl.playing()) {
        setCurrentTime(howl.seek() || 0);
      }
      frame = requestAnimationFrame(updateProgress);
    };

    frame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frame);
  }, []);

  const totalDuration = howlRef.current?.duration() || fallbackDuration;
  const progressPercent = Math.min((currentTime / totalDuration) * 100, 100);

  const handleSeek = (event) => {
    const howl = howlRef.current;
    if (!howl || !progressRef.current) return;

    const bounds = progressRef.current.getBoundingClientRect();
    const clickPosition = event.clientX - bounds.left;
    const seekTime = (clickPosition / bounds.width) * totalDuration;
    howl.seek(seekTime);
    setCurrentTime(seekTime);
  };

  const handleTrackSelect = (index) => {
    if (index === activeTrackIndex) {
      setIsPlaying((prev) => !prev);
      return;
    }

    setActiveTrackIndex(index);
    setIsPlaying(true);
  };

  const handleNext = () => {
    setActiveTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    setActiveTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  return (
    <section className="bg-slate-900 py-16 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#e1b95a] md:text-4xl">Hear the Quality</h2>
          <p className="mt-2 text-lg text-slate-300">Sample tracks showcasing our range</p>
        </div>

        <div className="rounded-2xl border border-[#e1b95a]/30 bg-[#1f1a17] p-6 shadow-xl md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Now Playing</p>
              <h3 className="text-2xl font-semibold text-white">{activeTrack.title}</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#e1b95a]/20 px-3 py-1 text-sm font-medium text-[#e1b95a]">
                {activeTrack.genre}
              </span>
              <span className="text-slate-300">{activeTrack.duration}</span>
            </div>
          </div>

          <div className={`mb-8 flex h-16 items-end justify-center gap-1 ${isPlaying ? '' : 'paused'}`}>
            {Array.from({ length: 24 }).map((_, index) => (
              <span
                key={index}
                className="wave-bar h-4 w-1.5 rounded-full bg-[#e1b95a]"
                style={{ animationDelay: `${index * 0.08}s` }}
              />
            ))}
          </div>

          <div className="mb-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrevious}
              className="rounded-full border border-[#e1b95a]/60 px-4 py-2 text-lg text-[#e1b95a] transition hover:bg-[#e1b95a]/15"
              aria-label="Previous track"
            >
              ⏮
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e1b95a] text-3xl text-[#1f1a17] shadow-lg transition hover:scale-105"
              aria-label={isPlaying ? 'Pause track' : 'Play track'}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="rounded-full border border-[#e1b95a]/60 px-4 py-2 text-lg text-[#e1b95a] transition hover:bg-[#e1b95a]/15"
              aria-label="Next track"
            >
              ⏭
            </button>
          </div>

          <div className="mb-5">
            <div
              ref={progressRef}
              onClick={handleSeek}
              className="relative h-2 cursor-pointer rounded-full bg-slate-700"
              role="slider"
              aria-label="Seek track"
            >
              <div
                className="absolute left-0 top-0 h-2 rounded-full bg-[#e1b95a]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm text-slate-300">
              <span>{formatTime(currentTime)}</span>
              <span>{activeTrack.duration}</span>
            </div>
          </div>

          <div className="mb-2 flex items-center gap-3">
            <span className="text-sm text-slate-300">Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-[#e1b95a]"
              aria-label="Volume control"
            />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#e1b95a]/20 bg-[#191411] p-4 md:p-6">
          <h4 className="mb-4 text-lg font-semibold text-[#e1b95a]">Playlist</h4>
          <div className="space-y-3">
            {tracks.map((track, index) => {
              const isActive = index === activeTrackIndex;
              return (
                <div
                  key={track.title}
                  className={`flex items-center justify-between rounded-xl border p-3 transition ${
                    isActive
                      ? 'border-[#e1b95a]/60 bg-[#2d241e]'
                      : 'border-slate-700 bg-[#201915] hover:border-[#e1b95a]/35'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleTrackSelect(index)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e1b95a] text-sm text-[#1f1a17]"
                      aria-label={`Play ${track.title}`}
                    >
                      {isActive && isPlaying ? '❚❚' : '▶'}
                    </button>
                    <div>
                      <p className="font-medium text-white">{track.title}</p>
                      <span className="rounded-full bg-[#e1b95a]/20 px-2 py-0.5 text-xs text-[#e1b95a]">
                        {track.genre}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">{track.duration}</p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-300">
          These are examples. Your song will be uniquely crafted for you.
        </p>
      </div>

      <style>{`
        .wave-bar {
          animation: bounce 1.1s ease-in-out infinite;
          transform-origin: bottom;
        }

        .paused .wave-bar {
          animation-play-state: paused;
          opacity: 0.45;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: scaleY(0.35);
          }
          50% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </section>
  );
}
