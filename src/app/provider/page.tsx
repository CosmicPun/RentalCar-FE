import ProviderCatalog from "@/components/ProviderCatalog";
import getProviders from "@/libs/getProviders";

export default async function ProviderPage() {
  const providersJson = await getProviders();

  return (
    <main className="flex flex-col items-center">
      <div className="text-center mt-6 mb-2">
        <h2 className="text-2xl font-semibold">Select your provider</h2>
      </div>
      <ProviderCatalog providersJson={providersJson} />
    </main>
  );
}
