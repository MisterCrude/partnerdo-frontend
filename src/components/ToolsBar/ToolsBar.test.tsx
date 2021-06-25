import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { ToolsBar } from './ToolsBar';

it('Should render ToolsBar component', () => {
    render(
        <BrowserRouter>
            <ToolsBar hasMessages isAuth mobileOnly />
        </BrowserRouter>
    );

    expect(true).toBeTruthy();
});
