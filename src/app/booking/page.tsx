'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBooking } from '@/redux/features/bookSlice';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AppDispatch } from '@/redux/store';
import { Dayjs } from 'dayjs';
import getProviders from '@/libs/getProviders';
import { ProviderItem } from '@/../interface';

export default function BookingPage() {
  const dispatch = useDispatch<AppDispatch>();
  
  const [nameLastname, setNameLastname] = useState('');
  const [tel, setTel] = useState('');
  const [provider, setProvider] = useState('');
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [providers, setProviders] = useState<ProviderItem[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providersJson = await getProviders();
        setProviders(providersJson.data);
        if (providersJson.data.length > 0) {
          setProvider(providersJson.data[0].name);
        }
      } catch (error) {
        console.error("Failed to fetch providers:", error);
      }
    };
    fetchProviders();
  }, []);

  const handleBook = () => {
    if (nameLastname && tel && provider && bookDate) {
      dispatch(addBooking({
        nameLastname,
        tel,
        provider,
        bookDate: bookDate.format('YYYY/MM/DD')
      }));
      alert('Car Rented Successfully!');
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4 p-8">
      <h1 className="text-2xl font-bold mb-4">Rent a Car</h1>
      
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <TextField id="Name-Lastname" name="Name-Lastname" label="Name - Lastname" variant="outlined" value={nameLastname} onChange={(e) => setNameLastname(e.target.value)} />
        <TextField id="Contact-Number" name="Contact-Number" label="Contact Number" variant="outlined" value={tel} onChange={(e) => setTel(e.target.value)} />
        
        <FormControl fullWidth>
          <InputLabel id="provider-label">Provider</InputLabel>
          <Select
            labelId="provider-label"
            id="provider"
            value={provider}
            label="Provider"
            onChange={(e) => setProvider(e.target.value)}
          >
            {providers.map((p) => (
              <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label="Rent Date"
            value={bookDate} 
            onChange={(newValue) => setBookDate(newValue)} 
          />
        </LocalizationProvider>

        <Button name="Rent Car" variant="contained" color="primary" onClick={handleBook}>
          Rent Car
        </Button>
      </div>
    </main>
  );
}
