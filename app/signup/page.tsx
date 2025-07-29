'use client'

import { redirect } from "next/navigation";

export default function SignupPage() {

    const signup = async (event : any) => {
        event.preventDefault()
        if(event.target[3].value !== event.target[4].value) {
            alert("Password did not match!");
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
            alert("There was an error signing up. Please check your email or password")
        }
    }

    return(
        <div className="bg-purple-50 h-[90vh] flex flex-col w-screen justify-center items-center">
            <form className="px-10 py-6 bg-blue-100" onSubmit={signup} >
                <input type="text" name="" placeholder="First name" id="" className="p-2 m-2 bg-slate-600 text-white"/>
                <input type="text" name="" placeholder="Last name" id="" className="p-2 m-2 bg-slate-600 text-white"/> <br/>
                <input type="email" placeholder="abcd@xmy.com" className="p-2 m-2 bg-slate-600 text-white w-full"/><br/>
                <input type="password" placeholder="********" className="p-2 m-2 bg-slate-600 text-white w-full" /><br/>
                <input type="password" placeholder="********" className="p-2 m-2 bg-slate-600 text-white w-full" /><br/>
                <input type="submit" value="Submit" className="m-2 p-2 px-4 rounded-md transition-all bg-amber-300 hover:bg-amber-600"/><br/>
            </form>
        </div>
    )
}