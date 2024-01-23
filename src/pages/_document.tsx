import Document, { Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Get help with your next big opportunity." />
          <meta property="og:site_name" content="opportun.me" />
          <meta property="og:description" content="Get help with your next big opportunity." />
          <meta property="og:title" content="Opportun.me" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Opportun.me" />
          <meta name="twitter:description" content="Get help with your next big opportunity." />
          <meta property="og:image" content="https://opportun.me/og-image.png" />
          <meta name="twitter:image" content="https://opportu.me/og-image.png" />
        </Head>
        <body className="bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
