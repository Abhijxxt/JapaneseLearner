'use client'
import Image from "next/image";

export default function Card({ props } : any) {
    return (
        <div key={props.id} className="transition-all ease-in-out bg-gradient-to-br from-gray-100 via-amber-50 to-gray-300 w-fit p-4 rounded-md m-10 shadow-xl hover:shadow-md  ">
            <Image src={props.image} alt={props.english} width={200} height={200} className="my-4 rounded-md"/>
            <h1>English: {props.english}</h1>
            <h3>Furigana: {props.japanese}</h3>
            <h3>Romanji: {props.romanji}</h3>
            <p>Category: {props.category} </p>
            <div className="flex flex-row justify-between">
                <p>Sub-category: {props.subcategory} </p>
                <button className="bg-amber-500 p-2 transition-all ease-in-out rounded-md shadow-md hover:bg-amber-300">Add</button>
            </div>
        </div>
    )
}