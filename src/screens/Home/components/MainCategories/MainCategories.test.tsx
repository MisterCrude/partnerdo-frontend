import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { MainCategories } from './MainCategories';

it('Should render MainCategories component', () => {
    render(<MainCategories />);

    expect(true).toBeTruthy();
});
