import Card from "./Card";
import Link from "next/link";

export default async function VenueCatalog({
  venuesJson,
}: {
  venuesJson: Promise<VenueJson> | VenueJson;
}) {
  const venueJsonReady: VenueJson = await venuesJson;

  return (
    <div className="flex flex-row flex-wrap gap-5 justify-center p-5">
      {venueJsonReady.data.map((venue: VenueItem) => (
        <Link key={venue.id} href={`/venue/${venue.id}`}>
          <Card venueName={venue.name} imgSrc={venue.picture} />
        </Link>
      ))}
    </div>
  );
}
