import Image from "next/image";
import getVenue from "@/libs/getVenue";

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;
  const venueData = await getVenue(vid);
  const venue = venueData.data;

  if (!venue) {
    return (
      <main className="text-center p-5">
        <h1 className="text-lg font-medium">Venue not found</h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-semibold mb-6">{venue.name}</h1>
      <div className="flex flex-row items-start gap-6 border rounded-lg p-5 bg-white shadow-sm max-w-2xl w-full">
        <div className="relative w-[200px] h-[150px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <Image
            src={venue.picture}
            alt={venue.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p><span className="font-medium">Name:</span> {venue.name}</p>
          <p><span className="font-medium">Address:</span> {venue.address}</p>
          <p><span className="font-medium">District:</span> {venue.district}</p>
          <p><span className="font-medium">Postal Code:</span> {venue.postalcode}</p>
          <p><span className="font-medium">Tel:</span> {venue.tel}</p>
          <p><span className="font-medium">Daily Rate:</span> {venue.dailyrate}</p>
        </div>
      </div>
    </main>
  );
}