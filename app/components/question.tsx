'use client'

import { useEffect, useState } from "react"
import { FaArrowCircleRight } from "react-icons/fa"
import { toast } from "sonner"
import AnswerBox from "./answerBox";

export function QuestionBox({props, questionNumber, next, saved}:any) {

    const [answerBoxView, setAnswerBoxView] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    const updateProficiency = async (score: number) => {
        if(saved !== "true") return; // If not saved, do not update proficiency
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if(!user.uid || !props.wid) return; // Ensure user and word ID are available
        const response = await fetch("/api/updateproficiency", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({
                uid: user.uid,
                wid: props.wid,
                proficiency: score == 1 ? 10 : -5
            })
        })
    }

    const checkAnswer = async (event: any) => {
        event.preventDefault()
        if(event.target[0].value == "") {
            toast.warning("Please type your answer")
            return;
        }
        if(props.japanese === event.target[0].value || props.kanji === event.target[0].value) {
            setScore(1);
            toast.success("Correct")
            updateProficiency(1);
            setTimeout(() => {
                event.target[0].value = ""
            }, 1000)
        } else {
            setScore(0);
            toast.error("Wrong!")
            updateProficiency(0);
            setTimeout(() => {
                event.target[0].value = ""
            }, 1000)
        }
        setAnswerBoxView(true)
    }
    
    const nextQuestion = () => {
        setAnswerBoxView(false)
        next(score)
    }
    
    const showAnswerButton = () => {
        setScore(0);
        setAnswerBoxView(true)
    }

    return(
        <div className="bg-amber-200 px-12 py-6 rounded-md shadow-md">
            <h2 className="mb-2 border-b-2 border-amber-800 text-xl font-bold">QUESTION {questionNumber}</h2>
            <h1 className="text-lg">English: {props.english}</h1>
            <p className="text-lg">Japanese:</p>
            {!answerBoxView &&
            <form className="flex flex-row justify-center items-center" onSubmit={checkAnswer}>
                <input type="text" name="" id=""  className="bg-amber-50 p-2 outline-0  border-1 mt-2 border-amber-400 rounded-sm" />
                <button className="p-2 text-2xl cursor-pointer"><FaArrowCircleRight/></button>
            </form>
            }    
                <p className="text-xs text-left">Answer above</p>
                {answerBoxView && <AnswerBox props={props} next={nextQuestion} />}
                {!answerBoxView && <button onClick={showAnswerButton} className="bg-red-400 w-full py-1 mt-4 transition-all ease-in-out shadow-xs hover:bg-red-500 hover:shadow-none">I don't know</button>}

        </div>
    )
}