'use client';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';

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
    <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-3 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <button className="px-2 py-1 rounded-xl border border-neutral-700 hover:bg-neutral-800"
          onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1))}>
          ◀
        </button>
        <div className="text-sm font-medium select-none">{month} {year}</div>
        <button className="px-2 py-1 rounded-xl border border-neutral-700 hover:bg-neutral-800"
          onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1))}>
          ▶
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-400 mb-1">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {matrix.flat().map((d, i) => {
          const inMonth = d.getMonth() === anchor.getMonth();
          const active = isSameDay(d, value);
          return (
            <button
              key={i}
              onClick={() => onChange(new Date(d))}
              className={[
                'aspect-square rounded-xl text-xs flex items-center justify-center border',
                inMonth ? 'text-neutral-200 border-neutral-800' : 'text-neutral-500 border-neutral-900',
                active ? 'bg-neutral-800 border-neutral-600 ring-2 ring-neutral-500' : 'hover:bg-neutral-800'
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
      classNames: e.completed ? ['opacity-60', 'line-through'] : [],
    }));
  }, [events]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* ฝั่งซ้าย */}
        <div className="flex flex-col gap-4">
          <MiniMonth value={selectedDate} onChange={setSelectedDate} />

          <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-4 flex-1">
            <div className="mb-3">
              <div className="text-xs uppercase tracking-wide text-neutral-400">กิจกรรมในวัน</div>
              <div className="text-lg font-medium">{fmtDate(selectedDate)}</div>
            </div>
            {dayEvents.length === 0 ? (
              <div className="text-sm text-neutral-400">ยังไม่มีกิจกรรมในวันนี้</div>
            ) : (
              <ul className="space-y-2">
                {dayEvents
                  .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                  .map(e => (
                    <li key={e.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={!!e.completed}
                        onChange={() => toggleComplete(e.id)}
                        className="size-4 accent-neutral-500"
                      />
                      <span className={`${e.completed ? 'line-through opacity-60' : ''}`}>
                        {fmtTime(e.startDate)} {e.endDate ? `– ${fmtTime(e.endDate)}` : ''} | {e.title}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* ฝั่งขวา */}
        <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-3 md:p-4 shadow-sm">
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
            height="calc(100vh - 120px)"
          />
        </div>
      </div>
    </div>
  );
}
