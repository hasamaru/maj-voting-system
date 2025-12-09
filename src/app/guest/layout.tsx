
import { Music, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 text-zinc-900 font-sans selection:bg-red-500/30">
            {/* Premium Header */}
            <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 h-full flex items-center justify-between">
                    <Link href="/guest/dashboard" className="flex items-center space-x-3 group">
                        <div className="bg-gradient-to-br from-red-600 to-red-800 p-1.5 rounded-sm group-hover:shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-shadow">
                            <Music className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-widest text-zinc-900">
                            MAJ GUEST PORTAL
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-zinc-600 hidden sm:block">Official Hige Dandism 様</span>
                        <button className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8">
                {children}
            </main>

            <footer className="border-t border-zinc-200 py-8 mt-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-xs text-zinc-500">© 2025 MUSIC AWARDS JAPAN. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}
