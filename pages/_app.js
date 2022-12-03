import "../styles/globals.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicHeader = dynamic(() => import("./components/Header"), {
  suspense: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback={`Loading...`}>
      <DynamicHeader />
      <Component {...pageProps} />
    </Suspense>
  );
}

export default MyApp;
