'use client'

import { redirect } from "next/navigation"
import { useEffect } from "react";
import { toast } from "sonner";
// import { useRouter } from "next/router"

export default function LoginPage() {

    const login = async (event : any) => {
        localStorage.removeItem('admin');
        event.preventDefault();
        const response = await fetch("/api/admin/auth", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: event.target[0].value,
                password: event.target[1].value
            })
        })
        const data = await response.json()
        if(response.status === 200) {
            // console.log(data)
            // const router = useRouter()
            localStorage.setItem('admin', JSON.stringify(data));
            redirect("/admin/dashboard")
        } else {
            toast.error("Login failed")
            alert("Login failed")
        }
    }

    useEffect(() => {
        localStorage.removeItem('user');
    })

    return(
        <div className="bg-purple-50 h-[90vh] flex flex-col w-screen justify-center items-center">
            <form className="px-10 py-6" onSubmit={login}>
                <input type="email" placeholder="abcd@xmy.com" className="p-2 m-2 bg-slate-600 text-white"/><br/>
                <input type="password" placeholder="********" className="p-2 m-2 bg-slate-600 text-white" /><br/>
                <input type="submit" value="Submit" className="m-2 p-2 px-4 rounded-md transition-all bg-amber-300 hover:bg-amber-600"/><br/>
            </form>
        </div>
    )
}