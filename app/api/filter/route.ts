import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request: NextRequest) {
    const { category } = await request.json();
    const filteredWords = await prisma.$queryRaw`SELECT * FROM Words WHERE category = ${category} ORDER BY RAND() LIMIT 10 `;
    if(!filteredWords) {
        return NextResponse.json({}, {status: 300})
    } else {
        return NextResponse.json(filteredWords, {status: 200})
    }
}