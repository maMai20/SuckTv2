'use client';
import React, { useState } from 'react';
import styles from '../styles/timer.module.css';

interface Alarm {
  id: number;
  time: string;
  label: string;
  enabled: boolean;
}

export default function AlarmList() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [time, setTime] = useState('');
  const [label, setLabel] = useState('');

  const addAlarm = () => {
    if (!time) return alert('ใส่เวลาปลุกก่อน');
    setAlarms([...alarms, { id: Date.now(), time, label, enabled: true }]);
    setTime('');
    setLabel('');
  };

  const toggleAlarm = (id: number) => {
    setAlarms(alarms.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  const deleteAlarm = (id: number) => {
    setAlarms(alarms.filter(a => a.id !== id));
  };

  return (
    <div>
      <h2>นาฬิกาปลุก</h2>
      <div className={styles.addAlarm}>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        <input 
          type="text" 
          placeholder="ข้อความ" 
          value={label} 
          onChange={e => setLabel(e.target.value)} 
        />
        <button onClick={addAlarm}>เพิ่ม</button>
      </div>

      <div>
        {alarms.map(alarm => (
          <div key={alarm.id} className={styles.alarmCard}>
            <div className={styles.alarmTime}>{alarm.time}</div>
            <div className={styles.alarmLabel}>{alarm.label}</div>
            <label>
              <input 
                type="checkbox" 
                checked={alarm.enabled} 
                onChange={() => toggleAlarm(alarm.id)} 
              /> เปิด
            </label>
            <button onClick={() => deleteAlarm(alarm.id)}>ลบ</button>
          </div>
        ))}
      </div>
    </div>
  );
}
