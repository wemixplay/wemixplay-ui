import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { WemixplayUIProvider } from "wemixplay-ui";

export default function App({ Component, pageProps }: AppProps) {
  return <WemixplayUIProvider><Component {...pageProps} /></WemixplayUIProvider>;
}
