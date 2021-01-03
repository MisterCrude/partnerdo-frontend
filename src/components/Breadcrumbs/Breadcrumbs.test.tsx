import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Breadcrumbs } from './Breadcrumbs';

it('Should render Breadcrumbs component', () => {
    render(
        <BrowserRouter>
            <Breadcrumbs crumbs={[]} current="test" />
        </BrowserRouter>
    );

    expect(true).toBeTruthy();
});
