import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
    const { category } = await request.json();
    if(category === "Noun") {
        const nounWords = await prisma.words.findMany({
            take: 10    ,
            where: {
                category: "Noun",
            }
        })
        return NextResponse.json(nounWords, {status: 200})
    } else if(category === "Verb") {
        const verbWords = await prisma.words.findMany({
            take: 10    ,
            where: {
                category: "Verb",
            }
        })
        return NextResponse.json(verbWords, {status: 200})
    } else if(category === "Adjective") {
        const adjectiveWords = await prisma.words.findMany({
            take: 10    ,
            where: {
                category: "Adjective",
            }
        })
        return NextResponse.json(adjectiveWords, {status: 200})
    } else {
        return NextResponse.json({},{status:300});
    }
}