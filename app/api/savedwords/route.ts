import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    const { uid } = await request.json();
    const savedWords = await prisma.$queryRaw`SELECT * FROM Words,Saved WHERE Saved.wid=Words.wid AND Saved.uid=${uid} ORDER BY RAND()`;
    if(!savedWords) {
        return NextResponse.json(savedWords, {status:300})
    } 
    return NextResponse.json(savedWords, {status:200})
    
}