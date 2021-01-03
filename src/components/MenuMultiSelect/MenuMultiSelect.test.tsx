import React from 'react';
import { render } from '@testing-library/react';

import { MenuMultiSelect } from './MenuMultiSelect';

it('Should render MenuSelect component', async () => {
    render(<MenuMultiSelect options={[{ value: 'test', label: 'test' }]} palceholder="palceholder" />);

    expect(true).toBeTruthy();
});
