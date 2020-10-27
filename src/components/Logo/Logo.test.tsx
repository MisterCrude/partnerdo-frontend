import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Logo } from './Logo';

it('Should render Login component', () => {
  render(<Logo />);

  expect(screen.getByTestId('login')).toBeInTheDocument();
});
