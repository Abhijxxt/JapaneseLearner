'use client'

import { redirect } from "next/navigation"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {

    const [errorBox , setErrorBox] = useState(false);

    const showErrorBox = () => {
        setErrorBox(true)
        setTimeout(() => {setErrorBox(false)}, 2000)
    }

    const login = async (event : any) => {
        event.preventDefault()
        const response = await fetch("/api/auth", {
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
            localStorage.setItem('user', JSON.stringify(data));
            redirect("/home")
        } else {
            // console.log("False")
            // alert("Login failed")
            showErrorBox()
        }
    }

    return(
        <div className="bg-purple-50 bg-[url('/login-signup-bg.jpg')] bg-cover bg-no-repeat h-[90vh] flex flex-col w-screen justify-center items-center">
            <form className=" bg-slate-100 px-10 py-6 shadow-lg" onSubmit={login}>
                <input type="email" placeholder="abcd@xmy.com" className="p-2 m-2 rounded-md bg-amber-600 text-black"/><br/>
                <input type="password" placeholder="********" className="p-2 m-2 rounded-md bg-amber-600 text-black" /><br/>
                <input type="submit" value="Submit" className="m-2 p-2 px-4 rounded-md transition-all bg-amber-300 hover:bg-amber-600"/><br/>
                { errorBox &&
                <Alert variant="destructive" className="">
                    <AlertCircleIcon />
                    <AlertTitle>Wrong credentials.</AlertTitle>
                    <AlertDescription>
                        Please try again
                    </AlertDescription>
                </Alert>
                }
            </form>
        </div>
    )
}