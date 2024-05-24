import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="/plugins/fontawesome-free/css/all.min.css"
        />
        <link rel="stylesheet" href="/dist/css/adminlte.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script src="plugins/jquery/jquery.min.js" />
        <script src="plugins/bootstrap/js/bootstrap.bundle.min.js" />
        <script src="dist/js/adminlte.min.js" />
      </body>
    </Html>
  );
}
