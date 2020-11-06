import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { NewOffers } from './NewOffers';

it('Should render NewOffers component', () => {
    render(<NewOffers />);

    expect(true).toBeTruthy();
});
