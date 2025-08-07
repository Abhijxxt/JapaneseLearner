import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiViewList } from "react-icons/hi";
import { IoReload } from "react-icons/io5";

export default function CompletionBox() {
    const searchParams = useSearchParams();
        const score = searchParams.get("score");
        const total = searchParams.get("total")
        const [printMessage, setPrintMessage] = useState<string>("");
        
        const retryButton = () => {
            window.location.href = "/test/";
        }
    
         const wordButton = () => {
            window.location.href = "/wordlist/";
        }
    
        useEffect(() => {
            if (score != null && total != null) {
                if(score == '0' && total == '0') {
                    setPrintMessage("You have no words to test");
                    return;
                }
                const percentage = (Number(score) / Number(total)) * 100;
                let message = "";
                if (percentage === 100) {
                message = "Perfect! Excellent work!";
                } else if (percentage >= 80) {
                message = "Great job! Almost perfect!";
                } else if (percentage >= 60) {
                message = "Good effort! Keep practicing!";
                } else {
                message = "Don't give up! Try again!";
                }
                setPrintMessage(message);
            }
        }, [])
    return(
        <div className="w-[100vw] h-[90vh] bg-[url('/complete-test-bg.jpg')] bg-cover bg-no-repeat flex flex-col justify-center items-center">
                        <div className="backdrop-blur-xs bg-white/80 rounded-xl p-8 shadow-lg">
                            <p className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-amber-800 bg-clip-text text-transparent">Correct answers: {score}/{total}</p>
                            <p className="text-center mt-1 text-xl">{printMessage}</p>
                            <div className="flex flex-row justify-center items-center mt-4">
                                <button onClick={retryButton} className="m-2 flex flex-row justify-center items-center bg-amber-500 hover:bg-amber-700 py-2 px-4 gap-1 rounded-md">Retry<IoReload/></button>
                                <button onClick={wordButton} className="m-2 flex flex-row justify-center items-center bg-amber-200 hover:bg-amber-600 py-2 px-4 gap-1 rounded-md">Word<HiViewList/></button>
                            </div>
                        </div>
                    </div>
    )
}