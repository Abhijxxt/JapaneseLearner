'use client'
import { Suspense } from "react";
import CompletiionBox from "@/app/components/completeBox";

export default function CompletionPage() {
    return(
            <Suspense fallback={<div>Loading...</div>}>
                <CompletiionBox />
            </Suspense>
    )
}
