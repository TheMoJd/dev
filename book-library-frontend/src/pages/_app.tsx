// file: pages/_app.tsx

import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../app/apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
			{/* Tout ce qui est à l'intérieur de ApolloProvider a accès au client Apollo */}
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
