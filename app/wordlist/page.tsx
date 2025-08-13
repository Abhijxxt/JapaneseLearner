'use client'
import { useEffect, useState } from "react"
import Card from "../components/card";
import Link from "next/link";
import { FaFilter } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { CiSaveDown2, CiSearch } from "react-icons/ci";
import { toast } from "sonner";
import { checkLogin, getUserId } from "../middleware/checkLogin";
import { useRouter } from "next/navigation";
import { IoReload } from "react-icons/io5";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function WordlistPage() {
    const router = useRouter();
    const [words, setWords] = useState([]);

    const [wordlistIcon, refreshWordlistIcon] = useState(false)

    const fetchWords = async () => {
       
        const response = await fetch("/api/wordlist?limit=12");
        if(response.status !== 200) {
            alert("Some error occured while fetching data! Please reload");
            return;
        }
        const data = await response.json();
        setWords(data);
        refreshWordlistIcon(true)
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
        refreshWordlistIcon(false)
    }

    const goToSavedWords = () => {
        if(!checkLogin()) {
            toast.error("Please login to view saved words");
            return;
        }
        refreshWordlistIcon(false);
        router.push("/wordlist/saved");
    }

    const searchWord = async () => {
        const input = document.getElementById("search-word") as HTMLInputElement;
        const word = input?.value.trim();
        if(!word) {
            toast.warning("Type some word to search")
            return;
        }
        const response = await fetch("/api/search", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                word
            })
        })
        if(response.status !== 200) {
            toast.error("Didn't find")
        } else {
            const data = await response.json();
            setWords(data)
        }
        refreshWordlistIcon(false);
    }

    useEffect(() => { 
        fetchWords() 
        toast.info("Click on some word to tape it")
    },[])

    return(
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
                <div className="fixed bg-slate-100 p-2 rounded-md text-2xl bottom-10 right-5 z-20 flex flex-col items-center space-y-2">
                    <div className="border-b-2 border-amber-900">

                        <AlertDialog>
                            <AlertDialogTrigger><CiSearch/></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Search for any word here</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Enter word or part of it to search here:
                                    <Input type="text"  id="search-word"/>
                                    
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={searchWord}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                    <div className="border-b-2 border-amber-900"><button className="hover:cursor-pointer" onClick={fetchWords}>
                        {!wordlistIcon && <HiViewList /> || <IoReload />}
                    </button></div>
                    <div className=""><button className="hover:cursor-pointer" onClick={goToSavedWords}><CiSaveDown2 /></button></div>
                </div>
            <div className="grid justify-items-center xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {words && words.map((word: any) => (
                    <Card key={word.id} props={word} savedPageStatus={false} />
                ))}
            </div>
        </div>

    )
}