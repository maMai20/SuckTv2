'use client';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import styles from '../styles/calendar.module.css';

// ---------- Types ----------
interface CalEvent {
  id: string;
  title: string;
  start: string; // ISO
  end?: string;  // ISO
  completed?: boolean;
}

// ---------- Utils ----------
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function fmtTime(d: Date) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function fmtDate(d: Date) {
  return d.toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

// ---------- Mini Month Calendar ----------
function generateMonthMatrix(anchor: Date) {
  const year = anchor.getFullYear();
  const month = anchor.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(first);
  const day = start.getDay();
  start.setDate(start.getDate() - day);

  const weeks: Date[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

const MiniMonth: React.FC<{
  value: Date;
  onChange: (d: Date) => void;
}> = ({ value, onChange }) => {
  const [anchor, setAnchor] = useState(() => new Date(value));
  useEffect(() => setAnchor(new Date(value)), [value]);

  const matrix = useMemo(() => generateMonthMatrix(anchor), [anchor]);
  const month = anchor.toLocaleString([], { month: 'long' });
  const year = anchor.getFullYear();

  return (
    <div className={styles.miniMonth}>
      <div className={styles.miniMonthHeader}>
        <button
          className={styles.navBtn}
          onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1))}
        >
          ◀
        </button>
        <div className={styles.monthLabel}>{month} {year}</div>
        <button
          className={styles.navBtn}
          onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1))}
        >
          ▶
        </button>
      </div>
      <div className={styles.weekDays}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className={styles.datesGrid}>
        {matrix.flat().map((d, i) => {
          const inMonth = d.getMonth() === anchor.getMonth();
          const active = isSameDay(d, value);
          return (
            <button
              key={i}
              onClick={() => onChange(new Date(d))}
              className={[
                styles.dateCell,
                inMonth ? styles.inMonth : styles.outMonth,
                active ? styles.activeDate : ''
              ].join(' ')}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ---------- Main Component ----------
export default function CalendarDashboard() {
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const calRef = useRef<FullCalendar | null>(null);

  const dayEvents = useMemo(() => {
    return events
      .map(e => ({
        ...e,
        startDate: new Date(e.start),
        endDate: e.end ? new Date(e.end) : undefined,
      }))
      .filter(e => isSameDay(e.startDate, selectedDate));
  }, [events, selectedDate]);

  const onSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('ชื่อกิจกรรม (Event title)?');
    selectInfo.view.calendar.unselect();

    if (title) {
      const newEvent: CalEvent = {
        id: crypto.randomUUID(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr || undefined,
        completed: false,
      };
      setEvents(prev => [...prev, newEvent]);
      setSelectedDate(new Date(selectInfo.start));
    }
  };

  const onEventClick = (clickInfo: EventClickArg) => {
    const shouldDelete = confirm(`ลบกิจกรรม \"${clickInfo.event.title}\" ?`);
    if (shouldDelete) {
      setEvents(prev => prev.filter(e => e.id !== clickInfo.event.id));
      clickInfo.event.remove();
    }
  };

  const toggleComplete = (id: string) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, completed: !e.completed } : e)));
  };

  const fullCalEvents = useMemo(() => {
    return events.map(e => ({
      id: e.id,
      title: e.completed ? `✔ ${e.title}` : e.title,
      start: e.start,
      end: e.end,
      classNames: e.completed ? [styles.completedEvent] : [],
    }));
  }, [events]);

  return (
    <div className={styles.container}>
      <div className={styles.leftPane}>
        <MiniMonth value={selectedDate} onChange={setSelectedDate} />

        <div className={styles.dayEvents}>
          <div className={styles.dayHeader}>
            <div className={styles.dayTitle}>กิจกรรมในวัน</div>
            <div className={styles.dayDate}>{fmtDate(selectedDate)}</div>
          </div>
          {dayEvents.length === 0 ? (
            <div className={styles.noEvents}>ยังไม่มีกิจกรรมในวันนี้</div>
          ) : (
            <ul className={styles.eventList}>
              {dayEvents
                .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                .map(e => (
                  <li key={e.id} className={styles.eventItem}>
                    <input
                      type="checkbox"
                      checked={!!e.completed}
                      onChange={() => toggleComplete(e.id)}
                    />
                    <span className={e.completed ? styles.eventDone : ''}>
                      {fmtTime(e.startDate)} {e.endDate ? `– ${fmtTime(e.endDate)}` : ''} | {e.title}
                    </span>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.rightPane}>
        <FullCalendar
          ref={calRef as any}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="timeGridWeek"
          slotMinTime="06:00:00"
          slotMaxTime="22:00:00"
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={onSelect}
          events={fullCalEvents}
          eventClick={onEventClick}
          datesSet={(arg) => setSelectedDate(arg.start)}
          height="calc(100vh - 100px)"
        />
      </div>
    </div>
  );
}
