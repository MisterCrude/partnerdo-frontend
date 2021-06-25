import { render } from '@testing-library/react';

import { MenuSelect } from './MenuSelect';

it('Should render MenuSelect component', async () => {
    render(
        <MenuSelect
            name="testName"
            onChange={() => null}
            options={[{ value: 'test', label: 'test' }]}
            palceholder="palceholder"
            selected="test"
        />
    );

    expect(true).toBeTruthy();
});
