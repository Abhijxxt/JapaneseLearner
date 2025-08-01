'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
    
    const [user, setUser] : any = useState([]);

    const loadUser = () => {
        const data = JSON.parse(localStorage.getItem('user') || '{}');
        if(data != null) {
            setUser(data); 
        }
    }

    useEffect(() => {
        loadUser();
    },[])

    return(
        <div className="w-auto h-16 flex flex-row justify-between items-center bg-slate-50 py-7 lg:px-48 sm:px-2 shadow-md">
            <div className="title-container">
                <h1 className="font-bold"><Link href="/">日本語 Learner</Link></h1>
                <p className="text-xs">Japanese</p>
            </div>
            <div className="links-and-account-container flex flex-row justify-between items-center">
                <div className="links-container mx-20">
                    <Link href="/home" className="p-2 hover:underline">Home</Link>
                    <Link href="/wordlist" className="p-2 hover:underline">Word List</Link>
                </div>
                <div className="account-container">
                    <Link href="/login" className="p-1 font-bold">Login</Link>/
                    <Link href="/signup" className="p-1">Signup</Link>
                    <p>{user.firstname}</p>
                </div>
            </div>
        </div>
    )
}