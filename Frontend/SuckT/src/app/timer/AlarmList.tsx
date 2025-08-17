'use client';
import React, { useState, useEffect } from 'react';
import styles from '../styles/timer.module.css';

interface Timer {
  id: number;
  minutes: number;
  secondsLeft: number;
  label: string;
  running: boolean;
  enabled: boolean;
}

export default function TimerList() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [minutes, setMinutes] = useState(5);
  const [label, setLabel] = useState('');

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

  const addTimer = () => {
    if (minutes <= 0) return alert('กรุณาใส่เวลา');
    const newTimer: Timer = {
      id: Date.now(),
      minutes,
      secondsLeft: minutes * 60,
      label,
      running: false,
      enabled: true,
    };
    setTimers([...timers, newTimer]);
    setMinutes(5);
    setLabel('');
  };

  const toggleTimer = (id: number) => {
    setTimers(prev =>
      prev.map(t =>
        t.id === id ? { ...t, running: !t.running } : t
      )
    );
  };

  const toggleEnable = (id: number) => {
    setTimers(prev =>
      prev.map(t =>
        t.id === id ? { ...t, enabled: !t.enabled } : t
      )
    );
  };

  const resetTimer = (id: number) => {
    setTimers(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, secondsLeft: t.minutes * 60, running: false }
          : t
      )
    );
  };

  const deleteTimer = (id: number) =>
    setTimers(prev => prev.filter(t => t.id !== id));

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className={styles.timerBox}>
      {/* Add Form */}
      <div className={styles.addTimer}>
        <input
          type="number"
          min="1"
          max="300"
          value={minutes}
          onChange={e => setMinutes(Number(e.target.value))}
          className={styles.inputNumber}
        />
        <input
          type="text"
          placeholder="ใส่ชื่อ เช่น ทำอาหาร"
          value={label}
          onChange={e => setLabel(e.target.value)}
          className={styles.inputText}
        />
        <button onClick={addTimer} className={styles.addBtn}>＋ เพิ่ม</button>
      </div>

      {/* Timer Cards */}
      <div className={styles.timerList}>
        {timers.length === 0 && (
          <p className={styles.empty}>ยังไม่มีตัวจับเวลา</p>
        )}
        {timers.map(timer => (
          <div key={timer.id} className={styles.timerCard}>
            <div className={styles.timerInfo}>
              <div className={styles.timerTime}>{formatTime(timer.secondsLeft)}</div>
              <div className={styles.timerLabel}>{timer.label || 'ไม่มีข้อความ'}</div>
            </div>
            <div className={styles.timerActions}>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={timer.enabled}
                  onChange={() => toggleEnable(timer.id)}
                />
                <span className={styles.slider}></span>
              </label>
              <button onClick={() => toggleTimer(timer.id)} className={styles.playBtn}>
                {timer.running ? '⏸' : '▶'}
              </button>
              <button onClick={() => resetTimer(timer.id)} className={styles.resetBtn}>↺</button>
              <button onClick={() => deleteTimer(timer.id)} className={styles.deleteBtn}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
