export type RecordNamedItem = Record<'name' | 'id', string>;

export enum RequestStatus {
    IDLE = 'idle',
    FETCHING = 'fetching',
    SUCCESS = 'success',
    ERROR = 'error',
}
