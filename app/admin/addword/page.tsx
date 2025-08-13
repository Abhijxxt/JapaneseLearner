"use client";

import Card from "@/app/components/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function AddWordPage() {


    const [props, setProps] = useState({
        wid: "",
        image: "",
        english: "",
        japanese: "",
        romanji: "",
        kanji: "",
        category: "",
        subcategory: ""
    });

    const addWord = async (event : any) => {
        event.preventDefault();
        const response = await fetch('/api/admin/addword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(props),
        });

        if (response.ok) {
            const data = await response.json();
            toast.success('Word added successfully:', data);
            event.target.reset();
            setProps({
                wid: "",
                image: "",
                english: "",
                japanese: "",
                romanji: "",
                kanji: "",
                category: "",
                subcategory: ""  
            })
        } else {
            toast.error('Error adding word!');
        }
    }

    useEffect(() => {
        if(localStorage.getItem("admin") === null) {
            redirect("/admin/login");
        }
    }, [])

    return(
        <div className="bg-amber-100 flex flex-row items-center justify-center h-screen">
            <form className="flex flex-col gap-2 m-10" onSubmit={addWord}>
                <label className="text-2xl font-bold">Add Word</label>
                <input type="text" placeholder="Enter image url" onChange={(e) => {
                    setProps({ ...props, image: e.target.value });
                }} className="bg-white p-2" />
                <input type="text" placeholder="Enter english" onChange={(e) => {
                    setProps({ ...props, english: e.target.value });
                }} className="bg-white p-2" required autoFocus />
                <input type="text" placeholder="Enter romanji" onChange={(e) => {
                        setProps({ ...props, romanji: e.target.value });
                    }} className="bg-white p-2" required/>
                <input type="text" placeholder="Enter japanese" onChange={(e) => {
                    setProps({ ...props, japanese: e.target.value });
                }} className="bg-white p-2" required/>
                <input type="text" placeholder="Enter kanji" onChange={(e) => {
                    setProps({ ...props, kanji: e.target.value });
                }} className="bg-white p-2" required/>
                <select onChange={(e) => {
                    setProps({ ...props, category: e.target.value });}} required>
                    <option defaultValue="" disabled selected>Category</option>
                    <option value="Noun">Noun</option>
                    <option value="Verb">Verb</option>
                    <option value="Adjective">Adjective</option>
                    <option value="Adjective">Preposition</option>
                    <option value="Adjective">Conjunction</option>
                    <option value="Adjective">Adverbs</option>
                    <option value="Adjective">Determiners</option>
                    <option value="Adjective">Interjections</option>
                </select>
                <input type="text" placeholder="Sub category" onChange={(e) => {
                    setProps({ ...props, subcategory: e.target.value });
                }} className="bg-white p-2"/>
                <input type="submit" value="Add word" className="bg-green-400 p-3 rounded-md transition-all ease-in-out hover:bg-green-600" />
            </form>
            <div>
                <Card props={props} savedPageStatus={false} />
            </div>
        </div>
    )
}