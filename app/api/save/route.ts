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

export async function DELETE(request: NextRequest) {
    const {uid, wid} = await request.json();
    const deleteResult = await prisma.saved.deleteMany({
        where: {
            uid: uid,
            wid: wid
        }
    });
    if (deleteResult.count === 0) {
        return NextResponse.json({ message: "No record deleted" }, { status: 400 });
    } else {
        return NextResponse.json(deleteResult, { status: 200 });
    }
}