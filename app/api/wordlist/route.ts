import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {

}

export async function GET(request: NextRequest) {
    const wordlist = await prisma.words.findMany({
        take: 10
    }); 
    if(!wordlist) {
        return NextResponse.json(wordlist, {status: 400});
    }
    return NextResponse.json(wordlist, {status: 200});
}