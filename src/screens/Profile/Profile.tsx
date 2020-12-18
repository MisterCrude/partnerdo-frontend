import React from 'react';

import Main from '@layouts/Main';
import { Tab, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react';

import EditForm from './components/EditForm';
import History from './components/History';
import MyProposals from './components/MyProposals';

export const Profile: React.FC = () => {
    return (
        <Main flexGrow={1}>
            <Tabs colorScheme="orange">
                <TabList overflowX="auto" overflowY="hidden" mx={{ base: -8, md: 0 }}>
                    <Tab
                        px={6}
                        flexShrink={0}
                        h="100%"
                        _focus={{ boxShadow: 'none' }}
                        _selected={{ color: 'orange.500' }}
                    >
                        Profile
                    </Tab>
                    <Tab
                        px={6}
                        flexShrink={0}
                        h="100%"
                        _focus={{ boxShadow: 'none' }}
                        _selected={{ color: 'orange.500' }}
                    >
                        Moje partnerstwa
                    </Tab>
                    <Tab
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
                    <TabPanel px={0} pt={8} pb={{ md: 0 }}>
                        <MyProposals />
                    </TabPanel>
                    <TabPanel px={0} pt={8} pb={{ md: 0 }}>
                        <History />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Main>
    );
};
