
export interface GuestTask {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed' | 'reviewing';
    dueDate: string;
    link: string;
}

export interface GuestProfile {
    id: string;
    name: string;
    category: 'Artist' | 'Presenter' | 'VIP';
    tasks: GuestTask[];
}

export const MOCK_GUEST: GuestProfile = {
    id: 'g-001',
    name: 'Official Hige Dandism',
    category: 'Artist',
    tasks: [
        {
            id: 't-photo',
            title: 'アーティスト写真提出',
            description: 'パンフレット・スクリーン投影用の高解像度画像',
            status: 'pending',
            dueDate: '2025-11-30',
            link: '/guest/tasks/photo'
        },
        {
            id: 't-logi',
            title: '来場者・車両情報登録',
            description: '当日の入館パス発行および車両証の手配',
            status: 'completed',
            dueDate: '2025-12-05',
            link: '/guest/tasks/logistics'
        },
        {
            id: 't-schedule',
            title: '当日スケジュールの確認',
            description: '入り時間、リハーサル、本番のタイムテーブル',
            status: 'reviewing', // "閲覧のみ" but tracking if seen could be useful, using reviewing as placeholder for "Checked"
            dueDate: '2025-12-10',
            link: '/guest/info'
        }
    ]
};
