import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Layout from '../components/layout/layout'

import store from '../store'
import { Provider } from 'react-redux';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} /> 
      </Layout>
    </Provider>
  )
}

export default MyApp
