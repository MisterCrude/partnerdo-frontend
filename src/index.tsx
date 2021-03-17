import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';

import customTheme from '@theme/customTheme';
import store from '@store/index';
import { fetchProfileAsync } from '@slices/profileSlice';
import { fetchFiltersAsync } from '@slices/filtersSlice';

const fetchInitialData = () => {
    localStorage.getItem('token') && store.dispatch(fetchProfileAsync());
    store.dispatch(fetchFiltersAsync());
};

const render = () => {
    const App = require('./App').default;

    ReactDOM.render(
        <React.StrictMode>
            <ChakraProvider theme={customTheme}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ChakraProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
};

fetchInitialData();
render();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App', render);
    module.hot.accept('@store/rootReducer', () => {
        const newRootReducer = require('@store/rootReducer').default;
        store.replaceReducer(newRootReducer);
    });
}
