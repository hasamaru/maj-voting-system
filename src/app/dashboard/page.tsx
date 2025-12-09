
'use client';

import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { DashboardStats } from '@/components/DashboardStats';
import { MOCK_VOTERS } from '@/lib/mockData';

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="ダッシュボード" />

                <main className="flex-1 overflow-y-auto p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-zinc-800 mb-2">全体進捗サマリー</h2>
                        <p className="text-zinc-500">全団体のID配布状況と登録状況の概要です。</p>
                    </div>

                    <DashboardStats data={MOCK_VOTERS} />

                    {/* Additional dashboard widgets could go here */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                            <h3 className="font-semibold text-zinc-800 mb-4">最近のアクティビティ</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <span className="text-zinc-600">RIAJ: 10件のIDを送信しました</span>
                                    </div>
                                    <span className="text-zinc-400">10分前</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-zinc-600">JAME: ユーザー登録が完了しました (Tower Records)</span>
                                    </div>
                                    <span className="text-zinc-400">25分前</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
