'use client'
import { useEffect, useState } from "react"
import Card from "../components/card";
import Link from "next/link";
import { FaFilter } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { CiSaveDown2 } from "react-icons/ci";
import { toast } from "sonner";
import { checkLogin, getUserId } from "../middleware/checkLogin";
import { useRouter } from "next/navigation";

export default function WordlistPage() {
    const router = useRouter();
    const [words, setWords] = useState([]);

    const fetchWords = async () => {
       
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

    const goToSavedWords = () => {
        if(!checkLogin()) {
            toast.error("Please login to view saved words");
            return;
        }
        router.push("/wordlist/saved");
    }

    useEffect(() => { 
        fetchWords() 
        toast.info("Click on some word to tape it")
    },[])

    return(
        <div>
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
                    <div className=""><button className="hover:cursor-pointer" onClick={goToSavedWords}><CiSaveDown2 /></button></div>
                    
                </div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {words && words.map((word: any) => (
                    <Card key={word.id} props={word} savedPageStatus={false} />
                ))}
            </div>
        </div>

    )
}