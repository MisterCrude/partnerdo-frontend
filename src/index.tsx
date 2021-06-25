import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import store from '@store/index';
import { fetchProfileAsync } from '@slices/profileSlice';
import { fetchFiltersAsync } from '@slices/filtersSlice';

import Providers from '@src/Providers';

const fetchInitialData = () => {
    localStorage.getItem('token') && store.dispatch(fetchProfileAsync());
    store.dispatch(fetchFiltersAsync());
};

const render = () => {
    // eslint-disable-next-line
    const App = require('./App').default;

    ReactDOM.render(
        <StrictMode>
            <Providers>
                <App />
            </Providers>
        </StrictMode>,
        document.getElementById('root')
    );
};

fetchInitialData();
render();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App', render);
    module.hot.accept('@store/rootReducer', () => {
        // eslint-disable-next-line
        const newRootReducer = require('@store/rootReducer').default;
        store.replaceReducer(newRootReducer);
    });
}
