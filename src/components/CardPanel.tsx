"use client";
import { useReducer } from "react";
import Link from "next/link";
import Card from "./Card";

// Mock Data for Demonstration Only
const mockVenueRepo = [
  { vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg" },
  { vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg" },
  { vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg" },
];

type RatingMap = Map<string, number>;

type Action =
  | { type: "SET_RATING"; venue: string; rating: number }
  | { type: "REMOVE_VENUE"; venue: string };

function reducer(state: RatingMap, action: Action): RatingMap {
  const next = new Map(state);
  if (action.type === "SET_RATING") {
    next.set(action.venue, action.rating);
  } else if (action.type === "REMOVE_VENUE") {
    next.delete(action.venue);
  }
  return next;
}

const initialState: RatingMap = new Map(
  mockVenueRepo.map((v) => [v.name, 0])
);

export default function CardPanel() {
  const [ratingMap, dispatch] = useReducer(reducer, initialState);

  const handleRatingChange = (venue: string, rating: number) => {
    dispatch({ type: "SET_RATING", venue, rating });
  };

  const handleRemoveVenue = (venue: string) => {
    dispatch({ type: "REMOVE_VENUE", venue });
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      {/* Cards row - each Card wrapped in Link to /venue/[vid] */}
      <div className="m-5 flex flex-row flex-wrap justify-around content-around gap-5">
        {mockVenueRepo.map((venueItem) => (
          <Link
            key={venueItem.vid}
            href={`/venue/${venueItem.vid}`}
          >
            <Card
              venueName={venueItem.name}
              imgSrc={venueItem.image}
              onRatingChange={(rating) =>
                handleRatingChange(venueItem.name, rating)
              }
            />
          </Link>
        ))}
      </div>

      {/* Venue list with ratings */}
      <div className="w-full max-w-2xl px-8 py-6 mt-8 bg-white rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          Venue List with Ratings
          <span className="bg-cyan-100 text-cyan-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
            {ratingMap.size}
          </span>
        </h3>
        <div className="space-y-2">
          {Array.from(ratingMap.entries()).map(([venue, rating]) => (
            <div
              key={venue}
              data-testid={venue}
              className="flex justify-between items-center p-3 cursor-pointer bg-gray-50 hover:bg-cyan-50 border border-transparent hover:border-cyan-200 rounded-xl transition-all duration-200"
              onClick={() => handleRemoveVenue(venue)}
            >
              <span className="font-medium text-gray-700">{venue}</span>
              <span className="text-gray-500 font-semibold">{rating} ★</span>
            </div>
          ))}
          {ratingMap.size === 0 && (
            <p className="text-gray-500 text-center py-4 italic">No venues selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}