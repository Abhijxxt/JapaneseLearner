'use client'
import { Suspense } from "react";
import TestListBox from "../components/TestListBox";

export default function TestPage() {

    return(
        <Suspense fallback={<div>Loading...</div>}>
            <TestListBox />
        </Suspense>
    )
}