export type IPaginationResponse<T> = {
    count: number;
    next: string;
    previous: string;
    results: T[];
};
