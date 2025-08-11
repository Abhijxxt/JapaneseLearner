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
        <div className="bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 min-h-[90vh] w-full flex flex-row items-center justify-center">
            <div className="w-[50%] h-[90vh] flex justify-center items-center
            max-md:hidden max-md:w-[100%]">
            <img src="/home_bg.jpg" alt="Person thinking for japanese vocabulary" className="flex justify-center h-[90%] object-cover" />
            </div>
            <div className="w-[50%] h-full bg-opacity-80 max-md:w-full p-2">
                <h1 className="text-4xl font-bold">Get started with learning your first word!</h1>
                <div className="mr-20 flex flex-col justify-end max-md:justify-center text-right items-end h-full mt-8">
                    <div className="flex flex-row justify-end items-center space-x-4 max-sm:mt-8">
                        <p className="text-2xl">Don&apos;t know anything?</p>
                        <button onClick={wordlistLink} className="bg-slate-100 px-4 py-2 rounded-md flex flex-row items-center gap-1 transition-all ease-in-out shadow-md hover:shadow-none">Go to wordlist <FaArrowRight/></button>
                    </div>
                    <div className="flex flex-row justify-end items-center space-x-4 mt-4 max-sm:mt-8">
                        <p className="text-2xl">Already know some words?</p>
                        <button onClick={testLink} className="bg-slate-100 ml-4 px-4 py-2 rounded-md flex flex-row items-center gap-1 transition-all ease-in-out shadow-md md hover:shadow-none">Let&apos;s test it <FaQuestion /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}