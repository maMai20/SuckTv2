'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/timer.module.css';

interface CustomTimer {
  id: number;
  minutes: number;
  secondsLeft: number;
  label: string;
  running: boolean;
}

function CustomTimerList() {
  const [timers, setTimers] = useState<CustomTimer[]>([]);

  const addTimer = () => {
    const newTimer: CustomTimer = {
      id: Date.now(),
      minutes: 5,
      secondsLeft: 5 * 60,
      label: '',
      running: false,
    };
    setTimers(prev => [...prev, newTimer]);
  };

  const toggleTimer = (id: number) => {
    setTimers(prev =>
      prev.map(t =>
        t.id === id ? { ...t, running: !t.running } : t
      )
    );
  };

  const resetTimer = (id: number) => {
    setTimers(prev =>
      prev.map(t =>
        t.id === id ? { ...t, secondsLeft: t.minutes * 60, running: false } : t
      )
    );
  };

  const deleteTimer = (id: number) => {
    setTimers(prev => prev.filter(t => t.id !== id));
  };

  const updateMinutes = (id: number, minutes: number) => {
    setTimers(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, minutes, secondsLeft: minutes * 60 }
          : t
      )
    );
  };

  const updateLabel = (id: number, label: string) => {
    setTimers(prev =>
      prev.map(t => (t.id === id ? { ...t, label } : t))
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev =>
        prev.map(t =>
          t.running && t.secondsLeft > 0
            ? { ...t, secondsLeft: t.secondsLeft - 1 }
            : t
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className={styles.left}>
      <h2 className={styles.sectionTitle}>Custom Timers</h2>
      <button onClick={addTimer} className={styles.addBtn}>➕ Add Timer</button>
      <div className={styles.timerList}>
        {timers.map(t => (
          <div key={t.id} className={styles.timerItem}>
            {/* เปลี่ยนจาก range → number input */}
            <input
              type="number"
              min={1}
              max={600}
              value={t.minutes}
              onChange={e => updateMinutes(t.id, parseInt(e.target.value) || 1)}
              className={styles.numberInput}
            />
            <span>min</span>

            <input
              type="text"
              placeholder="Label..."
              value={t.label}
              onChange={e => updateLabel(t.id, e.target.value)}
              className={styles.labelInput}
            />

            <div className={styles.timeText}>{format(t.secondsLeft)}</div>
            <div className={styles.timerActions}>
              <button onClick={() => toggleTimer(t.id)} className={styles.playBtn}>
                {t.running ? '⏸ Pause' : '▶ Start'}
              </button>
              <button onClick={() => resetTimer(t.id)} className={styles.resetBtn}>
                ⏹ Reset
              </button>
              <button onClick={() => deleteTimer(t.id)} className={styles.deleteBtn}>
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`${styles.right} ${isFullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.timeText}>{format(time)}</div>
      <div className={styles.buttonRow}>
        <button onClick={() => setRunning(p => !p)} className={styles.startBtn}>
          {running ? '⏸ Pause' : '▶ Start'}
        </button>
        <button onClick={() => { setRunning(false); setTime(0); }} className={styles.resetBtn}>
          ⏹ Reset
        </button>
        <button onClick={() => setIsFullscreen(p => !p)} className={styles.fullscreenBtn}>
          {isFullscreen ? '🗕 Exit Full' : '🗖 Fullscreen'}
        </button>
      </div>
    </div>
  );
}

export default function TimerPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={`${styles.container} ${isFullscreen ? styles.hideLeft : ''}`}>
      <CustomTimerList />
      <Stopwatch />
    </div>
  );
}
