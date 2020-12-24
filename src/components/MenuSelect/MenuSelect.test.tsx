import React from 'react';
import { render } from '@testing-library/react';

import { MenuSelect } from './MenuSelect';

it('Should render MenuSelect component', async () => {
    render(<MenuSelect isRadio options={[{ value: 'test', label: 'test' }]} palceholder="palceholder" />);

    expect(true).toBeTruthy();
});
