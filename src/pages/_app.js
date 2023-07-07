import AuthContextProvider from '@/context/auth-context'
import '@/styles/globals.css'
import { Lato, Roboto } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider/AuthProvider'
const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})
 
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </main>
  )
}