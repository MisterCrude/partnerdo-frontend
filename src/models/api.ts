export type IPaginationResponse<T> = {
    count: number;
    next: string;
    previous: string;
    results: T[];
};

export enum RequestStatus {
    IDLE = 'idle',
    FETCHING = 'fetching',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface IGenericRemote<T> {
    data: T;
    requestStatus: RequestStatus;
}
