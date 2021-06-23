export type TStatuses = 'info' | 'warning' | 'success' | 'error';

export type TPosition = 'bottom-right' | 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-left';

export interface IToast {
    status: TStatuses;
    title: string;
    message: string;
    timestamp: number;
}

export interface IOption {
    value: string;
    label: string;
}
