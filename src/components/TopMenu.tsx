import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

export default async function TopMenu() {
    const session = await getServerSession(authOptions);
    return (
        <div className="text-black h-[64px] bg-white backdrop-blur-md fixed top-0 left-0 right-0 z-30 border-b border-gray-200/50 shadow-sm flex flex-row px-6 py-2 items-center transition-all duration-300">
            {session ? (
                <Link href="/api/auth/signout" className="text-black font-semibold text-sm px-4 py-2 rounded-full hover:bg-cyan-50 transition-colors">
                    Sign-Out
                </Link>
            ) : (
                <Link href="/api/auth/signin" className="text-black font-semibold text-sm px-4 py-2 rounded-full hover:bg-cyan-50 transition-colors">
                    Sign-In
                </Link>
            )}
            <TopMenuItem title='My Booking' pageRef='/mybooking' />
            <div className="flex flex-row-reverse ml-auto items-center gap-6">
                <Link href="/">
                    <div className="h-[40px] w-auto hover:opacity-80 transition-opacity flex items-center">
                        <Image src={'/img/logo.png'} className="h-full w-auto object-contain" alt='Logo' width={0} height={0} sizes="100vh" />
                    </div>
                </Link>
                <TopMenuItem title='Booking' pageRef='/booking' />
            </div>
        </div>
    );
}