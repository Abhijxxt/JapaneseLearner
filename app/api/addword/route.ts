import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { image, english, japanese, romanji, kanji, category, subcategory } = await request.json();
    const addWord = await prisma.words.create({
        data: {
            image,
            english,
            japanese,
            romanji,
            kanji,
            category,
            subcategory
        }
    })
    if(!addWord) {
        return NextResponse.json( addWord, { status: 500 });
    }
    return NextResponse.json(addWord, { status: 200 });
}