import { useCallback } from 'react';
import { useDispatch as useDispatchRedux } from 'react-redux';

type actionFn = (...args: any[]) => void;

const useDispatch = <K extends actionFn, T>(action: K) => {
    const dispatch = useDispatchRedux();

    return useCallback(
        (payload?: T) => {
            dispatch(payload ? action(payload) : action());
        },
        [dispatch, action]
    );
};

export default useDispatch;
