import Image from "next/image";
import getProvider from "@/libs/getProvider";

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ vid: string }>;
}) {
  const { vid } = await params;
  const providerData = await getProvider(vid);
  const provider = providerData.data;

  if (!provider) {
    return (
      <main className="text-center p-5">
        <h1 className="text-lg font-medium">Provider not found</h1>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-semibold mb-6">{provider.name}</h1>
      <div className="flex flex-row items-start gap-6 border rounded-lg p-5 bg-white shadow-sm max-w-2xl w-full">
        <div className="relative w-[200px] h-[150px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
          <Image
            src={provider.picture}
            alt={provider.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p><span className="font-medium">Name:</span> {provider.name}</p>
          <p><span className="font-medium">Address:</span> {provider.address}</p>
          <p><span className="font-medium">District:</span> {provider.district}</p>
          <p><span className="font-medium">Postal Code:</span> {provider.postalcode}</p>
          <p><span className="font-medium">Tel:</span> {provider.tel}</p>
          <p><span className="font-medium">Daily Rate:</span> {provider.dailyrate}</p>
        </div>
      </div>
    </main>
  );
}
