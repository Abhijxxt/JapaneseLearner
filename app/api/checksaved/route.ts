import { User } from "@/app/generated/prisma";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { uid, wid } = await request.json();
    const checksaved : User[] = await prisma.$queryRaw`SELECT * FROM Saved WHERE uid=${uid} AND wid=${wid}`;
    if(checksaved.length === 0) {
        return NextResponse.json(checksaved, {status: 200})
    }
    return NextResponse.json(checksaved, {status: 300})
}