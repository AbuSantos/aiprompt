import Navbar from '@components/Navbar'
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
