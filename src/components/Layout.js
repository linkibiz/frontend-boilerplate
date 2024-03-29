import Head from 'next/head'

const Layout = ({pageName, children}) => {
  const title = `${pageName} - Linki`
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='shortcut icon' href='/linki-black-logo.png'/>
      </Head>
      <main className="h-full bg-slate-100 flex justify-center">
        <div className="bg-[#eceded] w-full max-w-[425px] flex flex-col min-h-[100vh]">
          {children}    
        </div>
      </main>
    </div>
  )
}

export default Layout