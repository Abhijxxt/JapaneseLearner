"use client"
import { useEffect, useState } from "react";
import { checkLogin } from "./middleware/checkLogin";
import { useRouter } from "next/navigation";

type Word = {
  kanji?: string;
  english: string;
  japanese: string;
  romanji: string;
}

export default function Home() {
  const router = useRouter();

  const [word, setWord] = useState<Word>({
    english: "",
    japanese: "",
    romanji: "",
    kanji: ""
  })

  const getWord = async () => {
    const response = await fetch("/api/wordlist")
    if(response.status === 200) {
      const data = await response.json();
      setWord(data[0]);
    }
  }

  const goToWordList = () => {
    if(checkLogin()) {
      router.push('/wordlist')
    } else {
      router.push('/login')
    }
  }

  useEffect(() => {
    getWord();
  },[])

  return (
    <div className="w-[100%] h-[90vh] bg-[url('/landing-page-bg.jpg')] bg-cover object-right  bg-no-repeat bg-slate-100 flex flex-row justify-center items-center">
      <div className="mr-10">
        <p className="text-4xl text-pink-600">外出先で日本語を学ぶ</p>
        <p className="text-2xl">Learn Japanese on the go</p>
        <button className="bg-amber-600 px-4 py-2 text-xl mt-4 rounded-md shadow-md transition-all hover:shadow-none" onClick={goToWordList}>Get started</button>
      </div>
      <div className="ml-10 p-4 rounded-md shadow-md bg-gradient-to-br from-pink-300 max-lg:hidden">
        <div>
          <h1 className="text-3xl ">{word.kanji}</h1>
          <p className="text-xl">English: {word.english}</p>
          <p className="text-xl">Furigana: {word.japanese}</p>
          <p className="text-xl">Romanji: {word.romanji}</p>
        </div>
      </div>
    </div>
  );
}
