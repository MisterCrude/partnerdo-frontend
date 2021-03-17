import React from 'react';
import { css } from '@emotion/react';
import customTheme from '@theme/customTheme';

import ReactPaginate from 'react-paginate';
import { Box } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const PAGE_RANGE = 3;
const MARGIN_PAGE = 2;

const PaginationStyles = css`
    .pagination {
        display: flex;
        list-style-type: none;
        align-items: center;
        li {
            margin-left: ${customTheme.space[2]};
            a {
                background-color: ${customTheme.colors.gray[100]};
                border-radius: ${customTheme.radii.full};
                display: flex;
                justify-content: center;
                line-height: 1;
                min-width: 40px;
                padding: ${customTheme.space[3]};
                transition: ${customTheme.transition.duration.slow};
                &:hover {
                    background-color: ${customTheme.colors.gray[200]};
                }
            }
            &.active {
                a {
                    color: ${customTheme.colors.white};
                    background-color: ${customTheme.colors.orange[500]};
                    cursor: default;
                }
            }
            &.break {
                a {
                    background-color: transparent;
                }
            }
            &.disabled {
                display: none;
            }
        }
    }
`;

interface IProps {
    pagesAmount: number;
    isFetching: boolean;
    onChangePage: (pageNumber: number) => void;
}

interface IChangeHandlerParams {
    selected: number;
}

export const Pagination: React.FC<IProps> = ({ onChangePage, pagesAmount, isFetching }) => (
    <>
        {isFetching && <>Skeleton</>}
        {pagesAmount > 1 && (
            <Box css={PaginationStyles}>
                <ReactPaginate
                    activeClassName={'active'}
                    breakClassName={'break'}
                    breakLabel={'...'}
                    containerClassName={'pagination'}
                    css={PaginationStyles}
                    marginPagesDisplayed={MARGIN_PAGE}
                    nextLabel={<ChevronRightIcon />}
                    onPageChange={({ selected }: IChangeHandlerParams) => onChangePage(selected + 1)}
                    pageCount={pagesAmount}
                    pageRangeDisplayed={PAGE_RANGE}
                    previousLabel={<ChevronLeftIcon />}
                />
            </Box>
        )}
    </>
);
