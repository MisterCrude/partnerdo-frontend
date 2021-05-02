import React from 'react';
import { render } from '@testing-library/react';

import { ModalFrame } from './ModalFrame';

it('Should render ModalFrame component', () => {
    render(
        <ModalFrame
            modalTriggerButton={<>Some item</>}
            modalTitle="Zmiana hasła"
            modalSize="lg"
            actionTitle="Zapisz hasło"
            onAction={() => 0}
        />
    );

    expect(true).toBeTruthy();
});
