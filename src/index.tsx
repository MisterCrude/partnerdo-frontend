import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/core';

import store from '@store/index';

const render = () => {
    const App = require('./App').default;

    ReactDOM.render(
        <React.StrictMode>
            <ChakraProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </ChakraProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App', render);
    module.hot.accept('@store/rootReducer', () => {
        const newRootReducer = require('@store/rootReducer').default;
        store.replaceReducer(newRootReducer);
    });
}
