'use client';

import React from 'react';
import Timer from './Timer';
import TimerControls from './TimerControls';
import styles from '../styles/timer.module.css';

export default function TimerPage() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
      setIntervalId(id);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (intervalId) clearInterval(intervalId);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalId) clearInterval(intervalId);
    setTime(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className={styles.container}>
      <Timer time={time} />
      <TimerControls
        isRunning={isRunning}
        onStart={startTimer}
        onPause={pauseTimer}
        onReset={resetTimer}
        onFullscreen={toggleFullscreen}
      />
    </div>
  );
}
