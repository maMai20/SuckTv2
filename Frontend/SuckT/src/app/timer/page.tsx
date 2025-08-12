'use client';
import React from 'react';
import styles from '../styles/timer.module.css';
import AlarmList from './AlarmList';
import PomodoroTimer from './PomodoroTimer';

export default function TimerPage() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <AlarmList />
      </div>
      <div className={styles.right}>
        <PomodoroTimer />
      </div>
    </div>
  );
}
