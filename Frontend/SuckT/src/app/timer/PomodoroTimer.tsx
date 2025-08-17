'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/timer.module.css';

export default function StopwatchTimer() {
  const [time, setTime] = useState(0); // เริ่มที่ 0
  const [running, setRunning] = useState(false);
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

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setTime(0);
  };
  const addMinute = () => setTime(t => t + 60);

  const format = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.timerBox}>
      <div className={styles.timeText}>{format(time)}</div>
      <div className={styles.buttonRow}>
        <button onClick={start} className={styles.startBtn}>▶ Start</button>
        <button onClick={pause} className={styles.pauseBtn}>⏸ Pause</button>
        <button onClick={reset} className={styles.resetBtn}>⏹ Reset</button>
      </div>
    </div>
  );
}
