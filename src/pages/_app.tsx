import "@/styles/globals.css";
import type { AppProps } from "next/app";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { SessionProvider } from "next-auth/react"
=======
>>>>>>> 277ebc1 (Meu primeiro projeto nextjs)
=======
import { SessionProvider } from "next-auth/react"
>>>>>>> 147a31f (implementando OAuth authentication)
// import Header from "../components/header/Header";

import Header from "../components/Header/Header";

<<<<<<< HEAD

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
=======

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
<<<<<<< HEAD
  
>>>>>>> 277ebc1 (Meu primeiro projeto nextjs)
=======

>>>>>>> 147a31f (implementando OAuth authentication)
}
