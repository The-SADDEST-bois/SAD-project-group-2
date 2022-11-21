import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from './contexts/storeProvider';
import { Authenticate } from './components/Authenticate';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <ChakraProvider>
              <Authenticate>
                <App/>
              </Authenticate>
          </ChakraProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
)
