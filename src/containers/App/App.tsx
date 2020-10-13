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

  return <>App {selectIsAppload ? 'loaded' : 'unloaded'}</>;
};

export default App;
