'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/timer.module.css';

const PET_STAGES = ['/pets/cat1.png', '/pets/cat2.png', '/pets/cat3.png'];

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 นาที
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            return 0;
          }
          return t - 1;
        });
        setTotalTime(tt => tt + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (totalTime >= 60 && totalTime < 180) setStage(1);
    if (totalTime >= 180) setStage(2);
  }, [totalTime]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const breakTime = () => {
    setTimeLeft(5 * 60);
    setRunning(true);
  };

  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.timerBox}>
      <h3>Pomodoro</h3>
      <div className={styles.petArea}>
        <img src={PET_STAGES[stage]} alt="pet" className={styles.petImg} />
      </div>
      <div className={styles.timeText}>{format(timeLeft)}</div>
      <div className={styles.buttonRow}>
        <button onClick={start}>start</button>
        <button onClick={breakTime}>break</button>
        <button onClick={stop}>stop</button>
      </div>
    </div>
  );
}
