'use client'
import TestListBox from "@/app/components/TestListBox";
import { Suspense } from "react";

export default function TestListPage() {
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <TestListBox />
        </Suspense>
    )
}