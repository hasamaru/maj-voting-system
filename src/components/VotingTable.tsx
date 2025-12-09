
'use client';

import { useState } from 'react';
import { Voter, VotingStatus } from '@/lib/mockData';
import { StatusBadge } from './StatusBadge';
import { Mail, Copy, Check, AlertTriangle, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmailModal } from './EmailModal';

interface VotingTableProps {
    data: Voter[];
    onUpdateStatus: (ids: string[], status: VotingStatus) => void;
}

export function VotingTable({ data, onUpdateStatus }: VotingTableProps) {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [modalVoters, setModalVoters] = useState<Voter[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === data.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(data.map(d => d.id)));
        }
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleSendEmail = (voter: Voter) => {
        if (!voter.email) return;
        setModalVoters([voter]);
        setIsEmailModalOpen(true);
    };

    const handleBulkSend = () => {
        const voters = data.filter(d => selectedIds.has(d.id) && d.email);
        if (voters.length === 0) return;
        setModalVoters(voters);
        setIsEmailModalOpen(true);
    };

    const confirmSendEmail = () => {
        onUpdateStatus(modalVoters.map(v => v.id), '送信済');
        setIsEmailModalOpen(false);
        setSelectedIds(new Set());
    };

    return (
        <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col h-full">
            {/* Table Toolbar */}
            <div className="p-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-zinc-600">
                        {selectedIds.size} 件選択中
                    </span>
                    {selectedIds.size > 0 && (
                        <button
                            onClick={handleBulkSend}
                            className="ml-4 px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm"
                        >
                            <Mail className="w-3 h-3" />
                            一括送信
                        </button>
                    )}
                </div>
                <div className="flex space-x-2">
                    {/* Additional filters could go here */}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-auto flex-1">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-zinc-50 sticky top-0 z-10">
                        <tr>
                            <th className="p-4 border-b border-zinc-200 w-12">
                                <input
                                    type="checkbox"
                                    className="rounded border-zinc-300 text-red-600 focus:ring-red-500"
                                    checked={data.length > 0 && selectedIds.size === data.length}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="p-4 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">氏名 / 会社名</th>
                            <th className="p-4 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">所属団体</th>
                            <th className="p-4 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">メールアドレス</th>
                            <th className="p-4 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">投票ID</th>
                            <th className="p-4 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">属性</th>
                            <th className="p-4 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider">ステータス</th>
                            <th className="p-4 border-b border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">アクション</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {data.map((row) => (
                            <tr
                                key={row.id}
                                className={cn(
                                    "hover:bg-zinc-50 transition-colors group",
                                    selectedIds.has(row.id) && "bg-red-50/30",
                                    !row.email && "bg-red-50/30"
                                )}
                            >
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        className="rounded border-zinc-300 text-red-600 focus:ring-red-500"
                                        checked={selectedIds.has(row.id)}
                                        onChange={() => toggleSelect(row.id)}
                                    />
                                </td>
                                <td className="p-4">
                                    <div className="font-medium text-zinc-900">{row.name}</div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-800">
                                        {row.organization}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {row.email ? (
                                        <div className="text-sm text-zinc-600">{row.email}</div>
                                    ) : (
                                        <div className="flex items-center text-red-500 text-xs font-medium">
                                            <AlertTriangle className="w-3 h-3 mr-1" />
                                            未入力
                                        </div>
                                    )}
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center space-x-2 group/id">
                                        <code className="text-xs font-mono bg-zinc-100 px-2 py-1 rounded text-zinc-600 border border-zinc-200">
                                            {row.uniqueVotingId}
                                        </code>
                                        <button
                                            onClick={() => handleCopy(row.uniqueVotingId, row.id)}
                                            className="text-zinc-400 hover:text-red-600 opacity-0 group-hover/id:opacity-100 transition-opacity"
                                            title="IDをコピー"
                                        >
                                            {copiedId === row.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                        </button>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="text-sm text-zinc-500">{row.attribute}</span>
                                </td>
                                <td className="p-4">
                                    <StatusBadge status={row.status} />
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleSendEmail(row)}
                                            disabled={!row.email}
                                            className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="メール送信"
                                        >
                                            <Mail className="w-4 h-4" />
                                        </button>
                                        <button className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-md transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EmailModal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                onConfirm={confirmSendEmail}
                voters={modalVoters}
            />
        </div>
    );
}
