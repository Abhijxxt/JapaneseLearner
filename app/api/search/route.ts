import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { word } = await request.json();
    const search = await prisma.words.findMany({
        where: {
            OR: [
                {
                    english: {
                        contains: word,
                    }
                },
                {
                    japanese: {
                        contains: word,
                    }
                },
                {
                    kanji: {
                        contains: word,
                    }
                },
                {
                    romanji: {
                        contains: word,
                    }
                }
            ]
        }
    })
    if(!search) {
        return NextResponse.json(search, {status: 400})
    }
    return NextResponse.json(search, {status: 200})
}