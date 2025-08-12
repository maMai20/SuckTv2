'use client';

import React from 'react';
import styles from '../styles/timer.module.css';

interface TimerProps {
  time: number;
}

export default function Timer({ time }: TimerProps) {
  const formatTime = (time: number) => {
    const ms = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(ms).padStart(2, '0')}`;
  };

  return (
    <div className={styles.timerDisplay}>
      {formatTime(time)}
    </div>
  );
}
