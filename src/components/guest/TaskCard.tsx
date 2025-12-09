
import Link from 'next/link';
import { CheckCircle2, Circle, ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GuestTask } from '@/lib/guestMockData';

export function TaskCard({ task }: { task: GuestTask }) {
    const isCompleted = task.status === 'completed';
    const isReviewing = task.status === 'reviewing';

    return (
        <Link
            href={task.link}
            className={cn(
                "group relative block p-6 rounded-xl border transition-all duration-300 shadow-sm",
                isCompleted
                    ? "bg-zinc-50 border-zinc-200/50"
                    : "bg-white border-zinc-200 hover:border-red-200 hover:shadow-md hover:shadow-red-900/5"
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : isReviewing ? (
                            <CheckCircle2 className="w-5 h-5 text-zinc-500" />
                        ) : (
                            <Circle className="w-5 h-5 text-red-600" />
                        )}
                        <h3 className={cn(
                            "font-bold text-lg",
                            isCompleted ? "text-zinc-400 line-through decoration-zinc-400" : "text-zinc-900"
                        )}>
                            {task.title}
                        </h3>
                    </div>
                    <p className="text-sm text-zinc-600 pl-8 mb-4">{task.description}</p>

                    <div className="pl-8 flex items-center gap-4 text-xs">
                        <span className={cn(
                            "px-2 py-0.5 rounded border",
                            isCompleted
                                ? "bg-emerald-950/30 border-emerald-900 text-emerald-500"
                                : "bg-red-950/30 border-red-900 text-red-500"
                        )}>
                            {isCompleted ? '提出済' : '未提出'}
                        </span>
                        <span className="flex items-center gap-1 text-zinc-500">
                            <Clock className="w-3 h-3" />
                            期限: {task.dueDate}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-center h-full pl-4">
                    <ArrowRight className={cn(
                        "w-5 h-5 transition-transform group-hover:translate-x-1",
                        isCompleted ? "text-zinc-700" : "text-red-600"
                    )} />
                </div>
            </div>
        </Link>
    );
}
