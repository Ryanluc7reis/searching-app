import { AppProps } from "next/app";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Searching users</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
