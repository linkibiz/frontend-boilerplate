import Head from 'next/head'

const Layout = ({pageName, children}) => {
  const title = `${pageName} - QUIJANO & ASSOCIATES`
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel='shortcut icon' href='/qa-logo.png'/>
      </Head>
      <main className="h-full bg-slate-100 min-h-screen flex justify-center">
        <div className="bg-white w-[768px] flex flex-col min-h-screen h-full overflow-hidden">
          {children}    
        </div>
      </main>
    </div>
  )
}

export default Layout