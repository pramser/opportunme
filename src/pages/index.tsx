import { AnimatePresence, motion } from "framer-motion"

// next
import type { NextPage } from "next"
import Image from "next/image"

// react
import { useState } from "react"
import { Toaster } from "react-hot-toast"

// components
import DropDown, { VibeType } from "../components/DropDown"
import LoadingDots from "../components/LoadingDots"
import ResizablePanel from "../components/ResizablePanel"
import PageTitle from "@/components/PageTitle"
import PromptModal from "@/components/PromptModal"

const Welcome: NextPage = () => {
  // state
  const [generatedQuestions, setGeneratedQuestions] = useState<String>("")
  const [selectedQuestion, setSelectedQuestion] = useState<String>("")
  const [jobDescription, setJobDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [vibe, setVibe] = useState<VibeType>("Professional")

  const prompt =
    vibe === "Funny"
      ? `Generate 3 funny interview questions clearly labeled "1." and "2." amd "3.". Make sure there is a joke in there and it's a little ridiculous. Make sure each generated bio is at max 30 words and base it on this context: ${jobDescription}${
          jobDescription.slice(-1) === "." ? "" : "."
        }`
      : `Generate 3 ${vibe} interview questions clearly labeled "1." and "2." and "3.". Make sure each generated question is at least 14 words and at max 30 words and base them on this context: ${jobDescription}${
          jobDescription.slice(-1) === "." ? "" : "."
        }`

  const LIST_NUM_REG_EX = /[1-9]. /

  const generateBio = async (e: any) => {
    e.preventDefault()
    setGeneratedQuestions("")
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
    setGeneratedQuestions(answer.choices[0].message.content)
    setLoading(false)
  }

  const onQuestionClick = (text: string) => {
    setSelectedQuestion(text)
    setOpen(true)
  }

  return (
    <section>
      <PageTitle title="Generate questions for an upcoming interview" />
      <div className="max-w-xl">
        <div className="flex mt-10 items-center space-x-3">
          <Image src="/1-black.png" width={30} height={30} alt="1 icon" className="mb-5 sm:mb-0" />
          <p className="text-left font-medium">
            Copy a job description <span className="text-slate-500">(or try and summarize the role)</span>.
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
        <div className="flex mb-5 items-center space-x-3">
          <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">Select interview vibe.</p>
        </div>
        <div className="block">
          <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} />
        </div>
      </div>
      {!loading && (
        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
          onClick={(e) => generateBio(e)}
        >
          Generate your questions &rarr;
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
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />
      <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
      <ResizablePanel>
        <AnimatePresence mode="wait">
          <motion.div className="space-y-10 my-10">
            {generatedQuestions && (
              <>
                <div>
                  <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">Your generated questions</h2>
                </div>
                <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                  {generatedQuestions
                    .substring(generatedQuestions.indexOf("1") + 3)
                    .split(LIST_NUM_REG_EX)
                    .map((question) => {
                      return (
                        <div
                          className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition border cursor-pointer"
                          onClick={() => onQuestionClick(question)}
                          key={question}
                        >
                          <p>{question}</p>
                        </div>
                      )
                    })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        <PromptModal open={open} setOpen={setOpen} text={selectedQuestion} />
      </ResizablePanel>
    </section>
  )
}

export default Welcome
