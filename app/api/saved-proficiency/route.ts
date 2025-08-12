import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { uid, wid  } = await request.json();
    const proficiency = await prisma.saved.findMany({
        where: {
            uid,
            wid
        }
    })
    if(!proficiency) {
        return NextResponse.json(proficiency, {status: 400})
    }
    return NextResponse.json(proficiency, {status: 200})
}