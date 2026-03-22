import BookingList from '@/components/BookingList';

export default function MyBookingPage() {
  return (
    <main className="w-[100%] flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <BookingList />
    </main>
  );
}