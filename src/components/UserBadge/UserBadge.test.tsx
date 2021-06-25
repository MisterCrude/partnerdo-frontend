import { render } from '@testing-library/react';

import { UserBadge } from './UserBadge';

it('Should render UserBadge component', () => {
    render(<UserBadge />);

    expect(true).toBeTruthy();
});
