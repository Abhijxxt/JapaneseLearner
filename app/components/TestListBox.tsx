'use client'
import { QuestionBox } from "@/app/components/question";
import { getUserId } from "@/app/middleware/checkLogin";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function TestListBox() {
    const searchParams = useSearchParams();
    const savedList = searchParams.get('savedList');
    const router = useRouter();
    
    // console.log(props.savedList)

    const [words, setWords] = useState([])
    const [questionNumber, setQuestionNumber] = useState<number>(0)
    let question : any = "";
    const [totalScore, setTotalScore] = useState(0);

    const fetchSavedWordsList = async () => {
        const uid = getUserId();
        const response = await fetch("/api/savedwords", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            }, 
            body: JSON.stringify({
                uid: uid
            })
        })
        if(response.status !== 200) {
            toast.error("There was an error loading page")
            return;
        }
        const data = await response.json();
        if(data.length === 0) {
            toast.error("You have no saved words")
            router.push("/test/test-list/completed?score=0&&total=0");
            return;
            
        }
        setWords(data)
    }

    const fetchRandomWordsList = async () => {
        const response = await fetch("/api/wordlist?limit=10")
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

    const quitTest = () => {
        router.push(`/test/test-list/completed?score=${totalScore}&total=${words.length}`)
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
        <div className="bg-[url('/test-background.jpg')] min-h-[90vh] overflow-hidden bg-cover bg-no-repeat
        flex flex-row justify-center items-center ">
            <div>
                <QuestionBox props={question} questionNumber={questionNumber+1} next={nextQuestion} saved={savedList}/> 
                <div className="absolute top-20 right-8 max-sm:right-4">
                    <Button className="bg-red-700" onClick={quitTest}>Quit test</Button>
                </div>
            </div>
        </div>
    )
}