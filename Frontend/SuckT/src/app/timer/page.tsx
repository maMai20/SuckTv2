'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/timer.module.css';

// ================== Stopwatch with Pet ==================
function FocusPetTimer({ isFullscreen, setIsFullscreen }: { isFullscreen: boolean, setIsFullscreen: (v: boolean) => void }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [theme, setTheme] = useState(0); // 0=blue,1=green,2=purple,3=pink

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

  // ตัวละครโตตามเวลา (ใช้ scale)
  const petSize = Math.min(1 + time / 60, 2); // โตสูงสุด 2x

  return (
    <div className={`${styles.petContainer} ${isFullscreen ? styles.fullscreen : ''}`}>
      <h2 className={styles.title}>Focus Pet Timer</h2>
      <p className={styles.subtitle}>พักกันสักหน่อยไหม?</p>

      <div className={`${styles.pet} ${styles[`theme${theme}`]}`} style={{ transform: `scale(${petSize})` }}>
        <div className={styles.petFace}></div>
      </div>

      <div className={styles.timeText}>{format(time)}</div>

      <div className={styles.buttonRow}>
        <button onClick={() => setRunning(p => !p)} className={styles.startBtn}>
          {running ? 'หยุด' : 'เริ่ม'}
        </button>
        <button onClick={() => { setRunning(false); setTime(0); }} className={styles.resetBtn}>
          รีเซ็ต
        </button>
        <button onClick={() => setIsFullscreen(!isFullscreen)} className={styles.fullscreenBtn}>
          {isFullscreen ? 'ออกจากเต็มหน้า' : 'ขยายเต็มหน้า'}
        </button>
      </div>

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

// ================== Page ==================
export default function TimerPage() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={`${styles.container} ${isFullscreen ? styles.hideLeft : ''}`}>
      {!isFullscreen && (
        <div className={styles.left}>
          <h2 className={styles.sectionTitle}>⏱ Focus Timers</h2>
          <p>ตรงนี้จะเป็นที่จับเวลาและเพิ่มกิจกรรม</p>
        </div>
      )}
      <FocusPetTimer isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen} />
    </div>
  );
}
