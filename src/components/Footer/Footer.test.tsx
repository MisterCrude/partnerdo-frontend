import { render } from '@testing-library/react';

import { Footer } from './Footer';

it('Should render Footer component', () => {
    render(<Footer />);

    expect(true).toBeTruthy();
});
