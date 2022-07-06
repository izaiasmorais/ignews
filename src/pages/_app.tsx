import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <Header />
        <NextNProgress color="#61dafb"/>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
