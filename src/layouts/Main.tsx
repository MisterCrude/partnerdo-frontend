import React from 'react';

import Footer from '@components/Footer';
import Header from '@components/Header';

export const Main: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default Main;
