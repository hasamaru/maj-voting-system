
import Link from 'next/link';
import { LayoutDashboard, Users, Settings, LogOut, Music } from 'lucide-react';

export function Sidebar() {
    return (
        <div className="flex flex-col h-screen w-64 bg-black text-white border-r border-zinc-800">
            <div className="p-6 flex items-center space-x-3 border-b border-zinc-800">
                <div className="bg-red-600 p-2 rounded-lg">
                    <Music className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight">MAJ Voting</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-lg transition-colors">
                    <LayoutDashboard className="w-5 h-5" />
                    <span>ダッシュボード</span>
                </Link>
                <Link href="/org-view" className="flex items-center space-x-3 px-4 py-3 bg-red-600 text-white rounded-lg shadow-lg shadow-red-900/20">
                    <Users className="w-5 h-5" />
                    <span>団体別管理</span>
                </Link>
                <div className="pt-4 mt-4 border-t border-zinc-800">
                    <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">設定</p>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                        <span>システム設定</span>
                    </button>
                </div>
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <button className="flex items-center space-x-3 px-4 py-3 w-full text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>ログアウト</span>
                </button>
            </div>
        </div>
    );
}
