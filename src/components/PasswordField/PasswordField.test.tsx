import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { PasswordField } from './PasswordField';

it('Should render PasswordField component', () => {
    render(<PasswordField />);

    expect(true).toBeTruthy();
});
