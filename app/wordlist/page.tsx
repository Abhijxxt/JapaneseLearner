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
        <div className="w-auto bg-gradient-to-b from-[0%] from-amber-500 to-white py-10 px-48">
            <div className="grid grid-cols-3">
                {words && words.map((word: any) => (
                    <Card key={word.id} props={word} />
                ))}
            </div>
        </div>
    )
}