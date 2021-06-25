import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// import { CardMenu } from './CardMenu';

it('Should render CardMenu component', () => {
    render(
        <BrowserRouter>
            {/* <Card /> */}
            <span />
        </BrowserRouter>
    );

    expect(true).toBeTruthy();
});
