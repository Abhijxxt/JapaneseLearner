'use client'
import { redirect } from "next/navigation"

export default function AdminDashboardPage() {
    const BugsReportPage = () => {
        redirect("/admin/dashboard/bugsreport");
    }
    return (
        <div className="bg-amber-50 h-[90vh] flex flex-col w-screen justify-center items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="mt-4">Welcome to the admin dashboard!</p>
            <button onClick={BugsReportPage} className="bg-amber-500 px-4 py-2 rounded-md mt-6 transition-all ease-in-out shadow-md hover:shadow-none">Bugs Report</button>
        </div>
    )
}