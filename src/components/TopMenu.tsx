import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";
import getUserProfile from "@/libs/getUserProfile";

export default async function TopMenu() {
    const session = await getServerSession(authOptions);
    let role = null;
    let name = null;
    if (session?.user?.token) {
        try {
            const profile = await getUserProfile(session.user.token);
            role = profile.data.role;
            name = profile.data.name;
        } catch (error) {
            console.error("Failed to fetch user profile", error);
        }
    }

    return (
        <div className="text-[#111111] h-[64px] bg-white fixed top-0 left-0 right-0 z-30 border-b border-stone-200 flex flex-row px-6 py-2 items-center shadow-sm">
            {/* Logo on Left */}
            <div className="w-[150px] flex-none">
                <Link href="/">
                    <div className="h-[40px] w-auto hover:opacity-80 transition-opacity flex items-center">
                        <Image src={'/img/logo.png'} className="h-full w-auto object-contain" alt='Logo' width={0} height={0} sizes="100vh" />
                    </div>
                </Link>
            </div>
            
            {/* Menu in Middle */}
            <div className="flex-grow flex justify-center items-center gap-4">
                <TopMenuItem title='Providers' pageRef='/provider' />
                <TopMenuItem title='Booking' pageRef='/booking' />
                <TopMenuItem title='My Booking' pageRef='/mybooking' />
                {role === 'admin' && (
                    <TopMenuItem title='Admin Dashboard' pageRef='/admin' />
                )}
            </div>

            {/* Login/Logout on Right */}
            <div className="w-[150px] flex-none flex justify-end items-center gap-4">
                {session ? (
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">{name || session.user?.name}</span>
                        <Link href="/api/auth/signout" className="bg-[#FFD600] text-[#111111] font-bold text-xs px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors uppercase tracking-wider">
                            Logout
                        </Link>
                    </div>
                ) : (
                    <Link href="/login" className="bg-[#FFD600] text-[#111111] font-bold text-xs px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors uppercase tracking-wider">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
}