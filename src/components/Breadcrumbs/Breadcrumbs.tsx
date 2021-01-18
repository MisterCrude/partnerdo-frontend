import React from 'react';

import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BoxProps, Divider } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

interface ICrumb {
    title: string;
    link: string;
    mb?: number;
}

interface IProps {
    current: string;
    crumbs: Array<ICrumb>;
}

export const Breadcrumbs: React.FC<IProps & BoxProps> = ({ crumbs, current, mb = 6 }) => (
    <>
        <Breadcrumb mb={5} fontSize={13}>
            {crumbs.map(({ title, link }, index) => (
                <React.Fragment key={index}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={RouterLink} to={link} color="gray.500">
                            {title}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <Box as="span" mx={1}>
                        <ChevronRightIcon color="gray.500" />
                    </Box>
                </React.Fragment>
            ))}
            <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{current}</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Divider mb={mb} />
    </>
);