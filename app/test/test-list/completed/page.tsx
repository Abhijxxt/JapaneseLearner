'use client'
import { Suspense } from "react";
import CompletionBox from "@/app/components/completeBox";

export default function CompletionPage() {
    return(
            <Suspense fallback={<div>Loading...</div>}>
                <CompletionBox />
            </Suspense>
    )
}
