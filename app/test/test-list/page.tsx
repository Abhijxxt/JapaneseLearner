'use client'
import { QuestionBox } from "@/app/components/question";
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function TestListPage() {
    const searchParams = useSearchParams();
    const savedList = searchParams.get('savedList');
    const router = useRouter();
    
    // console.log(props.savedList)

    const [words, setWords] = useState([])
    const [questionNumber, setQuestionNumber] = useState<number>(0)
    let question : any = "";
    const [totalScore, setTotalScore] = useState(0);

    const fetchSavedWordsList = async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const response = await fetch("/api/savedwords", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({
                uid: user.uid
            })
        })
        if(response.status !== 200) {
            toast.error("There was an error loading page")
            return;
        }
        const data = await response.json();
        setWords(data)
    }

    const fetchRandomWordsList = async () => {
        const response = await fetch("/api/wordlist")
        if(response.status !== 200) {
            toast.error("There was an error loading page")
            return;
        }
        const data = await response.json();
        setWords(data)
    }

    const nextQuestion = (score: number) => {
        const newScore : number = totalScore + score;
        console.log(newScore)
        setTotalScore(newScore);
        if(questionNumber < words.length-1) {
            setQuestionNumber(questionNumber+1);
        } else {
            toast.success("LIST COMPLETE")
            router.push(`/test/test-list/completed?score=${newScore}&total=${words.length}`)
        }
    }

    useEffect(() => {
        if(savedList == "true") {
            fetchSavedWordsList();
        } else {
            fetchRandomWordsList();
        }
    },[])


    if(words.length > 0) {
        question = words[questionNumber];
    }

    return(
        <div className="bg-[url('@/public/test-background.jpg')] min-h-[100vh] overflow-hidden bg-cover bg-no-repeat
        flex flex-row justify-center items-center ">
            <div>
                <QuestionBox props={question} questionNumber={questionNumber+1} next={nextQuestion} saved={savedList}/> 
            </div>
        </div>
    )
}