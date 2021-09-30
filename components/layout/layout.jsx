
import Navbar from '../header/Header'
import Footer from '../footer/Footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}