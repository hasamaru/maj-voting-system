
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function LogisticsPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsCompleted(true);
        }, 1500);
    };

    if (isCompleted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <Check className="w-10 h-10 text-emerald-500" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">登録完了</h2>
                    <p className="text-zinc-400 mt-2">来場者・車両情報の登録ありがとうございます。<br />パスの発行手続きを進めさせていただきます。</p>
                </div>
                <Link
                    href="/guest/dashboard"
                    className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                >
                    ダッシュボードに戻る
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">来場者・車両情報登録</h1>
                <Link href="/guest/dashboard" className="text-sm text-zinc-500 hover:text-white">
                    キャンセル
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-8">

                {/* Attendee Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-500 border-b border-zinc-800 pb-2">代表者情報</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">氏名 <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                required
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                placeholder="例: 山田 太郎"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">電話番号 <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                required
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                placeholder="例: 090-1234-5678"
                            />
                        </div>
                    </div>
                </div>

                {/* Vehicle Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-500 border-b border-zinc-800 pb-2">車両情報</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="no-vehicle" className="rounded border-zinc-700 bg-zinc-950 text-amber-600 focus:ring-amber-500" />
                            <label htmlFor="no-vehicle" className="text-sm text-zinc-400">車両での来場なし（タクシー・公共交通機関利用）</label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">車両ナンバー</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    placeholder="例: 品川 300 あ 1234"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">車種・色</label>
                                <input
                                    type="text"
                                    className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                                    placeholder="例: アルファード・黒"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-amber-500 border-b border-zinc-800 pb-2">その他</h3>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">アレルギー・食事制限</label>
                        <textarea
                            className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 h-24"
                            placeholder="特になし"
                        ></textarea>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-12 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(217,119,6,0.5)]"
                    >
                        {isSubmitting ? '送信中...' : '登録する'}
                    </button>
                </div>
            </form>
        </div>
    );
}
