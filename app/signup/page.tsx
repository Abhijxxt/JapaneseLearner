'use client'

import { redirect } from "next/navigation";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";

export default function SignupPage() {

    const [errorBox , setErrorBox] = useState(false);

    const showErrorBox = () => {
        setErrorBox(true)
        setTimeout(() => {setErrorBox(false)}, 2000)
    }

    const signup = async (event : any) => {
        event.preventDefault()
        if(event.target[3].value !== event.target[4].value) {

            showErrorBox()
            // event.target[0].value = "";
            // event.target[1].value = "";
            // event.target[2].value = "";
            // event.target[3].value = "";
            // event.target[4].value = "";
            return;
        }
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                firstname: event.target[0].value,
                lastname: event.target[1].value,
                email: event.target[2].value,
                password: event.target[3].value
            })
        })
        const data = await response.json();
        if(response.status === 200) {
            localStorage.setItem('user', JSON.stringify(data));
            event.target[0].value = "";
            event.target[1].value = "";
            event.target[2].value = "";
            event.target[3].value = "";
            event.target[4].value = "";
            redirect("/home")
        } else {
            showErrorBox()
        }
            // alert("There was an error signing up. Please check your email or password")
        
    }

    return(
        <div className="bg-purple-50 bg-[url('/login-signup-bg.webp')] bg-cover bg-no-repeat h-[90vh] flex flex-col w-screen justify-center items-center">
            <form className="px-10 py-6 bg-slate-100 shadow-lg" onSubmit={signup} >
                <div className="w-[100%] flex flex-row justify-center items-center gap-2 m-2">
                    <input type="text" name="" placeholder="First name" id="" className="w-[50%] p-2 rounded-md bg-amber-600 text-black"/>
                    <input type="text" name="" placeholder="Last name" id="" className=" w-[50%] p-2 rounded-md  bg-amber-600 text-black"/> <br/>
                </div>
                <input type="email" placeholder="abcd@xmy.com" className="p-2 m-2 bg-amber-600 rounded-md text-black w-full"/><br/>
                <input type="password" placeholder="********" className="p-2 m-2 bg-amber-600 rounded-md text-black w-full" /><br/>
                <input type="password" placeholder="********" className="p-2 m-2 bg-amber-600 rounded-md text-black w-full" /><br/>
                <input type="submit" value="Submit" className="m-2 p-2 px-4 rounded-md transition-all bg-amber-300 hover:bg-amber-600"/><br/>
                { errorBox &&
                <Alert variant="destructive" className="w-full">
                    <AlertCircleIcon />
                    <AlertTitle>Unable to signup user with current Email.</AlertTitle>
                    <AlertDescription>
                        <p>Please verify your email and password information and try again.</p>
                        <ul className="list-inside list-disc text-sm">
                            <li>Check if you already have an account</li>
                            <li>Check for correct email address</li>
                            <li>Check for correct password</li>
                        </ul>
                    </AlertDescription>
                </Alert>
                }
            </form>
        </div>
    )
}