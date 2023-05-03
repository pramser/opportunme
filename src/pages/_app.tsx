import "../styles/globals.css"

// next
import { Analytics } from "@vercel/analytics/react"
import type { AppProps } from "next/app"

// components
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PageTabs from "@/components/PageTabs"

const tabs = [
  { name: "Interview Questions", href: "/" },
  { name: "Resume Builder", href: "/resume" },
]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 py-8 sm:mt-4 bg-white border-gray-600 lg:border drop-shadow-2xl">
        <PageTabs tabs={tabs} />
        <Component {...pageProps} />
        <Analytics />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp
