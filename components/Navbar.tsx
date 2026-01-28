'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLogout } from '@/hooks/useAuth';

export default function Navbar() {
    const pathname = usePathname();
    const logout = useLogout();

    return (
        <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50 p-2">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className=" space-x-8">
                        <Link href="/dashboard" className="text-2xl font-bold ">
                            Employee MS
                        </Link>
                        <h3>Employee Management System</h3>

                    </div>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}
