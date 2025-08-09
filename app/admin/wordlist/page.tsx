"use client"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Word = {
    wid: number;
    image: string;
    english: string;
    japanese: string;
    romanji: string;
    kanji: string;
    category: string;
    subcategory: string;
}

export default function WordlistPage() {
    
    const [words, setWords] = useState<Word[]>([]);

    const getWords = async () => {
        const response = await fetch("/api/admin/addword");
        if (response.status === 200) {
            const data = await response.json();
            setWords(data);
            return;
        }
        toast.error("Failed to fetch words");
    }

    const deleteWord = async (wid: number) => {
        const response = await fetch('/api/admin/addword', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wid }),
        });
        if (response.status === 200) {
            getWords();
            toast.success("Word deleted successfully");
        } else {
            toast.error("Failed to delete word");
        }
    }

    useEffect(() => {
        getWords();
    },[])
    
    return (
    <div className="bg-amber-50 h-[90vh] flex flex-col w-screen justify-center items-center p-10">
        <h1 className="text-2xl font-bold mb-4">Word List</h1>
        {/* <div className="p-6 w-auto m-2 min-h-[60vh] max-h-[60vh] bg-amber-50"> */}
                <Table>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-center">Word ID</TableHead>
                            <TableHead className="text-center">English</TableHead>
                            <TableHead className="text-center">Japanese</TableHead>
                            <TableHead className="text-center">Romanji</TableHead>
                            <TableHead className="text-center">Kanji</TableHead>
                            <TableHead className="text-center">Image URL</TableHead>
                            <TableHead className="text-center">Category</TableHead>
                            <TableHead className="text-center">Sub category</TableHead>
                            <TableHead className="text-center">Modify</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { words && words.map((word) => (
                            <TableRow> 
                                <TableHead className="text-center">{word.wid}</TableHead>
                                <TableHead className="text-center">{word.english}</TableHead>
                                <TableHead className="text-center">{word.japanese}</TableHead>
                                <TableHead className="text-center">{word.romanji}</TableHead>
                                <TableHead className="text-center">{word.kanji}</TableHead>
                                <TableHead className="text-center">{word.image}</TableHead>
                                <TableHead className="text-center">{word.category}</TableHead>
                                <TableHead className="text-center">{word.subcategory}</TableHead>
                                <TableHead>
                                    <Button variant="destructive" className="w-full" onClick={() => {deleteWord(word.wid)}}>Delete</Button>
                                </TableHead>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
    </div>
    );
}