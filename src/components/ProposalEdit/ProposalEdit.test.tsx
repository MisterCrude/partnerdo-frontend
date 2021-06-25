import { render } from '@testing-library/react';

import { ProposalEdit } from './ProposalEdit';

it('Should render ProposalEdit component', () => {
    render(<ProposalEdit />);

    expect(true).toBeTruthy();
});
