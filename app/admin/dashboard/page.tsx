'use client'
// import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboardPage() {

    const router = useRouter();
    // const [numberOfBugs, setNumberOfBugs] = useState(0);
    // const [numberOfWords, setNumberOfWords] = useState(0);

    const BugsReportPage = () => {
        router.push("/admin/dashboard/bugsreport");
    }

    const AddWordPage = () => {
        router.push("/admin/addword");
    }

    const WordListPage = () => {
        router.push("/admin/wordlist");
    }

    // const GetNumberOfBugs = async () => {
    //     const response = await prisma.bugReport.count();
    //     setNumberOfBugs(response);
    // }

    // const GetNumberOfWords = async () => {
    //     const response = await prisma.words.count();
    //     setNumberOfWords(response);
    // }

    useEffect(() => {
        if (localStorage.getItem("admin") === null) {
            redirect("/admin/login");
        } 
    })

    return (
        <div className="bg-amber-50 h-[90vh] flex flex-col w-screen justify-center items-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="mt-4">Welcome to the admin dashboard!</p>
            </div>
            <div className="w-screen flex flex-row items-center justify-evenly mt-10">

            </div>
            <div className="flex flex-row gap-4 mt-2">
                <button onClick={BugsReportPage} className="bg-amber-500 px-4 py-2 rounded-md mt-6 transition-all ease-in-out shadow-md hover:shadow-none">Bugs Report</button>
                <button onClick={AddWordPage} className="bg-amber-300 px-4 py-2 rounded-md mt-6 transition-all ease-in-out shadow-md hover:shadow-none">Add Words</button>
                <button onClick={WordListPage} className="bg-amber-100 px-4 py-2 rounded-md mt-6 transition-all ease-in-out shadow-md hover:shadow-none">List Words</button>
            </div>
        </div>
    )
}