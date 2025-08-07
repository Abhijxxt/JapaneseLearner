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
            <button onClick={BugsReportPage}>Bugs Report</button>
        </div>
    )
}