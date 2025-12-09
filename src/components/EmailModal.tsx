
import { X, Mail, AlertCircle } from 'lucide-react';
import { Voter } from '@/lib/mockData';

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    voters: Voter[];
}

export function EmailModal({ isOpen, onClose, onConfirm, voters }: EmailModalProps) {
    if (!isOpen) return null;

    const isBulk = voters.length > 1;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                    <h3 className="font-semibold text-zinc-800 flex items-center gap-2">
                        <Mail className="w-5 h-5 text-red-600" />
                        メール送信の確認
                    </h3>
                    <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3 items-start">
                        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-700">
                            <span className="font-bold">{voters.length}</span> 件の宛先に投票IDを送信しようとしています。
                            以下の詳細を確認してください。
                        </p>
                    </div>

                    <div className="max-h-48 overflow-y-auto border border-zinc-200 rounded-lg divide-y divide-zinc-100">
                        {voters.map(voter => (
                            <div key={voter.id} className="p-3 text-sm">
                                <div className="font-medium text-zinc-800">{voter.name}</div>
                                <div className="text-zinc-500 text-xs">{voter.email}</div>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-zinc-500 text-center">
                        この操作を行うとステータスが「送信済」になり、外部メーラーが起動します。
                    </p>
                </div>

                <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm shadow-red-200 transition-colors flex items-center gap-2"
                    >
                        <Mail className="w-4 h-4" />
                        メール送信
                    </button>
                </div>
            </div>
        </div>
    );
}
