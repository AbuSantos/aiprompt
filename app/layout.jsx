import Navbar from '@components/Navbar'
import Head from 'next/head'
import Provider from '@components/Provider'
import '@styles/globals.css'

export const metadata = {
  title: 'aiprompts',
  manifest: '/manifest.json',
  description: 'Discover and share ai prompts',
}
const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
      <Head>
        <title>{metadata.title}</title>
        <link rel="manifest" href={metadata.manifest} />
        <meta name="description" content={metadata.description} />
      </Head>
      <Provider>
        <body>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  )
}

export default RootLayout
