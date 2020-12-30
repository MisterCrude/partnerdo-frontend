import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Pagination } from './Pagination';

it('Should render Pagination component', () => {
    render(
        <BrowserRouter>
            <Pagination />
        </BrowserRouter>
    );

    expect(true).toBeTruthy();
});
