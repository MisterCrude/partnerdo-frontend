import React from 'react';

import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BoxProps } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface IProps {
    crumbs: Array<string[] | string>;
}

export const Breadcrumbs: React.FC<IProps & BoxProps> = (props) => (
    <Breadcrumb {...props} fontSize="lg">
        {props.crumbs.map((crumb, index) => (
            <>
                {props.crumbs.length > ++index ? (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={RouterLink} to={crumb[1]}>
                                {crumb[0]}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <Box as="span" mx={2}>
                            /
                        </Box>
                    </>
                ) : (
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>{crumb}</BreadcrumbLink>
                    </BreadcrumbItem>
                )}
            </>
        ))}
    </Breadcrumb>
);
