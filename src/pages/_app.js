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


// import { useEffect, useState } from "react";
// export default function MyApp({ Component, pageProps }) {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
//       </div>
//     ); // or a minimal loading component
//   }

//   return (
//     <main className={roboto.className}>
//       <div>
//         {isMobileDevice() ? (
//           <AuthProvider>
//             <Component {...pageProps} />
//           </AuthProvider>
//         ) : (
//           <NonMobileWarning />
//         )}
//       </div>
//     </main>
//   );
// }
