import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import CartContextProvider from '../components/CartContextProvider';
import '../styles/mystyles.css';
import '../styles/customStyles.css';

function MyApp({ Component, pageProps }) {
  // Load saved cart from localStorage
  // useEffect(() => { TODO: Figure out the best way to bring stored state in from local storage
  //   const storedCart = JSON.parse(window.localStorage.getItem('cart'));
  //   setCart(storedCart || []);
  // }, []);
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="./public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Online store for Cartagena Decor"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <title>Cartagena Decor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CartContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}

export default MyApp;
