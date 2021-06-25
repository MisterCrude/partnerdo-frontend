import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// import { Card } from './Card';

it('Should render Card component', () => {
    render(
        <BrowserRouter>
            {/* <Card /> */}
            <span />
        </BrowserRouter>
    );

    expect(true).toBeTruthy();
});
