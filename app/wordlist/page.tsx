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
        <div className="w-auto bg-blue-200 py-10 px-48">
            <div className="grid grid-cols-3 grid">
                {words && words.map((word: any) => (
                    <Card key={word.id} props={word} />
                ))}
            </div>
        </div>
    )
}