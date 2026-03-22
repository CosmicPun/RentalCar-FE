'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { removeBooking } from '@/redux/features/bookSlice';
import { Button } from '@mui/material';

export default function BookingList() {
  const bookItems = useSelector((state: RootState) => {
    return state.bookSlice?.bookItems || state.book?.bookItems || [];
  });
  
  const dispatch = useDispatch<AppDispatch>();

  if (bookItems.length === 0) {
    return <div className="text-center text-xl mt-10 text-gray-500">No Car Renting</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      {bookItems.map((item: any, index: number) => (
        <div key={index} className="bg-slate-100 shadow-md rounded-md px-6 py-4 w-full max-w-md border border-gray-200">
          <h2 className="text-lg font-bold mb-2 text-cyan-800">Booking {index + 1}</h2>
          
          <div className="text-sm mb-1 text-gray-700">
            <strong>Name:</strong> {item.nameLastname || item.name}
          </div>
          <div className="text-sm mb-1 text-gray-700">
            <strong>Contact Number:</strong> {item.tel}
          </div>
          <div className="text-sm mb-1 text-gray-700">
            <strong>Provider:</strong> {item.provider}
          </div>
          <div className="text-sm mb-3 text-gray-700">
            <strong>Date:</strong> {item.bookDate}
          </div>
          
          <Button 
            variant="contained" 
            color="error" 
            fullWidth
            onClick={() => dispatch(removeBooking(item))}
            className="bg-red-600 hover:bg-red-700"
          >
            Cancel Renting
          </Button>
        </div>
      ))}
    </div>
  );
}
