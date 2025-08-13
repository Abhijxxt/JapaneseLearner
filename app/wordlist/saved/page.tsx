'use client'
import Card from "@/app/components/card";
import { checkLogin, getUserId } from "@/app/middleware/checkLogin";
import Link from "next/link";
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function SavedPage() {

    const router = useRouter();
    const [words, setWords] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);

    const savedWords = async () => {
        if(!checkLogin()) {
            toast.error("Please login to view saved words");
            return;
        }
        // setSavedPage(true);
        router.push("/wordlist/saved");
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
            alert("Failed to fetch saved words")
        } else {
            const data = await response.json()
            setWords(data)
            setFilteredWords(data);
        }
    }
    
    const getFilteredWord = (category: string) => {
        const filteredWords = words.filter((word: any) => word.category === category);
        setFilteredWords(filteredWords);
    }

    const goToWordlist = () => {
        router.push("/wordlist");
    }

    useEffect(() => {
        savedWords();
    }, [])

    return (
        <div>
             <div className="flex flex-row w-auto justify-start items-center rounder-md">
                <div className="bg-slate-200 shadow-md flex flex-row items-start justify-start rounded-md px-5 ml-10">
                <div className="">
                    <DropdownMenu>
                            <DropdownMenuTrigger className="px-2 py-3 outline-none"><FaFilter /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Filter</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => {getFilteredWord("Noun")}} >Noun</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {getFilteredWord("Adjective")}} >Adjective</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {getFilteredWord("Verb")}} >Verb</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {getFilteredWord("Pronouns")}} >Pronouns</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {getFilteredWord("Preposition")}} >Preposition</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {getFilteredWord("Conjunction")}} >Conjunction</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {getFilteredWord("Adverbs")}} >Adverbs</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {getFilteredWord("Determiners")}} >Determiners</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {getFilteredWord("Interjections")}}>Interjections</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>

                </div>
                </div>
            </div>
                <div className="fixed bg-slate-100 p-2 rounded-md text-2xl bottom-10 right-10 z-20 flex flex-col items-center space-y-2">
                    <div className="border-b-2 border-amber-900"><button className="hover:cursor-pointer" onClick={goToWordlist}><HiViewList /></button></div>
                    <div className=""><button className="hover:cursor-pointer" onClick={savedWords}><CiSaveDown2 /></button></div>
                    
                </div>
            <div className="justify-items-center grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {filteredWords && filteredWords.map((word: any) => (
                    <Card key={word.id} props={word} savedPageStatus={true} />
                ))}
            </div>
        </div>
    );
}