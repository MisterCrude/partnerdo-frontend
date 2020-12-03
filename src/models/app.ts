export type TStatuses = 'info' | 'warning' | 'success' | 'error';

export interface IAlert {
    status: TStatuses;
    title: string;
    message: string;
    timestamp: number;
}
