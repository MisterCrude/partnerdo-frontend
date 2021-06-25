import { render } from '@testing-library/react';

import { PasswordField } from './PasswordField';

it('Should render PasswordField component', () => {
    render(<PasswordField />);

    expect(true).toBeTruthy();
});
