'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiBookmarkPlus} from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
export default function Card({ props } : any) {

    const [englishView, setEnglishView] = useState(true);
    const [furiganaView, setFuriganaView] = useState(true);
    const [romanjiView, setRoamnjiView] = useState(true);
    const [kanjiView, setKanjiView] = useState(true);

    const [saved, setSaved] = useState(false);
    const [previouslySaved, setPreviouslySaved] = useState(false);

    const saveWord = async () => {
        if(localStorage.getItem('user') === null) {
            alert("Please sign in first!");
            return;
        }
        const data = JSON.parse(localStorage.getItem('user') || '{}');
        const response = await fetch("/api/save", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                wid: props.wid,
                uid: data.uid
            })
        })
        if(response.status !== 200) {
            alert("There was an error saving. Try again later!")
            return;
        }
        setSaved(true)
        setPreviouslySaved(true)
    }

    const checkForSaved = async () => {
        if(localStorage.getItem('user') === null) {
            return;
        }
        const data = JSON.parse(localStorage.getItem('user') || '{}');
        const response = await fetch("/api/checksaved", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uid: data.uid,
                wid: props.wid
            })
        })
        if(response.status !== 200) {
            setPreviouslySaved(true)
        } else {
            setPreviouslySaved(false)
        }
    }

    useEffect(() => {checkForSaved()}, [])

    return (
        <div key={props.wid} className="flex flex-col text-black transition-all ease-in-out bg-gradient-to-br from-gray-50  to-gray-200 border-[1px] border-slate-400 w-fit p-2 rounded-md m-10 shadow-xl hover:shadow-md  ">
            <div className="mb-4 w-[220px] h-[120px] flex items-center justify-center overflow-hidden">
                <Image
                    src={props.image}
                    alt={props.english}
                    width={200}
                    height={120}
                    className="rounded-md object-cover w-full h-full"
                />
            </div>
            <button className="bg-blue-100 " onClick={() => {setEnglishView(!englishView)}}>
                <h1 style={{
                    backgroundColor: englishView ? "transparent" : "black",
                    color: englishView ? "inherit" : "black",
                    padding: "0.5rem"
                    // borderRadius: "0.25rem"
                }} >English: {props.english}</h1>
            </button>
            <button className="bg-blue-200 " onClick={() => {setFuriganaView(!furiganaView)}}>
                <h1 style={{
                    backgroundColor: furiganaView ? "transparent" : "black",
                    color: furiganaView ? "inherit" : "black",
                    padding: "0.5rem"
                    // borderRadius: "0.25rem"
                }} >Furigana: {props.japanese}</h1>
            </button>
            <button className="bg-blue-300 " onClick={() => {setRoamnjiView(!romanjiView)}}>
                <h1 style={{
                    backgroundColor: romanjiView ? "transparent" : "black",
                    color: romanjiView ? "inherit" : "black",
                    padding: "0.5rem"
                    // borderRadius: "0.25rem"
                }}>Romanji: {props.romanji}</h1>
            </button>
            <button className="bg-blue-400 " onClick={() => {setKanjiView(!kanjiView)}}>
                <h1 style={{
                    backgroundColor: kanjiView ? "transparent" : "black",
                    color: kanjiView? "inherit" : "black",
                    padding: "0.5rem"
                    // borderRadius: "0.25rem"
                }}>Kanji: {props.kanji}</h1>
            </button>
    
            <div className="flex flex-row justify-between m-1">
                <div className="">
                    <p className="mt-2">{props.category} {props.subcategory == "None" ? "" : `| ${props.subcategory}`} </p>
                </div>
                <div className="flex justify-center items-center">
                {
                    previouslySaved &&
                    <FaCheck/>
                }
                {
                    !previouslySaved &&
                    <button onClick={saveWord} className="bg-amber-500 p-2 transition-all ease-in-out rounded-md shadow-md hover:bg-amber-300"><CiBookmarkPlus className="text-2xl"/></button>
                }
                </div>
            </div>
        </div>
    )
}