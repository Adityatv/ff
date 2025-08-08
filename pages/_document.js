import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script>
            if('serviceWorker' in navigator){
              navigator.serviceWorker.register('/sw.js').catch(()=>{})
            }
          </script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
