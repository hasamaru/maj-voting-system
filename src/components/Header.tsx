
import { Bell, Search, User } from 'lucide-react';

export function Header({ title, organization }: { title: string; organization?: string }) {
    return (
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-zinc-800">{title}</h1>
                {organization && (
                    <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-200">
                        {organization} 表示中
                    </span>
                )}
            </div>

            <div className="flex items-center space-x-6">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="検索..."
                        className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-64 transition-all"
                    />
                </div>

                <button className="relative p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center space-x-3 pl-6 border-l border-zinc-200">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-zinc-700">管理者</p>
                        <p className="text-xs text-zinc-500">{organization || 'スーパー管理者'}</p>
                    </div>
                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        <User className="w-5 h-5 text-zinc-500" />
                    </div>
                </div>
            </div>
        </header>
    );
}
