import { AnimatePresence, motion } from "framer-motion"

// next
import type { NextPage } from "next"
import Image from "next/image"

// react
import { useState } from "react"
import { Toaster } from "react-hot-toast"

// components
import LoadingDots from "../components/LoadingDots"
import ResizablePanel from "../components/ResizablePanel"
import PageTitle from "@/components/PageTitle"

const Resume: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [generatedResume, setGeneratedResume] = useState<String>("")

  const prompt = `Generate a contemporary resume featuring sections for name, \
  address, summary, skills, and education. Make sure it has at \
  least 80 words and base it on this context: ${jobDescription}`

  const generateBio = async (e: any) => {
    e.preventDefault()
    setGeneratedResume("")
    setLoading(true)

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    let answer = await response.json()
    setGeneratedResume(answer.choices[0].text)
    setLoading(false)
  }

  return (
    <section>
      <PageTitle title="See a resume for the position you're interested in" />
      <div className="max-w-xl">
        <div className="flex mt-10 items-center space-x-3">
          <Image
            src="/1-black.png"
            width={30}
            height={30}
            alt="1 icon"
            className="mb-5 sm:mb-0"
          />
          <p className="text-left font-medium">
            Copy a job description{" "}
            <span className="text-slate-500">
              (or try and summarize the role)
            </span>
            .
          </p>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
          placeholder={
            "e.g. Title: Junior QA Engineer Requirements: Associate degree in a related field or equivalent experience"
          }
        />
      </div>
      {!loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          onClick={(e) => generateBio(e)}
        >
          Generate a resume &rarr;
        </button>
      )}
      {loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          disabled
        >
          <LoadingDots color="white" style="large" />
        </button>
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
      <ResizablePanel>
        <AnimatePresence mode="wait">
          <motion.div className="space-y-10 my-10">
            {generatedResume && (
              <>
                <div>
                  <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                    Your generated resume
                  </h2>
                </div>
                <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                  <div className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition border text-left whitespace-break-spaces">
                    <p>{generatedResume}</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </ResizablePanel>
    </section>
  )
}

export default Resume
