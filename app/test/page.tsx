'use client'
import Link from "next/link";
import {  useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { checkLogin } from "../middleware/checkLogin";

export default function TestListPage() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [savedWordsList, setSavedWordsList] = useState<boolean>(isLoggedIn);
    
    useEffect(() => {
        setIsLoggedIn(checkLogin());
        if(checkLogin()) {
            setSavedWordsList(true);
        } else {
            setSavedWordsList(false);
        }
    },[])

    return(
        <div className="min-h-[90vh] bg-[url('/test_page_landing_page.jpg')] flex flex-row items-center">
            <div className="px-18">
                <div className="border-b-2 py-2 border-slate-900">
                    <h1 className="text-3xl text-amber-600 font-bold">Learnt some words?</h1>
                    <h2 className="text-2xl">It&apos;s time to revise them!</h2>
                </div>
                <div className="flex flex-col mt-6 ">
                    <p className="text-xl py-2">Take test of - </p>
                    <div className="flex flex-row">
                        <button className="text-left w-[50%] p-2 transition ease-in-out bg-amber-200 hover:bg-amber-400"
                            onClick={() => {setSavedWordsList(true)}}
                            style={savedWordsList ? 
                                {backgroundColor: "#7b3306", color: "#fee685"} : {backgroundColor: "#fee685"}}
                            disabled={!isLoggedIn}
                            >Saved Words</button>
                        <button className="text-left w-[50%] p-2 transition ease-in-out bg-amber-300 hover:bg-amber-500"
                            onClick={() => {setSavedWordsList(false)}}
                            style={!savedWordsList ? 
                                {backgroundColor: "#7b3306", color: "#ffd230"} : {backgroundColor: "#ffd230"}}
                        >Random Words</button>
                    </div>
                    <Link href={{pathname:"/test/test-list", query: {savedList: savedWordsList}}} className="text-left p-2 w-auto transition ease-in-out bg-amber-400 hover:bg-amber-700 mt-2 flex flex-row items-center justify-between ">Let&apos;s go <FaArrowRight /></Link>
                    <p className="text-xs">By default saved list will be selected</p>
                </div>
            </div>
        </div>
    )
}