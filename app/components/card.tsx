'use client'
import Image from "next/image";
import { useState } from "react";
import { CiBookmarkPlus } from "react-icons/ci";
export default function Card({ props } : any) {

    const [englishView, setEnglishView] = useState(true);
    const [furiganaView, setFuriganaView] = useState(true);
    const [romanjiView, setRoamnjiView] = useState(true);

    return (
        <div key={props.id} className="flex flex-col text-black transition-all ease-in-out bg-gradient-to-br from-gray-100 via-amber-50 to-gray-300 w-fit p-4 rounded-md m-10 shadow-xl hover:shadow-md  ">
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
            <p className="mt-2">Category: {props.category} </p>
            <div className="flex flex-row justify-between">
                <p>Sub-category: {props.subcategory} </p>
                <button className="bg-amber-500 p-2 transition-all ease-in-out rounded-md shadow-md hover:bg-amber-300"><CiBookmarkPlus className="text-2xl"/></button>
            </div>
        </div>
    )
}