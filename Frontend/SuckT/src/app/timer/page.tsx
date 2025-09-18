'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/timer.module.css';

// ================== Stopwatch with Cat Pet ==================
function FocusPetTimer({ isFullscreen, setIsFullscreen }: { isFullscreen: boolean, setIsFullscreen: (v: boolean) => void }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [theme, setTheme] = useState(0);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const format = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  // แมวค่อยๆโต (สูงสุด 1.5 เท่า)
  const petSize = Math.min(1 + time / 100, 1.5);

  return (
    <div className={`${styles.petContainer} ${isFullscreen ? styles.fullscreen : ''}`}>
      <h2 className={styles.title}>Focus Cat Timer</h2>


      {/* 🐱 ตัวแมว */}
      <div
        className={`${styles.cat} ${styles[`theme${theme}`]}`}
        style={{ transform: `scale(${petSize}) translateY(-5px)` }}
      >
        <div className={styles.catEars}></div>
        <div className={styles.catFace}>
          <div className={styles.catEyes}></div>
          <div className={styles.catMouth}></div>
        </div>
        <div className={styles.catTail}></div>
      </div>

      {/* เวลา */}
      <div className={styles.timeText}>{format(time)}</div>

      {/* ปุ่มควบคุม */}
      <div className={styles.buttonRow}>
        <button onClick={() => setRunning(p => !p)} className={styles.mainBtn}>
          {running ? '⏸ หยุด' : '▶️ เริ่ม'}
        </button>
        <button onClick={() => { setRunning(false); setTime(0); }} className={styles.secondaryBtn}>
          🔄 รีเซ็ต
        </button>
        <button onClick={() => setIsFullscreen(!isFullscreen)} className={styles.secondaryBtn}>
          {isFullscreen ? '↩️ ออกจากเต็มหน้า' : '⛶ ขยายเต็มหน้า'}
        </button>
      </div>

      {/* จุดเลือกธีม */}
      <div className={styles.themeDots}>
        {[0, 1, 2, 3].map(i => (
          <span
            key={i}
            className={`${styles.dot} ${theme === i ? styles.active : ''} ${styles[`theme${i}`]}`}
            onClick={() => setTheme(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

// ================== Custom Timer Item ==================
function CustomTimerItem({ label, minutes, onDelete }: { label: string; minutes: number; onDelete: () => void }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, timeLeft]);

  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.customTimer}>
      <div className={styles.customTimerHeader}>
        <h4>{label}</h4>
        <button onClick={onDelete} className={styles.deleteBtn}>🗑</button>
      </div>
      <p>{format(timeLeft)}</p>
      <div>
        <button onClick={() => setRunning(p => !p)} className={styles.mainBtn}>
          {running ? '⏸ หยุด' : '▶️ เริ่ม'}
        </button>
        <button onClick={() => { setRunning(false); setTimeLeft(minutes * 60); }} className={styles.secondaryBtn}>
          🔄 รีเซ็ต
        </button>
      </div>
    </div>
  );
}

// ================== Page ==================
export default function TimerPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timers, setTimers] = useState<{ label: string; minutes: number }[]>([]);
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState(25);

  // 🎵 ระบบเพลง
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = ['lofi-chill.mp3', 'lofi-study-calm.mp3', '/music/focus3.mp3'];

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const nextTrack = () => {
    const newIndex = (trackIndex + 1) % tracks.length;
    setTrackIndex(newIndex);
    if (audioRef.current) {
      audioRef.current.src = tracks[newIndex];
      if (playing) audioRef.current.play();
    }
  };

  const prevTrack = () => {
    const newIndex = (trackIndex - 1 + tracks.length) % tracks.length;
    setTrackIndex(newIndex);
    if (audioRef.current) {
      audioRef.current.src = tracks[newIndex];
      if (playing) audioRef.current.play();
    }
  };

  const addTimer = () => {
    if (!label.trim() || minutes <= 0) return;
    setTimers([...timers, { label, minutes }]);
    setLabel('');
    setMinutes(25);
  };

  return (
    <div className={`${styles.container} ${isFullscreen ? styles.hideLeft : ''}`}>
      {!isFullscreen && (
        <div className={styles.left}>
          <h2 className={styles.sectionTitle}>⏱ Focus Timers</h2>
          <div className={styles.form}>
            <input
              type="text"
              placeholder="หัวข้อกิจกรรม"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              min={1}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className={styles.input}
            />
            <button onClick={addTimer} className={styles.mainBtn}>➕ เพิ่มตัวจับเวลา</button>
          </div>

          <div className={styles.customTimerList}>
            {timers.map((t, i) => (
              <CustomTimerItem
                key={i}
                label={t.label}
                minutes={t.minutes}
                onDelete={() => setTimers(timers.filter((_, idx) => idx !== i))}
              />
            ))}
          </div>

          {/* 🎵 Music Player */}
          <div className={styles.musicControl}>
            <button onClick={prevTrack} className={styles.secondaryBtn}>⏮</button>
            <button onClick={togglePlay} className={styles.mainBtn}>
              {playing ? '⏸' : '▶️'}
            </button>
            <button onClick={nextTrack} className={styles.secondaryBtn}>⏭</button>
          </div>
          <div className={styles.volumeControl}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                setVolume(v);
                if (audioRef.current) audioRef.current.volume = v;
              }}
            />
          </div>

          <audio ref={audioRef} src={tracks[trackIndex]} loop />
        </div>
      )}
      <FocusPetTimer isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen} />
    </div>
  );
}
