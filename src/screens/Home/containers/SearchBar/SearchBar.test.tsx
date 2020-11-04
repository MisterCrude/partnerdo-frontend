import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { SearchBar } from './SearchBar';

it('Should render SearchBar component', () => {
    render(<SearchBar />);

    expect(true).toBeTruthy();
});
