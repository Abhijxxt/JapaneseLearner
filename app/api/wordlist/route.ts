import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/client";
// import prismarandom from 'prisma-extension-random';

export async function POST(request: NextRequest) {

}

export async function GET(request: NextRequest) {
    // const wordlist = await prisma.words.findMany({
    //     take: 10
    // }); 
    const wordlist = await prisma.$queryRaw`SELECT * FROM Words ORDER BY RAND() LIMIT 10`;
    if(!wordlist) {
        return NextResponse.json(wordlist, {status: 400});
    }
    return NextResponse.json(wordlist, {status: 200});
}