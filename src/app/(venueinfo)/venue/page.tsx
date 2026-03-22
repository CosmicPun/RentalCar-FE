import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";

export default async function VenuePage() {
  const venuesJson = await getVenues();

  return (
    <main className="flex flex-col items-center">
      <div className="text-center mt-6 mb-2">
        <h2 className="text-2xl font-semibold">Select your venue</h2>
      </div>
      <VenueCatalog venuesJson={venuesJson} />
    </main>
  );
}