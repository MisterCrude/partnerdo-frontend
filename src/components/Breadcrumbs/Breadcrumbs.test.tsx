import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Breadcrumbs } from './Breadcrumbs';

it('Should render Footer component', () => {
    render(
        <BrowserRouter>
            <Breadcrumbs />
        </BrowserRouter>
    );

    expect(true).toBeTruthy();
});
