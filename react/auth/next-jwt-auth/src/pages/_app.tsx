import { AuthProvider } from '../contexts/AuthContenxt'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={4000} />
    </AuthProvider>
  )
}

export default MyApp
