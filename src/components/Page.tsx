// next
import Head from "next/head"

// components
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import TabBar from "@/components/TabBar"

export default function Page({ children }: any) {
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Opportun.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 py-8 sm:mt-4 bg-white border-gray-600 lg:border drop-shadow-2xl">
        <TabBar />
        {children}
      </main>
      <Footer />
    </div>
  )
}
