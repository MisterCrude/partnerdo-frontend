import React from 'react';
import { render } from '@testing-library/react';

import { ModalFrame } from './ModalFrame';

it('Should render ModalFrame component', () => {
    render(
        <ModalFrame
            actionTitle="Zapisz hasło"
            triggerTitle="Zmień hasło"
            modalTitle="Zmiana hasła"
            onAction={() => {
                console.log('test');
            }}
        />
    );

    expect(true).toBeTruthy();
});
