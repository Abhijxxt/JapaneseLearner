'use client'

import { FaArrowCircleRight } from "react-icons/fa"
import { toast } from "sonner"

export function QuestionBox({props, questionNumber, next}:any) {

    const checkAnswer = async (event: any) => {
        event.preventDefault()
        // console.log(props.furigana)
        if(props.japanese === event.target[0].value) {
            toast.success("Correct")
            setTimeout(() => {
                event.target[0].value = ""
                next()
            }, 1000)
        } else {
            toast.warning("Wrong")
            event.target[0].value = ""

        }
    }

    return(
        <div className="bg-amber-200 px-12 py-6 rounded-md shadow-md">
            <h2 className="mb-2 border-b-2 border-amber-800 text-xl font-bold">QUESTION {questionNumber}</h2>
            <h1 className="text-lg">English: {props.english}</h1>
            <p className="text-lg">Furigana:</p>
            <form className="flex flex-row justify-center items-center" onSubmit={checkAnswer}>
                <input type="text" name="" id=""  className="bg-amber-50 p-2 outline-0  border-1 mt-2 border-amber-400 rounded-sm" />
                <button className="p-2 text-2xl cursor-pointer"><FaArrowCircleRight/></button>
            </form>    
                <p className="text-xs text-left">Answer above</p>
        </div>
    )
}