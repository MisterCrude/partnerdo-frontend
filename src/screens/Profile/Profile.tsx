import React from 'react';

import Main from '@layouts/Main';
import { Tab, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react';

import EditForm from './components/EditForm';
import History from './components/History';
import MyProposals from './components/MyProposals';

const MENU_ITEMS = ['Profil', 'Moje partnerstwa', 'Zrealizowane partnerstwa'];

export const Profile: React.FC = () => {
    return (
        <Main flexGrow={1} mt={{ base: 0, md: 10 }} mb={10}>
            <Tabs colorScheme="orange">
                <TabList border="none" mx={{ base: -8, md: 0 }} overflowX="auto" overflowY="hidden">
                    {MENU_ITEMS.map((item) => (
                        <Tab
                            flexShrink={0}
                            h="100%"
                            key={item}
                            mr={{ base: 0, md: 10 }}
                            px={{ base: 8, md: 0 }}
                            _focus={{ boxShadow: 'none' }}
                            _selected={{ color: 'orange.500' }}
                        >
                            {item}
                        </Tab>
                    ))}
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
