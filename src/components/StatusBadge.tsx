
import { cn } from "@/lib/utils";
import { VotingStatus } from "@/lib/mockData";

export function StatusBadge({ status }: { status: VotingStatus }) {
    return (
        <span className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium border",
            status === '登録完了' && "bg-emerald-100 text-emerald-700 border-emerald-200",
            status === '送信済' && "bg-blue-100 text-blue-700 border-blue-200",
            status === '未送信' && "bg-zinc-100 text-zinc-600 border-zinc-200"
        )}>
            {status}
        </span>
    );
}
