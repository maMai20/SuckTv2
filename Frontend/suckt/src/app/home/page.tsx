'use client';

import MenuAppBar from '../components/MenuAppBar';
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const songs = [
  { src: '/good-night-lofi.mp3', title: 'Good Night Lofi' },
  { src: '/rainy-lofi-city-lofi.mp3', title: 'rainy lofi city lofi' },
  { src: '/lofi-background-music.mp3', title: 'lofi background' },
  { src: '/lofi-chill.mp3', title: 'lofi chill' },
  { src: '/lofi-lofi-song.mp3', title: 'lofi lofi' },
];

export default function Home() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.warn('ไม่สามารถเล่นเพลงได้:', e));
    }
  };

  const changeSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const changeVolume = (delta: number) => {
    let newVolume = Math.min(1, Math.max(0, volume + delta));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].src;
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((e) => console.warn('ไม่สามารถเล่นเพลงได้:', e));
      }
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      <MenuAppBar />
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>🎵 ฟังเพลงพร้อม GIF</h1>

          <img src="/animating.gif" alt="animating.gif" className={styles.gif} />

          <p className={styles.songTitle}>
            🎶 กำลังเล่น: {songs[currentSongIndex].title}
          </p>

          <div className={styles.controls}>
            <button onClick={togglePlayPause} className={styles.controlButton}>
              {isPlaying ? '⏸ หยุด' : '▶️ เล่น'}
            </button>
            <button onClick={changeSong} className={styles.controlButton}>
              🔁 เปลี่ยนเพลง
            </button>
            <button
              onClick={() => changeVolume(-0.1)}
              className={styles.controlButton}
            >
              🔉 ลดเสียง
            </button>
            <button
              onClick={() => changeVolume(0.1)}
              className={styles.controlButton}
            >
              🔊 เพิ่มเสียง
            </button>
          </div>

          <audio
            ref={audioRef}
            src={songs[currentSongIndex].src}
            loop
            className={styles.audio}
          />
        </div>
      </div>
    </>
  );
}