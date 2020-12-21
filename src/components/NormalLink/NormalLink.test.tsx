import React from 'react';
import { render } from '@testing-library/react';

import { NormalLink } from './NormalLink';

it('Should render Footer component', () => {
    render(<NormalLink to="/" />);

    expect(true).toBeTruthy();
});
