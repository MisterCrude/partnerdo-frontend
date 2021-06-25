import { render } from '@testing-library/react';

import { MenuMultiSelect } from './MenuMultiSelect';

it('Should render MenuSelect component', async () => {
    render(
        <MenuMultiSelect
            name="testName"
            onChange={() => null}
            options={[{ value: 'test', label: 'test' }]}
            palceholder="palceholder"
            selected={['test']}
        />
    );

    expect(true).toBeTruthy();
});
