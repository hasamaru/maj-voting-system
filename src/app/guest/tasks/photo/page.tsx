
'use client';

import { useState } from 'react';
import { Upload, Image as ImageIcon, X, Check } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function PhotoUploadPage() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = () => {
        setIsUploading(true);
        // Simulate upload
        setTimeout(() => {
            setIsUploading(false);
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
                    <h2 className="text-2xl font-bold text-white">提出完了</h2>
                    <p className="text-zinc-400 mt-2">アーティスト写真の提出ありがとうございます。<br />事務局にて確認させていただきます。</p>
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
                <h1 className="text-2xl font-bold text-white">アーティスト写真提出</h1>
                <Link href="/guest/dashboard" className="text-sm text-zinc-500 hover:text-white">
                    キャンセル
                </Link>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-zinc-200 mb-2">提出要件</h3>
                    <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                        <li>解像度: 1920x1080px 以上推奨</li>
                        <li>形式: JPG, PNG</li>
                        <li>サイズ: 10MB以内</li>
                    </ul>
                </div>

                {!file ? (
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={cn(
                            "border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center transition-all cursor-pointer",
                            isDragging
                                ? "border-amber-500 bg-amber-500/10"
                                : "border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50"
                        )}
                    >
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                            <Upload className="w-8 h-8 text-zinc-400" />
                        </div>
                        <p className="text-zinc-300 font-medium">クリックまたはドラッグ＆ドロップ</p>
                        <p className="text-zinc-500 text-sm mt-1">画像をアップロード</p>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => e.target.files && setFile(e.target.files[0])}
                        />
                    </div>
                ) : (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-zinc-400" />
                            </div>
                            <div>
                                <p className="text-zinc-200 font-medium truncate max-w-[200px]">{file.name}</p>
                                <p className="text-zinc-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setFile(null)}
                            className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={!file || isUploading}
                        className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isUploading ? '送信中...' : '提出する'}
                    </button>
                </div>
            </div>
        </div>
    );
}
