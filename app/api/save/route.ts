import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {uid, wid} = await request.json();
    const saveWord = await prisma.saved.create({
        data: {
            uid: uid,
            wid: wid
        }
    })
    if(!saveWord) {
        return NextResponse.json(saveWord, {status: 400})
    }
    return NextResponse.json(saveWord, {status: 200})
}