import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Header } from './Header';

it('Should render Header component', () => {
    render(
        <BrowserRouter>
            <Header
                hasMessages
                isAuth
                onLogout={() => {
                    return null;
                }}
            />
        </BrowserRouter>
    );

    expect(true).toBeTruthy();
});
