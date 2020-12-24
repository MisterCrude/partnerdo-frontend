import React from 'react';
import { render } from '@testing-library/react';

import { ToolsBar } from './ToolsBar';

it('Should render ToolsBar component', () => {
    render(<ToolsBar hasMessages isAuth mobileOnly />);

    expect(true).toBeTruthy();
});
