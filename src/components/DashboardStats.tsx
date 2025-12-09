
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Voter } from '@/lib/mockData';

interface DashboardStatsProps {
    data: Voter[];
}

export function DashboardStats({ data }: DashboardStatsProps) {
    const totalVoters = data.length;
    const sentCount = data.filter(d => d.status === '送信済' || d.status === '登録完了').length;
    const registeredCount = data.filter(d => d.status === '登録完了').length;

    const distributionRate = totalVoters > 0 ? Math.round((sentCount / totalVoters) * 100) : 0;
    const registrationRate = totalVoters > 0 ? Math.round((registeredCount / totalVoters) * 100) : 0;

    const pieData = [
        { name: '完了', value: sentCount },
        { name: '未完了', value: totalVoters - sentCount },
    ];
    const COLORS = ['#E60012', '#e4e4e7']; // Red and Zinc-200

    // Group by Organization for Bar Chart
    const orgStats = data.reduce((acc, curr) => {
        const org = curr.organization;
        if (!acc[org]) {
            acc[org] = { name: org, total: 0, sent: 0, registered: 0 };
        }
        acc[org].total++;
        if (curr.status === '送信済' || curr.status === '登録完了') acc[org].sent++;
        if (curr.status === '登録完了') acc[org].registered++;
        return acc;
    }, {} as Record<string, any>);

    const barData = Object.values(orgStats);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* KPI Cards */}
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">ID配布完了率</h3>
                    <div className="mt-2 flex items-baseline">
                        <span className="text-3xl font-bold text-zinc-900">{distributionRate}%</span>
                        <span className="ml-2 text-sm text-zinc-500">/ 全 {totalVoters} 件</span>
                    </div>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: `${distributionRate}%` }}></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-between">
                <div>
                    <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">登録完了率</h3>
                    <div className="mt-2 flex items-baseline">
                        <span className="text-3xl font-bold text-emerald-600">{registrationRate}%</span>
                        <span className="ml-2 text-sm text-zinc-500">アクティブユーザー</span>
                    </div>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${registrationRate}%` }}></div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#E60012_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="text-center z-10">
                    <p className="text-sm text-zinc-500 mb-1">残りのアクション</p>
                    <p className="text-4xl font-bold text-zinc-800">{totalVoters - sentCount}</p>
                    <p className="text-xs text-zinc-400 mt-1">未送信のメール</p>
                </div>
            </div>

            {/* Charts */}
            <div className="md:col-span-2 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-800 mb-6">団体別進捗</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} barSize={20}>
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#f4f4f5' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Legend />
                            <Bar dataKey="total" name="会員総数" fill="#e4e4e7" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="sent" name="ID配布済" fill="#E60012" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h3 className="text-lg font-semibold text-zinc-800 mb-6">全体ステータス</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-600"></div>
                        <span className="text-sm text-zinc-600">完了</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-zinc-200"></div>
                        <span className="text-sm text-zinc-600">未完了</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
