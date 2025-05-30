import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function DateCalendarComponent() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* hamesha current date dikhane ke liye dayjs() ka use kiya hai */}
      <DateCalendar defaultValue={dayjs()} />
    </LocalizationProvider>
  );
}
