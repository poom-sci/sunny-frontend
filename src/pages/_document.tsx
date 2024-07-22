import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="th">
      <Head>
        <script
          defer
          src="https://kit.fontawesome.com/f146b1aaf9.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <script async src="/firebase-messaging-sw.js"></script> */}
      </body>
    </Html>
  );
}
