export type ToastStatuses = 'info' | 'warning' | 'success' | 'error';

export type ToastPosition = 'bottom-right' | 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-left';

export interface IToast {
    status: ToastStatuses;
    title: string;
    message: string;
    timestamp: number;
}

export interface IOption {
    value: string;
    label: string;
}
