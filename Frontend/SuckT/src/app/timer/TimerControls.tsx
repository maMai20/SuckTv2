'use client';

import React from 'react';
import styles from '../styles/timer.module.css';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onFullscreen: () => void;
}

export default function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
  onFullscreen
}: TimerControlsProps) {
  return (
    <div className={styles.controls}>
      {!isRunning ? (
        <button onClick={onStart} className={styles.btnStart}>Start</button>
      ) : (
        <button onClick={onPause} className={styles.btnPause}>Pause</button>
      )}
      <button onClick={onReset} className={styles.btnReset}>Reset</button>
      <button onClick={onFullscreen} className={styles.btnFullscreen}>Fullscreen</button>
    </div>
  );
}
