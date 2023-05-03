import Image from "next/image"
import Link from "next/link"

// fonts
import { Andada_Pro, Pacifico } from "next/font/google"

const andada = Andada_Pro({ subsets: ["latin"] })
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
})

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 pb-7 sm:px-4 px-8">
      <Link href="/" className="flex space-x-3">
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          <span className={andada.className}>Opportun</span>
          <span className={pacifico.className}>.me</span>
        </h1>
      </Link>
      <a
        href="https://vercel.com/templates/next.js/twitter-bio"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          alt="Vercel Icon"
          src="/vercelLogo.png"
          className="sm:w-8 sm:h-[27px] w-8 h-[28px]"
          width={32}
          height={28}
        />
      </a>
    </header>
  )
}
