"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';

export default function Banner() {
  const covers = [
    "/img/cover.jpg",
    "/img/cover2.jpg",
    "/img/cover3.jpg",
    "/img/cover4.jpg",
  ];
 
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();
  const handleBannerClick = () => {
    setIndex((prev) => (prev + 1) % covers.length);
  };
 
  return (
    <div
      className="block m-0 w-full h-[80vh] relative overflow-hidden group cursor-pointer"
      onClick={handleBannerClick}
    >
      <Image
        src={covers[index]}
        alt="Banner Cover"
        fill={true}
        className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
        priority
      />
      
      {/* Gradient overlay for text legibility and premium feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10 transition-opacity duration-300" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white mt-10 pointer-events-none px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-2xl mb-4 animate-fade-in-up text-center">
          Your Venue <span className="text-cyan-400">Partner</span>
        </h1>
        <h3 className="text-xl md:text-2xl font-light text-gray-200 drop-shadow-lg text-center opacity-90 delay-100 animate-fade-in-up">
          Find Your Perfect Event Space
        </h3>
      </div>

      <button
        className="bg-white/95 backdrop-blur-sm text-cyan-800 font-bold py-3 px-8 rounded-full shadow-xl z-30 absolute bottom-12 right-12 hover:bg-cyan-600 hover:text-white hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          router.push("/venue");
        }}
      >
        Select Venue
      </button>

      {session ? (
        <div className="z-30 absolute top-6 right-10 font-medium text-md md:text-lg text-white bg-black/30 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 shadow-xl overflow-hidden group-hover:bg-black/50 transition-colors">
          <span className="opacity-80">Welcome,</span> <span className="font-bold">{session.user?.name}</span>
        </div>
      ) : null}
    </div>
  );
}