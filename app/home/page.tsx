'use client'

import { FaArrowRight, FaQuestion } from "react-icons/fa"

import { useRouter } from "next/navigation";

export default function Homepage() {

    const router = useRouter();

    const wordlistLink = () => {
        router.push("/wordlist");
    }

    const testLink = () => {
        router.push("/test");
    }

    return(
        <div className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 min-h-[90vh] flex flex-row items-center justify-center">
            <div className="w-[50%] h-[90vh] flex justify-center items-center">
            <img src="public/home_bg.jpg" alt="Person thinking for japanese vocabulary" className="flex justify-center h-[90%] object-cover" />
            </div>
            <div className="w-[50%] h-fullbg-opacity-80">
                <h1 className="text-4xl font-bold">Get started with learning your first word!</h1>
                <div className="mr-20 flex flex-col justify-end text-right items-end h-full mt-8">
                    <div className="flex flex-row justify-end items-center space-x-4">
                        <p className="text-2xl">Don't know anything?</p>
                        <button onClick={wordlistLink} className="bg-amber-100 px-4 py-2 rounded-md flex flex-row items-center gap-1 transition-all ease-in-out shadow-md hover:shadow-none">Go to wordlist <FaArrowRight/></button>
                    </div>
                    <div className="flex flex-row justify-end items-center space-x-4 mt-4">
                        <p className="text-2xl">Already know some words?</p>
                        <button onClick={testLink} className="bg-amber-100 ml-4 px-4 py-2 rounded-md flex flex-row items-center gap-1 transition-all ease-in-out shadow-md md hover:shadow-none">Let's test it <FaQuestion /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}