"use client";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import InteractiveCard from "./InteractiveCard";

export default function Card({
  venueName,
  imgSrc,
  onRatingChange,
}: {
  venueName: string;
  imgSrc: string;
  onRatingChange?: (rating: number) => void;
}) {
  const [rating, setRating] = useState<number | null>(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number | null) => {
    const val = newValue ?? 0;
    setRating(val);
    onRatingChange?.(val);
  };

  return (
    <InteractiveCard contentName={venueName}>
      {/* Image */}
      <div className="w-full h-[60%] relative overflow-hidden bg-gray-200">
        <Image
          src={imgSrc}
          alt={venueName}
          fill={true}
          className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Text */}
      <div className="px-5 py-4 flex flex-col justify-between flex-1">
        <p className="text-base font-bold text-gray-800 tracking-wide line-clamp-2 leading-snug">
          {venueName}
        </p>

        {/* Rating — only shown if onRatingChange prop is provided */}
        {onRatingChange !== undefined && (
          <div className="mt-2" onClick={(e) => e.stopPropagation()}>
            <Rating
              id={`${venueName} Rating`}
              name={`${venueName} Rating`}
              data-testid={`${venueName} Rating`}
              value={rating}
              onChange={handleChange}
              size="medium"
            />
          </div>
        )}
      </div>
    </InteractiveCard>
  );
}