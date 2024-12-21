// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Import Fira Code font from Google Fonts */}
          <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />

          <link rel="icon" href="/http-icon.png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
