import Card from "./Card";
import Link from "next/link";
import { ProviderItem, ProviderJson } from "@/../interface";

export default async function ProviderCatalog({
  providersJson,
}: {
  providersJson: Promise<ProviderJson> | ProviderJson;
}) {
  const providerJsonReady: ProviderJson = await providersJson;

  return (
    <div className="flex flex-row flex-wrap gap-5 justify-center p-5">
      {providerJsonReady.data.map((provider: ProviderItem) => (
        <Link key={provider.id} href={`/provider/${provider.id}`}>
          <Card providerName={provider.name} imgSrc={provider.picture} />
        </Link>
      ))}
    </div>
  );
}
