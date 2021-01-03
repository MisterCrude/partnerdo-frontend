import React from 'react';
import { render } from '@testing-library/react';

import { Pagination } from './Pagination';

it('Should render Pagination component', () => {
    render(<Pagination />);

    expect(true).toBeTruthy();
});
