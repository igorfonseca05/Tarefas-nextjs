import "@/styles/globals.css";
import type { AppProps } from "next/app";
<<<<<<< HEAD
import { SessionProvider } from "next-auth/react"
// import Header from "../components/header/Header";

import Header from "../components/Header/Header";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>

  );

=======

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
>>>>>>> 5264cea (Meu primeiro projeto nextjs)
}
