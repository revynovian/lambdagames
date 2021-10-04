import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Layout from '../components/layout/layout'
import AppContext from "../context/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppContext>
      <Layout>
        <Component {...pageProps} /> 
      </Layout>
    </AppContext>
  )
}

export default MyApp
