'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBooking } from '@/redux/features/bookSlice';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppDispatch } from '@/redux/store';
import { Dayjs } from 'dayjs';

export default function BookingPage() {
  const dispatch = useDispatch<AppDispatch>();
  
  const [nameLastname, setNameLastname] = useState('');
  const [tel, setTel] = useState('');
  const [venue, setVenue] = useState('Bloom');
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);

  const handleBook = () => {
    if (nameLastname && tel && venue && bookDate) {
      dispatch(addBooking({
        nameLastname,
        tel,
        venue,
        bookDate: bookDate.format('YYYY/MM/DD')
      }));
      alert('Venue Booked Successfully!');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4 p-8">
      <h1 className="text-2xl font-bold mb-4">Book a Venue</h1>
      
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <TextField id="Name-Lastname" name="Name-Lastname" label="Name - Lastname" variant="outlined" value={nameLastname} onChange={(e) => setNameLastname(e.target.value)} />
        <TextField id="Contact-Number" name="Contact-Number" label="Contact Number" variant="outlined" value={tel} onChange={(e) => setTel(e.target.value)} />
        
        <FormControl fullWidth>
          <InputLabel id="venue-label">Venue</InputLabel>
          <Select
            labelId="venue-label"
            id="venue"
            value={venue}
            label="Venue"
            onChange={(e) => setVenue(e.target.value)}
          >
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label="Booking Date"
            value={bookDate} 
            onChange={(newValue) => setBookDate(newValue)} 
          />
        </LocalizationProvider>

        <Button name="Book Venue" variant="contained" color="primary" onClick={handleBook}>
          Book Venue
        </Button>
      </div>
    </main>
  );
}