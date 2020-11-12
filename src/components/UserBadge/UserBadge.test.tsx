import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { UserBadge } from './UserBadge';

it('Should render UserBadge component', () => {
    render(<UserBadge />);

    expect(true).toBeTruthy();
});
