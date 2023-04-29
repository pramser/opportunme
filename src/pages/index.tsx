import { AnimatePresence, motion } from "framer-motion"

// next
import type { NextPage } from "next"
import Image from "next/image"

// react
import { useState } from "react"
import { Toaster, toast } from "react-hot-toast"

// components
import LoadingDots from "@/components/LoadingDots"
import ResizablePanel from "@/components/ResizablePanel"
import Page from "@/components/Page"
import FileDropper from "@/components/FileDropper"

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [generatedResume, setGeneratedResume] = useState<String>("")

  const prompt = `Generate a resume. Make sure it is broken into sections for skills, experience, and projects and base it on this context: ${jobDescription}`

  const LIST_NUM_REG_EX = /[1-9]. /

  const generateResume = async (e: any) => {
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

    let resume = await response.json()
    setGeneratedResume(resume.choices[0].text)
    setLoading(false)
  }

  return (
    <Page>
      <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
        Create an example resume for your the job you're applying for
      </h1>
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
            Write out a basic description of the job.
          </p>
        </div>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
          placeholder={
            "e.g. Senior QA Engineer for Sherwin-Williams that makes $150,000 a year"
          }
        />
        {/* <div className="flex mb-5 items-center space-x-3">
          <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">
            Upload a copy of your resume{" "}
            <span className="text-slate-500">(only PDFs are allowed)</span>.
          </p>
        </div>
        <FileDropper /> */}

        {!loading && (
          <button
            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
            onClick={(e) => generateResume(e)}
          >
            Build a resume &rarr;
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
      </div>
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
                    An example resume
                  </h2>
                </div>
                <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                  <div className="bg-white whitespace-break-spaces text-left rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border">
                    <p>{generatedResume}</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </ResizablePanel>
    </Page>
  )
}

export default Home
