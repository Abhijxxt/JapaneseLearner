'use client';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type BugsReport = {
    bid: number;
    uid: number;
    title: string;
    description?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function BugsReportPage() {

    const [bugs, setBugs] = useState<BugsReport[]>([]);

    const bugsReport = async () => {
        const response = await fetch("/api/bugreport")
        if(response.status === 200) {
            const data = await response.json();
            setBugs(data);
            return;
        }
        toast.error("Failed to fetch bug reports");
    }

    const ChangeBugStatustoClosed = async (bid: number) => {
        console.log(bid);
        const response = await fetch('/api/bugreport/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bid: bid,
                status: "Closed",
            }),
        });
        if (response.status === 200) {
            const updatedBug = await response.json();
            setBugs(bugs.map(bug => bug.bid === updatedBug.bid ? { ...bug, status: "Closed" } : bug));
            toast.success("Bug report status updated successfully");
        } else {
            toast.error("Failed to update bug report status");
        }
    }

const ChangeBugStatustoOpen = async (bid: number) => {
        // const bid = event.target.parentElement.firstChild.textContent;
        const response = await fetch('/api/bugreport/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bid: bid,
                status: "Open",
            }),
        });
        if (response.status === 200) {
            const updatedBug = await response.json();
            setBugs(bugs.map(bug => bug.bid === updatedBug.bid ? { ...bug, status: "Open" } : bug));
            toast.success("Bug report status updated successfully");
        } else {
            toast.error("Failed to update bug report status");
        }
    }

    useEffect(() => {
        bugsReport();
    }, [])

    return (
        <div className="bg-gradient-to-bl from-amber-200 to-amber-300 h-[90vh] flex flex-col w-screen">
            <div className="mt-6 p-6">
                <h1 className="text-2xl font-bold">Bugs Report Page</h1>
                <p className="mt-4">Check current bugs on the site.</p>
                <p className="mt-4">Let&apos;s keep our users happy!</p>
            </div>
            <div className="p-6 w-auto m-2 min-h-[60vh] max-h-[60vh] bg-amber-50">
                <Table>
                    <TableHeader >
                        <TableRow>
                            <TableHead className="text-center">Bug ID</TableHead>
                            <TableHead className="text-center">User ID</TableHead>
                            <TableHead className="text-center">Topic</TableHead>
                            <TableHead className="text-center">Description</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Created At</TableHead>
                            <TableHead className="text-center">Updated At</TableHead>
                            <TableHead className="text-center">Status update</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bugs && bugs.map(bug => (
                            <TableRow key={bug.bid}>
                                <TableHead className="text-center" id="bid">{bug.bid}</TableHead>
                                <TableHead className="text-center">{bug.uid}</TableHead>
                                <TableHead className="text-center">{bug.title}</TableHead>
                                <TableHead className="text-center">{bug.description || "No description provided"}</TableHead>
                                <TableHead className="text-center"
                                    style={{ color: bug.status === "Closed" ? "green" : "red" }}
                                >{bug.status}</TableHead>
                                <TableHead className="text-center">{new Date(bug.createdAt).toLocaleString()}</TableHead>
                                <TableHead className="text-center">{new Date(bug.updatedAt).toLocaleString()}</TableHead>
                                <TableHead className="text-center">
                                {
                                    bug.status === "Closed" ?
                                    <Button onClick={() => {ChangeBugStatustoOpen(bug.bid)}}>Reopen</Button> :
                                    <Button onClick={() => {ChangeBugStatustoClosed(bug.bid)}}>Completed</Button>
                                }
                                </TableHead>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}