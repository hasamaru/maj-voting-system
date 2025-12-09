
'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { VotingTable } from '@/components/VotingTable';
import { DashboardStats } from '@/components/DashboardStats';
import { MOCK_VOTERS, Organization, VotingStatus } from '@/lib/mockData';

export default function OrgView() {
    const [selectedOrg, setSelectedOrg] = useState<Organization>('RIAJ');
    const [voters, setVoters] = useState(MOCK_VOTERS);

    // Filter data based on selected organization (Simulating Row-level Security)
    const filteredData = voters.filter(v => v.organization === selectedOrg);

    const handleUpdateStatus = (ids: string[], newStatus: VotingStatus) => {
        setVoters(current =>
            current.map(v => ids.includes(v.id) ? { ...v, status: newStatus } : v)
        );
    };

    const handleUpdateEmail = (id: string, newEmail: string) => {
        setVoters(current =>
            current.map(v => v.id === id ? { ...v, email: newEmail } : v)
        );
    };

    return (
        <div className="flex h-screen bg-zinc-50 font-sans text-zinc-900">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header title="団体別管理" organization={selectedOrg} />

                <main className="flex-1 overflow-y-auto p-8">

                    {/* Org Switcher for Demo Purposes */}
                    <div className="mb-8 flex items-center space-x-4 bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                        <span className="text-sm font-medium text-zinc-500">ログイン中の団体 (デモ用):</span>
                        <div className="flex space-x-2">
                            {(['RIAJ', 'FMPJ', 'JAME', 'JASRAC', 'MPA'] as Organization[]).map(org => (
                                <button
                                    key={org}
                                    onClick={() => setSelectedOrg(org)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedOrg === org
                                        ? 'bg-red-600 text-white shadow-md shadow-red-200'
                                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                                        }`}
                                >
                                    {org}
                                </button>
                            ))}
                        </div>
                    </div>

                    <DashboardStats data={filteredData} />

                    <div className="flex flex-col h-[600px]">
                        <h2 className="text-lg font-semibold text-zinc-800 mb-4">会員リスト & 投票ID管理</h2>
                        <VotingTable
                            data={filteredData}
                            onUpdateStatus={handleUpdateStatus}
                            onUpdateEmail={handleUpdateEmail}
                            isAdmin={selectedOrg === 'RIAJ'} // Demo: RIAJ allows admin features just for show? Or keep it false.
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
