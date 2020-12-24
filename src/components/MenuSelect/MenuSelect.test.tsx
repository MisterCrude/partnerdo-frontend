import React from 'react';
import { render, screen } from '@testing-library/react';

import { MenuSelect } from './MenuSelect';

it('Should render MenuSelect component', () => {
    render(<MenuSelect isRadio options={[]} palceholder="palceholder" />);

    expect(screen.getByTestId('MenuSelect')).toBeInTheDocument();
});
