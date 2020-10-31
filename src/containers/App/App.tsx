import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useDispatch from '@hooks/dispatch';
import { getIsAppload, appLoadAsync } from '@slices/appSlice';

// TODO: try to remove .eslintrc and devDependencies

// TODO: add  "pre-push": "yarn test" to package.json
const App: React.FC = () => {
    const dispatchLoadAppAsync = useDispatch<typeof appLoadAsync, boolean>(appLoadAsync);
    const selectIsAppload: boolean = useSelector(getIsAppload);

    useEffect(() => {
        dispatchLoadAppAsync(true);
    });

    return (
        <>
            <h1 style={{ textAlign: 'center', marginTop: '100px' }}>Cześć Kornelia :)</h1>
            <br />
            <h3 style={{ textAlign: 'center' }}>{selectIsAppload ? 'loaded' : 'unloaded'}</h3>
        </>
    );
};

export default App;
