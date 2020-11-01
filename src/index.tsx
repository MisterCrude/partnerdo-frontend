import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '@styles/main.css';

import store from '@store/index';

const render = () => {
    const App = require('./App').default;

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./App', render);
}
