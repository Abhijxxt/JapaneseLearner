'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { CiBookmarkPlus} from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { toast } from "sonner";
import { checkLogin, getUserId } from "../middleware/checkLogin";
import Link from "next/link";


type CardProps = {
    props: {
        wid: string;
        image: string;
        english: string;
        japanese: string;
        romanji: string;
        kanji: string;
        category: string;
        subcategory: string;
    };
    savedPageStatus?: boolean;
};

export default function Card({ props, savedPageStatus = false }: CardProps) {
    
    const [englishView, setEnglishView] = useState(true);
    const [furiganaView, setFuriganaView] = useState(true);
    const [romanjiView, setRoamnjiView] = useState(true);
    const [kanjiView, setKanjiView] = useState(true);

    const [saved, setSaved] = useState(false);

    const [display, setDisplay] = useState(true);

    const saveWord = async () => {
        if(!checkLogin()) {
            toast.warning("Please sign in first!");
            return;
        }
        const uid = getUserId();
        const response = await fetch("/api/save", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                wid: props.wid,
                uid: uid
            })
        })
        if(response.status !== 200) {
            alert("There was an error saving. Try again later!")
            return;
        }
        setSaved(true)
        toast.success("Word saved!")
    }

    const checkForSaved = async () => {
        if(!checkLogin()) {
            return;
        }
        const uid = getUserId();
        const response = await fetch("/api/checksaved", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uid: uid,
                wid: props.wid
            })
        })
        if(response.status !== 200) {
            setSaved(true)
        } else {
            setSaved(false)
        }
    }

    const deleteWord = async () => {
        const uid = getUserId();
        const response = await fetch("/api/save", {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                uid: uid,
                wid: props.wid
            })
        })
        if(response.status !== 200) {
            alert("Unable to delete word. Try again")
        } else {
            // alert("Deleted Successfully")
            toast.warning("Word unsaved!")
            setDisplay(false);
        }

    }

    checkForSaved()
    useEffect(() => {
        // checkForSaved()
    }, [])
    
    return (
        <div key={props.wid} className="flex flex-col text-black transition-all ease-in-out bg-gradient-to-br from-gray-50  to-gray-200 border-[1px] border-slate-400 w-fit p-2 rounded-md m-10 shadow-xl hover:shadow-md  "
            style={display ? {}: {display: "none"}}    >
            <div className="mb-4 w-[220px] h-[120px] max-sm:w-[250px] max-sm:h-[150px] max-lg:w-[240px] flex items-center justify-center overflow-hidden">
                <Image
                    src={props.image !== "" ? props.image : "https://images.pexels.com/photos/28216688/pexels-photo-28216688.png"}
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
                }} >English: {props.english}</h1>
            </button>
            <button className="bg-blue-200 " onClick={() => {setFuriganaView(!furiganaView)}}>
                <h1 style={{
                    backgroundColor: furiganaView ? "transparent" : "black",
                    color: furiganaView ? "inherit" : "black",
                    padding: "0.5rem"
                }} >Furigana: {props.japanese}</h1>
            </button>
            <button className="bg-blue-300 " onClick={() => {setRoamnjiView(!romanjiView)}}>
                <h1 style={{
                    backgroundColor: romanjiView ? "transparent" : "black",
                    color: romanjiView ? "inherit" : "black",
                    padding: "0.5rem"
                }}>Romanji: {props.romanji}</h1>
            </button>
            <button className="bg-blue-400 " onClick={() => {setKanjiView(!kanjiView)}}>
                <h1 style={{
                    backgroundColor: kanjiView ? "transparent" : "black",
                    color: kanjiView? "inherit" : "black",
                    padding: "0.5rem"
                }}>Kanji: {props.kanji}</h1>
            </button>
            <div className="flex flex-row justify-between m-1">
                <div className="">
                    <p className="mt-2">{props.category} {props.subcategory == "None" ? "" : `| ${props.subcategory}`} </p>
                </div>
                <div className="flex justify-center items-center">
                {
                    saved && !savedPageStatus &&
                    <FaCheck/>
                }
                {
                    !saved &&
                    <button onClick={saveWord} className="bg-amber-500 p-2 transition-all ease-in-out rounded-md shadow-md hover:bg-amber-300"><CiBookmarkPlus className="text-2xl"/></button>
                    ||
                    savedPageStatus &&
                    <button onClick={deleteWord} className="text-2xl hover:cursor-pointer"><IoIosRemoveCircle /></button>
                }
                </div>
            </div>
                <Link className="text-sm mt-2 text-blue-800" target="_blank" href={`https://jisho.org/search/${props.japanese}`}>Click for more</Link>
        </div>
    )
}