'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { checkLogin, getUserId } from "../middleware/checkLogin";
import { FaCircleNotch, FaQuestion, FaTruckLoading } from "react-icons/fa";

export default function BugReportPage() {

    const [loading, setLoading] = useState(false);
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');

    const sendBugReport = async () => {
        if(topic === '' || description === '') {
            toast.warning("Please fill in both fields");
            return;
        }
        if(!checkLogin()) {
            toast.error("You must be logged in to send a bug report.");
            return;
        }
         setLoading(true);
        const uid = getUserId();
        const response = await fetch('/api/bugreport', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: uid,
                topic: topic,
                description: description
            })
        });
        if(response.status !== 200) {
            toast.error("Failed to send bug report. Please try again later.");
            return;
        }
        setLoading(false);
        toast.success("Bug report sent successfully!");
        setTopic('');
        setDescription('');
    }


    return (
        <div className="w-full h-[90vh] relative flex items-center justify-center">
            {/* Background image */}
            <div className="absolute inset-0 bg-[url('/bug-report.jpg')] bg-no-repeat bg-cover" />
            {/* Black gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
            {/* Content */}
            <div className="relative z-10 w-full flex items-center justify-center">
                <Card className="w-[30%] h-auto p-4 shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex flex-row mb-1"><FaQuestion className="mr-2"/> Bug Report</CardTitle>
                        <CardDescription>Have trouble with the site? File here and we will improve the experience.</CardDescription>
                    </CardHeader>
                    <CardContent >
                        <Label className="text-lg font-semibold">Topic:</Label>
                        <Input placeholder="Add your topic here" value={topic} onChange={(e) => {setTopic(e.target.value)}} />
                        <Label className="text-lg font-semibold mt-4">Description:</Label>
                        <Textarea placeholder="Add your description here..." className="resize-none h-30" value={description} 
                            onChange={(e) => {setDescription(e.target.value)}} />
                    </CardContent>
                    <CardFooter className="flex flex-row justify-between">
                        <Button onClick={sendBugReport} className="text-black bg-green-500 shadow-md hover:bg-green-800 hover:shadow-none"> Send {loading && <FaCircleNotch  />} </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}