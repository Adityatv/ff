import '../styles/globals.css'
import { PlayerProvider } from '../components/PlayerContext'
import Head from 'next/head'

function App({ Component, pageProps }) {
  return (
    <PlayerProvider>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </PlayerProvider>
  )
}

export default App
