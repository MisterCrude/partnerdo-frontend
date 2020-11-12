import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { ToolsBar } from './ToolsBar';

it('Should render ToolsBar component', () => {
    render(<ToolsBar hasMessages isLoggedin mobileOnly />);

    expect(true).toBeTruthy();
});
