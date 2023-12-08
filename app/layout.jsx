import Navbar from '@components/Navbar'
import '@styles/globals.css'

export const metadata = {
  title: 'aiprompts',
  description: 'Discover and share ai prompts',
}
const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
