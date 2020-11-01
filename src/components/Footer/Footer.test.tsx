import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Footer } from './Footer';

it('Should render Footer component', () => {
    render(<Footer />);

    expect(screen.getByTestId('footer')).toBeInTheDocument();
});
