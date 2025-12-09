
import { MOCK_GUEST } from '@/lib/guestMockData';
import { TaskCard } from '@/components/guest/TaskCard';

export default function GuestDashboard() {
    const completedTasks = MOCK_GUEST.tasks.filter(t => t.status === 'completed').length;
    const totalTasks = MOCK_GUEST.tasks.length;
    const progress = Math.round((completedTasks / totalTasks) * 100);

    return (
        <div className="space-y-10">
            {/* Welcome Section */}
            <section className="space-y-2">
                <h1 className="text-3xl font-bold text-zinc-900">
                    Welcome, <span className="text-red-600">{MOCK_GUEST.name}</span>
                </h1>
                <p className="text-zinc-600">
                    MUSIC AWARDS JAPAN 2025 へのご出演ありがとうございます。<br className="hidden sm:block" />
                    当日に向けて、以下の準備状況をご確認ください。
                </p>
            </section>

            {/* Progress Section */}
            <section className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <span className="text-sm text-zinc-500 uppercase tracking-wider">現在のステータス</span>
                        <div className="text-2xl font-bold text-zinc-900 mt-1">
                            {progress === 100 ? '準備完了' : '準備中'}
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-bold text-red-600">{progress}%</span>
                        <span className="text-sm text-zinc-500 ml-2">完了</span>
                    </div>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-1000 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </section>

            {/* Task List */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                    To-Do List
                </h2>
                <div className="grid gap-4">
                    {MOCK_GUEST.tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            </section>

            {/* Contact Support */}
            <section className="text-center pt-8">
                <p className="text-sm text-zinc-500">
                    ご不明な点がございましたら、<a href="#" className="text-red-600 hover:underline">事務局担当者</a>までご連絡ください。
                </p>
            </section>
        </div>
    );
}
