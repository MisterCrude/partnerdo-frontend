import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Footer } from './Footer';

it('Should render Footer component', () => {
    render(<Footer />);

    expect(true).toBeTruthy();
});
