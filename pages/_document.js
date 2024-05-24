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
        <link rel="stylesheet" href="/dist/css/adminlte.css" />
        <link
          rel="stylesheet"
          href="/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"
        />
        <link
          rel="stylesheet"
          href="/plugins/datatables-responsive/css/responsive.bootstrap4.min.css"
        />
      </Head>
      <body className="layout-fixed layout-navbar-fixed hold-transition layout-top-nav">
        <div className="wrapper">
          <Main />
          <NextScript />
          <script src="/plugins/jquery/jquery.min.js"></script>
          <script src="/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
          <script src="/dist/js/adminlte.min.js"></script>
          <script src="/plugins/datatables/jquery.dataTables.min.js"></script>
          <script src="/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
          <script src="/plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
          <script src="/plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
        </div>
      </body>
    </Html>
  );
}
