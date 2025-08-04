'use client'
import { useSearchParams } from "next/navigation";
export default function CompletionPage() {
    const searchParams = useSearchParams();
    const score = searchParams.get("score");
    const total = searchParams.get("total")
    
    return(
        <div>
            Total Score: {score} / {total}
        </div>
    )
}
