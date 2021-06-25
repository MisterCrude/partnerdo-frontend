import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import store from '@store/index';
import customTheme from '@theme/customTheme';

interface IProps {
    children: ReactNode;
}

const Providers = ({ children }: IProps) => {
    return (
        <ChakraProvider theme={customTheme}>
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        </ChakraProvider>
    );
};

export default Providers;
