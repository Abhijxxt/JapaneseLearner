'use client'
import { useEffect, useState } from "react"
import Card from "../components/card";
import Link from "next/link";
import { FaFilter } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { CiSaveDown2 } from "react-icons/ci";
import { toast } from "sonner";

export default function WordlistPage() {

    const [words, setWords] = useState([]);
    const [savedPage, setSavedPage] = useState(false);

    const fetchWords = async () => {
        setSavedPage(false);
        const response = await fetch("/api/wordlist");
        if(response.status !== 200) {
            alert("Some error occured while fetching data! Please reload");
            return;
        }
        const data = await response.json();
        setWords(data);
    }

    const getFilteredWord = async (category: string) => {
        const response = await fetch("/api/filter", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                category
            })
        });
        if(response.status !== 200) {
            toast.error("Some error occured while fetching data! Please reload");
            return;
        }
        const data = await response.json();
        setWords(data);
    }

    const savedWords = async () => {
        setSavedPage(true);
        const data = JSON.parse(localStorage.getItem('user') || '{}');
        const response = await fetch("/api/savedwords", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uid: data.uid
            })
        })
        if(response.status !== 200) {
            alert("Failed to fetch saved words")
        } else {
            const data = await response.json()
            setWords(data)
        }
    }

    useEffect(() => { fetchWords() },[])

    return(
        <div className="w-auto min-h-[100vh] bg-gradient-to-br bg-[url(@/public/word_bg.webp)] bg-cover from-amber-300 via-orange-300 to-amber-600 py-10 lg:px-48 sm:px-0 relative overflow-hidden">
            {/* Blurred background overlay */}
            <div className="absolute inset-0 backdrop-blur-sm pointer-events-none z-0"></div>
            <div className="relative z-10">
            <div className="flex flex-row w-auto justify-center items-center rounder-md">
                <div className="bg-slate-200 shadow-md flex flex-row items-center justify-center rounded-md px-5">
                <div className="p-2">
                    <FaFilter />
                </div>
                <div className="p-2">
                    {/* <Link href="" className="m-2 hover:underline focus:underline" onClick={() => {fetchWords()}}>All</Link> | */}
                    <Link href="" className="m-2 hover:underline focus:underline" onClick={() => {getFilteredWord("Noun")}}>Noun</Link> |
                    <Link href="" className="m-2 hover:underline focus:underline" onClick={() => {getFilteredWord("Adjective")}}>Adjective</Link> |
                    <Link href="" className="m-2 hover:underline focus:underline" onClick={() => {getFilteredWord("Verb")}}>Verb</Link>
                </div>
                </div>
            </div>
                <div className="fixed bg-slate-100 p-2 rounded-md text-2xl top-24 right-10 z-20 flex flex-col items-center space-y-2">
                    <div className="border-b-2 border-amber-900"><button className="hover:cursor-pointer" onClick={fetchWords}><HiViewList /></button></div>
                    <div className=""><button className="hover:cursor-pointer" onClick={savedWords}><CiSaveDown2 /></button></div>
                    
                </div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {words && words.map((word: any) => (
                    <Card key={word.id} props={word} savedPageStatus={savedPage} />
                ))}
            </div>
            </div>
        </div>
    )
}