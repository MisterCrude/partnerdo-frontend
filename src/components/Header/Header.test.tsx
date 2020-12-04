import React from 'react';
import { render, screen } from '@testing-library/react';

import { Header } from './Header';

it('Should render Header component', () => {
    render(<Header hasMessages isAuth />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
});
