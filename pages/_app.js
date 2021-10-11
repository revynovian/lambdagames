import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Layout from '../components/layout/layout'
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from '../store'


function MyApp({ Component, pageProps }) {

return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Layout>
        <Component {...pageProps} /> 
      </Layout>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
