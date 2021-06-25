import { render } from '@testing-library/react';
import { isNull } from 'lodash';

import { ModalFrame } from './ModalFrame';

it('Should render ModalFrame component', () => {
    render(<ModalFrame isOpen={false} modalTitle="testTitle" onClose={() => null} onClose={() => isNull} />);

    expect(true).toBeTruthy();
});
