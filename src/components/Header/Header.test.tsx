import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Header } from './Header';

it('Should render Header component', () => {
    render(<Header hasMessages isAuth />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
});
