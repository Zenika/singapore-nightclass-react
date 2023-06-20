import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { CartProvider } from "~/context/cartContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Header />
        <main className="flex grow flex-col">
          <Component {...pageProps} />
        </main>
        <Footer />
      </CartProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
