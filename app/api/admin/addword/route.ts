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

export async function GET(request: NextRequest) {
    const words = await prisma.words.findMany({});
    if(!words) {
        return NextResponse.json(words, { status: 404 });
    }
    return NextResponse.json(words, { status: 200 });
}

export async function DELETE(request: NextRequest) {
    const { wid } = await request.json();
    const deleteWord = await prisma.words.delete({
        where: {
            wid
        }
    })
    if(!deleteWord) {
        return NextResponse.json(deleteWord, { status: 500 });
    }
    return NextResponse.json(deleteWord, { status: 200 });
}