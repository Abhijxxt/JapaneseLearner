'use client'
import { useEffect, useState } from "react"
import Card from "../components/card";

export default function WordlistPage() {

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

    useEffect(() => { fetchWords() },[])

    return(
        <div className="w-auto bg-gradient-to-br from-amber-400 to-amber-200 py-10 lg:px-48 sm:px-0">
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                {words && words.map((word: any) => (
                    <Card key={word.id} props={word} />
                ))}
            </div>
        </div>
    )
}