'use client';

import MenuAppBar from '../components/MenuAppBar';
import { useState, useRef, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import ImageIcon from '@mui/icons-material/Image';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChecklistIcon from '@mui/icons-material/Checklist';
import TimerIcon from '@mui/icons-material/Timer';
import ChatIcon from '@mui/icons-material/Chat';
import styles from '../styles/Home.module.css';

const songs = [
  { src: '/good-night-lofi.mp3', title: 'Good Night Lofi' },
  { src: '/rainy-lofi-city-lofi.mp3', title: 'Rainy Lofi City' },
  { src: '/lofi-background-music.mp3', title: 'Lofi Background' },
  { src: '/lofi-chill.mp3', title: 'Lofi Chill' },
  { src: '/lofi-lofi-song.mp3', title: 'Lofi Lofi' },
];

const gifs = [
  '/rain.gif',
  '/4ztyctxuhka61.gif',
  '/uwwte8wps4h91.gif',
  '/room.gif',
];

export default function Home() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  };

  const changeSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const goToPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  const changeGif = () => {
    const nextGif = (currentGifIndex + 1) % gifs.length;
    setCurrentGifIndex(nextGif);
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      const newVol = newValue / 100;
      setVolume(newVol);
      if (audioRef.current) {
        audioRef.current.volume = newVol;
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentSongIndex].src;
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(console.warn);
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
        <div className={styles.gifContainer}>
          <img
            src={gifs[currentGifIndex]}
            alt="lofi gif"
            className={styles.gif}
          />

          <div className={styles.controls}>
            <button onClick={goToPreviousSong} className={styles.iconButton}>
              <SkipPreviousIcon fontSize="large" />
            </button>

            <button onClick={togglePlayPause} className={styles.controlButton}>
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button onClick={changeSong} className={styles.iconButton}>
              <SkipNextIcon fontSize="large" />
            </button>

            <button onClick={changeGif} className={styles.iconButton}>
              <ImageIcon fontSize="large" />
            </button>

            <Box sx={{ width: 200, mt: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <VolumeDown />
                <Slider
                  aria-label="Volume"
                  value={volume * 100}
                  onChange={handleVolumeChange}
                  sx={{ color: `hsl(${volume * 120}, 100%, 50%)` }}
                />
                <VolumeUp />
              </Stack>
            </Box>
          </div>
        </div>

        <div className={styles.bottomButtons}>
          <button className={styles.featureBlock}><CalendarMonthIcon fontSize="large" /><span>Calendar</span></button>
          <button className={styles.featureBlock}><ChecklistIcon fontSize="large" /><span>Todo List</span></button>
          <button className={styles.featureBlock}><TimerIcon fontSize="large" /><span>Timer</span></button>
          <button className={styles.featureBlock}><ChatIcon fontSize="large" /><span>Chat</span></button>
        </div>

        <audio
          ref={audioRef}
          src={songs[currentSongIndex].src}
          loop
          className={styles.audio}
        />
      </div>
    </>
  );
}
