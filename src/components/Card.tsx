import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function Card({
  providerName,
  imgSrc,
  onRatingChange,
}: {
  providerName: string;
  imgSrc: string;
  onRatingChange?: (rating: number) => void;
}) {
  return (
    <InteractiveCard contentName={providerName}>
      <div className="w-full h-[70%] relative rounded-t-lg overflow-hidden">
        <Image
          src={imgSrc}
          alt={providerName}
          fill={true}
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="w-full h-[30%] p-[10px] flex flex-col justify-between">
        <div className="text-gray-800 font-bold text-lg truncate">
          {providerName}
        </div>
        {onRatingChange && (
          <div
            className="mt-1"
            onClick={(e) => e.stopPropagation()} // Prevent card click when clicking rating
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Rate:</span>
              <div className="flex bg-gray-50 p-1 rounded-md border border-gray-100 shadow-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => onRatingChange(star)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors px-0.5"
                    title={`Rate ${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </InteractiveCard>
  );
}
