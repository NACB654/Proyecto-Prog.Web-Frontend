import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';

export default function DateComponent({onChange}) {
  const today = dayjs();
  const max = today.add(30, 'day')

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker sx={{
          '& label.Mui-focused': {
            color: '#6750A4',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '2px solid #6750A4'
            },
            '&:hover fieldset': {
              border: '2px solid #6750A4'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#6750A4',
            },
          },
        }}
          label='Selecciona la fecha límite'
          format='YYYY-MM-DD'
          defaultValue={today}
          onChange={onChange}
          minDate={today}
          maxDate={max}
          slotProps={{
            textField: {
              helperText: 'YYYY-MM-DD',
              readOnly: true
            },
          }}
        />
    </LocalizationProvider>
  );
}