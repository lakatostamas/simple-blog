import type { AppProps } from "next/app";
import { Providers } from "@/src/redux/Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
