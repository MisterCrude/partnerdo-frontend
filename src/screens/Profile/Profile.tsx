import React from 'react';

import Main from '@layouts/Main';
import { Tab, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react';

import EditForm from './components/EditForm';

export const Profile: React.FC = () => {
    return (
        <div>
            <Main flexGrow={1} my={{ base: 0, md: 10 }}>
                <Tabs colorScheme="orange">
                    <TabList overflowX="auto" overflowY="hidden" mx={{ base: -8, md: 0 }}>
                        <Tab
                            borderTopRadius={6}
                            px={6}
                            flexShrink={0}
                            h="100%"
                            _focus={{ boxShadow: 'none' }}
                            _selected={{ color: 'orange.500' }}
                        >
                            Profile
                        </Tab>
                        <Tab
                            borderTopRadius={6}
                            px={6}
                            flexShrink={0}
                            h="100%"
                            _focus={{ boxShadow: 'none' }}
                            _selected={{ color: 'orange.500' }}
                        >
                            Moje partnerstwa
                        </Tab>
                        <Tab
                            borderTopRadius={6}
                            px={6}
                            flexShrink={0}
                            h="100%"
                            _focus={{ boxShadow: 'none' }}
                            _selected={{ color: 'orange.500' }}
                        >
                            Zrealizowane partnerstwa
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel px={0} pt={8} pb={{ md: 0 }}>
                            <EditForm />
                        </TabPanel>
                        <TabPanel px={0}>Content2</TabPanel>
                        <TabPanel px={0}>Content3</TabPanel>
                    </TabPanels>
                </Tabs>
            </Main>
        </div>
    );
};
